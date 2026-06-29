/**
 * app/create/index.tsx
 *
 * Habit Form — Create & Edit.
 * 4 sections: Identity → Schedule → Reminders → Preview.
 * Supports emoji picker sheet + scroll-wheel time picker.
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { useTheme } from "@/providers";
import { useHabitStore } from "@/store/habitStore";
import { useHabitFormViewModel } from "@/viewmodels/HabitFormViewModel";
import type { FrequencyType } from "@/types/habit";
import type { Theme } from "@/theme";

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
// ISO weekday numbers: 1=Mon … 7=Sun
const WEEKDAY_VALUES = [1, 2, 3, 4, 5, 6, 7];

const EMOJI_DATA: Record<string, string[]> = {
  Recent: ["💧", "🔥", "📚", "💪", "🏃", "🌿", "🧠", "❤️", "⭐", "☀️", "☕", "🍎", "🌙", "🎯", "🚴"],
  Suggested: ["🏋️", "🧘", "🚶", "📖", "✍️", "🎨", "🎸", "🏊", "💤", "🥗", "💊", "💻", "🌹", "🍵", "🏆"],
  All: [
    "💧", "🔥", "📚", "💪", "🏃", "🌿", "🧠", "❤️", "⭐", "☀️",
    "☕", "🍎", "🌙", "🎯", "🚴", "🏋️", "🧘", "🚶", "📖", "✍️",
    "🎨", "🎸", "🏊", "💤", "🥗", "💊", "💻", "🌹", "🍵", "🏆",
    "🦋", "🌸", "🍃", "🐢", "🌊", "🏔️", "🌈", "⚡", "🎵", "🎭",
    "🧩", "🎮", "🏅", "🚀", "🌺", "🦁", "🐬", "🌻", "🍀", "🔑",
  ],
};

const EMOJI_TABS = Object.keys(EMOJI_DATA) as (keyof typeof EMOJI_DATA)[];

const PICKER_ITEM_H = 48;
const PICKER_VISIBLE = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function format12Hour(hour: number, minute: number, period: "AM" | "PM"): string {
  const h24 = period === "AM" ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12;
  return `${pad(h24)}:${pad(minute)}`;
}

function parse24To12(time: string): { hour: number; minute: number; period: "AM" | "PM" } {
  const [h, m] = time.split(":").map(Number);
  const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return { hour, minute: m, period };
}

function formatDisplay(time24: string): string {
  const { hour, minute, period } = parse24To12(time24);
  return `${hour}:${pad(minute)} ${period}`;
}

function calcNextReminder(times: string[]): string | null {
  if (times.length === 0) return null;
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const sorted = [...times].sort();
  for (const t of sorted) {
    const [h, m] = t.split(":").map(Number);
    if (h * 60 + m > nowMins) return formatDisplay(t);
  }
  return formatDisplay(sorted[0]); // next day
}

// ─── Scroll-wheel picker column ───────────────────────────────────────────────

interface PickerColumnProps {
  data: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  theme: Theme;
}

function PickerColumn({ data, selectedIndex, onSelect, theme }: PickerColumnProps) {
  const ref = useRef<ScrollView>(null);

  const handleMomentumEnd = useCallback(
    (e: any) => {
      const index = Math.round(e.nativeEvent.contentOffset.y / PICKER_ITEM_H);
      onSelect(Math.max(0, Math.min(data.length - 1, index)));
    },
    [data.length, onSelect],
  );

  return (
    <View style={{ width: 72, height: PICKER_ITEM_H * PICKER_VISIBLE, overflow: "hidden" }}>
      {/* selection highlight */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: PICKER_ITEM_H * 2,
          left: 0, right: 0,
          height: PICKER_ITEM_H,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.colors.primary,
          zIndex: 1,
        }}
      />
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={PICKER_ITEM_H}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumEnd}
        contentOffset={{ x: 0, y: selectedIndex * PICKER_ITEM_H }}
        contentContainerStyle={{ paddingVertical: PICKER_ITEM_H * 2 }}
      >
        {data.map((val, i) => (
          <View
            key={i}
            style={{
              height: PICKER_ITEM_H,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: i === selectedIndex ? 20 : 16,
                fontWeight: i === selectedIndex ? "700" : "400",
                color:
                  i === selectedIndex
                    ? theme.semantic.text.primary
                    : theme.semantic.text.secondary,
              }}
            >
              {typeof val === "number" ? pad(val) : val}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Time Picker Modal ────────────────────────────────────────────────────────

interface TimePickerModalProps {
  visible: boolean;
  initial?: string;
  onConfirm: (time24: string) => void;
  onCancel: () => void;
  theme: Theme;
}

function TimePickerModal({ visible, initial, onConfirm, onCancel, theme }: TimePickerModalProps) {
  const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
  const MINUTES = Array.from({ length: 60 }, (_, i) => i);
  const PERIODS: ("AM" | "PM")[] = ["AM", "PM"];

  const parsed = initial ? parse24To12(initial) : { hour: 8, minute: 0, period: "AM" as "AM" | "PM" };

  const [hourIdx, setHourIdx] = useState(HOURS.indexOf(parsed.hour));
  const [minIdx, setMinIdx] = useState(parsed.minute);
  const [periodIdx, setPeriodIdx] = useState(PERIODS.indexOf(parsed.period));

  const handleDone = () => {
    const time24 = format12Hour(HOURS[hourIdx], MINUTES[minIdx], PERIODS[periodIdx]);
    onConfirm(time24);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable style={pickerStyles.overlay} onPress={onCancel}>
        <Pressable style={[pickerStyles.sheet, { backgroundColor: theme.semantic.background.card }]} onPress={() => {}}>
          {/* Handle */}
          <View style={[pickerStyles.handle, { backgroundColor: theme.semantic.divider.default }]} />

          {/* Title row */}
          <View style={pickerStyles.titleRow}>
            <TouchableOpacity onPress={onCancel} hitSlop={8}>
              <Text style={{ fontSize: 16, color: theme.colors.secondary }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[pickerStyles.title, { color: theme.semantic.text.primary }]}>Add Time</Text>
            <TouchableOpacity onPress={handleDone} hitSlop={8}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.primary }}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Columns */}
          <View style={pickerStyles.columns}>
            <PickerColumn data={HOURS} selectedIndex={hourIdx} onSelect={setHourIdx} theme={theme} />
            <Text style={[pickerStyles.colon, { color: theme.semantic.text.primary }]}>:</Text>
            <PickerColumn data={MINUTES} selectedIndex={minIdx} onSelect={setMinIdx} theme={theme} />
            <PickerColumn data={PERIODS} selectedIndex={periodIdx} onSelect={setPeriodIdx} theme={theme} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const pickerStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 16 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 17, fontWeight: "700" },
  columns: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 },
  colon: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
});

// ─── Emoji Picker Modal ───────────────────────────────────────────────────────

interface EmojiPickerModalProps {
  visible: boolean;
  onSelect: (emoji: string) => void;
  onClose: () => void;
  theme: Theme;
}

function EmojiPickerModal({ visible, onSelect, onClose, theme }: EmojiPickerModalProps) {
  const [activeTab, setActiveTab] = useState<string>("Recent");

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={emojiStyles.overlay} onPress={onClose}>
        <Pressable style={[emojiStyles.sheet, { backgroundColor: theme.semantic.background.card }]} onPress={() => {}}>
          <View style={[emojiStyles.handle, { backgroundColor: theme.semantic.divider.default }]} />

          <Text style={[emojiStyles.title, { color: theme.semantic.text.primary }]}>Pick an Emoji</Text>

          {/* Tabs */}
          <View style={[emojiStyles.tabBar, { borderBottomColor: theme.semantic.divider.default }]}>
            {EMOJI_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  emojiStyles.tab,
                  activeTab === tab && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    emojiStyles.tabText,
                    { color: activeTab === tab ? theme.colors.primary : theme.semantic.text.secondary },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Grid */}
          <FlatList
            data={EMOJI_DATA[activeTab]}
            keyExtractor={(item, i) => `${item}-${i}`}
            numColumns={5}
            contentContainerStyle={emojiStyles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[emojiStyles.emojiCell, { backgroundColor: theme.semantic.background.surface }]}
                onPress={() => { onSelect(item); onClose(); }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 28 }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const emojiStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 32, maxHeight: "70%" },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 12 },
  title: { fontSize: 17, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  tabBar: { flexDirection: "row", borderBottomWidth: 1, marginBottom: 12 },
  tab: { flex: 1, alignItems: "center", paddingVertical: 8 },
  tabText: { fontSize: 14, fontWeight: "600" },
  grid: { paddingBottom: 16 },
  emojiCell: {
    flex: 1, aspectRatio: 1, margin: 4, borderRadius: 12,
    justifyContent: "center", alignItems: "center", maxWidth: "18%",
  },
});

// ─── Section badge ────────────────────────────────────────────────────────────

function SectionBadge({ number, theme }: { number: number; theme: Theme }) {
  return (
    <View style={[badgeStyles.circle, { backgroundColor: theme.colors.primary }]}>
      <Text style={badgeStyles.text}>{number}</Text>
    </View>
  );
}
const badgeStyles = StyleSheet.create({
  circle: { width: 26, height: 26, borderRadius: 13, justifyContent: "center", alignItems: "center" },
  text: { color: "#fff", fontSize: 13, fontWeight: "700" },
});

// ─── Main Form Screen ─────────────────────────────────────────────────────────

export default function HabitFormScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { createHabit, updateHabit } = useHabitStore();

  const { initialValues, isEditMode } = useHabitFormViewModel(id);
  const styles = createStyles(theme);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [name, setName] = useState(initialValues.name);
  const [emoji, setEmoji] = useState(initialValues.emoji);
  const [frequencyType, setFrequencyType] = useState<FrequencyType>(initialValues.frequencyType);
  const [weekdays, setWeekdays] = useState<number[]>(initialValues.weekdays);
  const [reminderTimes, setReminderTimes] = useState<string[]>(initialValues.reminderTimes);
  const [nameError, setNameError] = useState("");
  const [saving, setSaving] = useState(false);

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [editingTimeIndex, setEditingTimeIndex] = useState<number | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const frequencyLabel = useMemo(() => {
    if (frequencyType === "daily") return "Every day";
    if (weekdays.length === 0) return "Select days";
    const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return weekdays.map((d) => names[d - 1]).join(", ");
  }, [frequencyType, weekdays]);

  const nextReminder = calcNextReminder(reminderTimes);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const toggleWeekday = useCallback((day: number) => {
    setWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort(),
    );
  }, []);

  const addReminder = useCallback((time24: string) => {
    if (reminderTimes.includes(time24)) return;
    if (reminderTimes.length >= 10) {
      Alert.alert("Limit reached", "You can add up to 10 reminder times.");
      return;
    }
    setReminderTimes((prev) => [...prev, time24].sort());
  }, [reminderTimes]);

  const removeReminder = useCallback((time: string) => {
    setReminderTimes((prev) => prev.filter((t) => t !== time));
  }, []);

  const validate = useCallback((): boolean => {
    const trimmed = name.trim();
    if (!trimmed) { setNameError("Enter a habit name"); return false; }
    if (trimmed.length > 60) { setNameError("Name is too long (max 60 chars)"); return false; }
    if (frequencyType === "weekly" && weekdays.length === 0) {
      Alert.alert("Select days", "Choose at least one day for your habit.");
      return false;
    }
    setNameError("");
    return true;
  }, [name, frequencyType, weekdays]);

  const handleSave = useCallback(async () => {
    Keyboard.dismiss();
    if (!validate() || saving) return;

    setSaving(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const form = {
      name: name.trim(),
      emoji,
      frequencyType,
      weekdays: frequencyType === "weekly" ? weekdays : [],
      reminderTimes,
    };

    try {
      if (isEditMode && id) {
        await updateHabit(id, form);
      } else {
        await createHabit(form);
      }
      router.back();
    } catch (e) {
      Alert.alert("Error", "Could not save habit. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [validate, saving, name, emoji, frequencyType, weekdays, reminderTimes, isEditMode, id, updateHabit, createHabit, router]);

  const openAddTime = useCallback(() => {
    setEditingTimeIndex(null);
    setTimePickerVisible(true);
  }, []);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.semantic.background.page }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* ── Header ── */}
        <View style={[styles.header, { borderBottomColor: theme.semantic.divider.default }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={theme.semantic.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.semantic.text.primary }]}>
            {isEditMode ? "Edit Habit" : "Create Habit"}
          </Text>
          <TouchableOpacity hitSlop={8}>
            <Text style={[styles.helpText, { color: theme.colors.primary }]}>? Help</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ══════════════════════════════════════
              Section 1 — Habit Identity
          ══════════════════════════════════════ */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <SectionBadge number={1} theme={theme} />
              <View>
                <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
                  Habit Identity
                </Text>
                <Text style={[styles.sectionSub, { color: theme.semantic.text.secondary }]}>
                  Name your habit and choose an emoji.
                </Text>
              </View>
            </View>

            {/* Name input */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.semantic.background.card,
                  borderColor: nameError ? theme.semantic.feedback.error : theme.semantic.divider.default,
                },
              ]}
            >
              <Ionicons name="pencil-outline" size={18} color={theme.semantic.text.secondary} />
              <TextInput
                style={[styles.input, { color: theme.semantic.text.primary }]}
                placeholder="Habit name"
                placeholderTextColor={theme.semantic.text.disabled}
                value={name}
                onChangeText={(t) => { setName(t); if (nameError) setNameError(""); }}
                maxLength={60}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                accessibilityLabel="Habit name input"
              />
              {name.length > 0 && (
                <TouchableOpacity onPress={() => setName("")} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color={theme.semantic.text.secondary} />
                </TouchableOpacity>
              )}
            </View>

            {nameError ? (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle-outline" size={14} color={theme.semantic.feedback.error} />
                <Text style={[styles.errorText, { color: theme.semantic.feedback.error }]}>{nameError}</Text>
              </View>
            ) : null}

            {/* Emoji preview card */}
            <TouchableOpacity
              style={[styles.emojiCard, { backgroundColor: `${theme.colors.primary}10` }]}
              onPress={() => setEmojiPickerVisible(true)}
              activeOpacity={0.8}
              accessibilityLabel="Change emoji"
              accessibilityRole="button"
            >
              <Text style={{ fontSize: 48 }}>{emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.emojiCardName, { color: theme.semantic.text.primary }]} numberOfLines={1}>
                  {emoji} {name || "Habit Name"}
                </Text>
                <Text style={[styles.emojiCardHint, { color: theme.semantic.text.secondary }]}>
                  Tap to change emoji
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* ══════════════════════════════════════
              Section 2 — Schedule
          ══════════════════════════════════════ */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <SectionBadge number={2} theme={theme} />
              <View>
                <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
                  Schedule
                </Text>
                <Text style={[styles.sectionSub, { color: theme.semantic.text.secondary }]}>
                  Choose how often you want to do it.
                </Text>
              </View>
            </View>

            <View style={styles.frequencyRow}>
              {(["daily", "weekly"] as FrequencyType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.frequencyBtn,
                    {
                      backgroundColor:
                        frequencyType === type
                          ? theme.colors.primary
                          : theme.semantic.background.card,
                      borderColor:
                        frequencyType === type
                          ? theme.colors.primary
                          : theme.semantic.divider.default,
                    },
                  ]}
                  onPress={() => setFrequencyType(type)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel={type === "daily" ? "Daily" : "Weekdays"}
                >
                  <Ionicons
                    name={type === "daily" ? "sunny-outline" : "calendar-outline"}
                    size={16}
                    color={frequencyType === type ? "#fff" : theme.semantic.text.primary}
                  />
                  <Text
                    style={[
                      styles.frequencyBtnText,
                      { color: frequencyType === type ? "#fff" : theme.semantic.text.primary },
                    ]}
                  >
                    {type === "daily" ? "Daily" : "Weekdays"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Weekday selector */}
            {frequencyType === "weekly" && (
              <View style={styles.weekdayRow}>
                {WEEKDAY_LABELS.map((label, i) => {
                  const day = WEEKDAY_VALUES[i];
                  const selected = weekdays.includes(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.weekdayBtn,
                        {
                          backgroundColor: selected ? theme.colors.primary : theme.semantic.background.surface,
                          borderColor: selected ? theme.colors.primary : theme.semantic.divider.default,
                        },
                      ]}
                      onPress={() => toggleWeekday(day)}
                      accessibilityRole="button"
                      accessibilityLabel={`${["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][i]} ${selected ? "selected" : "not selected"}`}
                    >
                      <Text
                        style={[
                          styles.weekdayBtnText,
                          { color: selected ? "#fff" : theme.semantic.text.secondary },
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <View style={styles.frequencyLabel}>
              <Ionicons name="calendar-outline" size={14} color={theme.colors.success} />
              <Text style={[styles.frequencyLabelText, { color: theme.colors.success }]}>
                {frequencyLabel}
              </Text>
            </View>
          </View>

          {/* ══════════════════════════════════════
              Section 3 — Reminders
          ══════════════════════════════════════ */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <SectionBadge number={3} theme={theme} />
              <View>
                <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
                  Reminders
                </Text>
                <Text style={[styles.sectionSub, { color: theme.semantic.text.secondary }]}>
                  Choose when you'd like to be reminded.
                </Text>
              </View>
            </View>

            {/* Time chips */}
            <View style={styles.chipsRow}>
              {reminderTimes.map((t) => (
                <View
                  key={t}
                  style={[styles.chip, { backgroundColor: theme.semantic.background.surface, borderColor: theme.semantic.divider.default }]}
                >
                  <Ionicons name="notifications-outline" size={13} color={theme.semantic.text.primary} />
                  <Text style={[styles.chipText, { color: theme.semantic.text.primary }]}>
                    {formatDisplay(t)}
                  </Text>
                  <TouchableOpacity onPress={() => removeReminder(t)} hitSlop={8}>
                    <Ionicons name="close" size={14} color={theme.semantic.text.secondary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Add reminder */}
            <TouchableOpacity
              style={[styles.addReminderBtn, { borderColor: theme.colors.primary }]}
              onPress={openAddTime}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Add reminder time"
            >
              <Ionicons name="add" size={18} color={theme.colors.primary} />
              <Text style={[styles.addReminderText, { color: theme.colors.primary }]}>
                Add Reminder
              </Text>
            </TouchableOpacity>

            {/* Summary */}
            {reminderTimes.length > 0 && (
              <View style={[styles.reminderSummary, { backgroundColor: `${theme.colors.success}12` }]}>
                <Ionicons name="notifications-outline" size={16} color={theme.colors.success} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.reminderSummaryText, { color: theme.colors.success }]}>
                    {reminderTimes.length} reminder{reminderTimes.length !== 1 ? "s" : ""} scheduled
                  </Text>
                  {nextReminder && (
                    <Text style={[styles.reminderSummaryNext, { color: theme.semantic.text.secondary }]}>
                      Next reminder today: {nextReminder}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={14} color={theme.colors.success} />
              </View>
            )}
          </View>

          {/* ══════════════════════════════════════
              Section 4 — Preview
          ══════════════════════════════════════ */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <SectionBadge number={4} theme={theme} />
              <View>
                <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
                  Preview
                </Text>
                <Text style={[styles.sectionSub, { color: theme.semantic.text.secondary }]}>
                  Preview updates automatically as you make changes.
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.previewCard,
                { backgroundColor: `${theme.colors.primary}10`, borderColor: `${theme.colors.primary}30` },
              ]}
            >
              <Text style={{ fontSize: 44 }}>{emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.previewName, { color: theme.semantic.text.primary }]} numberOfLines={1}>
                  {name || "Habit Name"}
                </Text>
                <View style={styles.previewMeta}>
                  <Ionicons name="calendar-outline" size={12} color={theme.colors.primary} />
                  <Text style={[styles.previewMetaText, { color: theme.colors.primary }]}>
                    {frequencyLabel}
                  </Text>
                </View>
                {reminderTimes.length > 0 && (
                  <View style={styles.previewTimes}>
                    {reminderTimes.slice(0, 3).map((t) => (
                      <View key={t} style={styles.previewTimeChip}>
                        <Ionicons name="time-outline" size={10} color={theme.semantic.text.secondary} />
                        <Text style={[styles.previewTimeText, { color: theme.semantic.text.secondary }]}>
                          {formatDisplay(t)}
                        </Text>
                      </View>
                    ))}
                    {reminderTimes.length > 3 && (
                      <Text style={[styles.previewTimeText, { color: theme.semantic.text.secondary }]}>
                        +{reminderTimes.length - 3} more
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={{ height: 160 }} />
        </ScrollView>

        {/* ── Sticky bottom bar ── */}
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: theme.semantic.background.card,
              borderTopColor: theme.semantic.divider.default,
              ...theme.shadows.lg,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.saveBtn,
              {
                backgroundColor: theme.colors.primary,
                opacity: saving ? 0.7 : 1,
              },
            ]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={isEditMode ? "Update habit" : "Save habit"}
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.saveBtnText}>
              {saving ? "Saving…" : isEditMode ? "Update Habit" : "Save Habit"}
            </Text>
          </TouchableOpacity>

          {reminderTimes.length > 0 && (
            <Text style={[styles.bottomNote, { color: theme.semantic.text.secondary }]}>
              {reminderTimes.length} reminder{reminderTimes.length !== 1 ? "s" : ""} will be scheduled
            </Text>
          )}

          <View style={styles.privacyRow}>
            <Ionicons name="lock-closed-outline" size={12} color={theme.semantic.text.disabled} />
            <Text style={[styles.privacyText, { color: theme.semantic.text.disabled }]}>
              Your data is private and secure
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* ── Emoji picker modal ── */}
      <EmojiPickerModal
        visible={emojiPickerVisible}
        onSelect={setEmoji}
        onClose={() => setEmojiPickerVisible(false)}
        theme={theme}
      />

      {/* ── Time picker modal ── */}
      <TimePickerModal
        visible={timePickerVisible}
        initial={editingTimeIndex !== null ? reminderTimes[editingTimeIndex] : undefined}
        onConfirm={(t) => { addReminder(t); setTimePickerVisible(false); }}
        onCancel={() => setTimePickerVisible(false)}
        theme={theme}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: { flex: 1 },

    // Header
    header: {
      flexDirection: "row", alignItems: "center", justifyContent: "space-between",
      paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1,
    },
    backBtn: { padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: "700" },
    helpText: { fontSize: 14, fontWeight: "600" },

    // Scroll
    content: { paddingHorizontal: 20, paddingTop: 20, gap: 24 },

    // Sections
    section: { gap: 14 },
    sectionTitleRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    sectionTitle: { fontSize: 17, fontWeight: "700" },
    sectionSub: { fontSize: 13, marginTop: 2 },

    // Input
    inputWrapper: {
      flexDirection: "row", alignItems: "center", gap: 10,
      borderRadius: 14, paddingHorizontal: 14, paddingVertical: 14,
      borderWidth: 1.5, ...theme.shadows.xs,
    },
    input: { flex: 1, fontSize: 16 },
    errorRow: { flexDirection: "row", alignItems: "center", gap: 5 },
    errorText: { fontSize: 12 },

    // Emoji card
    emojiCard: {
      flexDirection: "row", alignItems: "center", gap: 16,
      padding: 16, borderRadius: 16,
    },
    emojiCardName: { fontSize: 17, fontWeight: "700" },
    emojiCardHint: { fontSize: 13, marginTop: 3 },

    // Frequency
    frequencyRow: { flexDirection: "row", gap: 12 },
    frequencyBtn: {
      flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 8, paddingVertical: 14, borderRadius: 14, borderWidth: 1.5,
    },
    frequencyBtnText: { fontSize: 15, fontWeight: "600" },

    // Weekdays
    weekdayRow: { flexDirection: "row", gap: 6 },
    weekdayBtn: {
      flex: 1, aspectRatio: 1, borderRadius: 20, borderWidth: 1.5,
      justifyContent: "center", alignItems: "center",
    },
    weekdayBtnText: { fontSize: 13, fontWeight: "700" },

    // Frequency label
    frequencyLabel: { flexDirection: "row", alignItems: "center", gap: 6 },
    frequencyLabelText: { fontSize: 14, fontWeight: "600" },

    // Chips
    chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      flexDirection: "row", alignItems: "center", gap: 6,
      paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1,
    },
    chipText: { fontSize: 13, fontWeight: "600" },

    // Add reminder
    addReminderBtn: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 8, paddingVertical: 14, borderRadius: 14, borderWidth: 1.5, borderStyle: "dashed",
    },
    addReminderText: { fontSize: 15, fontWeight: "600" },

    // Reminder summary
    reminderSummary: {
      flexDirection: "row", alignItems: "center", gap: 10,
      padding: 14, borderRadius: 14,
    },
    reminderSummaryText: { fontSize: 13, fontWeight: "600" },
    reminderSummaryNext: { fontSize: 12, marginTop: 2 },

    // Preview
    previewCard: {
      flexDirection: "row", alignItems: "center", gap: 16,
      padding: 16, borderRadius: 16, borderWidth: 1,
    },
    previewName: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
    previewMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 6 },
    previewMetaText: { fontSize: 13, fontWeight: "600" },
    previewTimes: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    previewTimeChip: { flexDirection: "row", alignItems: "center", gap: 3 },
    previewTimeText: { fontSize: 11 },

    // Bottom bar
    bottomBar: {
      paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24,
      borderTopWidth: 1, gap: 8,
    },
    saveBtn: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 8, paddingVertical: 16, borderRadius: 16,
    },
    saveBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
    bottomNote: { fontSize: 13, textAlign: "center" },
    privacyRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 },
    privacyText: { fontSize: 12 },
  });

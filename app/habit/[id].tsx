/**
 * app/habit/[id].tsx
 *
 * Habit Detail — deep-link destination for both local and push notifications.
 * Shows streak, stats, reminder schedule, recent activity, milestones, and actions.
 */

import React, { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Svg, { Circle, G } from "react-native-svg";

import { useTheme } from "@/providers";
import { useHabitDetailViewModel } from "@/viewmodels/HabitDetailViewModel";
import { useHabitStore } from "@/store/habitStore";
import type { Theme } from "@/theme";

// ─── Circular stat ring ───────────────────────────────────────────────────────

interface StatRingProps {
  value: number;
  label: string;
  color: string;
  trackColor: string;
  size?: number;
}

function StatRing({ value, label, color, trackColor, size = 64 }: StatRingProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circumference - (pct / 100) * circumference;
  const cx = size / 2;

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ position: "relative", width: size, height: size }}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={`${cx}, ${cx}`}>
            <Circle cx={cx} cy={cx} r={radius} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
            <Circle
              cx={cx} cy={cx} r={radius}
              stroke={color} strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={[StyleSheet.absoluteFill, { justifyContent: "center", alignItems: "center" }]}>
          <Text style={{ fontSize: 13, fontWeight: "700", color }}>{value}%</Text>
        </View>
      </View>
      <Text style={{ fontSize: 11, color: trackColor, marginTop: 4, textAlign: "center" }}>{label}</Text>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function HabitDetailScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeHabit, deleteHabit } = useHabitStore();

  const state = useHabitDetailViewModel(id ?? "");
  const styles = createStyles(theme);

  const [notifBannerVisible, setNotifBannerVisible] = useState(false);
  const [completing, setCompleting] = useState(false);

  const handleComplete = useCallback(async () => {
    if (completing || state.completedToday) return;
    setCompleting(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeHabit(state.id);
    setCompleting(false);
  }, [completing, state.completedToday, state.id, completeHabit]);

  const handleEdit = useCallback(() => {
    router.push(`/create?id=${state.id}` as any);
  }, [router, state.id]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${state.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteHabit(state.id);
            router.back();
          },
        },
      ],
    );
  }, [state.id, state.name, deleteHabit, router]);

  // ── Not found ─────────────────────────────────────────────────────────────
  if (state.notFound) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: theme.semantic.background.page }]}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="search-outline" size={64} color={theme.semantic.text.disabled} />
          <Text style={[styles.notFoundTitle, { color: theme.semantic.text.primary }]}>
            Habit not found
          </Text>
          <Text style={[styles.notFoundSub, { color: theme.semantic.text.secondary }]}>
            This habit may have been deleted or doesn't exist.
          </Text>
          <TouchableOpacity
            style={[styles.goHomeBtn, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.replace("/(tabs)" as any)}
          >
            <Text style={styles.goHomeBtnText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.semantic.background.page }]}>
      {/* ── Header ── */}
      <View style={[styles.header, { borderBottomColor: theme.semantic.divider.default }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.semantic.background.surface }]}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={22} color={theme.semantic.text.primary} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.semantic.text.primary }]}>
          Habit Detail
        </Text>

        <TouchableOpacity
          style={[styles.menuBtn, { backgroundColor: theme.semantic.background.surface }]}
          onPress={handleEdit}
          accessibilityLabel="More options"
          accessibilityRole="button"
        >
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.semantic.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Notification banner ── */}
        {notifBannerVisible && (
          <View style={[styles.notifBanner, { backgroundColor: theme.semantic.background.surface }]}>
            <Ionicons name="notifications-outline" size={18} color={theme.semantic.text.secondary} />
            <Text style={[styles.notifBannerText, { color: theme.semantic.text.primary }]} numberOfLines={1}>
              Time to complete {state.name}.
            </Text>
            <TouchableOpacity onPress={() => setNotifBannerVisible(false)} hitSlop={8}>
              <Ionicons name="close" size={16} color={theme.semantic.text.secondary} />
            </TouchableOpacity>
          </View>
        )}

        {/* ── Hero card ── */}
        <LinearGradient
          colors={["#FF7A00", "#FF9A3C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          {/* Decorative blobs */}
          <View style={styles.heroBlob1} />
          <View style={styles.heroBlob2} />

          <View style={styles.heroTop}>
            {/* Emoji circle */}
            <View style={styles.heroEmojiCircle}>
              <Text style={{ fontSize: 36 }}>{state.emoji}</Text>
            </View>

            <View style={styles.heroInfo}>
              <Text style={styles.heroName} numberOfLines={2}>{state.name}</Text>
              <View style={styles.heroStreakRow}>
                <Text style={styles.heroStreakEmoji}>🔥</Text>
                <Text style={styles.heroStreakValue}>{state.currentStreak} Days</Text>
              </View>
              <Text style={styles.heroStreakLabel}>Current Streak</Text>
              <View style={styles.heroBestRow}>
                <Text style={styles.heroBestEmoji}>🏆</Text>
                <Text style={styles.heroBestText}>Best: {state.bestStreak} Days</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroDivider} />

          {/* Stats */}
          <View style={styles.heroStats}>
            <StatRing
              value={state.completionRate}
              label="Completion Rate"
              color="#FFFFFF"
              trackColor="rgba(255,255,255,0.35)"
              size={68}
            />
            <View style={styles.heroStatsDivider} />
            <StatRing
              value={state.consistencyScore}
              label="Consistency"
              color="#FFFFFF"
              trackColor="rgba(255,255,255,0.35)"
              size={68}
            />
          </View>
        </LinearGradient>

        {/* ── Complete Today ── */}
        <View style={[styles.card, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.completeHeader}>
            <View>
              <Text style={[styles.completeTitle, { color: theme.semantic.text.primary }]}>
                {state.completedToday ? "Completed Today! 🎉" : "Ready to complete?"}
              </Text>
              <Text style={[styles.completeSub, { color: theme.semantic.text.secondary }]}>
                {state.completedToday
                  ? "Great job! See you tomorrow."
                  : "Mark today's habit as done."}
              </Text>
            </View>
            {!state.completedToday && (
              <View style={[styles.completeSparkle, { backgroundColor: `${theme.colors.success}18` }]}>
                <Ionicons name="checkmark-circle" size={28} color={theme.colors.success} />
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.completeBtn,
              {
                backgroundColor: state.completedToday
                  ? theme.colors.success
                  : theme.colors.primary,
                opacity: completing ? 0.7 : 1,
              },
            ]}
            onPress={handleComplete}
            disabled={state.completedToday || completing}
            activeOpacity={0.85}
            accessibilityLabel={state.completedToday ? "Already completed" : "Mark habit as complete"}
            accessibilityRole="button"
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.completeBtnText}>
              {state.completedToday ? "Done for Today" : "Complete Today"}
            </Text>
          </TouchableOpacity>

          <View style={styles.syncRow}>
            <Ionicons name="lock-closed-outline" size={12} color={theme.colors.success} />
            <Text style={[styles.syncText, { color: theme.colors.success }]}>
              Your progress is synced and secure
            </Text>
          </View>
        </View>

        {/* ── Reminder Schedule ── */}
        <View style={[styles.card, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
              Reminder Schedule
            </Text>
          </View>

          {state.reminders.length === 0 ? (
            <Text style={[styles.emptyNote, { color: theme.semantic.text.secondary }]}>
              No reminders configured.
            </Text>
          ) : (
            state.reminders.map((r, i) => (
              <View
                key={i}
                style={[
                  styles.reminderRow,
                  i < state.reminders.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.semantic.divider.default,
                  },
                ]}
              >
                <Ionicons name="time-outline" size={16} color={theme.colors.primary} />
                <Text style={[styles.reminderTime, { color: theme.semantic.text.primary }]}>
                  {r.time}
                </Text>
                <View style={[styles.activeBadge, { backgroundColor: `${theme.colors.secondary}18` }]}>
                  <Text style={[styles.activeBadgeText, { color: theme.colors.secondary }]}>
                    Active
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={theme.semantic.text.secondary} />
              </View>
            ))
          )}

          {state.reminders.length > 0 && (
            <View style={styles.reminderFooter}>
              <Ionicons name="checkmark-circle-outline" size={14} color={theme.colors.success} />
              <Text style={[styles.reminderFooterText, { color: theme.colors.success }]}>
                {state.reminders.length} reminder{state.reminders.length !== 1 ? "s" : ""} active
              </Text>
              <TouchableOpacity onPress={handleEdit} style={{ marginLeft: "auto" }}>
                <Text style={[styles.manageText, { color: theme.colors.primary }]}>Manage</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── Recent Activity ── */}
        <View style={[styles.card, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeader}>
              <Ionicons name="bar-chart-outline" size={18} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
                Recent Activity
              </Text>
            </View>
            <Text style={[styles.sectionCaption, { color: theme.semantic.text.secondary }]}>
              Last 7 Days
            </Text>
          </View>

          <View style={styles.activityRow}>
            {state.recentActivity.map((day, i) => (
              <View key={i} style={styles.activityDay}>
                <View
                  style={[
                    styles.activityCircle,
                    {
                      backgroundColor: day.completed
                        ? theme.colors.success
                        : `${theme.semantic.text.disabled}20`,
                      borderColor: day.completed
                        ? theme.colors.success
                        : theme.semantic.text.disabled,
                    },
                  ]}
                >
                  <Ionicons
                    name={day.completed ? "checkmark" : "close"}
                    size={14}
                    color={day.completed ? "#fff" : theme.semantic.text.disabled}
                  />
                </View>
                <Text style={[styles.activityDayLabel, { color: theme.semantic.text.secondary }]}>
                  {day.label.slice(0, 3)}
                </Text>
                <Text style={[styles.activityDateLabel, { color: theme.semantic.text.disabled }]}>
                  {day.date.slice(5).replace("-", "/")}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.activityFooter}>
            <Text style={[styles.activityCount, { color: theme.colors.success }]}>
              {state.completedInWeek} / 7 completed
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewHistoryText, { color: theme.colors.primary }]}>
                View Full History →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Milestones ── */}
        <View style={[styles.card, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={{ fontSize: 16 }}>⭐</Text>
            <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
              Milestones
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.milestoneTrack}
          >
            {state.milestones.map((m, i) => (
              <View key={m.days} style={styles.milestoneItem}>
                <View
                  style={[
                    styles.milestoneCircle,
                    m.achieved
                      ? { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                      : m.isCurrent
                      ? { backgroundColor: "transparent", borderColor: theme.colors.primary, borderWidth: 2 }
                      : { backgroundColor: theme.semantic.background.surface, borderColor: theme.semantic.divider.default, borderWidth: 2 },
                  ]}
                >
                  {m.achieved ? (
                    <Ionicons name="flame" size={18} color="#fff" />
                  ) : m.isCurrent ? (
                    <Ionicons name="flame" size={18} color={theme.colors.primary} />
                  ) : (
                    <Ionicons name="lock-closed" size={16} color={theme.semantic.text.disabled} />
                  )}
                </View>
                <Text
                  style={[
                    styles.milestoneDays,
                    {
                      color: m.achieved || m.isCurrent
                        ? theme.semantic.text.primary
                        : theme.semantic.text.disabled,
                    },
                  ]}
                >
                  {m.days} Days
                </Text>
                <Text
                  style={[
                    styles.milestoneStatus,
                    {
                      color: m.achieved
                        ? theme.colors.success
                        : m.isCurrent
                        ? theme.colors.primary
                        : theme.semantic.text.disabled,
                    },
                  ]}
                >
                  {m.achieved ? "✓" : m.isCurrent ? "Current" : "Locked"}
                </Text>

                {/* Connector line */}
                {i < state.milestones.length - 1 && (
                  <View
                    style={[
                      styles.milestoneConnector,
                      { backgroundColor: m.achieved ? theme.colors.primary : theme.semantic.divider.default },
                    ]}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          {state.nextMilestoneGap > 0 && (
            <View style={[styles.nextMilestoneRow, { backgroundColor: `${theme.colors.primary}10` }]}>
              <Text style={{ fontSize: 14 }}>🚀</Text>
              <Text style={[styles.nextMilestoneText, { color: theme.semantic.text.primary }]}>
                {state.nextMilestoneGap} days until your next milestone ({state.nextMilestoneDays} Days)
              </Text>
            </View>
          )}
        </View>

        {/* ── More Actions ── */}
        <View style={[styles.card, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={18} color={theme.semantic.text.secondary} />
            <Text style={[styles.sectionTitle, { color: theme.semantic.text.primary }]}>
              More Actions
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.actionRow, { borderBottomColor: theme.semantic.divider.default }]}
            onPress={handleEdit}
            activeOpacity={0.7}
            accessibilityLabel="Edit habit"
            accessibilityRole="button"
          >
            <Ionicons name="pencil-outline" size={18} color={theme.semantic.text.primary} />
            <Text style={[styles.actionLabel, { color: theme.semantic.text.primary }]}>
              Edit Habit
            </Text>
            <Ionicons name="chevron-forward" size={16} color={theme.semantic.text.secondary} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleDelete}
            activeOpacity={0.7}
            accessibilityLabel="Delete habit"
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={18} color={theme.semantic.feedback.error} />
            <Text style={[styles.actionLabel, { color: theme.semantic.feedback.error }]}>
              Delete Habit
            </Text>
            <Ionicons name="chevron-forward" size={16} color={theme.semantic.feedback.error} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: { flex: 1 },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      gap: 12,
    },
    backBtn: {
      width: 40, height: 40, borderRadius: 20,
      justifyContent: "center", alignItems: "center",
    },
    headerTitle: { flex: 1, fontSize: 18, fontWeight: "700", textAlign: "center" },
    menuBtn: {
      width: 40, height: 40, borderRadius: 20,
      justifyContent: "center", alignItems: "center",
    },

    // Content
    content: { paddingHorizontal: 20, paddingTop: 16, gap: 16 },

    // Notification banner
    notifBanner: {
      flexDirection: "row", alignItems: "center", gap: 10,
      padding: 12, borderRadius: 12,
    },
    notifBannerText: { flex: 1, fontSize: 14 },

    // Hero card
    heroCard: {
      borderRadius: 24, padding: 20, overflow: "hidden",
      ...theme.shadows.md,
    },
    heroBlob1: {
      position: "absolute", width: 120, height: 120, borderRadius: 60,
      backgroundColor: "rgba(255,255,255,0.08)", top: -30, right: -20,
    },
    heroBlob2: {
      position: "absolute", width: 80, height: 80, borderRadius: 40,
      backgroundColor: "rgba(255,255,255,0.06)", bottom: 10, left: -10,
    },
    heroTop: { flexDirection: "row", alignItems: "flex-start", gap: 16 },
    heroEmojiCircle: {
      width: 72, height: 72, borderRadius: 36,
      backgroundColor: "rgba(255,255,255,0.25)",
      justifyContent: "center", alignItems: "center",
    },
    heroInfo: { flex: 1 },
    heroName: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 6 },
    heroStreakRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    heroStreakEmoji: { fontSize: 16 },
    heroStreakValue: { fontSize: 18, fontWeight: "700", color: "#fff" },
    heroStreakLabel: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 1 },
    heroBestRow: {
      flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8,
      backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, alignSelf: "flex-start",
    },
    heroBestEmoji: { fontSize: 13 },
    heroBestText: { fontSize: 12, color: "#fff", fontWeight: "600" },
    heroDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.2)", marginVertical: 16 },
    heroStats: { flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
    heroStatsDivider: { width: 1, height: 60, backgroundColor: "rgba(255,255,255,0.2)" },

    // Cards
    card: {
      borderRadius: 20, padding: 20,
      ...theme.shadows.sm,
    },

    // Complete
    completeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    completeTitle: { fontSize: 17, fontWeight: "700" },
    completeSub: { fontSize: 13, marginTop: 3 },
    completeSparkle: {
      width: 48, height: 48, borderRadius: 24,
      justifyContent: "center", alignItems: "center",
    },
    completeBtn: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      paddingVertical: 16, borderRadius: 16, gap: 8,
    },
    completeBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
    syncRow: { flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "center", marginTop: 10 },
    syncText: { fontSize: 12, fontWeight: "500" },

    // Section headers
    sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
    sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
    sectionTitle: { fontSize: 16, fontWeight: "700" },
    sectionCaption: { fontSize: 12 },
    emptyNote: { fontSize: 14, textAlign: "center", paddingVertical: 8 },

    // Reminders
    reminderRow: {
      flexDirection: "row", alignItems: "center", paddingVertical: 12, gap: 10,
    },
    reminderTime: { fontSize: 15, fontWeight: "600", flex: 1 },
    activeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    activeBadgeText: { fontSize: 11, fontWeight: "600" },
    reminderFooter: {
      flexDirection: "row", alignItems: "center", gap: 5, marginTop: 12,
      paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.semantic.divider.default,
    },
    reminderFooterText: { fontSize: 13, fontWeight: "600" },
    manageText: { fontSize: 13, fontWeight: "600" },

    // Recent activity
    activityRow: {
      flexDirection: "row", justifyContent: "space-between", paddingVertical: 8,
    },
    activityDay: { alignItems: "center", gap: 4 },
    activityCircle: {
      width: 34, height: 34, borderRadius: 17,
      justifyContent: "center", alignItems: "center", borderWidth: 1.5,
    },
    activityDayLabel: { fontSize: 11, fontWeight: "600" },
    activityDateLabel: { fontSize: 9 },
    activityFooter: {
      flexDirection: "row", justifyContent: "space-between", alignItems: "center",
      marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.semantic.divider.default,
    },
    activityCount: { fontSize: 13, fontWeight: "600" },
    viewHistoryText: { fontSize: 13, fontWeight: "600" },

    // Milestones
    milestoneTrack: { paddingVertical: 8, paddingHorizontal: 4, gap: 0 },
    milestoneItem: { alignItems: "center", position: "relative", marginRight: 0 },
    milestoneCircle: {
      width: 44, height: 44, borderRadius: 22,
      justifyContent: "center", alignItems: "center",
    },
    milestoneDays: { fontSize: 10, fontWeight: "700", marginTop: 6, textAlign: "center" },
    milestoneStatus: { fontSize: 9, marginTop: 2, textAlign: "center" },
    milestoneConnector: {
      position: "absolute", top: 22, left: 44, width: 32, height: 2,
    },
    nextMilestoneRow: {
      flexDirection: "row", alignItems: "center", gap: 8,
      marginTop: 12, padding: 12, borderRadius: 12,
    },
    nextMilestoneText: { fontSize: 13, flex: 1 },

    // Actions
    actionRow: {
      flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 12,
      borderBottomWidth: 1,
    },
    actionLabel: { fontSize: 15, fontWeight: "500" },

    // Not found
    notFoundContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
    notFoundTitle: { fontSize: 20, fontWeight: "700", marginTop: 16, marginBottom: 8 },
    notFoundSub: { fontSize: 14, textAlign: "center", marginBottom: 24 },
    goHomeBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 16 },
    goHomeBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });

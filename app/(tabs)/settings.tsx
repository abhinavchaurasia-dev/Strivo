/**
 * app/(tabs)/settings.tsx
 *
 * Settings screen — full implementation.
 * Consumes useSettingsViewModel() which reads from the settingsStore (Zustand).
 */

import React, { useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsViewModel } from "@/viewmodels/useSettingsViewModel";
import { theme } from "@/constants/theme";

// ─── Local types ─────────────────────────────────────────────────────────────
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

// ─── Primitive building blocks ────────────────────────────────────────────────

/** Rounded icon bubble used beside every section header row. */
const IconBubble = ({
  name,
  bg,
  color = "#FFFFFF",
}: {
  name: IoniconName;
  bg: string;
  color?: string;
}) => (
  <View style={[styles.iconBubble, { backgroundColor: bg }]}>
    <Ionicons name={name} size={20} color={color} />
  </View>
);

/** Pill badge (Enabled / Up to date / …). */
const Pill = ({
  label,
  color = theme.colors.success,
}: {
  label: string;
  color?: string;
}) => (
  <View style={[styles.pill, { backgroundColor: `${color}1A` }]}>
    <Text style={[styles.pillText, { color }]}>{label}</Text>
  </View>
);

const Chevron = () => (
  <Ionicons
    name="chevron-forward"
    size={16}
    color={theme.colors.textSecondary}
  />
);

const HR = () => <View style={styles.hr} />;

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const vm = useSettingsViewModel();

  // ── Alert helpers ──────────────────────────────────────────────────────────
  const confirmClearCache = useCallback(() => {
    Alert.alert(
      "Clear Cache",
      `This will free ${vm.cacheSize ?? "0 MB"}. Your habits and history won't be affected.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => vm.clearCache?.(),
        },
      ],
    );
  }, [vm]);

  const confirmResetOnboarding = useCallback(() => {
    Alert.alert(
      "Reset Onboarding",
      "You'll see the welcome screens again the next time you open the app.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", onPress: () => vm.resetOnboarding?.() },
      ],
    );
  }, [vm]);

  const confirmExport = useCallback(() => {
    Alert.alert(
      "Export Data",
      "A file with all your habits and history will be created.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export", onPress: () => vm.exportData?.() },
      ],
    );
  }, [vm]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text
            style={styles.pageTitle}
            accessibilityRole="header"
            accessibilityLabel="Settings"
          >
            Settings
          </Text>
          <View
            style={styles.avatar}
            accessible
            accessibilityLabel="Profile avatar"
            accessibilityRole="image"
          >
            <Ionicons name="person" size={22} color={theme.colors.primary} />
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            Notifications
        ════════════════════════════════════════════════════════════════════ */}
        <View style={styles.card}>
          {/* Row header */}
          <View style={styles.cardHeaderRow}>
            <IconBubble
              name="notifications"
              bg={theme.colors.primaryLight}
              color={theme.colors.primary}
            />
            <Text style={styles.cardTitle}>Notifications</Text>
            <View style={{ flex: 1 }} />
            <Pill
              label={vm.notificationsEnabled ? "Enabled" : "Disabled"}
              color={
                vm.notificationsEnabled
                  ? theme.colors.success
                  : theme.colors.textSecondary
              }
            />
            <Chevron />
          </View>

          <Text style={styles.cardDesc}>
            Manage all notification preferences and reminder settings.
          </Text>

          <HR />

          {/* Sub-bar: Reminders · Push · Quiet Hours */}
          <View style={styles.notifSubBar}>
            <View style={styles.notifChip}>
              <Ionicons
                name="alarm-outline"
                size={13}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.notifChipLabel}>Reminders</Text>
              <Text style={styles.notifChipVal}>
                {vm.remindersEnabled ? "On" : "Off"}
              </Text>
            </View>

            <View style={styles.notifDivider} />

            <View style={styles.notifChip}>
              <Ionicons
                name="phone-portrait-outline"
                size={13}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.notifChipLabel}>Push</Text>
              <Text style={styles.notifChipVal}>
                {vm.pushEnabled ? "On" : "Off"}
              </Text>
            </View>

            <View style={styles.notifDivider} />

            <View style={[styles.notifChip, { flex: 1.6 }]}>
              <Ionicons
                name="moon-outline"
                size={13}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.notifChipLabel}>Quiet Hours</Text>
              <Text
                style={[styles.notifChipVal, { flex: 1 }]}
                numberOfLines={1}
              >
                {vm.quietHoursEnabled
                  ? `${vm.quietHoursFrom} – ${vm.quietHoursTo}`
                  : "Off"}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={12}
                color={theme.colors.textSecondary}
              />
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            Permission Status
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble
              name="shield-checkmark"
              bg="#DCFCE7"
              color={theme.colors.success}
            />
            <Text style={styles.cardTitle}>Permission Status</Text>
            <View style={{ flex: 1 }} />
            <Ionicons
              name={vm.permissionGranted ? "checkmark-circle" : "alert-circle"}
              size={20}
              color={
                vm.permissionGranted ? theme.colors.success : theme.colors.error
              }
            />
            <Chevron />
          </View>

          <Text style={styles.cardDesc}>
            {vm.permissionGranted
              ? "Notifications are allowed. You can receive reminders."
              : "Notification permissions are blocked. Open Settings to fix this."}
          </Text>

          <HR />

          <View style={styles.permRow}>
            <View style={styles.permStatus}>
              <Ionicons
                name={
                  vm.permissionGranted ? "checkmark-circle" : "close-circle"
                }
                size={14}
                color={
                  vm.permissionGranted
                    ? theme.colors.success
                    : theme.colors.error
                }
              />
              <Text
                style={[
                  styles.permStatusLabel,
                  {
                    color: vm.permissionGranted
                      ? theme.colors.success
                      : theme.colors.error,
                  },
                ]}
              >
                {vm.permissionGranted
                  ? "All permissions granted"
                  : "Permissions denied"}
              </Text>
            </View>
            <View style={styles.permMeta}>
              <Text style={styles.permMetaText}>
                Last checked: {vm.permissionLastChecked ?? "Never"}
              </Text>
              <TouchableOpacity
                onPress={() => vm.checkPermissions?.()}
                accessibilityLabel="Check notification permissions again"
                accessibilityRole="button"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.orangeLink}>Check Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            Quiet Hours
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="moon" bg="#EDE9FE" color="#7C3AED" />
            <Text style={styles.cardTitle}>Quiet Hours</Text>
            <View style={{ flex: 1 }} />
            <Switch
              value={vm.quietHoursEnabled ?? false}
              onValueChange={() => vm.toggleQuietHours?.()}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.colors.border}
              accessibilityLabel="Toggle quiet hours"
              accessibilityRole="switch"
            />
          </View>

          <Text style={styles.cardDesc}>
            Silence reminders during focus time to avoid distractions.
          </Text>

          {vm.quietHoursEnabled && (
            <>
              <HR />
              <View style={styles.quietRow}>
                {[
                  { label: "From", value: vm.quietHoursFrom ?? "--:--" },
                  { label: "To", value: vm.quietHoursTo ?? "--:--" },
                  { label: "Days", value: vm.quietHoursDays ?? "Every Day" },
                ].map((item) => (
                  <View key={item.label} style={styles.quietCell}>
                    <Text style={styles.quietLabel}>{item.label}</Text>
                    <Text style={styles.quietValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            Push Notifications
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="paper-plane" bg="#DBEAFE" color="#3882F6" />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Push Notifications</Text>
              <Text style={styles.cardSubtitle}>
                Manage push token and synchronization status.
              </Text>
            </View>
            <Chevron />
          </View>

          <HR />

          <View style={styles.pushRow}>
            <Ionicons
              name={
                vm.pushTokenActive
                  ? "checkmark-circle-outline"
                  : "alert-circle-outline"
              }
              size={14}
              color={
                vm.pushTokenActive ? theme.colors.primary : theme.colors.warning
              }
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.pushStatusText,
                  {
                    color: vm.pushTokenActive
                      ? theme.colors.primary
                      : theme.colors.warning,
                  },
                ]}
              >
                {vm.pushTokenActive
                  ? "Push token is active"
                  : "Push token inactive"}
              </Text>
              <Text style={styles.pushMeta}>
                Last synced: {vm.lastSynced ?? "Never"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => vm.syncNow?.()}
              activeOpacity={0.8}
              accessibilityLabel="Sync push notifications"
              accessibilityRole="button"
            >
              <Text style={styles.outlineBtnText}>Sync Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            Test Notifications
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="flask" bg="#DBEAFE" color="#3882F6" />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Test Notifications</Text>
              <Text style={styles.cardSubtitle}>
                Send test notifications to verify your settings.
              </Text>
            </View>
            <Chevron />
          </View>

          <HR />

          <TouchableOpacity
            style={styles.textRow}
            onPress={() => vm.sendTestNotification?.()}
            activeOpacity={0.7}
            accessibilityLabel="Send a test notification"
            accessibilityRole="button"
          >
            <Ionicons name="flask-outline" size={16} color="#3882F6" />
            <Text style={[styles.textRowLabel, { color: "#3882F6" }]}>
              Send Test Notification
            </Text>
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            App Preferences
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble
              name="settings"
              bg={theme.colors.border}
              color={theme.colors.textSecondary}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>App Preferences</Text>
              <Text style={styles.cardSubtitle}>
                Customize your app experience and behavior.
              </Text>
            </View>
            <Chevron />
          </View>

          <HR />

          {/* Theme */}
          <View style={styles.prefRow}>
            <Ionicons
              name="moon-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <Text style={styles.prefLabel}>Theme</Text>
            <Text style={styles.prefValue}>
              {vm.theme === "system" ? "System" : (vm.theme ?? "System")}
            </Text>
            <Chevron />
          </View>

          <HR />

          {/* Language */}
          <View style={styles.prefRow}>
            <Ionicons
              name="globe-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <Text style={styles.prefLabel}>Language</Text>
            <Text style={styles.prefValue}>{vm.language ?? "English"}</Text>
            <Chevron />
          </View>

          <HR />

          {/* Haptic Feedback */}
          <View style={styles.prefRow}>
            <Ionicons
              name="phone-portrait-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <Text style={[styles.prefLabel, { flex: 1 }]}>Haptic Feedback</Text>
            <Switch
              value={vm.hapticFeedback ?? true}
              onValueChange={() => vm.toggleHapticFeedback?.()}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.colors.border}
              accessibilityLabel="Toggle haptic feedback"
              accessibilityRole="switch"
            />
          </View>

          <HR />

          {/* Badge Count */}
          <View style={styles.prefRow}>
            <Ionicons
              name="notifications-circle-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <Text style={[styles.prefLabel, { flex: 1 }]}>Badge Count</Text>
            <Switch
              value={vm.badgeCount ?? true}
              onValueChange={() => vm.toggleBadgeCount?.()}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.colors.border}
              accessibilityLabel="Toggle badge count on app icon"
              accessibilityRole="switch"
            />
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            Data & Storage
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble
              name="server"
              bg="#DCFCE7"
              color={theme.colors.success}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Data &amp; Storage</Text>
              <Text style={styles.cardSubtitle}>
                Manage your data and storage.
              </Text>
            </View>
            <Chevron />
          </View>

          <HR />

          <TouchableOpacity
            style={styles.prefRow}
            onPress={confirmExport}
            activeOpacity={0.7}
            accessibilityLabel="Export your data"
            accessibilityRole="button"
          >
            <Ionicons
              name="download-outline"
              size={16}
              color={theme.colors.textPrimary}
            />
            <Text style={[styles.prefLabel, { flex: 1 }]}>Export Data</Text>
            <Chevron />
          </TouchableOpacity>

          <HR />

          <TouchableOpacity
            style={styles.prefRow}
            onPress={confirmClearCache}
            activeOpacity={0.7}
            accessibilityLabel="Clear cache"
            accessibilityRole="button"
          >
            <Ionicons
              name="trash-outline"
              size={16}
              color={theme.colors.error}
            />
            <Text
              style={[styles.prefLabel, { flex: 1, color: theme.colors.error }]}
            >
              Clear Cache
            </Text>
            <Text style={styles.prefValue}>{vm.cacheSize ?? "0 MB"}</Text>
            <Chevron />
          </TouchableOpacity>

          <HR />

          <TouchableOpacity
            style={styles.prefRow}
            onPress={confirmResetOnboarding}
            activeOpacity={0.7}
            accessibilityLabel="Reset onboarding"
            accessibilityRole="button"
          >
            <Ionicons
              name="refresh-outline"
              size={16}
              color={theme.colors.textPrimary}
            />
            <Text style={[styles.prefLabel, { flex: 1 }]}>
              Reset Onboarding
            </Text>
            <Chevron />
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════════════════════════════════════════
            About
        ════════════════════════════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble
              name="information-circle"
              bg="#F3F4F6"
              color={theme.colors.textSecondary}
            />
            <Text style={styles.cardTitle}>About</Text>
            <View style={{ flex: 1 }} />
            <Pill label="Up to date" color={theme.colors.success} />
            <Chevron />
          </View>

          <Text style={styles.cardDesc}>
            App information and policy details.
          </Text>

          <HR />

          <Text style={styles.versionText}>
            Version {vm.version ?? "1.0.0"} • Build {vm.build ?? "1"}
          </Text>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8F9FB" },
  scroll: { paddingHorizontal: 16, paddingTop: 16 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF1E5",
    alignItems: "center",
    justifyContent: "center",
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  mt12: { marginTop: 12 },

  // Card header row
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#111827" },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    lineHeight: 18,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    paddingHorizontal: 16,
    paddingBottom: 12,
    lineHeight: 18,
  },

  // Primitives
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  pillText: { fontSize: 12, fontWeight: "600" },
  hr: { height: 1, backgroundColor: "#E5E7EB", marginHorizontal: 16 },

  // Notifications sub-bar
  notifSubBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  notifChip: { flex: 1, flexDirection: "row", alignItems: "center", gap: 4 },
  notifChipLabel: { fontSize: 12, color: "#6B7280" },
  notifChipVal: { fontSize: 12, fontWeight: "500", color: "#111827" },
  notifDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },

  // Permission
  permRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 6 },
  permStatus: { flexDirection: "row", alignItems: "center", gap: 6 },
  permStatusLabel: { fontSize: 13, fontWeight: "500" },
  permMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  permMetaText: { fontSize: 12, color: "#6B7280" },
  orangeLink: { fontSize: 13, fontWeight: "600", color: "#FF7A00" },

  // Quiet hours
  quietRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  quietCell: { flex: 1 },
  quietLabel: { fontSize: 12, color: "#6B7280", marginBottom: 2 },
  quietValue: { fontSize: 14, fontWeight: "600", color: "#3882F6" },

  // Push row
  pushRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  pushStatusText: { fontSize: 13, fontWeight: "500" },
  pushMeta: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  outlineBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#FF7A00",
  },
  outlineBtnText: { fontSize: 13, fontWeight: "600", color: "#FF7A00" },

  // Text action row (Test Notifications)
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  textRowLabel: { fontSize: 14, fontWeight: "500" },

  // Preferences rows
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  prefLabel: { fontSize: 14, color: "#111827" },
  prefValue: { fontSize: 14, color: "#6B7280", marginRight: 4 },

  // Version
  versionText: {
    fontSize: 13,
    color: "#6B7280",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

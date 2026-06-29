/**
 * app/(tabs)/settings.tsx
 *
 * Settings screen — full implementation.
 * Consumes useSettingsViewModel() from SettingsViewModel.
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

import { useSettingsViewModel } from "@/viewmodels/SettingsViewModel";
import { useTheme } from "@/providers";
import type { Theme } from "@/theme";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatHour24To12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:${String(m).padStart(2, "0")} ${suffix}`;
}

// ─── Local types ─────────────────────────────────────────────────────────────
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

// ─── Primitive components ─────────────────────────────────────────────────────

const IconBubble = ({
  name,
  bg,
  color = "#FFFFFF",
}: {
  name: IoniconName;
  bg: string;
  color?: string;
}) => (
  <View style={[localStyles.iconBubble, { backgroundColor: bg }]}>
    <Ionicons name={name} size={20} color={color} />
  </View>
);

const Pill = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => (
  <View style={[localStyles.pill, { backgroundColor: `${color}1A` }]}>
    <Text style={[localStyles.pillText, { color }]}>{label}</Text>
  </View>
);

const Chevron = ({ color }: { color: string }) => (
  <Ionicons name="chevron-forward" size={16} color={color} />
);

const HR = ({ color }: { color: string }) => (
  <View style={[localStyles.hr, { backgroundColor: color }]} />
);

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const theme = useTheme();
  const vm = useSettingsViewModel();
  const styles = createStyles(theme);

  const quiet = vm.settings.quietHours;
  const quietHoursDays = quiet.days.length === 0 ? "Every Day" : `${quiet.days.length} days`;

  // ── Alert helpers ──────────────────────────────────────────────────────────
  const confirmClearCache = useCallback(() => {
    Alert.alert(
      "Clear Cache",
      `This will free ${vm.cacheSize}. Your habits and history won't be affected.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: () => vm.clearCache() },
      ],
    );
  }, [vm]);

  const confirmResetOnboarding = useCallback(() => {
    Alert.alert(
      "Reset Onboarding",
      "You'll see the welcome screens again the next time you open the app.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", onPress: () => vm.resetOnboarding() },
      ],
    );
  }, [vm]);

  const confirmExport = useCallback(() => {
    Alert.alert(
      "Export Data",
      "A file with all your habits and history will be created.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export", onPress: () => vm.exportData() },
      ],
    );
  }, [vm]);

  const handleSendTest = useCallback(() => {
    vm.sendTestNotification();
  }, [vm]);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.semantic.background.page }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text
            style={[styles.pageTitle, { color: theme.semantic.text.primary }]}
            accessibilityRole="header"
          >
            Settings
          </Text>
          <View style={[styles.avatar, { backgroundColor: `${theme.colors.primary}1A` }]}>
            <Ionicons name="person" size={22} color={theme.colors.primary} />
          </View>
        </View>

        {/* ════════════════════════════════════════════
            Notifications
        ════════════════════════════════════════════ */}
        <View style={[styles.card, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble
              name="notifications"
              bg={`${theme.colors.primary}1A`}
              color={theme.colors.primary}
            />
            <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
              Notifications
            </Text>
            <View style={{ flex: 1 }} />
            <Pill
              label={vm.notificationStatus.enabled ? "Enabled" : "Disabled"}
              color={vm.notificationStatus.enabled ? theme.colors.success : theme.semantic.text.secondary}
            />
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <Text style={[styles.cardDesc, { color: theme.semantic.text.secondary }]}>
            Manage all notification preferences and reminder settings.
          </Text>

          <HR color={theme.semantic.divider.default} />

          {/* Sub-bar */}
          <View style={styles.notifSubBar}>
            <View style={styles.notifChip}>
              <Ionicons name="alarm-outline" size={13} color={theme.semantic.text.secondary} />
              <Text style={[styles.notifChipLabel, { color: theme.semantic.text.secondary }]}>
                Reminders
              </Text>
              <Text style={[styles.notifChipVal, { color: theme.semantic.text.primary }]}>
                {vm.notificationStatus.remindersOn ? "On" : "Off"}
              </Text>
            </View>

            <View style={[styles.notifDivider, { backgroundColor: theme.semantic.divider.default }]} />

            <View style={styles.notifChip}>
              <Ionicons name="phone-portrait-outline" size={13} color={theme.semantic.text.secondary} />
              <Text style={[styles.notifChipLabel, { color: theme.semantic.text.secondary }]}>Push</Text>
              <Text style={[styles.notifChipVal, { color: theme.semantic.text.primary }]}>
                {vm.notificationStatus.pushOn ? "On" : "Off"}
              </Text>
            </View>

            <View style={[styles.notifDivider, { backgroundColor: theme.semantic.divider.default }]} />

            <View style={[styles.notifChip, { flex: 1.6 }]}>
              <Ionicons name="moon-outline" size={13} color={theme.semantic.text.secondary} />
              <Text style={[styles.notifChipLabel, { color: theme.semantic.text.secondary }]}>
                Quiet Hours
              </Text>
              <Text
                style={[styles.notifChipVal, { color: theme.semantic.text.primary, flex: 1 }]}
                numberOfLines={1}
              >
                {vm.notificationStatus.quietHoursLabel}
              </Text>
              <Ionicons name="chevron-forward" size={12} color={theme.semantic.text.secondary} />
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════
            Permission Status
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="shield-checkmark" bg="#DCFCE7" color={theme.colors.success} />
            <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
              Permission Status
            </Text>
            <View style={{ flex: 1 }} />
            <Ionicons
              name={vm.permissionStatus.granted ? "checkmark-circle" : "alert-circle"}
              size={20}
              color={vm.permissionStatus.granted ? theme.colors.success : theme.semantic.feedback.error}
            />
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <Text style={[styles.cardDesc, { color: theme.semantic.text.secondary }]}>
            {vm.permissionStatus.granted
              ? "Notifications are allowed. You can receive reminders."
              : "Notification permissions are blocked. Open Settings to fix this."}
          </Text>

          <HR color={theme.semantic.divider.default} />

          <View style={styles.permRow}>
            <View style={styles.permStatus}>
              <Ionicons
                name={vm.permissionStatus.granted ? "checkmark-circle" : "close-circle"}
                size={14}
                color={vm.permissionStatus.granted ? theme.colors.success : theme.semantic.feedback.error}
              />
              <Text
                style={[
                  styles.permStatusLabel,
                  {
                    color: vm.permissionStatus.granted
                      ? theme.colors.success
                      : theme.semantic.feedback.error,
                  },
                ]}
              >
                {vm.permissionStatus.granted ? "All permissions granted" : "Permissions denied"}
              </Text>
            </View>
            <View style={styles.permMeta}>
              <Text style={[styles.permMetaText, { color: theme.semantic.text.secondary }]}>
                Last checked: {vm.permissionStatus.lastCheckedLabel}
              </Text>
              <TouchableOpacity
                onPress={() => vm.checkPermission()}
                accessibilityLabel="Check notification permissions again"
                accessibilityRole="button"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={[styles.primaryLink, { color: theme.colors.primary }]}>
                  Check Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════
            Quiet Hours
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="moon" bg="#EDE9FE" color="#7C3AED" />
            <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
              Quiet Hours
            </Text>
            <View style={{ flex: 1 }} />
            <Switch
              value={quiet.enabled}
              onValueChange={() => vm.toggleQuietHours()}
              trackColor={{ false: theme.semantic.divider.default, true: theme.colors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.semantic.divider.default}
              accessibilityLabel="Toggle quiet hours"
              accessibilityRole="switch"
            />
          </View>

          <Text style={[styles.cardDesc, { color: theme.semantic.text.secondary }]}>
            Silence reminders during focus time to avoid distractions.
          </Text>

          {quiet.enabled && (
            <>
              <HR color={theme.semantic.divider.default} />
              <View style={styles.quietRow}>
                {[
                  { label: "From", value: formatHour24To12(quiet.from) },
                  { label: "To", value: formatHour24To12(quiet.to) },
                  { label: "Days", value: quietHoursDays },
                ].map((item) => (
                  <View key={item.label} style={styles.quietCell}>
                    <Text style={[styles.quietLabel, { color: theme.semantic.text.secondary }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.quietValue, { color: theme.colors.secondary }]}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* ════════════════════════════════════════════
            Push Notifications
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="paper-plane" bg="#DBEAFE" color={theme.colors.secondary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
                Push Notifications
              </Text>
              <Text style={[styles.cardSubtitle, { color: theme.semantic.text.secondary }]}>
                Manage push token and synchronization status.
              </Text>
            </View>
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <HR color={theme.semantic.divider.default} />

          <View style={styles.pushRow}>
            <Ionicons
              name={vm.pushTokenStatus.active ? "checkmark-circle-outline" : "alert-circle-outline"}
              size={14}
              color={vm.pushTokenStatus.active ? theme.colors.primary : theme.semantic.feedback.warning}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.pushStatusText,
                  { color: vm.pushTokenStatus.active ? theme.colors.primary : theme.semantic.feedback.warning },
                ]}
              >
                {vm.pushTokenStatus.active ? "Push token is active" : "Push token inactive"}
              </Text>
              <Text style={[styles.pushMeta, { color: theme.semantic.text.secondary }]}>
                Last synced: {vm.pushTokenStatus.lastSyncedLabel ?? "Never"}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.outlineBtn, { borderColor: theme.colors.primary }]}
              onPress={() => vm.registerPush()}
              activeOpacity={0.8}
              accessibilityLabel="Sync push notifications"
              accessibilityRole="button"
            >
              <Text style={[styles.outlineBtnText, { color: theme.colors.primary }]}>Sync Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ════════════════════════════════════════════
            Test Notifications
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="flask" bg="#DBEAFE" color={theme.colors.secondary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
                Test Notifications
              </Text>
              <Text style={[styles.cardSubtitle, { color: theme.semantic.text.secondary }]}>
                Send test notifications to verify your settings.
              </Text>
            </View>
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <HR color={theme.semantic.divider.default} />

          <TouchableOpacity
            style={styles.textRow}
            onPress={handleSendTest}
            activeOpacity={0.7}
            accessibilityLabel="Send a test notification"
            accessibilityRole="button"
          >
            <Ionicons name="flask-outline" size={16} color={theme.colors.secondary} />
            <Text style={[styles.textRowLabel, { color: theme.colors.secondary }]}>
              Send Test Notification
            </Text>
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════════════════
            App Preferences
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="settings" bg={theme.semantic.background.surface} color={theme.semantic.text.secondary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
                App Preferences
              </Text>
              <Text style={[styles.cardSubtitle, { color: theme.semantic.text.secondary }]}>
                Customize your app experience and behavior.
              </Text>
            </View>
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <HR color={theme.semantic.divider.default} />

          <View style={styles.prefRow}>
            <Ionicons name="moon-outline" size={16} color={theme.semantic.text.secondary} />
            <Text style={[styles.prefLabel, { color: theme.semantic.text.primary }]}>Theme</Text>
            <Text style={[styles.prefValue, { color: theme.semantic.text.secondary }]}>
              {vm.settings.theme === "system" ? "System" : vm.settings.theme}
            </Text>
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <HR color={theme.semantic.divider.default} />

          <View style={styles.prefRow}>
            <Ionicons name="globe-outline" size={16} color={theme.semantic.text.secondary} />
            <Text style={[styles.prefLabel, { color: theme.semantic.text.primary }]}>Language</Text>
            <Text style={[styles.prefValue, { color: theme.semantic.text.secondary }]}>
              {vm.settings.language === "en" ? "English" : vm.settings.language}
            </Text>
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <HR color={theme.semantic.divider.default} />

          <View style={styles.prefRow}>
            <Ionicons name="phone-portrait-outline" size={16} color={theme.semantic.text.secondary} />
            <Text style={[styles.prefLabel, { color: theme.semantic.text.primary, flex: 1 }]}>
              Haptic Feedback
            </Text>
            <Switch
              value={vm.settings.hapticFeedback}
              onValueChange={() => vm.toggleHapticFeedback()}
              trackColor={{ false: theme.semantic.divider.default, true: theme.colors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.semantic.divider.default}
              accessibilityLabel="Toggle haptic feedback"
              accessibilityRole="switch"
            />
          </View>

          <HR color={theme.semantic.divider.default} />

          <View style={styles.prefRow}>
            <Ionicons name="notifications-circle-outline" size={16} color={theme.semantic.text.secondary} />
            <Text style={[styles.prefLabel, { color: theme.semantic.text.primary, flex: 1 }]}>
              Badge Count
            </Text>
            <Switch
              value={vm.settings.badgeCount}
              onValueChange={() => vm.toggleBadgeCount()}
              trackColor={{ false: theme.semantic.divider.default, true: theme.colors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={theme.semantic.divider.default}
              accessibilityLabel="Toggle badge count on app icon"
              accessibilityRole="switch"
            />
          </View>
        </View>

        {/* ════════════════════════════════════════════
            Data & Storage
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="server" bg="#DCFCE7" color={theme.colors.success} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
                Data &amp; Storage
              </Text>
              <Text style={[styles.cardSubtitle, { color: theme.semantic.text.secondary }]}>
                Manage your data and storage.
              </Text>
            </View>
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <HR color={theme.semantic.divider.default} />

          <TouchableOpacity
            style={styles.prefRow}
            onPress={confirmExport}
            activeOpacity={0.7}
            accessibilityLabel="Export your data"
            accessibilityRole="button"
          >
            <Ionicons name="download-outline" size={16} color={theme.semantic.text.primary} />
            <Text style={[styles.prefLabel, { color: theme.semantic.text.primary, flex: 1 }]}>
              Export Data
            </Text>
            <Chevron color={theme.semantic.text.secondary} />
          </TouchableOpacity>

          <HR color={theme.semantic.divider.default} />

          <TouchableOpacity
            style={styles.prefRow}
            onPress={confirmClearCache}
            activeOpacity={0.7}
            accessibilityLabel="Clear cache"
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={16} color={theme.semantic.feedback.error} />
            <Text style={[styles.prefLabel, { color: theme.semantic.feedback.error, flex: 1 }]}>
              Clear Cache
            </Text>
            <Text style={[styles.prefValue, { color: theme.semantic.text.secondary }]}>
              {vm.cacheSize}
            </Text>
            <Chevron color={theme.semantic.text.secondary} />
          </TouchableOpacity>

          <HR color={theme.semantic.divider.default} />

          <TouchableOpacity
            style={styles.prefRow}
            onPress={confirmResetOnboarding}
            activeOpacity={0.7}
            accessibilityLabel="Reset onboarding"
            accessibilityRole="button"
          >
            <Ionicons name="refresh-outline" size={16} color={theme.semantic.text.primary} />
            <Text style={[styles.prefLabel, { color: theme.semantic.text.primary, flex: 1 }]}>
              Reset Onboarding
            </Text>
            <Chevron color={theme.semantic.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════════════════
            About
        ════════════════════════════════════════════ */}
        <View style={[styles.card, styles.mt12, { backgroundColor: theme.semantic.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <IconBubble name="information-circle" bg={theme.semantic.background.surface} color={theme.semantic.text.secondary} />
            <Text style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>About</Text>
            <View style={{ flex: 1 }} />
            <Pill label="Up to date" color={theme.colors.success} />
            <Chevron color={theme.semantic.text.secondary} />
          </View>

          <Text style={[styles.cardDesc, { color: theme.semantic.text.secondary }]}>
            App information and policy details.
          </Text>

          <HR color={theme.semantic.divider.default} />

          <Text style={[styles.versionText, { color: theme.semantic.text.secondary }]}>
            Version {vm.appVersion} • Build {vm.buildNumber}
          </Text>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Static styles (layout-only) ─────────────────────────────────────────────
const localStyles = StyleSheet.create({
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  pillText: { fontSize: 12, fontWeight: "600" },
  hr: { height: 1, marginHorizontal: 16 },
});

// ─── Theme-dependent styles ───────────────────────────────────────────────────
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: { flex: 1 },
    scroll: { paddingHorizontal: 16, paddingTop: 16 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: "700",
      letterSpacing: -0.5,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      borderRadius: 16,
      overflow: "hidden",
      ...theme.shadows.sm,
    },
    mt12: { marginTop: 12 },
    cardHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
    },
    cardTitle: { fontSize: 15, fontWeight: "600" },
    cardSubtitle: { fontSize: 13, marginTop: 2, lineHeight: 18 },
    cardDesc: { fontSize: 13, paddingHorizontal: 16, paddingBottom: 12, lineHeight: 18 },
    notifSubBar: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
    },
    notifChip: { flex: 1, flexDirection: "row", alignItems: "center", gap: 4 },
    notifChipLabel: { fontSize: 12 },
    notifChipVal: { fontSize: 12, fontWeight: "500" },
    notifDivider: { width: 1, height: 16, marginHorizontal: 8 },
    permRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 6 },
    permStatus: { flexDirection: "row", alignItems: "center", gap: 6 },
    permStatusLabel: { fontSize: 13, fontWeight: "500" },
    permMeta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    permMetaText: { fontSize: 12 },
    primaryLink: { fontSize: 13, fontWeight: "600" },
    quietRow: { flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12 },
    quietCell: { flex: 1 },
    quietLabel: { fontSize: 12, marginBottom: 2 },
    quietValue: { fontSize: 14, fontWeight: "600" },
    pushRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 8,
    },
    pushStatusText: { fontSize: 13, fontWeight: "500" },
    pushMeta: { fontSize: 12, marginTop: 2 },
    outlineBtn: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 8,
      borderWidth: 1.5,
    },
    outlineBtnText: { fontSize: 13, fontWeight: "600" },
    textRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 10,
    },
    textRowLabel: { fontSize: 14, fontWeight: "500" },
    prefRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    },
    prefLabel: { fontSize: 14 },
    prefValue: { fontSize: 14, marginRight: 4 },
    versionText: { fontSize: 13, paddingHorizontal: 16, paddingVertical: 12 },
  });


/**
 * app/activity/index.tsx
 *
 * Activity Center — chronological timeline of all app events.
 * Grouped by Today / Yesterday / Earlier (collapsible).
 * Opened via the bell icon on the Today screen.
 */

import React, { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

import { useTheme } from "@/providers";
import { useActivityCenterViewModel } from "@/viewmodels/ActivityCenterViewModel";
import type { ActivityItem, ActivityGroup, ActivityType } from "@/types/activity";
import type { Theme } from "@/theme";

// ─── Activity type config ─────────────────────────────────────────────────────

interface ActivityConfig {
  color: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
}

function getActivityConfig(type: ActivityType, theme: Theme): ActivityConfig {
  switch (type) {
    case "reminder_sent":
      return {
        color: theme.colors.secondary,
        icon: "notifications-outline",
        label: "Reminder Sent",
      };
    case "push_received":
      return {
        color: "#7C3AED",
        icon: "phone-portrait-outline",
        label: "Push Notification Received",
      };
    case "habit_completed":
      return {
        color: theme.colors.success,
        icon: "checkmark-circle",
        label: "Habit Completed",
      };
    case "milestone_unlocked":
      return {
        color: theme.colors.primary,
        icon: "trophy",
        label: "Milestone Unlocked",
      };
  }
}

// ─── Activity item component ──────────────────────────────────────────────────

interface TimelineItemProps {
  item: ActivityItem;
  isLast: boolean;
  theme: Theme;
}

const TimelineItem = React.memo(function TimelineItem({
  item,
  isLast,
  theme,
}: TimelineItemProps) {
  const config = getActivityConfig(item.type, theme);
  const timeLabel = format(item.timestamp, "h:mm a");

  return (
    <View style={timelineStyles.wrapper}>
      {/* Left rail */}
      <View style={timelineStyles.rail}>
        <View style={[timelineStyles.dot, { backgroundColor: config.color }]} />
        {!isLast && (
          <View
            style={[
              timelineStyles.line,
              { backgroundColor: theme.semantic.divider.default },
            ]}
          />
        )}
      </View>

      {/* Content card */}
      <View
        style={[
          timelineStyles.card,
          {
            backgroundColor: theme.semantic.background.card,
            borderLeftColor: `${config.color}40`,
            ...theme.shadows.xs,
          },
        ]}
      >
        {/* Title row */}
        <View style={timelineStyles.titleRow}>
          <Text style={[timelineStyles.typeLabel, { color: config.color }]}>
            {config.label}
          </Text>
          <Text style={[timelineStyles.time, { color: theme.semantic.text.secondary }]}>
            {timeLabel}
          </Text>
        </View>

        {/* Description */}
        {item.subtitle && (
          <Text
            style={[timelineStyles.subtitle, { color: theme.semantic.text.primary }]}
            numberOfLines={2}
          >
            {item.subtitle}
          </Text>
        )}

        {item.title && !item.subtitle && (
          <Text
            style={[timelineStyles.subtitle, { color: theme.semantic.text.primary }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
        )}

        {/* Badge (e.g. "Opened from reminder") */}
        {item.badge && (
          <View
            style={[
              timelineStyles.badge,
              { backgroundColor: `${config.color}18` },
            ]}
          >
            <Text style={[timelineStyles.badgeText, { color: config.color }]}>
              {item.badge}
            </Text>
          </View>
        )}

        {/* Date pill */}
        <View style={timelineStyles.datePill}>
          <Ionicons name="time-outline" size={11} color={theme.semantic.text.secondary} />
          <Text style={[timelineStyles.datePillText, { color: theme.semantic.text.secondary }]}>
            Today
          </Text>
        </View>
      </View>
    </View>
  );
});

const timelineStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginBottom: 0,
  },
  rail: {
    width: 28,
    alignItems: "center",
    paddingTop: 14,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -4,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginLeft: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  datePillText: {
    fontSize: 11,
  },
});

// ─── Section header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string;
  dateRange?: string;
  count?: number;
  collapsed?: boolean;
  onToggle?: () => void;
  theme: Theme;
}

function SectionHeader({
  label,
  dateRange,
  count,
  collapsed,
  onToggle,
  theme,
}: SectionHeaderProps) {
  return (
    <View style={sectionStyles.row}>
      <Text style={[sectionStyles.label, { color: theme.semantic.text.primary }]}>
        {label}
      </Text>
      {dateRange && (
        <Text style={[sectionStyles.range, { color: theme.semantic.text.secondary }]}>
          {dateRange}
        </Text>
      )}
      {count !== undefined && onToggle && (
        <TouchableOpacity
          style={[
            sectionStyles.countChip,
            { backgroundColor: theme.semantic.background.surface },
          ]}
          onPress={onToggle}
          activeOpacity={0.7}
          accessibilityLabel={collapsed ? "Expand earlier activities" : "Collapse earlier activities"}
          accessibilityRole="button"
        >
          <Text style={[sectionStyles.countText, { color: theme.semantic.text.primary }]}>
            {count}
          </Text>
          <Ionicons
            name={collapsed ? "chevron-down" : "chevron-up"}
            size={12}
            color={theme.semantic.text.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  range: {
    fontSize: 13,
    flex: 1,
  },
  countChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  countText: {
    fontSize: 13,
    fontWeight: "600",
  },
});

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ theme }: { theme: Theme }) {
  const router = useRouter();
  return (
    <View style={emptyStyles.container}>
      <View style={[emptyStyles.iconCircle, { backgroundColor: theme.semantic.background.surface }]}>
        <Ionicons name="notifications-outline" size={40} color={theme.semantic.text.disabled} />
      </View>
      <Text style={[emptyStyles.title, { color: theme.semantic.text.primary }]}>
        No activity yet
      </Text>
      <Text style={[emptyStyles.subtitle, { color: theme.semantic.text.secondary }]}>
        Your reminders and achievements{"\n"}will appear here.
      </Text>
      <TouchableOpacity
        style={[emptyStyles.btn, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push("/create")}
        activeOpacity={0.8}
      >
        <Text style={emptyStyles.btnText}>Create Habit</Text>
      </TouchableOpacity>
    </View>
  );
}

const emptyStyles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 80, paddingHorizontal: 40 },
  iconCircle: { width: 88, height: 88, borderRadius: 44, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: "center", lineHeight: 20, marginBottom: 28 },
  btn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 16 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ActivityCenterScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { groups, totalToday, isEmpty, isLoading } = useActivityCenterViewModel();
  const [collapsedEarlier, setCollapsedEarlier] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const styles = createStyles(theme);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // ViewModel is synchronous (SQLite); simulate a brief pause.
    await new Promise((r) => setTimeout(r, 400));
    setRefreshing(false);
  }, []);

  const renderGroup = useCallback(
    (group: ActivityGroup, index: number) => {
      const isEarlier = group.label === "Earlier";
      const isVisible = !isEarlier || !collapsedEarlier;

      return (
        <View key={`${group.label}-${index}`} style={styles.section}>
          <SectionHeader
            label={group.label}
            dateRange={group.dateRange}
            count={isEarlier ? group.items.length : undefined}
            collapsed={isEarlier ? collapsedEarlier : undefined}
            onToggle={isEarlier ? () => setCollapsedEarlier((p) => !p) : undefined}
            theme={theme}
          />

          {isVisible &&
            group.items.map((item, i) => (
              <TimelineItem
                key={item.id}
                item={item}
                isLast={i === group.items.length - 1}
                theme={theme}
              />
            ))}
        </View>
      );
    },
    [collapsedEarlier, theme, styles],
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.semantic.background.page }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.semantic.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: theme.semantic.text.primary }]}>
            Activity Center
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.semantic.text.secondary }]}>
            Recent updates and reminders
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* ── Summary card ── */}
        {!isEmpty && (
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.primary }]}>
            <View style={styles.summaryLeft}>
              <View style={styles.summaryIconCircle}>
                <Ionicons name="pulse" size={20} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={styles.summaryTitle}>Today</Text>
                <Text style={styles.summaryCount}>{totalToday} activities</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.summaryLink}
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="View all history"
            >
              <Text style={styles.summaryLinkText}>View all history</Text>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* ── Content ── */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            {[1, 2, 3].map((k) => (
              <View
                key={k}
                style={[
                  styles.skeletonCard,
                  { backgroundColor: theme.semantic.background.surface },
                ]}
              />
            ))}
          </View>
        ) : isEmpty ? (
          <EmptyState theme={theme} />
        ) : (
          <>
            {groups.map((group, i) => renderGroup(group, i))}

            {/* ── Motivational card ── */}
            <View
              style={[
                styles.motivationCard,
                { backgroundColor: theme.semantic.background.card, ...theme.shadows.sm },
              ]}
            >
              <View
                style={[
                  styles.motivationIcon,
                  { backgroundColor: `${theme.colors.primary}18` },
                ]}
              >
                <Ionicons name="flame" size={28} color={theme.colors.primary} />
              </View>
              <View style={styles.motivationText}>
                <Text
                  style={[styles.motivationTitle, { color: theme.semantic.text.primary }]}
                >
                  You're doing great!
                </Text>
                <Text
                  style={[
                    styles.motivationSubtitle,
                    { color: theme.semantic.text.secondary },
                  ]}
                >
                  Consistency is the key to building lasting habits.
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.insightsBtn, { backgroundColor: theme.colors.primary }]}
                onPress={() => router.push("/(tabs)/insights" as any)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="View Insights"
              >
                <Ionicons name="bar-chart" size={14} color="#fff" />
                <Text style={styles.insightsBtnText}>View Insights</Text>
              </TouchableOpacity>
            </View>

            {/* ── Footer note ── */}
            <View style={styles.footerNote}>
              <Ionicons name="lock-closed-outline" size={12} color={theme.semantic.text.disabled} />
              <Text style={[styles.footerNoteText, { color: theme.semantic.text.disabled }]}>
                All activity is stored locally on your device.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: { flex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 16,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.semantic.divider.default,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.semantic.background.surface,
    },
    headerText: { flex: 1 },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: -0.3,
    },
    headerSubtitle: {
      fontSize: 13,
      marginTop: 1,
    },
    scroll: { flex: 1 },
    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    summaryCard: {
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
      ...theme.shadows.md,
    },
    summaryLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    summaryIconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.25)",
      justifyContent: "center",
      alignItems: "center",
    },
    summaryTitle: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
      opacity: 0.9,
    },
    summaryCount: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
      marginTop: 1,
    },
    summaryLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    summaryLinkText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
    },
    section: {
      marginBottom: 8,
    },
    loadingContainer: { gap: 12, marginTop: 8 },
    skeletonCard: {
      borderRadius: 14,
      height: 80,
      opacity: 0.6,
    },
    motivationCard: {
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 8,
      marginBottom: 8,
    },
    motivationIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      justifyContent: "center",
      alignItems: "center",
    },
    motivationText: { flex: 1 },
    motivationTitle: {
      fontSize: 15,
      fontWeight: "700",
      marginBottom: 3,
    },
    motivationSubtitle: {
      fontSize: 12,
      lineHeight: 17,
    },
    insightsBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
    },
    insightsBtnText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "700",
    },
    footerNote: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      marginTop: 16,
      paddingBottom: 8,
    },
    footerNoteText: {
      fontSize: 12,
    },
  });

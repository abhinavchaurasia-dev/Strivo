import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Circle, G } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

import Screen from "@/components/layout/Screen";
import { useInsightsViewModel } from "@/viewmodels/InsightsViewModel";
import { useTheme } from "@/providers";
import type { HeatmapCell, MilestoneStatus } from "@/types/analytics";
import type { Theme } from "@/theme";

// ─── Heatmap ───────────────────────────────────────────────────────────────
const HEATMAP_LEVELS = [
  "#E5E7EB", // 0 – no activity
  "#FED7AA", // 1 – low
  "#FDBA74", // 2 – medium
  "#FB923C", // 3 – high
  "#EA580C", // 4 – very high
] as const;

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

interface HeatmapGridProps {
  data: HeatmapCell[];
  theme: Theme;
  cardWidth: number;
}

function HeatmapGrid({ data, theme, cardWidth }: HeatmapGridProps) {
  // Build a Mon→Sun × weeks layout.
  // We need to align dates to ISO weeks (Monday = start).
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun … 6=Sat
  const isoDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0=Mon … 6=Sun

  // Find the Monday of the week containing the earliest heatmap cell.
  // We'll show 6 full weeks.
  const NUM_WEEKS = 6;
  const startOffset = isoDay + (NUM_WEEKS - 1) * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - startOffset);

  // Build a date → level map for O(1) lookup.
  const cellMap = new Map<string, 0 | 1 | 2 | 3 | 4>(
    data.map((c) => [c.date, c.level]),
  );

  // Build 7 rows × NUM_WEEKS columns.
  const rows: (0 | 1 | 2 | 3 | 4)[][] = Array.from({ length: 7 }, () =>
    Array(NUM_WEEKS).fill(0),
  );

  for (let col = 0; col < NUM_WEEKS; col++) {
    for (let row = 0; row < 7; row++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + col * 7 + row);
      const iso = d.toISOString().slice(0, 10);
      rows[row][col] = cellMap.get(iso) ?? 0;
    }
  }

  // Calculate cell dimensions to fill the card.
  const LABEL_WIDTH = 20;
  const GAP = 3;
  const availableWidth = cardWidth - LABEL_WIDTH - GAP;
  const cellW = Math.floor((availableWidth - (NUM_WEEKS - 1) * GAP) / NUM_WEEKS);
  const cellH = Math.max(12, Math.round(cellW * 0.4));

  // Week range labels (bottom).
  const weekLabels: string[] = [];
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  for (let col = 0; col < NUM_WEEKS; col++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + col * 7);
    weekLabels.push(`${months[d.getMonth()]} ${d.getDate()}`);
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {/* Row labels */}
        <View style={{ width: LABEL_WIDTH, gap: GAP, paddingTop: 1 }}>
          {DAY_LABELS.map((label, i) => (
            <View
              key={i}
              style={{
                height: cellH,
                justifyContent: "center",
              }}
            >
              <RNText
                style={{
                  fontSize: 10,
                  color: theme.semantic.text.secondary,
                  fontWeight: "500",
                }}
              >
                {label}
              </RNText>
            </View>
          ))}
        </View>

        {/* Grid */}
        <View style={{ flex: 1, flexDirection: "row", gap: GAP }}>
          {Array.from({ length: NUM_WEEKS }, (_, col) => (
            <View key={col} style={{ gap: GAP }}>
              {rows.map((row, rowIdx) => (
                <View
                  key={rowIdx}
                  style={{
                    width: cellW,
                    height: cellH,
                    borderRadius: 3,
                    backgroundColor: HEATMAP_LEVELS[row[col]],
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Week labels */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 6,
          marginLeft: LABEL_WIDTH + GAP,
          gap: GAP,
        }}
      >
        {weekLabels.map((label, i) => (
          <View key={i} style={{ width: cellW }}>
            <RNText
              style={{
                fontSize: 9,
                color: theme.semantic.text.disabled,
                textAlign: "left",
              }}
              numberOfLines={1}
            >
              {label}
            </RNText>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 8,
          gap: 4,
        }}
      >
        <RNText style={{ fontSize: 10, color: theme.semantic.text.secondary }}>
          Less
        </RNText>
        {HEATMAP_LEVELS.map((color, i) => (
          <View
            key={i}
            style={{
              width: cellH,
              height: cellH,
              borderRadius: 3,
              backgroundColor: color,
            }}
          />
        ))}
        <RNText style={{ fontSize: 10, color: theme.semantic.text.secondary }}>
          More
        </RNText>
      </View>
    </View>
  );
}

// ─── Circular Progress ──────────────────────────────────────────────────────
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}

function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = "#FF7A00",
  trackColor = "#E5E7EB",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPct = Math.max(0, Math.min(100, percentage));
  const offset = circumference - (clampedPct / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <Svg width={size} height={size}>
      <G rotation="-90" origin={`${cx}, ${cy}`}>
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

// ─── Milestone Track ────────────────────────────────────────────────────────
const MILESTONE_DAYS = [3, 7, 14, 30, 50, 100];

interface MilestoneTrackProps {
  milestones: MilestoneStatus[];
  theme: Theme;
}

function MilestoneTrack({ milestones, theme }: MilestoneTrackProps) {
  const styles = StyleSheet.create({
    container: { marginTop: 4 },
    track: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: theme.semantic.divider.default,
    },
    lineAchieved: {
      backgroundColor: theme.colors.primary,
    },
    chip: {
      alignItems: "center",
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
    },
    circleAchieved: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    circleLocked: {
      backgroundColor: theme.semantic.background.surface,
      borderColor: theme.semantic.divider.default,
    },
    days: {
      fontSize: 10,
      fontWeight: "700",
      marginTop: 4,
      textAlign: "center",
    },
    label: {
      fontSize: 9,
      marginTop: 2,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {milestones.map((m, i) => (
          <View key={m.days} style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.chip}>
              <View
                style={[
                  styles.circle,
                  m.achieved ? styles.circleAchieved : styles.circleLocked,
                ]}
              >
                {m.achieved ? (
                  <Ionicons name="flame" size={18} color="#fff" />
                ) : (
                  <Ionicons
                    name="lock-closed"
                    size={16}
                    color={theme.semantic.text.disabled}
                  />
                )}
              </View>
              <RNText
                style={[
                  styles.days,
                  {
                    color: m.achieved
                      ? theme.semantic.text.primary
                      : theme.semantic.text.disabled,
                  },
                ]}
              >
                {m.days} Days
              </RNText>
              <RNText
                style={[
                  styles.label,
                  {
                    color: m.achieved
                      ? theme.colors.success
                      : theme.semantic.text.disabled,
                  },
                ]}
              >
                {m.achieved ? "Achieved" : "Locked"}
              </RNText>
            </View>

            {i < milestones.length - 1 && (
              <View
                style={[
                  styles.line,
                  { width: 24 },
                  m.achieved && i + 1 < milestones.length && milestones[i + 1].achieved
                    ? styles.lineAchieved
                    : null,
                ]}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── InsightsScreen ─────────────────────────────────────────────────────────
export default function InsightsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { data, isEmpty, isLoading } = useInsightsViewModel();

  const cardWidth = screenWidth - 40 * 2; // page padding × 2

  const styles = createStyles(theme);

  // ── Loading state ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Screen>
        <View style={styles.pageHeader}>
          <RNText style={[styles.pageTitle, { color: theme.semantic.text.primary }]}>
            Insights
          </RNText>
          <RNText style={[styles.pageSubtitle, { color: theme.semantic.text.secondary }]}>
            Track your consistency and progress.
          </RNText>
        </View>
        {[1, 2, 3].map((k) => (
          <View key={k} style={[styles.skeletonCard, { backgroundColor: theme.semantic.background.surface }]} />
        ))}
      </Screen>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────
  if (isEmpty || !data) {
    return (
      <Screen>
        <View style={styles.pageHeader}>
          <RNText style={[styles.pageTitle, { color: theme.semantic.text.primary }]}>
            Insights
          </RNText>
          <RNText style={[styles.pageSubtitle, { color: theme.semantic.text.secondary }]}>
            Track your consistency and progress.
          </RNText>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="bar-chart-outline"
            size={64}
            color={theme.semantic.text.disabled}
          />
          <RNText style={[styles.emptyTitle, { color: theme.semantic.text.primary }]}>
            No insights yet
          </RNText>
          <RNText style={[styles.emptySubtitle, { color: theme.semantic.text.secondary }]}>
            Complete habits to unlock meaningful progress data.
          </RNText>
          <TouchableOpacity
            style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push("/create")}
          >
            <RNText style={styles.createBtnText}>Create Habit</RNText>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  const deltaColor =
    data.completionRateDelta >= 0 ? theme.colors.success : theme.colors.error;
  const deltaLabel =
    data.completionRateDelta >= 0
      ? `+${data.completionRateDelta}%`
      : `${data.completionRateDelta}%`;

  return (
    <Screen padded={false}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Page header */}
        <View style={[styles.pageHeader, { paddingHorizontal: 20 }]}>
          <RNText style={[styles.pageTitle, { color: theme.semantic.text.primary }]}>
            Insights
          </RNText>
          <RNText style={[styles.pageSubtitle, { color: theme.semantic.text.secondary }]}>
            Track your consistency and progress.
          </RNText>
        </View>

        {/* ── 1. Heatmap ── */}
        <View style={[styles.card, { marginHorizontal: 20 }]}>
          <View style={styles.cardHeader}>
            <View>
              <RNText style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
                30-Day Consistency
              </RNText>
              <RNText style={[styles.cardSubtitle, { color: theme.semantic.text.secondary }]}>
                Last 30 Days
              </RNText>
            </View>
            <View style={[styles.todayChip, { backgroundColor: `${theme.colors.primary}18` }]}>
              <RNText style={[styles.todayChipText, { color: theme.colors.primary }]}>
                Today
              </RNText>
            </View>
          </View>

          <HeatmapGrid
            data={data.heatmapData}
            theme={theme}
            cardWidth={cardWidth - 40}
          />
        </View>

        {/* ── 2. Key stats (2×2) ── */}
        <View style={[styles.statsGrid, { marginHorizontal: 20 }]}>
          {/* Current streak */}
          <View style={[styles.statCard, { backgroundColor: theme.semantic.background.card }]}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF7ED" }]}>
              <Ionicons name="flame" size={22} color={theme.colors.primary} />
            </View>
            <RNText style={[styles.statValue, { color: theme.semantic.text.primary }]}>
              {data.currentStreak}
            </RNText>
            <RNText style={[styles.statLabel, { color: theme.semantic.text.secondary }]}>
              Current Streak
            </RNText>
            <RNText style={[styles.statCaption, { color: theme.colors.primary }]}>
              {data.currentStreak > 0 ? "Keep it up! 🔥" : "Start today!"}
            </RNText>
          </View>

          {/* Best streak */}
          <View style={[styles.statCard, { backgroundColor: theme.semantic.background.card }]}>
            <View style={[styles.statIcon, { backgroundColor: "#FFFBEB" }]}>
              <Ionicons name="trophy" size={22} color="#F59E0B" />
            </View>
            <RNText style={[styles.statValue, { color: theme.semantic.text.primary }]}>
              {data.bestStreak}
            </RNText>
            <RNText style={[styles.statLabel, { color: theme.semantic.text.secondary }]}>
              Best Streak
            </RNText>
            {data.bestStreakDate && (
              <RNText style={[styles.statCaption, { color: theme.semantic.text.secondary }]}>
                {data.bestStreakDate.slice(0, 10)}
              </RNText>
            )}
          </View>

          {/* Completion rate */}
          <View style={[styles.statCard, { backgroundColor: theme.semantic.background.card }]}>
            <View style={[styles.statIcon, { backgroundColor: "#EFF6FF" }]}>
              <Ionicons name="trending-up" size={22} color={theme.colors.secondary} />
            </View>
            <RNText style={[styles.statValue, { color: theme.colors.secondary }]}>
              {data.completionRate}%
            </RNText>
            <RNText style={[styles.statLabel, { color: theme.semantic.text.secondary }]}>
              Completion Rate
            </RNText>
            <RNText style={[styles.statCaption, { color: deltaColor }]}>
              {deltaLabel} vs last month
            </RNText>
          </View>

          {/* Consistency */}
          <View style={[styles.statCard, { backgroundColor: theme.semantic.background.card }]}>
            <View style={[styles.statIcon, { backgroundColor: "#F0FDF4" }]}>
              <Ionicons name="checkmark-circle" size={22} color={theme.colors.success} />
            </View>
            <RNText style={[styles.statValue, { color: theme.colors.success }]}>
              {data.consistencyScore}%
            </RNText>
            <RNText style={[styles.statLabel, { color: theme.semantic.text.secondary }]}>
              Consistency Score
            </RNText>
            <RNText style={[styles.statCaption, { color: theme.colors.success }]}>
              {data.consistencyScore >= 80 ? "Excellent! 🎯" : "Keep going!"}
            </RNText>
          </View>
        </View>

        {/* ── 3. Progress Snapshot ── */}
        <View style={[styles.card, { marginHorizontal: 20 }]}>
          <RNText style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
            Progress Snapshot
          </RNText>
          <View style={styles.progressSnapshotBody}>
            <View style={styles.progressLeft}>
              <RNText style={[styles.snapshotLabel, { color: theme.semantic.text.secondary }]}>
                You've completed
              </RNText>
              <RNText style={[styles.snapshotBig, { color: theme.colors.primary }]}>
                {data.completionRate}%
              </RNText>
              <RNText style={[styles.snapshotLabel, { color: theme.semantic.text.secondary }]}>
                of your scheduled habits this month.
              </RNText>
            </View>

            <View style={styles.progressRight}>
              <CircularProgress
                percentage={data.completionRate}
                size={110}
                strokeWidth={11}
                color={theme.colors.primary}
                trackColor={theme.semantic.background.surface}
              />
              <View style={styles.progressOverlay}>
                <RNText style={[styles.progressDelta, { color: theme.colors.success }]}>
                  {data.completionRateDelta >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(data.completionRateDelta)}%
                </RNText>
                <RNText style={[styles.progressDeltaLabel, { color: theme.semantic.text.secondary }]}>
                  vs last month
                </RNText>
              </View>
            </View>
          </View>
        </View>

        {/* ── 4. Milestones ── */}
        <View style={[styles.card, { marginHorizontal: 20 }]}>
          <View style={styles.cardHeader}>
            <RNText style={[styles.cardTitle, { color: theme.semantic.text.primary }]}>
              Milestones
            </RNText>
            <TouchableOpacity>
              <RNText style={[styles.viewAll, { color: theme.colors.primary }]}>
                View All
              </RNText>
            </TouchableOpacity>
          </View>
          <MilestoneTrack milestones={data.milestones} theme={theme} />
        </View>

        {/* ── 5. Insights Tip ── */}
        <View
          style={[
            styles.card,
            styles.tipCard,
            { marginHorizontal: 20, backgroundColor: "#EFF6FF" },
          ]}
        >
          <View style={styles.tipContent}>
            <View style={[styles.tipIcon, { backgroundColor: "#DBEAFE" }]}>
              <Ionicons name="bulb" size={24} color={theme.colors.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={[styles.tipTitle, { color: theme.semantic.text.primary }]}>
                Insights Tip
              </RNText>
              <RNText style={[styles.tipText, { color: theme.semantic.text.secondary }]}>
                Consistency is the key to building lasting habits. You're doing great!
              </RNText>
            </View>
          </View>
          <RNText style={styles.tipEmoji}>👍</RNText>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    scroll: {
      paddingTop: 16,
      paddingBottom: 32,
      gap: 16,
    },
    pageHeader: {
      paddingBottom: 4,
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: "700",
      letterSpacing: -0.5,
    },
    pageSubtitle: {
      fontSize: 15,
      marginTop: 2,
    },
    card: {
      backgroundColor: theme.semantic.background.card,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.sm,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700",
    },
    cardSubtitle: {
      fontSize: 12,
      marginTop: 2,
    },
    todayChip: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
    },
    todayChipText: {
      fontSize: 12,
      fontWeight: "600",
    },
    viewAll: {
      fontSize: 14,
      fontWeight: "600",
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    statCard: {
      flex: 1,
      minWidth: "45%",
      borderRadius: 16,
      padding: 16,
      ...theme.shadows.xs,
    },
    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    statValue: {
      fontSize: 28,
      fontWeight: "700",
    },
    statLabel: {
      fontSize: 12,
      marginTop: 2,
    },
    statCaption: {
      fontSize: 11,
      marginTop: 4,
      fontWeight: "500",
    },
    progressSnapshotBody: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
      gap: 16,
    },
    progressLeft: {
      flex: 1,
    },
    progressRight: {
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    progressOverlay: {
      position: "absolute",
      alignItems: "center",
    },
    progressDelta: {
      fontSize: 13,
      fontWeight: "700",
    },
    progressDeltaLabel: {
      fontSize: 9,
      textAlign: "center",
    },
    snapshotLabel: {
      fontSize: 13,
    },
    snapshotBig: {
      fontSize: 42,
      fontWeight: "700",
      lineHeight: 50,
    },
    tipCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tipContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
    },
    tipIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
    },
    tipTitle: {
      fontSize: 15,
      fontWeight: "700",
      marginBottom: 4,
    },
    tipText: {
      fontSize: 13,
      lineHeight: 18,
    },
    tipEmoji: {
      fontSize: 36,
      marginLeft: 12,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 40,
      paddingVertical: 80,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 24,
    },
    createBtn: {
      paddingHorizontal: 28,
      paddingVertical: 14,
      borderRadius: 16,
    },
    createBtnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
    skeletonCard: {
      marginHorizontal: 20,
      borderRadius: 20,
      height: 100,
      marginBottom: 16,
      opacity: 0.5,
    },
  });

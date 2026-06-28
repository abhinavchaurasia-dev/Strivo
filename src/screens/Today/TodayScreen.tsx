import React, { useCallback } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text as RNText,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import Screen from "@/components/layout/Screen";
import {
  HeroMomentumCard,
  ProgressCard,
  TodayHeader,
  HabitCard,
} from "@/components/today";
import { useTodayViewModel } from "@/viewmodels/TodayViewModel";
import { useHabitStore } from "@/store/habitStore";
import { useTheme } from "@/providers";
import type { TodayHabitItem } from "@/viewmodels/TodayViewModel";

export default function TodayScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { completeHabit } = useHabitStore();
  const state = useTodayViewModel();

  const handleNotificationPress = useCallback(() => {
    router.push("/activity");
  }, [router]);

  const handleHabitPress = useCallback(
    (id: string) => {
      router.push(`/habit/${id}`);
    },
    [router],
  );

  const handleComplete = useCallback(
    async (id: string) => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      completeHabit(id);
    },
    [completeHabit],
  );

  const renderHabit = useCallback(
    ({ item }: { item: TodayHabitItem }) => (
      <HabitCard
        id={item.id}
        emoji={item.emoji}
        title={item.title}
        reminder={item.nextDueLabel}
        completed={item.completed}
        streak={item.streak}
        onPress={() => handleHabitPress(item.id)}
        onComplete={() => handleComplete(item.id)}
      />
    ),
    [handleHabitPress, handleComplete],
  );

  const styles = createStyles(theme);

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        data={state.habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        ListHeaderComponent={
          <>
            <TodayHeader
              greeting={`${state.greeting} ${state.greetingEmoji}`}
              date={`You're ${state.completionPercentage}% done today`}
              notificationCount={state.totalHabits - state.completedHabits}
              onNotificationPress={handleNotificationPress}
            />

            <HeroMomentumCard
              userName="Abhinav"
              currentStreak={state.currentStreak}
              longestHabit={state.longestHabit}
              completionPercentage={state.completionPercentage}
            />

            <View style={styles.sectionGap} />

            <ProgressCard
              completionPercentage={state.completionPercentage}
              completedHabits={state.completedHabits}
              totalHabits={state.totalHabits}
              currentStreak={state.currentStreak}
              bestStreak={state.bestStreak}
            />

            {state.activeReminder && (
              <Pressable
                style={styles.reminderCard}
                onPress={() =>
                  router.push(`/habit/${state.activeReminder!.habitId}`)
                }
              >
                <View style={styles.reminderIcon}>
                  <Ionicons
                    name="notifications"
                    size={20}
                    color={theme.colors.primary}
                  />
                </View>

                <View style={styles.reminderContent}>
                  <RNText
                    style={[
                      styles.reminderTitle,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Reminder Active
                  </RNText>

                  <RNText
                    style={[
                      styles.reminderSub,
                      { color: theme.semantic.text.primary },
                    ]}
                  >
                    {state.activeReminder.emoji}{" "}
                    {state.activeReminder.habitName}
                  </RNText>

                  <RNText
                    style={[
                      styles.reminderTime,
                      { color: theme.semantic.text.secondary },
                    ]}
                  >
                    🕐 {state.activeReminder.time}
                  </RNText>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={theme.semantic.text.secondary}
                />
              </Pressable>
            )}

            {state.habits.length > 0 && (
              <View style={styles.sectionHeader}>
                <RNText
                  style={[
                    styles.sectionTitle,
                    { color: theme.semantic.text.primary },
                  ]}
                >
                  Today's Habits
                </RNText>

                <Pressable onPress={() => {}}>
                  <RNText
                    style={[styles.viewAll, { color: theme.colors.primary }]}
                  >
                    View All
                  </RNText>
                </Pressable>
              </View>
            )}

            {state.isEmpty && (
              <View style={styles.emptyState}>
                <RNText style={styles.emptyEmoji}>🌱</RNText>

                <RNText
                  style={[
                    styles.emptyTitle,
                    { color: theme.semantic.text.primary },
                  ]}
                >
                  Build Your First Streak
                </RNText>

                <RNText
                  style={[
                    styles.emptySubtitle,
                    { color: theme.semantic.text.secondary },
                  ]}
                >
                  Small habits create lasting change.
                </RNText>

                <Pressable
                  style={[
                    styles.emptyButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={() => router.push("/create")}
                >
                  <RNText style={styles.emptyButtonText}>Create Habit</RNText>
                </Pressable>
              </View>
            )}
          </>
        }
        ListFooterComponent={
          state.agendaItems.length > 0 ? (
            <View style={styles.agendaCard}>
              <RNText
                style={[
                  styles.agendaTitle,
                  { color: theme.semantic.text.primary },
                ]}
              >
                Today's Agenda
              </RNText>

              <RNText
                style={[
                  styles.agendaSub,
                  { color: theme.semantic.text.secondary },
                ]}
              >
                {state.agendaItems.length} upcoming reminder
                {state.agendaItems.length !== 1 ? "s" : ""}
              </RNText>

              <View style={styles.agendaRow}>
                {state.agendaItems.slice(0, 3).map((item) => (
                  <View
                    key={`${item.habitId}-${item.time}`}
                    style={styles.agendaItem}
                  >
                    <RNText
                      style={[
                        styles.agendaTime,
                        { color: theme.semantic.text.primary },
                      ]}
                    >
                      {item.time}
                    </RNText>

                    <RNText style={styles.agendaEmoji}>{item.emoji}</RNText>

                    <RNText
                      numberOfLines={1}
                      style={[
                        styles.agendaName,
                        { color: theme.semantic.text.secondary },
                      ]}
                    >
                      {item.habitName}
                    </RNText>
                  </View>
                ))}
              </View>
            </View>
          ) : null
        }
      />

      <Pressable
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push("/create")}
        accessibilityRole="button"
        accessibilityLabel="Create new habit"
      >
        <Ionicons name="add" size={24} color="#fff" />
        <RNText style={styles.fabLabel}>New Habit</RNText>
      </Pressable>
    </Screen>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 140,
    },

    sectionGap: {
      height: 20,
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 12,
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: "700",
    },

    viewAll: {
      fontSize: 14,
      fontWeight: "600",
    },

    reminderCard: {
      backgroundColor: theme.semantic.background.card,
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
      borderWidth: 1,
      borderColor: `${theme.colors.primary}30`,
      ...theme.shadows.sm,
    },

    reminderIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: `${theme.colors.primary}15`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },

    reminderContent: {
      flex: 1,
    },

    reminderTitle: {
      fontSize: 13,
      fontWeight: "700",
    },

    reminderSub: {
      fontSize: 15,
      fontWeight: "600",
      marginTop: 2,
    },

    reminderTime: {
      fontSize: 12,
      marginTop: 2,
    },

    emptyState: {
      alignItems: "center",
      paddingVertical: 48,
    },

    emptyEmoji: {
      fontSize: 56,
      marginBottom: 16,
    },

    emptyTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 8,
    },

    emptySubtitle: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 24,
    },

    emptyButton: {
      paddingHorizontal: 28,
      paddingVertical: 14,
      borderRadius: 16,
    },

    emptyButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },

    agendaCard: {
      backgroundColor: theme.semantic.background.card,
      borderRadius: 20,
      padding: 20,
      marginTop: 8,
      ...theme.shadows.sm,
    },

    agendaTitle: {
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 2,
    },

    agendaSub: {
      fontSize: 13,
      marginBottom: 16,
    },

    agendaRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },

    agendaItem: {
      alignItems: "center",
      flex: 1,
    },

    agendaTime: {
      fontSize: 13,
      fontWeight: "700",
    },

    agendaEmoji: {
      fontSize: 22,
      marginVertical: 4,
    },

    agendaName: {
      fontSize: 11,
      textAlign: "center",
    },

    fab: {
      position: "absolute",
      bottom: 100,
      left: 20,
      right: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
      borderRadius: 28,
      gap: 8,
      ...theme.shadows.md,
    },

    fabLabel: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
  });

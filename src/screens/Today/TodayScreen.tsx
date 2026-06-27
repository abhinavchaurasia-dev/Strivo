import React from "react";

import { FlatList, View } from "react-native";

import Screen from "@/components/layout/Screen";

import {
  HeroMomentumCard,
  ProgressCard,
  TodayHeader,
  HabitCard,
} from "@/components/today";

import { useTodayViewModel } from "@/viewmodels/TodayViewModel";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";

export default function TodayScreen() {
  const theme = useTheme();

  const styles = createStyles(theme);

  const state = useTodayViewModel();

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        data={state.habits}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <TodayHeader
              greeting={state.greeting}
              date={state.formattedDate}
              notificationCount={3}
            />

            <HeroMomentumCard
              userName="Abhinav"
              currentStreak={state.currentStreak}
              longestHabit={state.longestHabit}
              completionPercentage={state.completionPercentage}
            />

            <View style={styles.largeGap} />

            <ProgressCard
              completionPercentage={state.completionPercentage}
              completedHabits={state.completedHabits}
              totalHabits={state.totalHabits}
              currentStreak={state.currentStreak}
              bestStreak={state.bestStreak}
            />

            <View style={styles.largeGap} />
          </>
        }
        renderItem={({ item }) => (
          <HabitCard
            id={item.id}
            emoji={item.emoji}
            title={item.title}
            reminder={item.reminder}
            completed={item.completed}
          />
        )}
      />
    </Screen>
  );
}

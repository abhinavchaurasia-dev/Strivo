import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/providers";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabIconProps {
  name: IoniconName;
  focused: boolean;
  color: string;
  size: number;
}

function TabIcon({ name, focused, color, size }: TabIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.semantic.navigation.active,
        tabBarInactiveTintColor: theme.semantic.navigation.inactive,
        tabBarStyle: {
          backgroundColor: theme.semantic.navigation.background,
          borderTopColor: theme.semantic.divider.default,
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 28,
          paddingTop: 10,
          ...theme.shadows.sm,
        },
        tabBarLabelStyle: {
          ...theme.typography.caption,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "bar-chart" : "bar-chart-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "settings" : "settings-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

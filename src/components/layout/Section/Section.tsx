import { View } from "react-native";

import { Text } from "@/components/ui";

import { createStyles } from "./styles";
import type { SectionProps } from "./types";

import { useTheme } from "@/providers";

export default function Section({
  title,
  subtitle,
  action,
  children,
}: SectionProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {(title || subtitle || action) && (
        <View style={styles.header}>
          <View style={styles.titles}>
            {title && <Text variant="titleLarge">{title}</Text>}

            {subtitle && (
              <Text variant="bodyMedium" color="secondary">
                {subtitle}
              </Text>
            )}
          </View>

          {action}
        </View>
      )}

      {children}
    </View>
  );
}

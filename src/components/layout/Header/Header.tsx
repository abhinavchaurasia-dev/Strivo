import { Pressable, View } from "react-native";

import { Text, Icon } from "@/components/ui";

import { createStyles } from "./styles";
import type { HeaderProps } from "./types";

import { useTheme } from "@/providers";

export default function Header({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  rightComponent,
  testID,
}: HeaderProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.side}>
        {leftIcon && (
          <Pressable onPress={onLeftPress}>
            <Icon name={leftIcon} />
          </Pressable>
        )}
      </View>

      <View style={styles.center}>
        <Text variant="titleLarge">{title}</Text>

        {subtitle && (
          <Text variant="bodyMedium" color="secondary">
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.side}>
        {rightComponent
          ? rightComponent
          : rightIcon && (
              <Pressable onPress={onRightPress}>
                <Icon name={rightIcon} />
              </Pressable>
            )}
      </View>
    </View>
  );
}

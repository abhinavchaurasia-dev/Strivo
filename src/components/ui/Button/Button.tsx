import { ActivityIndicator, Pressable } from "react-native";

import { useTheme } from "@/providers";

import Text from "../Text";
import Icon from "../Icon";

import { createStyles } from "./styles";
import { getButtonColors } from "./helpers";

import type { ButtonProps } from "./types";

export default function Button({
  title,

  onPress,

  variant = "primary",

  loading = false,

  disabled = false,

  leftIcon,

  rightIcon,

  fullWidth = false,

  testID,
}: ButtonProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  const colors = getButtonColors(theme, variant);

  return (
    <Pressable
      testID={testID}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      {loading && <ActivityIndicator color={colors.text} />}

      {!loading && leftIcon && (
        <Icon name={leftIcon} color={colors.text} size={18} />
      )}

      {!loading && (
        <Text
          variant="label"
          style={{
            color: colors.text,
          }}
        >
          {title}
        </Text>
      )}

      {!loading && rightIcon && (
        <Icon name={rightIcon} color={colors.text} size={18} />
      )}
    </Pressable>
  );
}

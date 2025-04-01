"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type TouchableOpacityProps } from "react-native"
import { useTheme } from "../../context/ThemeContent"
interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "small" | "medium" | "large"
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  style,
  disabled,
  ...props
}) => {
  const { theme } = useTheme()

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.lightGray

    switch (variant) {
      case "primary":
        return theme.colors.primary
      case "secondary":
        return theme.colors.accent
      case "outline":
        return "transparent"
      case "danger":
        return theme.colors.error
      default:
        return theme.colors.primary
    }
  }

  const getTextColor = () => {
    if (disabled) return theme.colors.gray

    switch (variant) {
      case "outline":
        return theme.colors.primary
      default:
        return "#FFFFFF"
    }
  }

  const getBorderColor = () => {
    if (disabled) return theme.colors.lightGray

    switch (variant) {
      case "outline":
        return theme.colors.primary
      default:
        return "transparent"
    }
  }

  const getPadding = () => {
    switch (size) {
      case "small":
        return { paddingVertical: 6, paddingHorizontal: 12 }
      case "medium":
        return { paddingVertical: 10, paddingHorizontal: 16 }
      case "large":
        return { paddingVertical: 14, paddingHorizontal: 20 }
      default:
        return { paddingVertical: 10, paddingHorizontal: 16 }
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
          borderRadius: theme.borderRadius.m,
          ...getPadding(),
        },
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: size === "small" ? theme.fontSize.s : theme.fontSize.m,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
})


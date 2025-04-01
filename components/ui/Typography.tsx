"use client"

import type React from "react"
import { Text, type TextProps } from "react-native"
import { useTheme } from "../../context/ThemeContent"

interface TypographyProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "label"
  color?: string
  align?: "auto" | "left" | "right" | "center" | "justify"
  weight?: "normal" | "bold" | "500" | "600" | "700"
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color,
  align = "left",
  weight,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme()

  const getFontSize = () => {
    switch (variant) {
      case "h1":
        return theme.fontSize.xxl
      case "h2":
        return theme.fontSize.xl
      case "h3":
        return theme.fontSize.l
      case "body":
        return theme.fontSize.m
      case "caption":
      case "label":
        return theme.fontSize.s
      default:
        return theme.fontSize.m
    }
  }

  const getFontWeight = () => {
    if (weight) return weight

    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
        return "bold"
      case "label":
        return "600"
      default:
        return "normal"
    }
  }

  return (
    <Text
      style={[
        {
          color: color || theme.colors.text,
          fontSize: getFontSize(),
          fontWeight: getFontWeight(),
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}


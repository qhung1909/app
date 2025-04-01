"use client"

import type React from "react"
import { View, StyleSheet, type ViewProps } from "react-native"
import { useTheme } from "../../context/ThemeContent"
interface CardProps extends ViewProps {
  children: React.ReactNode
  style?: any
}

export const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.m,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
})


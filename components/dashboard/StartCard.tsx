"use client"

import type React from "react"
import { View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

import { Card } from "../ui/Card"
import { Typography } from "../ui/Typography"
import { useTheme } from "../../context/ThemeContent"

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  iconColor?: string
  subtitle?: string
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconColor, subtitle }) => {
  const { theme } = useTheme()

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Typography variant="label">{title}</Typography>
        <View style={[styles.iconContainer, { backgroundColor: iconColor || theme.colors.primary }]}>
          <Icon name={icon} size={16} color="#FFFFFF" />
        </View>
      </View>

      <Typography variant="h2" style={styles.value}>
        {value}
      </Typography>

      {subtitle && (
        <Typography variant="caption" color={theme.colors.gray}>
          {subtitle}
        </Typography>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    marginVertical: 4,
  },
})


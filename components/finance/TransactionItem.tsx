"use client"

import type React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Typography } from "../ui/Typography"
import { useTheme } from "../../context/ThemeContent"

interface TransactionItemProps {
  id: string
  title: string
  amount: number
  date: string
  category: string
  type: "income" | "expense"
  onPress: (id: string) => void
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  title,
  amount,
  date,
  category,
  type,
  onPress,
}) => {
  const { theme } = useTheme()

  const getIconName = () => {
    switch (category.toLowerCase()) {
      case "food":
        return "restaurant-outline"
      case "transport":
        return "car-outline"
      case "entertainment":
        return "film-outline"
      case "shopping":
        return "cart-outline"
      case "salary":
        return "cash-outline"
      case "freelance":
        return "laptop-outline"
      default:
        return type === "income" ? "arrow-down-outline" : "arrow-up-outline"
    }
  }

  const getIconColor = () => {
    return type === "income" ? theme.colors.success : theme.colors.error
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={() => onPress(id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconColor() + "20" }]}>
        <Icon name={getIconName()} size={20} color={getIconColor()} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Typography variant="body">{title}</Typography>
          <Typography variant="body" weight="600" color={type === "income" ? theme.colors.success : theme.colors.error}>
            {type === "income" ? "+" : "-"}${Math.abs(amount).toFixed(2)}
          </Typography>
        </View>

        <View style={styles.detailsRow}>
          <Typography variant="caption" color={theme.colors.gray}>
            {category}
          </Typography>
          <Typography variant="caption" color={theme.colors.gray}>
            {date}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})


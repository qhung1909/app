"use client"

import type React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Typography } from "../ui/Typography"
import { useTheme } from "../../context/ThemeContent"

interface TimeEntryProps {
  id: string
  date: string
  checkIn: string
  checkOut: string
  totalHours: number
  onPress: (id: string) => void
}

export const TimeEntry: React.FC<TimeEntryProps> = ({ id, date, checkIn, checkOut, totalHours, onPress }) => {
  const { theme } = useTheme()

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
      <View style={styles.dateContainer}>
        <Typography variant="h3">{date.split(" ")[0]}</Typography>
        <Typography variant="caption" color={theme.colors.gray}>
          {date.split(" ")[1]}
        </Typography>
      </View>

      <View style={styles.content}>
        <View style={styles.timeRow}>
          <View style={styles.timeBlock}>
            <Icon name="time-outline" size={16} color={theme.colors.primary} style={styles.icon} />
            <Typography variant="body">Check In: {checkIn}</Typography>
          </View>

          <View style={styles.timeBlock}>
            <Icon name="time-outline" size={16} color={theme.colors.error} style={styles.icon} />
            <Typography variant="body">Check Out: {checkOut}</Typography>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Typography variant="body" weight="600">
            Total: {totalHours} hours
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#E5E5EA",
  },
  content: {
    flex: 1,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timeBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
})


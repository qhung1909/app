"use client"

import type React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { Typography } from "../ui/Typography"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { useTheme } from "../../context/ThemeContent"

interface TaskItemProps {
  id: string
  title: string
  completed: boolean
  category: string
  dueDate?: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onPress: (id: string) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  category,
  dueDate,
  onToggle,
  onDelete,
  onPress,
}) => {
  const { theme } = useTheme()

  const textStyle = useAnimatedStyle(() => {
    return {
      textDecorationLine: completed ? "line-through" : "none",
      opacity: withTiming(completed ? 0.6 : 1),
    }
  })

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={[styles.deleteAction, { backgroundColor: theme.colors.error }]}
        onPress={() => onDelete(id)}
      >
        <Icon name="trash-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
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
        <TouchableOpacity style={styles.checkbox} onPress={() => onToggle(id)}>
          <View
            style={[
              styles.checkboxInner,
              {
                borderColor: completed ? theme.colors.success : theme.colors.border,
                backgroundColor: completed ? theme.colors.success : "transparent",
              },
            ]}
          >
            {completed && <Icon name="checkmark" size={16} color="#FFFFFF" />}
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <Animated.View style={textStyle}>
            <Typography variant="body">{title}</Typography>
          </Animated.View>

          <View style={styles.details}>
            <View style={[styles.categoryBadge, { backgroundColor: theme.colors.lightGray }]}>
              <Typography variant="caption" color={theme.colors.gray}>
                {category}
              </Typography>
            </View>

            {dueDate && (
              <Typography variant="caption" color={theme.colors.gray}>
                {dueDate}
              </Typography>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
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
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
})


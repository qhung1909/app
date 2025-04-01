"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"
import { Typography } from "../components/ui/Typography"
import { Button } from "../components/ui/Button"
import Icon from "react-native-vector-icons/Ionicons"
import { Calendar } from "react-native-calendars"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTheme } from "../context/ThemeContent"

// Categories
const categories = ["Work", "Personal", "Study", "Health"]

export default function TaskDetailScreen({ navigation, route }: any) {
  const { theme } = useTheme()
  const { taskId } = route.params

  const [task, setTask] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [completed, setCompleted] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [dueDate, setDueDate] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Load task from AsyncStorage
  useEffect(() => {
    const loadTask = async () => {
      try {
        const tasksJson = await AsyncStorage.getItem("tasks")
        const tasks = tasksJson ? JSON.parse(tasksJson) : []

        const foundTask = tasks.find((t: any) => t.id === taskId)
        if (foundTask) {
          setTask(foundTask)
          setTitle(foundTask.title)
          setDescription(foundTask.description || "")
          setSelectedCategory(foundTask.category)
          setCompleted(foundTask.completed)
          setDueDate(foundTask.dueDate || "")
        }
      } catch (error) {
        console.error("Error loading task:", error)
      }
    }

    loadTask()
  }, [taskId])

  const handleSaveTask = async () => {
    if (!title.trim()) {
      // Show error for empty title
      return
    }

    const updatedTask = {
      ...task,
      title,
      description,
      category: selectedCategory,
      dueDate,
      completed,
    }

    try {
      // Get existing tasks
      const tasksJson = await AsyncStorage.getItem("tasks")
      const tasks = tasksJson ? JSON.parse(tasksJson) : []

      // Update task
      const updatedTasks = tasks.map((t: any) => (t.id === taskId ? updatedTask : t))

      // Save to AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))

      setTask(updatedTask)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving task:", error)
    }
  }

  const handleDeleteTask = async () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            // Get existing tasks
            const tasksJson = await AsyncStorage.getItem("tasks")
            const tasks = tasksJson ? JSON.parse(tasksJson) : []

            // Remove task
            const updatedTasks = tasks.filter((t: any) => t.id !== taskId)

            // Save to AsyncStorage
            await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))

            // Navigate back
            navigation.goBack()
          } catch (error) {
            console.error("Error deleting task:", error)
          }
        },
      },
    ])
  }

  const handleToggleComplete = async () => {
    const newCompletedState = !completed
    setCompleted(newCompletedState)

    if (!isEditing) {
      try {
        // Get existing tasks
        const tasksJson = await AsyncStorage.getItem("tasks")
        const tasks = tasksJson ? JSON.parse(tasksJson) : []

        // Update task
        const updatedTasks = tasks.map((t: any) => (t.id === taskId ? { ...t, completed: newCompletedState } : t))

        // Save to AsyncStorage
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))

        setTask({ ...task, completed: newCompletedState })
      } catch (error) {
        console.error("Error updating task:", error)
      }
    }
  }

  const handleDateSelect = (day: any) => {
    setDueDate(day.dateString)
    setShowCalendar(false)
  }

  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Typography variant="body">Loading task...</Typography>
      </View>
    )
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {isEditing ? (
        <>
          <View style={styles.formGroup}>
            <Typography variant="label" style={styles.label}>
              Title
            </Typography>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              placeholderTextColor={theme.colors.gray}
            />
          </View>

          <View style={styles.formGroup}>
            <Typography variant="label" style={styles.label}>
              Description
            </Typography>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter task description"
              placeholderTextColor={theme.colors.gray}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <Typography variant="label" style={styles.label}>
              Category
            </Typography>
            <View style={styles.categoryButtons}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: selectedCategory === category ? theme.colors.primary : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Typography variant="body" color={selectedCategory === category ? "#FFFFFF" : theme.colors.text}>
                    {category}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Typography variant="label" style={styles.label}>
              Due Date
            </Typography>
            <TouchableOpacity
              style={[
                styles.dateButton,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <Typography variant="body">{dueDate ? dueDate : "Select a date"}</Typography>
              <Icon name="calendar-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>

            {showCalendar && (
              <View style={[styles.calendarContainer, { backgroundColor: theme.colors.card }]}>
                <Calendar
                  onDayPress={handleDateSelect}
                  markedDates={dueDate ? { [dueDate]: { selected: true, selectedColor: theme.colors.primary } } : {}}
                  theme={{
                    calendarBackground: theme.colors.card,
                    textSectionTitleColor: theme.colors.text,
                    selectedDayBackgroundColor: theme.colors.primary,
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: theme.colors.primary,
                    dayTextColor: theme.colors.text,
                    textDisabledColor: theme.colors.gray,
                    monthTextColor: theme.colors.text,
                    arrowColor: theme.colors.primary,
                  }}
                />
              </View>
            )}
          </View>

          <View style={styles.completionContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={handleToggleComplete}>
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
            <Typography variant="body" style={styles.completionText}>
              Mark as {completed ? "incomplete" : "complete"}
            </Typography>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cancel" variant="outline" onPress={() => setIsEditing(false)} style={styles.button} />
            <Button title="Save Changes" onPress={handleSaveTask} style={styles.button} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Typography variant="h2">{task.title}</Typography>
              <View style={[styles.categoryBadge, { backgroundColor: theme.colors.lightGray }]}>
                <Typography variant="caption" color={theme.colors.gray}>
                  {task.category}
                </Typography>
              </View>
            </View>

            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
                onPress={() => setIsEditing(true)}
              >
                <Icon name="create-outline" size={20} color={theme.colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
                onPress={handleDeleteTask}
              >
                <Icon name="trash-outline" size={20} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={handleToggleComplete}>
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
            <Typography
              variant="body"
              color={completed ? theme.colors.success : theme.colors.text}
              style={styles.statusText}
            >
              {completed ? "Completed" : "Not completed"}
            </Typography>
          </View>

          {task.dueDate && (
            <View style={styles.detailItem}>
              <Icon name="calendar-outline" size={20} color={theme.colors.primary} style={styles.detailIcon} />
              <Typography variant="body">Due: {task.dueDate}</Typography>
            </View>
          )}

          {task.description && (
            <View style={styles.descriptionContainer}>
              <Typography variant="label" style={styles.sectionTitle}>
                Description
              </Typography>
              <Typography variant="body" style={styles.description}>
                {task.description}
              </Typography>
            </View>
          )}

          <Button
            title={completed ? "Mark as Incomplete" : "Mark as Complete"}
            variant={completed ? "outline" : "primary"}
            onPress={handleToggleComplete}
            style={styles.completeButton}
          />
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  statusText: {
    fontWeight: "600",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 8,
  },
  descriptionContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
  },
  completeButton: {
    marginTop: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
    paddingBottom: 12,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
  },
  dateButton: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendarContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  completionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  completionText: {
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
})


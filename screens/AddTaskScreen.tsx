"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { Typography } from "../components/ui/Typography"
import { Button } from "../components/ui/Button"
import Icon from "react-native-vector-icons/Ionicons"
import { Calendar } from "react-native-calendars"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTheme } from "../context/ThemeContent"

// Categories
const categories = ["Work", "Personal", "Study", "Health"]

export default function AddTaskScreen({ navigation, route }: any) {
  const { theme } = useTheme()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Work")
  const [showCalendar, setShowCalendar] = useState(false)
  const [dueDate, setDueDate] = useState("")

  const handleSaveTask = async () => {
    if (!title.trim()) {
      // Show error for empty title
      return
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      category: selectedCategory,
      dueDate,
      completed: false,
    }

    try {
      // Get existing tasks
      const tasksJson = await AsyncStorage.getItem("tasks")
      const tasks = tasksJson ? JSON.parse(tasksJson) : []

      // Add new task
      const updatedTasks = [newTask, ...tasks]

      // Save to AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))

      // Navigate back
      navigation.goBack()
    } catch (error) {
      console.error("Error saving task:", error)
    }
  }

  const handleDateSelect = (day: any) => {
    setDueDate(day.dateString)
    setShowCalendar(false)
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Typography variant="h2" style={styles.title}>
        Add New Task
      </Typography>

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

      <View style={styles.buttonContainer}>
        <Button title="Cancel" variant="outline" onPress={() => navigation.goBack()} style={styles.button} />
        <Button title="Save Task" onPress={handleSaveTask} style={styles.button} />
      </View>
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
  title: {
    marginBottom: 24,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
})


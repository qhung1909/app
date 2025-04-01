"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native"
import { Typography } from "../components/ui/Typography"
import { Button } from "../components/ui/Button"
import { TaskItem } from "../components/checklist/TaskItem"
import Icon from "react-native-vector-icons/Ionicons"
import { Calendar } from "react-native-calendars"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTheme } from "../context/ThemeContent"

// Sample task data
const initialTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    completed: false,
    category: "Work",
    dueDate: "2023-12-15",
  },
  {
    id: "2",
    title: "Buy groceries",
    completed: true,
    category: "Personal",
    dueDate: "2023-12-10",
  },
  {
    id: "3",
    title: "Study for exam",
    completed: false,
    category: "Study",
    dueDate: "2023-12-20",
  },
  {
    id: "4",
    title: "Go to the gym",
    completed: false,
    category: "Health",
    dueDate: "2023-12-12",
  },
  {
    id: "5",
    title: "Call mom",
    completed: false,
    category: "Personal",
    dueDate: "2023-12-11",
  },
]

// Categories
const categories = ["All", "Work", "Personal", "Study", "Health"]

// Filter options
const filterOptions = ["All", "Completed", "Incomplete"]

export default function ChecklistScreen({ navigation }: any) {
  const { theme } = useTheme()
  const [tasks, setTasks] = useState(initialTasks)
  const [filteredTasks, setFilteredTasks] = useState(initialTasks)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks))
        }
      } catch (error) {
        console.error("Error loading tasks:", error)
      }
    }

    loadTasks()
  }, [])

  // Save tasks to AsyncStorage
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
      } catch (error) {
        console.error("Error saving tasks:", error)
      }
    }

    saveTasks()
  }, [tasks])

  // Filter tasks based on selected category, filter, and date
  useEffect(() => {
    let result = [...tasks]

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((task) => task.category === selectedCategory)
    }

    // Filter by completion status
    if (selectedFilter === "Completed") {
      result = result.filter((task) => task.completed)
    } else if (selectedFilter === "Incomplete") {
      result = result.filter((task) => !task.completed)
    }

    // Filter by date
    if (selectedDate) {
      result = result.filter((task) => task.dueDate === selectedDate)
    }

    setFilteredTasks(result)
  }, [tasks, selectedCategory, selectedFilter, selectedDate])

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleTaskPress = (id: string) => {
    navigation.navigate("TaskDetail", { taskId: id })
  }

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString)
    setShowCalendar(false)
  }

  // Generate marked dates for calendar
  const getMarkedDates = () => {
    const markedDates: any = {}

    tasks.forEach((task) => {
      if (task.dueDate) {
        markedDates[task.dueDate] = {
          marked: true,
          dotColor: task.completed ? theme.colors.success : theme.colors.primary,
        }
      }
    })

    if (selectedDate) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: theme.colors.primary,
      }
    }

    return markedDates
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Typography variant="h2">Tasks</Typography>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Icon name="calendar-outline" size={20} color={theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate("AddTask")}
          >
            <Icon name="add" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <View style={[styles.calendarContainer, { backgroundColor: theme.colors.card }]}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={getMarkedDates()}
            theme={{
              calendarBackground: theme.colors.card,
              textSectionTitleColor: theme.colors.text,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: "#ffffff",
              todayTextColor: theme.colors.primary,
              dayTextColor: theme.colors.text,
              textDisabledColor: theme.colors.gray,
              dotColor: theme.colors.primary,
              monthTextColor: theme.colors.text,
              arrowColor: theme.colors.primary,
            }}
          />
        </View>
      )}

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
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
              <Typography variant="caption" color={selectedCategory === category ? "#FFFFFF" : theme.colors.text}>
                {category}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.filterButtons}>
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                {
                  backgroundColor: selectedFilter === filter ? theme.colors.primary : theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Typography variant="caption" color={selectedFilter === filter ? "#FFFFFF" : theme.colors.text}>
                {filter}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Typography variant="body">Tasks for: {selectedDate}</Typography>
          <TouchableOpacity onPress={() => setSelectedDate("")}>
            <Icon name="close-circle-outline" size={20} color={theme.colors.gray} />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            title={item.title}
            completed={item.completed}
            category={item.category}
            dueDate={item.dueDate}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onPress={handleTaskPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="checkmark-done-circle-outline" size={64} color={theme.colors.gray} />
            <Typography variant="h3" style={styles.emptyText}>
              No tasks found
            </Typography>
            <Typography variant="body" color={theme.colors.gray}>
              Add a new task or change filters
            </Typography>
          </View>
        }
      />

      <Button title="Add New Task" onPress={() => navigation.navigate("AddTask")} style={styles.addButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
  calendarContainer: {
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  filterContainer: {
    padding: 16,
  },
  categoryContainer: {
    paddingBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  filterButtons: {
    flexDirection: "row",
    marginTop: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  selectedDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
})


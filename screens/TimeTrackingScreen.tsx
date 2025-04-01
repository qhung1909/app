"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"

import { Typography } from "../components/ui/Typography"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { TimeEntry } from "../components/timetracking/TimeEntry"
import Icon from "react-native-vector-icons/Ionicons"
import { BarChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTheme } from "../context/ThemeContent"

const screenWidth = Dimensions.get("window").width

// Sample time entries
const initialTimeEntries = [
  {
    id: "1",
    date: "15 Dec",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    totalHours: 8.5,
  },
  {
    id: "2",
    date: "14 Dec",
    checkIn: "08:45 AM",
    checkOut: "06:15 PM",
    totalHours: 9.5,
  },
  {
    id: "3",
    date: "13 Dec",
    checkIn: "09:15 AM",
    checkOut: "05:45 PM",
    totalHours: 8.5,
  },
  {
    id: "4",
    date: "12 Dec",
    checkIn: "09:30 AM",
    checkOut: "04:30 PM",
    totalHours: 7,
  },
  {
    id: "5",
    date: "11 Dec",
    checkIn: "08:30 AM",
    checkOut: "06:00 PM",
    totalHours: 9.5,
  },
]

export default function TimeTrackingScreen() {
  const { theme, isDarkMode } = useTheme()
  const [timeEntries, setTimeEntries] = useState(initialTimeEntries)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  // Load time entries from AsyncStorage
  useEffect(() => {
    const loadTimeEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem("timeEntries")
        if (storedEntries !== null) {
          setTimeEntries(JSON.parse(storedEntries))
        }
      } catch (error) {
        console.error("Error loading time entries:", error)
      }
    }

    loadTimeEntries()
  }, [])

  // Save time entries to AsyncStorage
  useEffect(() => {
    const saveTimeEntries = async () => {
      try {
        await AsyncStorage.setItem("timeEntries", JSON.stringify(timeEntries))
      } catch (error) {
        console.error("Error saving time entries:", error)
      }
    }

    saveTimeEntries()
  }, [timeEntries])

  // Set current date
  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    }
    setCurrentDate(date.toLocaleDateString("en-US", options))
  }, [])

  // Calculate total hours for the week and month
  const calculateTotalHours = (period: "week" | "month") => {
    const daysToConsider = period === "week" ? 7 : 30
    return timeEntries.slice(0, daysToConsider).reduce((total, entry) => total + entry.totalHours, 0)
  }

  const handleCheckIn = () => {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setCheckInTime(formattedTime)
    setIsCheckedIn(true)
  }

  const handleCheckOut = () => {
    const now = new Date()
    const checkOutTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Calculate hours worked
    const checkInDate = new Date()
    const [checkInHours, checkInMinutes, checkInPeriod] = checkInTime.match(/(\d+):(\d+) (\w+)/).slice(1)
    checkInDate.setHours(
      Number.parseInt(checkInHours) + (checkInPeriod === "PM" && checkInHours !== "12" ? 12 : 0),
      Number.parseInt(checkInMinutes),
    )

    const checkOutDate = new Date()
    const [checkOutHours, checkOutMinutes, checkOutPeriod] = checkOutTime.match(/(\d+):(\d+) (\w+)/).slice(1)
    checkOutDate.setHours(
      Number.parseInt(checkOutHours) + (checkOutPeriod === "PM" && checkOutHours !== "12" ? 12 : 0),
      Number.parseInt(checkOutMinutes),
    )

    const totalHours = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60)

    // Add new time entry
    const newEntry = {
      id: Date.now().toString(),
      date: currentDate,
      checkIn: checkInTime,
      checkOut: checkOutTime,
      totalHours: Number.parseFloat(totalHours.toFixed(1)),
    }

    setTimeEntries([newEntry, ...timeEntries])
    setIsCheckedIn(false)
    setCheckInTime("")
  }

  const handleEntryPress = (id: string) => {
    // Handle entry press (e.g., edit entry)
    console.log("Entry pressed:", id)
  }

  // Prepare data for the chart
  const chartData = {
    labels: timeEntries.slice(0, 7).map((entry) => entry.date.split(" ")[0]),
    datasets: [
      {
        data: timeEntries.slice(0, 7).map((entry) => entry.totalHours),
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(${isDarkMode ? "255, 255, 255" : "0, 0, 0"}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${isDarkMode ? "255, 255, 255" : "0, 0, 0"}, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Typography variant="h2" style={styles.title}>
        Time Tracking
      </Typography>

      <Card style={styles.checkInCard}>
        <Typography variant="h3">Today: {currentDate}</Typography>

        <View style={styles.timeStatus}>
          {isCheckedIn ? (
            <>
              <View style={styles.timeInfo}>
                <Icon name="time-outline" size={20} color={theme.colors.primary} />
                <Typography variant="body" style={styles.timeText}>
                  Checked in at {checkInTime}
                </Typography>
              </View>

              <Button title="Check Out" variant="primary" onPress={handleCheckOut} />
            </>
          ) : (
            <>
              <Typography variant="body">You haven't checked in today</Typography>

              <Button title="Check In" variant="primary" onPress={handleCheckIn} />
            </>
          )}
        </View>
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Typography variant="label">This Week</Typography>
          <Typography variant="h2">{calculateTotalHours("week").toFixed(1)}</Typography>
          <Typography variant="caption" color={theme.colors.gray}>
            hours
          </Typography>
        </Card>

        <Card style={styles.statCard}>
          <Typography variant="label">This Month</Typography>
          <Typography variant="h2">{calculateTotalHours("month").toFixed(1)}</Typography>
          <Typography variant="caption" color={theme.colors.gray}>
            hours
          </Typography>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Hours per Day
        </Typography>
        <BarChart
          data={chartData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
        />
      </Card>

      <Typography variant="h3" style={styles.sectionTitle}>
        Recent Entries
      </Typography>

      {timeEntries.map((entry) => (
        <TimeEntry
          key={entry.id}
          id={entry.id}
          date={entry.date}
          checkIn={entry.checkIn}
          checkOut={entry.checkOut}
          totalHours={entry.totalHours}
          onPress={handleEntryPress}
        />
      ))}
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
    marginBottom: 16,
  },
  checkInCard: {
    marginBottom: 16,
  },
  timeStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    margin: 4,
    alignItems: "center",
  },
  chartCard: {
    marginBottom: 24,
  },
  chartTitle: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 8,
  },
})


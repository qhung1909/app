"use client"
import { View, StyleSheet, ScrollView } from "react-native"
import { Typography } from "../components/ui/Typography"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { LineChart, BarChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { useTheme } from "../context/ThemeContent"
import { StatCard } from "../components/dashboard/StartCard"
const screenWidth = Dimensions.get("window").width

export default function DashboardScreen({ navigation }: any) {
  const { theme, isDarkMode, toggleTheme } = useTheme()

  // Sample data for charts
  const taskData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [5, 8, 6, 9, 7, 3, 4],
      },
    ],
  }

  const financeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [2500, 2800, 3200, 2900, 3500, 3800],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [1800, 2100, 2300, 2000, 2400, 2600],
        color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${isDarkMode ? "255, 255, 255" : "0, 0, 0"}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${isDarkMode ? "255, 255, 255" : "0, 0, 0"}, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.colors.primary,
    },
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Typography variant="h1">Dashboard</Typography>
        <Button
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
          variant="outline"
          size="small"
          onPress={toggleTheme}
          style={styles.themeButton}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Tasks"
          value="12/20"
          icon="checkmark-circle-outline"
          iconColor={theme.colors.primary}
          subtitle="60% completed"
        />
        <StatCard title="Hours" value="32" icon="time-outline" iconColor={theme.colors.accent} subtitle="This week" />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Income"
          value="$3,800"
          icon="trending-up-outline"
          iconColor={theme.colors.success}
          subtitle="This month"
        />
        <StatCard
          title="Expenses"
          value="$2,600"
          icon="trending-down-outline"
          iconColor={theme.colors.error}
          subtitle="This month"
        />
      </View>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Tasks Completed
        </Typography>
        <BarChart
          data={taskData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
        />
      </Card>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Financial Overview
        </Typography>
        <Typography variant="caption" color={theme.colors.gray} style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "rgba(46, 204, 113, 1)" }]} />
            <Typography variant="caption" color={theme.colors.gray}>
              Income
            </Typography>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "rgba(231, 76, 60, 1)" }]} />
            <Typography variant="caption" color={theme.colors.gray}>
              Expenses
            </Typography>
          </View>
        </Typography>
        <LineChart
          data={financeData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier
        />
      </Card>

      <Button
        title="Add New Task"
        onPress={() => navigation.navigate("Checklist", { screen: "AddTask" })}
        style={styles.addButton}
      />
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
    alignItems: "center",
    marginBottom: 16,
  },
  themeButton: {
    marginLeft: 16,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: -8,
    marginBottom: 8,
  },
  chartCard: {
    marginVertical: 16,
    padding: 16,
  },
  chartTitle: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartLegend: {
    flexDirection: "row",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  addButton: {
    marginTop: 16,
  },
})


"use client"
import { View, StyleSheet, ScrollView } from "react-native"
import { Typography } from "../components/ui/Typography"
import { Card } from "../components/ui/Card"
import { BarChart, LineChart, PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { useTheme } from "../context/ThemeContent"

const screenWidth = Dimensions.get("window").width

export default function StatisticsScreen() {
  const { theme, isDarkMode } = useTheme()

  // Chart configurations
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

  // Work hours data
  const workHoursData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [8.5, 9.5, 8.5, 7, 9.5, 4, 0],
      },
    ],
  }

  // Task completion data
  const taskCompletionData = [
    {
      name: "Completed",
      count: 15,
      color: theme.colors.success,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: "In Progress",
      count: 5,
      color: theme.colors.warning,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: "Not Started",
      count: 8,
      color: theme.colors.error,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
  ]

  // Financial data
  const financialData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [2800, 3200, 3000, 3500, 3800, 4000],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [2100, 2300, 2000, 2400, 2600, 2800],
        color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Income", "Expenses"],
  }

  // Productivity by category data
  const productivityData = {
    labels: ["Work", "Personal", "Study", "Health"],
    datasets: [
      {
        data: [80, 65, 70, 55],
      },
    ],
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Typography variant="h2" style={styles.title}>
        Statistics
      </Typography>

      <View style={styles.summaryCards}>
        <Card style={styles.summaryCard}>
          <Typography variant="label">Work Days</Typography>
          <Typography variant="h2">22</Typography>
          <Typography variant="caption" color={theme.colors.gray}>
            This month
          </Typography>
        </Card>

        <Card style={styles.summaryCard}>
          <Typography variant="label">Total Hours</Typography>
          <Typography variant="h2">168</Typography>
          <Typography variant="caption" color={theme.colors.gray}>
            This month
          </Typography>
        </Card>

        <Card style={styles.summaryCard}>
          <Typography variant="label">Tasks</Typography>
          <Typography variant="h2">28</Typography>
          <Typography variant="caption" color={theme.colors.gray}>
            Total
          </Typography>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Daily Work Hours
        </Typography>
        <BarChart
          data={workHoursData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
        />
      </Card>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Task Completion
        </Typography>
        <PieChart
          data={taskCompletionData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </Card>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Financial Overview
        </Typography>
        <LineChart
          data={financialData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier
        />
      </Card>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Productivity by Category
        </Typography>
        <BarChart
          data={productivityData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
          yAxisSuffix="%"
        />
      </Card>
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
  summaryCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
    marginBottom: 16,
  },
  summaryCard: {
    width: "33%",
    margin: 0,
    padding: 12,
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
})


"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Typography } from "../components/ui/Typography"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { TransactionItem } from "../components/finance/TransactionItem"
import { LineChart, PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTheme } from "../context/ThemeContent"

const screenWidth = Dimensions.get("window").width

// Sample transactions
const initialTransactions = [
  {
    id: "1",
    title: "Salary",
    amount: 3500,
    date: "2023-12-01",
    category: "Salary",
    type: "income",
  },
  {
    id: "2",
    title: "Freelance Project",
    amount: 800,
    date: "2023-12-05",
    category: "Freelance",
    type: "income",
  },
  {
    id: "3",
    title: "Rent",
    amount: 1200,
    date: "2023-12-02",
    category: "Housing",
    type: "expense",
  },
  {
    id: "4",
    title: "Groceries",
    amount: 150,
    date: "2023-12-07",
    category: "Food",
    type: "expense",
  },
  {
    id: "5",
    title: "Restaurant",
    amount: 85,
    date: "2023-12-10",
    category: "Food",
    type: "expense",
  },
  {
    id: "6",
    title: "Uber",
    amount: 25,
    date: "2023-12-08",
    category: "Transport",
    type: "expense",
  },
  {
    id: "7",
    title: "Movie Tickets",
    amount: 30,
    date: "2023-12-09",
    category: "Entertainment",
    type: "expense",
  },
]

// Categories with colors
const categories = [
  { name: "Food", color: "#FF9500" },
  { name: "Transport", color: "#5856D6" },
  { name: "Entertainment", color: "#FF2D55" },
  { name: "Housing", color: "#5AC8FA" },
  { name: "Shopping", color: "#4CD964" },
  { name: "Salary", color: "#007AFF" },
  { name: "Freelance", color: "#34C759" },
]

export default function FinanceScreen() {
  const { theme, isDarkMode } = useTheme()
  const [transactions, setTransactions] = useState(initialTransactions)
  const [activeTab, setActiveTab] = useState("all")
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  // Load transactions from AsyncStorage
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem("transactions")
        if (storedTransactions !== null) {
          setTransactions(JSON.parse(storedTransactions))
        }
      } catch (error) {
        console.error("Error loading transactions:", error)
      }
    }

    loadTransactions()
  }, [])

  // Save transactions to AsyncStorage
  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await AsyncStorage.setItem("transactions", JSON.stringify(transactions))
      } catch (error) {
        console.error("Error saving transactions:", error)
      }
    }

    saveTransactions()
  }, [transactions])

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true
    return transaction.type === activeTab
  })

  // Calculate total income, expenses, and balance
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  // Calculate expenses by category for pie chart
  const expensesByCategory = categories
    .map((category) => {
      const amount = transactions
        .filter((t) => t.type === "expense" && t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0)

      return {
        name: category.name,
        amount,
        color: category.color,
        legendFontColor: theme.colors.text,
        legendFontSize: 12,
      }
    })
    .filter((item) => item.amount > 0)

  // Prepare data for line chart
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const lineChartData = {
    labels: months.slice(-6),
    datasets: [
      {
        data: [2800, 3200, 3000, 3500, 3800, totalIncome],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [2100, 2300, 2000, 2400, 2600, totalExpenses],
        color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Income", "Expenses"],
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

  const handleTransactionPress = (id: string) => {
    // Handle transaction press (e.g., edit transaction)
    console.log("Transaction pressed:", id)
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Typography variant="h2" style={styles.title}>
        Finances
      </Typography>

      <View style={styles.balanceCards}>
        <Card style={[styles.balanceCard, { backgroundColor: theme.colors.success }]}>
          <Typography variant="label" color="#FFFFFF">
            Total Income
          </Typography>
          <Typography variant="h2" color="#FFFFFF">
            ${totalIncome.toFixed(2)}
          </Typography>
        </Card>

        <Card style={[styles.balanceCard, { backgroundColor: theme.colors.error }]}>
          <Typography variant="label" color="#FFFFFF">
            Total Expenses
          </Typography>
          <Typography variant="h2" color="#FFFFFF">
            ${totalExpenses.toFixed(2)}
          </Typography>
        </Card>
      </View>

      <Card style={styles.balanceSummary}>
        <Typography variant="h3">Current Balance</Typography>
        <Typography
          variant="h1"
          color={balance >= 0 ? theme.colors.success : theme.colors.error}
          style={styles.balanceAmount}
        >
          ${balance.toFixed(2)}
        </Typography>
      </Card>

      <Card style={styles.chartCard}>
        <Typography variant="h3" style={styles.chartTitle}>
          Income vs Expenses
        </Typography>
        <LineChart
          data={lineChartData}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier
        />
      </Card>

      {expensesByCategory.length > 0 && (
        <Card style={styles.chartCard}>
          <Typography variant="h3" style={styles.chartTitle}>
            Expenses by Category
          </Typography>
          <PieChart
            data={expensesByCategory}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card>
      )}

      <View style={styles.transactionsHeader}>
        <Typography variant="h3">Transactions</Typography>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "all" && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => setActiveTab("all")}
          >
            <Typography variant="caption" color={activeTab === "all" ? "#FFFFFF" : theme.colors.text}>
              All
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "income" && {
                backgroundColor: theme.colors.success,
              },
            ]}
            onPress={() => setActiveTab("income")}
          >
            <Typography variant="caption" color={activeTab === "income" ? "#FFFFFF" : theme.colors.text}>
              Income
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "expense" && {
                backgroundColor: theme.colors.error,
              },
            ]}
            onPress={() => setActiveTab("expense")}
          >
            <Typography variant="caption" color={activeTab === "expense" ? "#FFFFFF" : theme.colors.text}>
              Expenses
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {filteredTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          id={transaction.id}
          title={transaction.title}
          amount={transaction.amount}
          date={transaction.date}
          category={transaction.category}
          type={transaction.type as "income" | "expense"}
          onPress={handleTransactionPress}
        />
      ))}

      <Button title="Add Transaction" onPress={() => setShowAddTransaction(true)} style={styles.addButton} />
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
  balanceCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  balanceCard: {
    flex: 1,
    margin: 4,
    padding: 16,
  },
  balanceSummary: {
    alignItems: "center",
    marginBottom: 16,
    padding: 24,
  },
  balanceAmount: {
    marginTop: 8,
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
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  addButton: {
    marginTop: 16,
  },
})


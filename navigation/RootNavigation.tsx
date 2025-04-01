"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"

// Screens
import DashboardScreen from "../screens/DashboardScreen"
import ChecklistScreen from "../screens/ChecklistScreen"
import StatisticsScreen from "../screens/StatisticsScreen"
import AddTaskScreen from "../screens/AddTaskScreen"
import TaskDetailScreen from "../screens/TaskDetailScreen"
import { useTheme } from "../context/ThemeContent"
import FinanceScreen from "../screens/FianceScreen"
import TimeTrackingScreen from "../screens/TimetrackingScreen"
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const ChecklistStack = () => {
  const { theme } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="ChecklistMain" component={ChecklistScreen} options={{ title: "Checklist" }} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: "Add Task" }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Task Details" }} />
    </Stack.Navigator>
  )
}

export default function RootNavigator() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = ""

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Checklist") {
            iconName = focused ? "checkmark-circle" : "checkmark-circle-outline"
          } else if (route.name === "TimeTracking") {
            iconName = focused ? "time" : "time-outline"
          } else if (route.name === "Finance") {
            iconName = focused ? "wallet" : "wallet-outline"
          } else if (route.name === "Statistics") {
            iconName = focused ? "bar-chart" : "bar-chart-outline"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Checklist" component={ChecklistStack} options={{ headerShown: false }} />
      <Tab.Screen name="TimeTracking" component={TimeTrackingScreen} options={{ title: "Time Tracking" }} />
      <Tab.Screen name="Finance" component={FinanceScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
    </Tab.Navigator>
  )
}


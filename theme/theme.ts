export type Theme = {
    colors: {
      primary: string
      background: string
      card: string
      text: string
      border: string
      notification: string
      accent: string
      success: string
      warning: string
      error: string
      gray: string
      lightGray: string
    }
    spacing: {
      xs: number
      s: number
      m: number
      l: number
      xl: number
      xxl: number
    }
    borderRadius: {
      s: number
      m: number
      l: number
    }
    fontSize: {
      xs: number
      s: number
      m: number
      l: number
      xl: number
      xxl: number
    }
  }
  
  export const lightTheme: Theme = {
    colors: {
      primary: "#007AFF",
      background: "#F2F2F7",
      card: "#FFFFFF",
      text: "#000000",
      border: "#C7C7CC",
      notification: "#FF3B30",
      accent: "#5856D6",
      success: "#34C759",
      warning: "#FF9500",
      error: "#FF3B30",
      gray: "#8E8E93",
      lightGray: "#E5E5EA",
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      s: 4,
      m: 8,
      l: 16,
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  }
  
  export const darkTheme: Theme = {
    colors: {
      primary: "#0A84FF",
      background: "#000000",
      card: "#1C1C1E",
      text: "#FFFFFF",
      border: "#38383A",
      notification: "#FF453A",
      accent: "#5E5CE6",
      success: "#30D158",
      warning: "#FF9F0A",
      error: "#FF453A",
      gray: "#8E8E93",
      lightGray: "#38383A",
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      s: 4,
      m: 8,
      l: 16,
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  }
  
  
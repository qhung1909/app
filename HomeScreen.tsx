"use client"

import type React from "react"
import { ScrollView, StyleSheet, View, Dimensions, StatusBar } from "react-native"
import { Appbar, Button, Card, Chip, FAB, Text, Title, Paragraph, useTheme, Avatar, Surface } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

const HomeScreen: React.FC = () => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    hero: {
      padding: 24,
      marginBottom: 16,
    },
    heroTitle: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 8,
    },
    heroSubtitle: {
      fontSize: 16,
      opacity: 0.7,
      marginBottom: 24,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
    },
    featuredSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 16,
      marginBottom: 16,
    },
    cardContainer: {
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    card: {
      marginBottom: 16,
    },
    cardImage: {
      height: 200,
    },
    categoriesContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 8,
      gap: 8,
    },
    chip: {
      marginRight: 8,
    },
    popularItemsContainer: {
      paddingHorizontal: 16,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    popularItem: {
      width: (width - 48) / 2,
      marginBottom: 16,
    },
    fab: {
      position: "absolute",
      right: 16,
      bottom: 16,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaceVariant,
    },
    footerText: {
      textAlign: "center",
      opacity: 0.7,
    },
    avatar: {
      backgroundColor: theme.colors.primary,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 16,
      marginBottom: 16,
      backgroundColor: theme.colors.surfaceVariant,
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 14,
      opacity: 0.7,
    },
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />

        <Appbar.Header>
          <Appbar.Content title="Explore" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon="bell-outline" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Welcome back, Alex!</Text>
            <Text style={styles.heroSubtitle}>Discover amazing content and connect with others</Text>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => {}}>
                Explore
              </Button>
              <Button mode="outlined" onPress={() => {}}>
                My Profile
              </Button>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <Chip selected style={styles.chip} onPress={() => {}}>
              All
            </Chip>
            <Chip style={styles.chip} onPress={() => {}}>
              Popular
            </Chip>
            <Chip style={styles.chip} onPress={() => {}}>
              Recent
            </Chip>
            <Chip style={styles.chip} onPress={() => {}}>
              Trending
            </Chip>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3.4K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <Card.Cover source={{ uri: "https://picsum.photos/700" }} style={styles.cardImage} />
                <Card.Content>
                  <Title>Discover amazing destinations</Title>
                  <Paragraph>Explore the most beautiful places around the world with our curated guides.</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button>Read More</Button>
                  <Button icon="heart-outline">Like</Button>
                </Card.Actions>
              </Card>
            </View>
          </View>

          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
            <View style={styles.popularItemsContainer}>
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} style={styles.popularItem}>
                  <Card.Cover source={{ uri: `https://picsum.photos/500?random=${item}` }} />
                  <Card.Content>
                    <Title>Item {item}</Title>
                    <Paragraph numberOfLines={2}>
                      A brief description of this amazing item that you should check out.
                    </Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </View>

          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>People to Follow</Text>
            {[1, 2, 3].map((person) => (
              <Surface key={person} style={{ marginHorizontal: 16, marginBottom: 12, padding: 12, borderRadius: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar.Text size={50} label={`P${person}`} style={styles.avatar} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: "bold" }}>Person {person}</Text>
                    <Text style={{ opacity: 0.7 }}>@username{person}</Text>
                  </View>
                  <Button mode="outlined" compact>
                    Follow
                  </Button>
                </View>
              </Surface>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Your Amazing App</Text>
          </View>
        </ScrollView>

        <FAB style={styles.fab} icon="plus" onPress={() => {}} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default HomeScreen


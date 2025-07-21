import React, { useState, useEffect, useRef, useCallback } from "react"
import { Animated, View, Text, Dimensions, StatusBar } from "react-native"
import PostCard from "../components/PostCard"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const ITEM_SPACING = 18
const ITEM_WIDTH = (screenWidth - 60) / 1.8
const ITEM_HEIGHT = 240

const ListWithAnimation = () => {
    const [data] = useState(
        Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            title: `${getTitles()[i % getTitles().length]}`,
            description: `${getDescriptions()[i % getDescriptions().length]}`,
            author: `${getAuthors()[i % getAuthors().length]}`,
            category: `${getCategories()[i % getCategories().length]}`,
            image: `https://picsum.photos/300/200?random=${i + 1}`,
            authorAvatar: `https://i.pravatar.cc/40?img=${(i % 50) + 1}`,
            publishDate: getRandomDate(),
        })),
    )

    // Track scroll direction (right or left)
    const [isScrollingRight, setIsScrollingRight] = useState(false)

    // Create animated value for tracking horizontal scroll position
    const scrollX = useRef(new Animated.Value(0)).current

    // Store previous scroll position to determine direction
    const prevScrollX = useRef(0)

    // Set up scroll listener to track scroll direction
    useEffect(() => {
        const listenerId = scrollX.addListener(({ value }) => {
            const diff = value - prevScrollX.current
            setIsScrollingRight(diff > 0)
            prevScrollX.current = value
        })

        // Clean up listener when component unmounts
        return () => scrollX.removeListener(listenerId)
    }, [scrollX])

    // Render each item with animation based on scroll position
    const _renderItem = useCallback(
        ({ item, index }) => {
            // Create vertical translation animation based on scroll position
            const translateY = scrollX.interpolate({
                inputRange: [
                    (ITEM_WIDTH + ITEM_SPACING) * (index - 1), // Previous item position
                    (ITEM_WIDTH + ITEM_SPACING) * index, // Current item position
                    (ITEM_WIDTH + ITEM_SPACING) * (index + 1), // Next item position
                ],
                // Apply much stronger vertical shift when scrolling left (not right)
                // Items start from much lower position and animate up
                outputRange: [0, 0, isScrollingRight ? 0 : 120], // Increased from 35 to 120
                extrapolate: "clamp",
            })

            // Scale animation for better visual effect
            const scale = scrollX.interpolate({
                inputRange: [
                    (ITEM_WIDTH + ITEM_SPACING) * (index - 1),
                    (ITEM_WIDTH + ITEM_SPACING) * index,
                    (ITEM_WIDTH + ITEM_SPACING) * (index + 1),
                ],
                outputRange: [0.96, 1, 0.96],
                extrapolate: "clamp",
            })

            // Add opacity animation for more dramatic effect
            const opacity = scrollX.interpolate({
                inputRange: [
                    (ITEM_WIDTH + ITEM_SPACING) * (index - 1),
                    (ITEM_WIDTH + ITEM_SPACING) * index,
                    (ITEM_WIDTH + ITEM_SPACING) * (index + 1),
                ],
                outputRange: [1, 1, isScrollingRight ? 1 : 0.3], // Fade effect when scrolling left
                extrapolate: "clamp",
            })

            return (
                <Animated.View
                    style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        transform: [{ translateY }, { scale }],
                        opacity,
                    }}
                >
                    <PostCard item={item} />
                </Animated.View>
            )
        },
        [isScrollingRight, scrollX],
    )

    return (
        <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            <View
                style={{
                    paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20, backgroundColor: "white",
                    borderBottomLeftRadius: 30, borderBottomRightRadius: 30, shadowColor: "#000", elevation: 5,
                    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8
                }} >
                <Text
                    style={{
                        fontSize: 32, fontWeight: "800", color: "#1a1a1a",
                        textAlign: "center", marginBottom: 8
                    }}>
                    Discover Stories
                </Text>

                <Text style={{ fontSize: 16, color: "#666", textAlign: "center", lineHeight: 22 }}>
                    Swipe through amazing content from talented creators
                </Text>
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Animated.FlatList
                    horizontal
                    pagingEnabled={false}
                    snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={_renderItem}
                    ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        alignItems: "center",
                    }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                    overScrollMode="never"
                    bounces={false}
                />
            </View>

            {/* Footer  */}
            <View
                style={{
                    paddingVertical: 25, paddingHorizontal: 20, backgroundColor: "white", borderTopLeftRadius: 30,
                    borderTopRightRadius: 30, shadowColor: "#000", elevation: 5,
                    shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8,
                }}>
                <Text style={{ fontSize: 14, color: "#666", textAlign: "center", fontWeight: "500", }} >
                    Swipe to explore more stories
                </Text>

                <View
                    style={{
                        width: 60, height: 3, backgroundColor: "#4a90e2",
                        borderRadius: 2, alignSelf: "center", marginTop: 8,
                    }} />
            </View>
        </View>
    )
}

// Helper functions for generating diverse content
const getTitles = () => [
    "Mobile Development Tips",
    "React Native Guide",
    "JavaScript Basics",
    "UI Design Trends",
    "Clean Code Tips",
    "App Performance",
    "Cross-Platform Dev",
    "Modern JS Features",
    "User Experience",
    "Development Tools",
]

const getDescriptions = () => [
    "Learn essential tips for building amazing mobile apps",
    "Complete guide to React Native development",
    "Master the fundamentals of JavaScript programming",
    "Explore the latest trends in user interface design",
    "Write maintainable and scalable code",
    "Optimize your app for better performance",
    "Build apps that work on multiple platforms",
    "Discover new JavaScript features and syntax",
    "Create delightful user experiences",
    "Essential tools every developer should know",
]

const getAuthors = () => [
    "Sarah Johnson",
    "Mike Chen",
    "Emily Rodriguez",
    "David Kim",
    "Lisa Wang",
    "Alex Thompson",
    "Maria Garcia",
    "James Wilson",
    "Anna Lee",
    "Chris Brown",
]

const getCategories = () => ["TECH", "DESIGN", "DEV", "MOBILE", "WEB", "AI", "UX", "TIPS"]

const getRandomDate = () => {
    const dates = ["2 days ago", "1 week ago", "3 days ago", "5 days ago", "1 day ago", "4 days ago"]
    return dates[Math.floor(Math.random() * dates.length)]
}

export default ListWithAnimation

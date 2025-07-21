import React from 'react'
import { View, Text, Image } from "react-native"

const PostCard = ({ item }) => {
    return (
        <View
            style={{
                backgroundColor: "white", borderRadius: 18, shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, elevation: 8,
                shadowRadius: 10, overflow: "hidden", marginHorizontal: 3
            }}>
            <Image
                resizeMode="cover"
                source={{ uri: item.image }}
                style={{ width: "100%", height: 120, backgroundColor: "#f0f0f0" }} />

            <View
                style={{
                    position: "absolute", top: 10, left: 10, borderRadius: 12,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    paddingHorizontal: 10, paddingVertical: 4,
                }}>
                <Text
                    style={{
                        color: "white", fontSize: 9, fontWeight: "700",
                        textTransform: "uppercase", letterSpacing: 0.5,
                    }}>
                    {item.category}
                </Text>
            </View>

            <View style={{ padding: 14 }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 15, fontWeight: "800", color: "#1a1a1a",
                        marginBottom: 6, lineHeight: 20
                    }}>
                    {item.title}
                </Text>

                <Text
                    numberOfLines={2}
                    style={{ fontSize: 12, color: "#666", lineHeight: 16, marginBottom: 10 }}>
                    {item.description}
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <Image
                            source={{ uri: item.authorAvatar }}
                            style={{
                                width: 20, height: 20, borderRadius: 10, marginRight: 6,
                                backgroundColor: "#f0f0f0", borderWidth: 1, borderColor: "#e0e0e0",
                            }} />

                        <View style={{ flex: 1 }}>
                            <Text
                                numberOfLines={1}
                                style={{ fontSize: 11, fontWeight: "600", color: "#333" }}>
                                {item.author}
                            </Text>

                            <Text style={{ fontSize: 9, color: "#999", marginTop: 1 }}>
                                {item.publishDate}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PostCard

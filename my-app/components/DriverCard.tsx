import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
    return (
        <TouchableOpacity
            onPress={setSelected}
            style={[
                styles.cardContainer,
                selected === item.id && styles.cardSelected,
            ]}
        >
            <Image
                source={{ uri: item.profile_image_url }}
                style={styles.profileImage}
            />

            <View style={styles.infoContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={icons.star} style={styles.iconSmall} />
                        <Text style={styles.ratingText}>4</Text>
                    </View>
                </View>

                <View style={styles.details}>
                    <View style={styles.detailItem}>
                        <Image source={icons.dollar} style={styles.iconSmall} />
                        <Text style={styles.detailText}>${item.price}</Text>
                    </View>
                    <Text style={styles.separator}>|</Text>
                    <Text style={styles.detailText}>{formatTime(item.time!)}</Text>
                    <Text style={styles.separator}>|</Text>
                    <Text style={styles.detailText}>{item.car_seats} seats</Text>
                </View>
            </View>

            <Image
                source={{ uri: item.car_image_url }}
                style={styles.carImage}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: "white",
    },
    cardSelected: {
        backgroundColor: "#4CAF50", // Replace with your theme's selected background color
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontFamily: "JakartaRegular",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
    },
    iconSmall: {
        width: 14,
        height: 14,
    },
    ratingText: {
        fontSize: 14,
        fontFamily: "JakartaRegular",
    },
    details: {
        flexDirection: "row",
        alignItems: "center",
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    detailText: {
        fontSize: 14,
        fontFamily: "JakartaRegular",
        marginLeft: 4,
        color: "#555555", // Replace with your theme's text color
    },
    separator: {
        fontSize: 14,
        fontFamily: "JakartaRegular",
        marginHorizontal: 4,
        color: "#555555",
    },
    carImage: {
        width: 56,
        height: 56,
    },
});

export default DriverCard;

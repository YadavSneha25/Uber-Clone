import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";
  import { router } from "expo-router";
  import React, { useRef } from "react";
  import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
  } from "react-native";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  
  import Map from "@/components/Map";
  import { icons } from "@/constants";
  
  const RideLayout = ({
    title,
    snapPoints,
    children,
  }: {
    title: string;
    snapPoints?: string[];
    children: React.ReactNode;
  }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
  
    return (
      <GestureHandlerRootView style={styles.flex1}>
        <View style={styles.flex1}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => router.back()}>
                <View style={styles.backButton}>
                  <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    style={styles.backArrow}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.headerText}>{title || "Go Back"}</Text>
            </View>
  
            <Map />
          </View>
  
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["40%", "85%"]}
            index={0}
          >
            {title === "Choose a Rider" ? (
              <BottomSheetView style={styles.bottomSheetContent}>
                {children}
              </BottomSheetView>
            ) : (
              <BottomSheetView style={styles.bottomSheetContent}>
                {children}
              </BottomSheetView>
            )}
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    flex1: {
      flex: 1,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#3B82F6", // Tailwind "bg-blue-500" equivalent
    },
    headerContainer: {
      flexDirection: "row",
      position: "absolute",
      zIndex: 10,
      top: 16,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 20, // Tailwind "px-5" equivalent
    },
    backButton: {
      width: 40, // Tailwind "w-10"
      height: 40, // Tailwind "h-10"
      backgroundColor: "#FFFFFF", // Tailwind "bg-white"
      borderRadius: 20, // To make it circular
      alignItems: "center",
      justifyContent: "center",
    },
    backArrow: {
      width: 24, // Tailwind "w-6"
      height: 24, // Tailwind "h-6"
    },
    headerText: {
      fontSize: 20, // Tailwind "text-xl"
      fontFamily: "JakartaSemiBold", // Custom font if configured
      marginLeft: 20, // Tailwind "ml-5"
    },
    bottomSheetContent: {
      flex: 1,
      padding: 20, // Consistent padding
    },
  });
  
  export default RideLayout;
  
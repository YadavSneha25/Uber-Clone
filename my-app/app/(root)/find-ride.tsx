import { View, Text, StyleSheet } from "react-native";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import React from "react";
import CustomButtons from "@/components/CustomButtons";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View style={styles.inputContainer}>
        <Text style={styles.label}>From</Text>

        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle={styles.inputBackground}
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>To</Text>

        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle={styles.inputBackground}
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButtons
        title="Find Now"
        onPress={() => router.push(`/(root)/confirm-ride`) }
        containerStyle={styles.button}
        
      />
    </RideLayout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 12, // Tailwind "my-3"
  },
  label: {
    fontSize: 18, // Tailwind "text-lg"
    fontFamily: "JakartaSemiBold", // Custom font
    marginBottom: 12, // Tailwind "mb-3"
  },
  inputBackground: {
    backgroundColor: "#f5f5f5", // Tailwind "bg-neutral-100"
  },
  button: {
    marginTop: 20, // Tailwind "mt-5"
  },
});

export default FindRide;

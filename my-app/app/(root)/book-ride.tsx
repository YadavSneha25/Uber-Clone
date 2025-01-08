import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View, StyleSheet } from "react-native";

import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import Payment from "@/components/Payment";


import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from "react";





const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  
  

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PIBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.ryde.com" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
      
   
    <RideLayout title="Book Ride">
      
        <Text style={styles.headingText}>Ride Information</Text>

        <View style={styles.driverContainer}>
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            style={styles.driverImage}
          />

          <View style={styles.driverInfoContainer}>
            <Text style={styles.driverName}>{driverDetails?.title}</Text>

            <View style={styles.driverRatingContainer}>
              <Image
                source={icons.star}
                style={styles.ratingIcon}
                resizeMode="contain"
              />
              <Text style={styles.driverRatingText}>{driverDetails?.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideDetailsContainer}>
          <View style={styles.rideDetailRow}>
            <Text style={styles.detailText}>Ride Price</Text>
            <Text style={styles.priceText}>${driverDetails?.price}</Text>
          </View>

          <View style={styles.rideDetailRow}>
            <Text style={styles.detailText}>Pickup Time</Text>
            <Text style={styles.detailText}>
              {formatTime(driverDetails?.time || 5!)}
            </Text>
          </View>

          <View style={styles.rideDetailRow}>
            <Text style={styles.detailText}>Car Seats</Text>
            <Text style={styles.detailText}>{driverDetails?.car_seats}</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Image source={icons.to} style={styles.addressIcon} />
            <Text style={styles.addressText}>{userAddress}</Text>
          </View>

          <View style={styles.addressRow}>
            <Image source={icons.point} style={styles.addressIcon} />
            <Text style={styles.addressText}>{destinationAddress}</Text>
          </View>
        </View>
        <Payment 
          fullName={user?.fullName!}
          email={user?.emailaddress[0].emailAddress!}
          amount={driverDetails?.price!}
          driverId={driverDetails?.id}
          rideTime={driverDetails?.time!}
        />
      
    </RideLayout>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 18,
    fontFamily: "JakartaSemiBold",
    marginBottom: 12,
  },
  driverContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  driverImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  driverInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    space: 8,
  },
  driverName: {
    fontSize: 16,
    fontFamily: "JakartaSemiBold",
  },
  driverRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  ratingIcon: {
    width: 20,
    height: 20,
  },
  driverRatingText: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
    marginLeft: 4,
  },
  rideDetailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#B4A9FF", // Replace with `bg-general-600` equivalent
    marginTop: 20,
  },
  rideDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF", // White border
    paddingVertical: 12,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
  },
  priceText: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
    color: "#0CC25F",
  },
  addressContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D1D5DB", // Replace with `border-general-700` equivalent
    width: "100%",
    paddingVertical: 12,
  },
  addressIcon: {
    width: 24,
    height: 24,
  },
  addressText: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
    marginLeft: 8,
  },
});

export default BookRide;

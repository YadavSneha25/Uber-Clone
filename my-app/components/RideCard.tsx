import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={styles.mapImage}
          />

          <View style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.text} numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.text} numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomContent}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.dateText} numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.label}>Driver</Text>
            <Text style={styles.dateText}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.label}>Car Seats</Text>
            <Text style={styles.dateText}>{ride.driver.car_seats}</Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.label}>Payment Status</Text>
            <Text
                style={[
                styles.dateText,
                ride.payment_status === "paid" ? styles.paid : styles.notPaid,
                ]}
            >
            {ride.payment_status.charAt(0).toUpperCase() + ride.payment_status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapImage: {
    width: 80,
    height: 90,
    borderRadius: 10,
  },
  addressContainer: {
    flexDirection: "column",
    marginLeft: 15,
    flex: 1,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "JakartaMedium",
    width: "100%",
  },
  bottomContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "JakartaMedium",
    color: "#777",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "JakartaBold",
  },
  paid: {
    color: "green",
    textTransform:'capitalize',
  },
  notPaid: {
    color: "red",
    textTransform:'capitalize',
  },
});

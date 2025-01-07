import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useLocationStore } from '@/store';
import Map from '@/components/Map';
import GoogleTextInput from '@/components/GoogleTextInput';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import * as Location from 'expo-location';
import CustomButtons from '@/components/CustomButtons';
// Define the location type
interface LocationType {
  latitude: number;
  longitude: number;
  address: string;
}
const recentRides = [
  {
      "ride_id": "1",
      "origin_address": "Kathmandu, Nepal",
      "destination_address": "Pokhara, Nepal",
      "origin_latitude": "27.717245",
      "origin_longitude": "85.323961",
      "destination_latitude": "28.209583",
      "destination_longitude": "83.985567",
      "ride_time": 391,
      "fare_price": "19500.00",
      "payment_status": "paid",
      "driver_id": 2,
      "user_id": "1",
      "created_at": "2024-08-12 05:19:20.620007",
      "driver": {
          "driver_id": "2",
          "first_name": "David",
          "last_name": "Brown",
          "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
          "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
          "car_seats": 5,
          "rating": "4.60"
      }
  },
  {
      "ride_id": "2",
      "origin_address": "Jalkot, MH",
      "destination_address": "Pune, Maharashtra, India",
      "origin_latitude": "18.609116",
      "origin_longitude": "77.165873",
      "destination_latitude": "18.520430",
      "destination_longitude": "73.856744",
      "ride_time": 491,
      "fare_price": "24500.00",
      "payment_status": "paid",
      "driver_id": 1,
      "user_id": "1",
      "created_at": "2024-08-12 06:12:17.683046",
      "driver": {
          "driver_id": "1",
          "first_name": "James",
          "last_name": "Wilson",
          "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
          "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
          "car_seats": 4,
          "rating": "4.80"
      }
  },
  {
      "ride_id": "3",
      "origin_address": "Zagreb, Croatia",
      "destination_address": "Rijeka, Croatia",
      "origin_latitude": "45.815011",
      "origin_longitude": "15.981919",
      "destination_latitude": "45.327063",
      "destination_longitude": "14.442176",
      "ride_time": 124,
      "fare_price": "6200.00",
      "payment_status": "paid",
      "driver_id": 1,
      "user_id": "1",
      "created_at": "2024-08-12 08:49:01.809053",
      "driver": {
          "driver_id": "1",
          "first_name": "James",
          "last_name": "Wilson",
          "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
          "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
          "car_seats": 4,
          "rating": "4.80"
      }
  },
  {
      "ride_id": "4",
      "origin_address": "Okayama, Japan",
      "destination_address": "Osaka, Japan",
      "origin_latitude": "34.655531",
      "origin_longitude": "133.919795",
      "destination_latitude": "34.693725",
      "destination_longitude": "135.502254",
      "ride_time": 159,
      "fare_price": "7900.00",
      "payment_status": "paid",
      "driver_id": 3,
      "user_id": "1",
      "created_at": "2024-08-12 18:43:54.297838",
      "driver": {
          "driver_id": "3",
          "first_name": "Michael",
          "last_name": "Johnson",
          "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
          "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
          "car_seats": 4,
          "rating": "4.70"
      }
  }
];

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);

  const handleSignOut = () => {
    // Implement sign out functionality
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    
    setSelectedLocation(location);
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
    

    
  };
  const handleSearchPress = () => {
    if (selectedLocation) {
      router.push("/(root)/find-ride");
    }
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fafafa' }}>
      <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]} 👋
              </Text>
              <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Image source={icons.out} style={styles.signOutIcon} />
              </TouchableOpacity>
            </View>
      <View style={styles.searchWrapper}>
        <GoogleTextInput
          icon={icons.search}
          containerStyle={styles.searchContainer}
          handlePress={handleDestinationPress}
        />
       
      </View>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            {!loading ? (
              <>
                <Image source={images.noResult} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 12 }}>
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.headerContainer}>
            
            <Text style={styles.heading}>Your current location</Text>
            <View style={styles.mapContainer}>
              <Map />
            </View>

            <Text style={styles.heading}>Recent Rides</Text>
          </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  searchWrapper: {
    position: 'relative',
    zIndex: 999,
    backgroundColor: '#fafafa',
    paddingTop: 10,
  },
  searchContainer: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flatListContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  noResultImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
  },
  headerContainer: {
    padding: 15,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  searchButton: {
    width: '50%',
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'JakartaBold',
    marginTop: 20,
    marginBottom: 12,
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 300,
  },
  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  signOutIcon: {
    width: 20,
    height: 20,

    
  },
});
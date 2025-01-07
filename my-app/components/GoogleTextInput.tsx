import { Text, View, Image, StyleSheet } from "react-native";
import { GoogleInputProps } from "@/types/type";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { icons } from "@/constants";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress,
}: GoogleInputProps) => (
    <View style={[styles.mainContainer, containerStyle]}>
        <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Search"
            enablePoweredByContainer={false}
            debounce={200}
            styles={{
                container: {
                    flex: 1,
                    position: 'relative',
                },
                textInputContainer: {
                    backgroundColor: 'transparent',
                },
                textInput: {
                    height: 50,
                    color: '#5d5d5d',
                    fontSize: 16,
                    backgroundColor: textInputBackgroundColor || 'white',
                    borderRadius: 25,
                    paddingHorizontal: 40,
                    marginHorizontal: 10,
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
                listView: {
                    position: 'absolute',
                    top: 60,
                    left: 10,
                    right: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    flex: 1,
                    elevation: 3,
                    zIndex: 10,
                },
                row: {
                    backgroundColor: 'white',
                    padding: 13,
                    minHeight: 44,
                    flexDirection: 'row',
                },
                separator: {
                    height: 1,
                    backgroundColor: '#c8c7cc',
                },
                description: {
                    fontSize: 15,
                },
                loader: {
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    height: 20,
                },
            }}
            onPress={(data, details = null) => {
                if (details) {
                    handlePress({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        address: data.description,
                    });
                }
            }}
            query={{
                key: googlePlacesApiKey,
                language: "en",
            }}
            renderLeftButton={() => (
                <View style={styles.searchIconContainer}>
                    <Image
                        source={icon ? icon : icons.search}
                        style={styles.searchIcon}
                        resizeMode="contain"
                    />
                </View>
            )}
            textInputProps={{
                placeholderTextColor: "gray",
                placeholder: initialLocation ?? "Where do you want to go?",
            }}
        />
    </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        zIndex: 50,
        marginBottom: 20,
        minHeight: 50,
    },
    searchIconContainer: {
        position: 'absolute',
        left: 20,
        top: 12,
        zIndex: 1,
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
});

export default GoogleTextInput;


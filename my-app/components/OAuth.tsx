import { router } from "expo-router";
import { Alert, Image, Text, View, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButtons";
import { icons } from "@/constants/index";  // Ensure `icons.google` is correctly defined

const OAuth = () => {
  const handleGoogleSignIn = async () => {
    // Handle Google OAuth flow here
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.text}>Or</Text>
        <View style={styles.line} />
      </View>

      <CustomButton
        title="Log In with Google"
        style={styles.button}
        IconLeft={() => (
          <Image
            source={icons.google} // Make sure icons.google is correctly defined
            resizeMode="contain"
            style={styles.icon}
          />
        )}
        bgVariant="outline"  // Border with transparent background
        textVariant="primary" // Text color for primary button text
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd", // Adjust for your color
  },
  text: {
    marginHorizontal: 8,
    fontSize: 16,
    color: "#000",
  },
  button: {
    marginTop: 20,
    width: "100%",  // Adjust to full width for the button
    borderWidth: 1,  // Outline border
    borderColor: "#4285F4", // Google blue color
    borderRadius: 5, // Rounded corners
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default OAuth;

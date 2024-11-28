import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "@/constants"; // Ensure this is properly imported
import InputField from "@/components/InputField"; // Ensure InputField component is defined
import { icons } from "@/constants/index"; // Import the icons object
import CustomButton from "@/components/CustomButtons"; // Import your CustomButton component or use a library button
import { Link } from 'expo-router';
import OAuth from "@/components/OAuth"



const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = async () => {
    // Handle the sign-In logic here
    console.log('Form Data:', form);
  };

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.innerInnerContainer}>
          <Image source={images.signUpCar} style={styles.image} />
          <Text style={styles.headerText}>Welcome!</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email} // Ensure `icons.email` is valid
            value={form.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock} // Ensure `icons.lock` is valid
            value={form.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry // Hides password input
          />
          <CustomButton title="Sign-In" onPress={onSignInPress} style={styles.onSignUp} />
          {/* OAuth */}
          <OAuth />
          <Link href="/sign-up" style={styles.signIn}>
            <Text>Don't have an account!</Text>
            <Text style={styles.login}>Sign-Up</Text>
          </Link>
        </View>
        {/*Verification Model*/}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    zIndex: 0,
  },
  innerInnerContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Jakarta-SemiBold', // Ensure this font is loaded
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  inputContainer: {
    padding: 20,
  },
  login: {
    color: '#1D4ED8', // Example color for a "primary" text
    fontWeight: 'bold',
    marginTop: 8,
  },
  signIn: {
    alignItems: 'center',
    color: '#6B7280', // Example neutral gray color
    marginVertical: 10,
  },
  onSignUp: {
    marginTop: 6,
  }
});

export default SignIn;

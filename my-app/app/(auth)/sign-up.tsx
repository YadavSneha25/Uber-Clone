import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Import the useRouter hook
import { images, icons } from "@/constants"; // Ensure these imports are correct
import InputField from "@/components/InputField"; // Ensure InputField component is defined
import CustomButton from "@/components/CustomButtons"; // Import your CustomButton component
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from 'react-native-modal'; // Import ReactNativeModal

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter(); // Use the router for navigation

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification((prevState) => ({
        ...prevState,
        state: 'pending',
      }));
    } catch (err: any) {
      Alert.alert("Error",err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification((prevState) => ({
          ...prevState,
          state: 'success',
        }));
      } else {
        setVerification((prevState) => ({
          ...prevState,
          error: 'Verification failed',
          state: 'failed',
        }));
      }
    } catch (err: any) {
      setVerification((prevState) => ({
        ...prevState,
        error: err.errors?.[0]?.longMessage || 'An error occurred',
        state: 'failed',
      }));
    }
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
          <Text style={styles.headerText}>Create Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
          />
          <CustomButton title="Sign-up" onPress={onSignUpPress} style={styles.onSignUp} />
          {/* OAuth */}
          <OAuth />
          <Text onPress={() => router.push('/sign-in')} style={styles.signIn}>
            <Text>Already have an account? </Text>
            <Text style={styles.login}>Log In</Text>
          </Text>
        </View>

        {/* Verification Modal */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeaderText}>Verification</Text>
            <Text style={styles.modalBodyText}>
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />
            {verification.error && (
              <Text style={styles.errorText}>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              style={styles.verifyButton}
            />
          </View>
        </ReactNativeModal>

        {/* Success Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View style={styles.modalContainer}>
            <Image source={images.check} style={styles.modalImage} />
            <Text style={styles.modalText}>Verification Successful!</Text>
            <Text style={styles.modalText1}>You have successfully verified your account.</Text>

            <CustomButton
  title="Browse Home"
  style={styles.modalButton}
  onPress={() => {
    setShowSuccessModal(false); // Corrected syntax for setting the state
    router.push("/(root)/(tabs)/home"); // Navigate to the specified route
  }}
/>

          </View>
        </ReactNativeModal>
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
    fontFamily: 'Jakarta-SemiBold',
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  inputContainer: {
    padding: 20,
  },
  login: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    marginTop: 8,
  },
  signIn: {
    alignItems: 'center',
    color: '#6B7280',
    marginVertical: 10,
  },
  onSignUp: {
    marginTop: 6,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minHeight: 300,
  },
  modalImage: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText1: {
    fontSize: 13,
    fontWeight: 'light',
  },
  modalButton: {
    marginTop: 10,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalBodyText: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50', // Success green
  },
});

export default SignUp;

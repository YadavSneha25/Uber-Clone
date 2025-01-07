import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButtons";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
  
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
  
      console.log("Complete SignUp Response:", completeSignUp);
  
      if (completeSignUp.status === "complete") {
        //API database user

        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });


        // Set session and mark as verified
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
  
        // Redirect to home page
        router.push(`/(root)/(tabs)/home`);
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      console.error("Error during verification:", err);
  
      // Handle any errors
      setVerification({
        ...verification,
        error: err.message || "Verification failed. Please try again.",
        state: "failed",
      });
    }
  };
  
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        <Image source={images.signUpCar} style={styles.image} />
        <Text style={styles.headerText}>Create Your Account</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField
          label="Name"
          placeholder="Enter name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        <InputField
          label="Email"
          placeholder="Enter email"
          icon={icons.email}
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          icon={icons.lock}
          secureTextEntry
          textContentType="password"
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton title="Sign Up" onPress={onSignUpPress} style={styles.signUpButton} />
        <OAuth />
        <Link href="/sign-in" style={styles.link}>
          Already have an account? <Text style={styles.linkText}>Log In</Text>
        </Link>
      </View>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Verification</Text>
          <Text style={styles.modalBody}>
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
          {verification.error && <Text style={styles.errorText}>{verification.error}</Text>}
          <CustomButton title="Verify Email" onPress={onPressVerify} style={styles.verifyButton} />
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={showSuccessModal}>
        <View style={styles.modalContainer}>
          <Image source={images.check} style={styles.modalImage} />
          <Text style={styles.modalSuccessText}>Verified</Text>
          <Text style={styles.modalMessage}>
            You have successfully verified your account.
          </Text>
          <CustomButton
            title="Browse Home"
            onPress={() => router.push(`/(root)/(tabs)/home`)}
            style={styles.homeButton}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    width: "100%",
    height: height * 0.35,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    position: "absolute",
    bottom: 15,
    left: 15,
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  formContainer: {
    padding: 20,
  },
  signUpButton: {
    marginTop: 20,
  },
  link: {
    marginTop: 10,
    textAlign: "center",
  },
  linkText: {
    color: "#1D4ED8",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    minHeight: 300,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
  },
  modalImage: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  modalSuccessText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
  },
  homeButton: {
    marginTop: 20,
  },
});

export default SignUp;

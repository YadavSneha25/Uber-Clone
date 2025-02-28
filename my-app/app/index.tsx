import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';
import {Redirect} from "expo-router";

const Home = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home"/>;
  }

  return <Redirect href="/(auth)/welcome"/>;
  
};

export default Home;

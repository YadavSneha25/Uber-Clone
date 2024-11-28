import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';

const Home = () => {
  const { isSignedIn } = useAuth();  // Clerk's hook to check if the user is signed in
  const router = useRouter();
  const [isNavigated, setIsNavigated] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      // If user is signed in, navigate to the home page (or wherever the home screen is located)
      router.push("/(root)/(tabs)/home");  // Redirect to the authenticated route (e.g., '/home')
    } else {
      // If not signed in, navigate to the welcome screen or auth flow
      if (!isNavigated) {
        setIsNavigated(true);
        setTimeout(() => {
          router.push('/(auth)/welcome');  // Redirect to the welcome screen
        }, 0);  // Set timeout to ensure navigation stack is ready
      }
    }
  }, [isSignedIn, isNavigated, router]);  // Dependency array ensures re-run when isSignedIn changes

  return <SafeAreaView style={{ flex: 1 }} />;  // Empty return or add loading spinner if needed
};

export default Home;

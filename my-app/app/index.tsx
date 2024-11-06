import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const router = useRouter();
  const [isNavigated, setIsNavigated] = useState(false);

  useEffect(() => {
    if (!isNavigated) {
      setIsNavigated(true);
      // Use a small delay to ensure the navigation stack is ready if necessary
      setTimeout(() => {
        router.push('/(auth)/welcome');
      }, 0); // Adjust the delay if needed
    }
  }, [isNavigated]);

  return <SafeAreaView style={{ flex: 1 }} />;
};

export default Home;

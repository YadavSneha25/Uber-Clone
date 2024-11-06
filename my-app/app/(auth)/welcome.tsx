import React, { useState, useRef } from 'react'; 
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';  // Ensure it's from 'react-native-swiper'
import { onboarding } from '../../constants'; // Make sure the path is correct

const Onboarding = () => {
  const swiperRef = useRef<Swiper | null>(null);  // Correctly typed ref for TypeScript
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {/* Map through the onboarding data */}
        {onboarding.map((item) => (
          <View style={styles.slide} key={item.id}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            {/* If you have an image, you can render it here */}
            {/* {item.image && <Image source={{uri: item.image}} />} */}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

// Styles (using StyleSheet to avoid className in React Native)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  skipText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Jakarta-Bold', // Adjust based on your font
  },
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 1,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  activeDot: {
    width: 32,
    height: 4,
    marginHorizontal: 1,
    backgroundColor: '#0286FF',
    borderRadius: 4,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Onboarding;

import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '../../constants'; 
import CustomButtons from '../../components/CustomButtons';  

const Onboarding = () => {
  const swiperRef = useRef<Swiper | null>(null); 
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleNextPress = () => {
    if (isLastSlide) {
      router.replace('/(auth)/sign-up');
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

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
        {onboarding.map((item) => (
          <View style={styles.slide} key={item.id}>
            <Image
              source={item.image}
              style={{ width: '100%', height: 300 }}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>

            <CustomButtons
              title={isLastSlide ? "Get Started" : "Next"}
              onPress={handleNextPress}
              style={{ width: '92%', marginTop: 10 }}  
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

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
    fontFamily: 'Jakarta-Bold',
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  descriptionText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default Onboarding;

import { Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              style={{ width: 300, height: 400, resizeMode: 'cover' }}
              source={{
                uri: 'https://raw.githubusercontent.com/itzpradip/react-native-firebase-social-app/master/assets/onboarding-img1.png',
              }}
            />
          ),
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              style={{ width: 300, height: 400, resizeMode: 'cover' }}
              source={{
                uri: 'https://raw.githubusercontent.com/itzpradip/react-native-firebase-social-app/master/assets/onboarding-img2.png',
              }}
            />
          ),
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              style={{ width: 300, height: 400, resizeMode: 'cover' }}
              source={{
                uri: 'https://raw.githubusercontent.com/itzpradip/react-native-firebase-social-app/master/assets/onboarding-img3.png',
              }}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

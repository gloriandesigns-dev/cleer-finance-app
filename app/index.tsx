import React, { useState } from 'react';
import { StyleSheet, Image, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MotiView } from 'moti';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handlePress = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Use a timeout to ensure navigation happens regardless of animation callbacks
    setTimeout(() => {
      router.replace('/onboarding');
    }, 500); // Wait for the 400ms animation to mostly finish
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <StatusBar style="dark" />
      
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isExiting ? 0 : 1, 
          scale: isExiting ? 1.1 : 1 
        }}
        transition={{ 
          type: 'timing', 
          duration: isExiting ? 400 : 800 
        }}
        style={styles.imageContainer}
      >
        <Image 
          // Changed to raw=1 to get the direct image file instead of the Dropbox wrapper page
          source={{ uri: 'https://www.dropbox.com/scl/fi/81dc4auetressis3eytp6/Gemini_Generated_Image_889ipr889ipr889i.png?rlkey=75c63b6qjnuw1dl63heenhwl7&st=umu7gjnq&raw=1' }}
          style={styles.image}
          resizeMode="contain"
        />
      </MotiView>
      
      {!isExiting && (
        <MotiView 
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1000, duration: 500 }}
          style={styles.hintContainer}
        >
          <Text style={styles.hintText}>Tap anywhere to start</Text>
        </MotiView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300, 
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  hintContainer: {
    position: 'absolute',
    bottom: 60,
  },
  hintText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.primaryBlack,
    opacity: 0.6,
  },
});

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout } from '../constants/Colors';
import { Button } from '../components/ui/Button';
import { OnboardingIllustration } from '../components/OnboardingIllustrations';
import { MotiView, AnimatePresence } from 'moti';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: 'See every dollar clearly',
    subtitle: 'Real-time visibility across your company’s spending.',
  },
  {
    title: 'Automate expense reporting',
    subtitle: 'Receipts are captured, matched, and categorized instantly.',
  },
  {
    title: 'Stay in control',
    subtitle: 'Set policies, approve requests, and sync instantly with accounting.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => (prev + 1) as 0 | 1 | 2);
    } else {
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <AnimatePresence exitBeforeEnter>
            <MotiView
              key={currentStep}
              from={{ opacity: 0, scale: 0.9, translateY: 10 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, translateY: -10 }}
              transition={{ type: 'timing', duration: 400 }}
              style={styles.illustrationWrapper}
            >
              <OnboardingIllustration step={currentStep} />
            </MotiView>
          </AnimatePresence>
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          <AnimatePresence exitBeforeEnter>
            <MotiView
              key={`text-${currentStep}`}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ type: 'timing', duration: 300, delay: 100 }}
            >
              <Text style={styles.title}>{ONBOARDING_DATA[currentStep].title}</Text>
              <Text style={styles.subtitle}>{ONBOARDING_DATA[currentStep].subtitle}</Text>
            </MotiView>
          </AnimatePresence>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            {[0, 1, 2].map((index) => (
              <MotiView
                key={index}
                animate={{
                  backgroundColor: index === currentStep ? Colors.accentLime : Colors.divider,
                  width: index === currentStep ? 24 : 8,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                style={styles.dot}
              />
            ))}
          </View>

          {/* Action Button */}
          <Button
            title={currentStep === 2 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={styles.button}
            variant="primary"
            textStyle={{ color: Colors.white }}
            style={{ backgroundColor: Colors.primaryBlack }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.paddingHorizontal,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    width: '100%',
  },
});

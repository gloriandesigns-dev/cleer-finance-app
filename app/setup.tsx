import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout } from '../constants/Colors';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { ArrowLeft } from 'lucide-react-native';

export default function SetupScreen() {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [companySize, setCompanySize] = useState('');

  const roles = ['Founder / CEO', 'Finance Manager', 'CTO', 'Other'];
  const sizes = ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.primaryBlack} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.headline}>Set up your account</Text>
            <Text style={styles.subheadline}>
              Tell us about you and your company
            </Text>

            <View style={styles.form}>
              <Input 
                placeholder="Enter full name" 
              />
              <Input 
                placeholder="Enter work email" 
                keyboardType="email-address"
              />
              <Input 
                placeholder="Enter company name" 
              />
              
              <Select 
                placeholder="Select your role"
                value={role}
                options={roles}
                onSelect={setRole}
              />
              
              <Select 
                placeholder="Select company size"
                value={companySize}
                options={sizes}
                onSelect={setCompanySize}
              />

              <View style={styles.spacer} />

              <Button 
                title="Continue" 
                onPress={() => router.push('/verify')}
                style={styles.button}
                variant="primary"
                textStyle={{ color: Colors.white }}
                style={{ backgroundColor: Colors.primaryBlack }}
              />
              
              <Text style={styles.disclaimer}>
                By clicking continue, you agree to our Terms of Service and Privacy Policy. Your data is secure.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Layout.paddingHorizontal,
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  content: {
    marginTop: 10,
  },
  headline: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 32,
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -1,
  },
  subheadline: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
  form: {
    gap: 4,
  },
  spacer: {
    height: 24,
  },
  button: {
    marginTop: 8,
  },
  disclaimer: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 24,
    textAlign: 'center',
    lineHeight: 18,
  }
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout } from '../constants/Colors';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Logo } from '../components/Logo';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';

export default function ClaimAccountScreen() {
  const router = useRouter();
  const [products, setProducts] = useState({
    cards: true,
    payable: true,
    procurement: true,
    treasury: true,
  });

  const toggleProduct = (key: keyof typeof products) => {
    setProducts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
             <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <ArrowLeft size={24} color={Colors.primaryBlack} />
             </TouchableOpacity>
            <Logo />
          </View>

          <View style={styles.content}>
            <Text style={styles.headline}>Claim your account</Text>
            <Text style={styles.subheadline}>
              Complete your application in as little as 10 minutes.
            </Text>

            <View style={styles.form}>
              <Input 
                placeholder="Enter work email address"
                keyboardType="email-address"
              />
              
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Input placeholder="First name" />
                </View>
                <View style={styles.halfInput}>
                  <Input placeholder="Last name" />
                </View>
              </View>

              <Input 
                placeholder="Choose a password" 
                isPassword 
              />

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Products you're interested in</Text>
              
              <View style={styles.checkboxGroup}>
                <Checkbox 
                  label="Corporate Cards and Expense Management" 
                  checked={products.cards}
                  onPress={() => toggleProduct('cards')}
                />
                <Checkbox 
                  label="Accounts Payable" 
                  checked={products.payable}
                  onPress={() => toggleProduct('payable')}
                />
                <Checkbox 
                  label="Procurement" 
                  checked={products.procurement}
                  onPress={() => toggleProduct('procurement')}
                />
                <Checkbox 
                  label="Treasury" 
                  checked={products.treasury}
                  onPress={() => toggleProduct('treasury')}
                />
              </View>

              <Text style={styles.disclaimer}>
                Don't worry. This is not a commitment to any product.
              </Text>

              <Button 
                title="Continue" 
                onPress={() => router.push('/setup')}
                icon={<ArrowRight size={20} color={Colors.primaryBlack} />}
                style={styles.button}
              />
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
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
    lineHeight: 24,
  },
  form: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  checkboxGroup: {
    marginBottom: 24,
  },
  disclaimer: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  button: {
    marginTop: 8,
  }
});

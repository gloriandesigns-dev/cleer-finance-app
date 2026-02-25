import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { TrendingUp } from 'lucide-react-native';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>cleer</Text>
      <View style={styles.iconContainer}>
        <TrendingUp size={16} color={Colors.primaryBlack} strokeWidth={2.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
  },
  iconContainer: {
    marginBottom: 4, // Visual alignment
  }
});

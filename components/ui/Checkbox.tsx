import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Check } from 'lucide-react-native';
import { MotiView } from 'moti';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
      <MotiView 
        style={[styles.box, checked && styles.checkedBox]}
        animate={{
          backgroundColor: checked ? '#10B981' : 'transparent', // Using a slightly darker green for checkbox as per ramp usually, or stick to lime? Ramp uses green for checks.
          borderColor: checked ? '#10B981' : Colors.divider,
        }}
        transition={{ type: 'timing', duration: 200 }}
      >
        {checked && <Check size={12} color="white" strokeWidth={3} />}
      </MotiView>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkedBox: {
    borderWidth: 0,
  },
  label: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
  },
});

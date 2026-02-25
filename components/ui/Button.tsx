import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Layout } from '../../constants/Colors';
import { MotiView } from 'moti';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  style,
  textStyle,
  icon
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return Colors.accentLime;
      case 'secondary': return Colors.white;
      case 'outline': return 'transparent';
      default: return Colors.accentLime;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary': return Colors.primaryBlack;
      case 'secondary': return Colors.textPrimary;
      case 'outline': return Colors.textPrimary;
      default: return Colors.primaryBlack;
    }
  };

  const getBorder = () => {
    if (variant === 'outline' || variant === 'secondary') {
      return { borderWidth: 1, borderColor: Colors.divider };
    }
    return {};
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 200 }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={loading}
        style={[
          styles.container,
          { backgroundColor: getBackgroundColor() },
          getBorder(),
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <>
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
              {title}
            </Text>
            {icon}
          </>
        )}
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Layout.inputHeight,
    borderRadius: Layout.buttonRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  text: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    letterSpacing: -0.2,
  },
});

import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
import { MotiView } from 'moti';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Hidden input to handle software keyboard input effectively across platforms
  const hiddenInputRef = useRef<TextInput>(null);
  const [hiddenCode, setHiddenCode] = useState('');

  const handleHiddenTextChange = (text: string) => {
    if (text.length > length) return;
    
    setHiddenCode(text);
    const newCode = text.split('').concat(new Array(length - text.length).fill(''));
    setCode(newCode);
    
    if (text.length === length) {
      onComplete(text);
      hiddenInputRef.current?.blur();
    }
  };

  const handlePress = () => {
    hiddenInputRef.current?.focus();
    setFocusedIndex(Math.min(hiddenCode.length, length - 1));
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={hiddenInputRef}
        value={hiddenCode}
        onChangeText={handleHiddenTextChange}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocusedIndex(Math.min(hiddenCode.length, length - 1))}
        onBlur={handleBlur}
        autoFocus={true}
      />
      
      <Pressable onPress={handlePress} style={styles.inputsContainer}>
        {code.map((digit, index) => {
          const isActive = index === Math.min(hiddenCode.length, length - 1) && focusedIndex !== null;
          const isFilled = digit !== '';
          
          return (
            <MotiView
              key={index}
              style={[
                styles.box,
                isActive && styles.activeBox,
                isFilled && !isActive && styles.filledBox
              ]}
              animate={{
                borderColor: isActive ? Colors.accentLime : (isFilled ? Colors.primaryBlack : Colors.divider),
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ type: 'timing', duration: 150 }}
            >
              <TextInput
                style={styles.boxText}
                editable={false}
                value={digit}
              />
            </MotiView>
          );
        })}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 24,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    maxWidth: 56, // Prevent them from getting too huge on tablets
  },
  activeBox: {
    borderColor: Colors.accentLime,
    borderWidth: 2,
  },
  filledBox: {
    borderColor: Colors.primaryBlack,
  },
  boxText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 24,
    color: Colors.primaryBlack,
    textAlign: 'center',
  },
});

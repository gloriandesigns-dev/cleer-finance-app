import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView, Pressable } from 'react-native';
import { Colors, Layout } from '../../constants/Colors';
import { ChevronDown, Check } from 'lucide-react-native';

interface SelectProps {
  placeholder?: string;
  value?: string;
  options: string[];
  onSelect: (value: string) => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ placeholder, value, options, onSelect, error }) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => setVisible(true)}
        style={[
          styles.inputContainer,
          error ? styles.errorInput : null
        ]}
      >
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder || 'Select...'}
        </Text>
        <ChevronDown size={20} color={Colors.textSecondary} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder || 'Select an option'}</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.optionItem} 
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[
                    styles.optionText,
                    item === value && styles.selectedOptionText
                  ]}>
                    {item}
                  </Text>
                  {item === value && (
                    <Check size={20} color={Colors.primaryBlack} />
                  )}
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: 'transparent',
  },
  errorInput: {
    borderBottomColor: Colors.error,
  },
  text: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 17,
    color: Colors.textPrimary,
  },
  placeholder: {
    color: Colors.textSecondary,
  },
  errorText: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  list: {
    padding: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  optionText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    fontFamily: 'Urbanist_700Bold',
    color: Colors.primaryBlack,
  },
});

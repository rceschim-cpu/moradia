import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

export function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
      <Text style={styles.arrow}>‹</Text>
      <Text style={styles.label}>Voltar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: Spacing.xl,
    alignSelf: 'flex-start',
  },
  arrow: { fontSize: 22, color: Colors.teal, lineHeight: 26, marginTop: -2 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.teal },
});

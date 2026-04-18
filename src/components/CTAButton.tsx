import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing } from '../theme';

interface CTAButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'terra' | 'teal' | 'outline';
  style?: ViewStyle;
  disabled?: boolean;
}

export function CTAButton({ label, onPress, variant = 'teal', style, disabled }: CTAButtonProps) {
  if (variant === 'outline') {
    return (
      <TouchableOpacity style={[styles.outline, style, disabled && { opacity: 0.5 }]} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
        <Text style={styles.outlineText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  const colors: [string, string, string] =
    variant === 'terra'
      ? [Colors.terraDark, Colors.terra, Colors.terraLight]
      : [Colors.tealDark, Colors.teal, Colors.tealLight];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[style, disabled && { opacity: 0.5 }]} disabled={disabled}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: Radius.md,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: -0.2,
  },
  outline: {
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  outlineText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.teal,
  },
});

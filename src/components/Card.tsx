import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Shadow, Spacing } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  heading?: string;
}

export function Card({ children, style, heading }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {children}
    </View>
  );
}

export function ProgressBar({ progress, color = Colors.teal }: { progress: number; color?: string }) {
  return (
    <View style={styles.progTrack}>
      <View style={[styles.progFill, { width: `${Math.min(progress * 100, 100)}%`, backgroundColor: color }]} />
    </View>
  );
}

export function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  heading: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: Colors.text3,
    marginBottom: Spacing.md,
  },
  progTrack: {
    height: 7,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
});

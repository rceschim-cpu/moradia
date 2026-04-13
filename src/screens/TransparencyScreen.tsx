import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { transparencyData } from '../data/mock';

function BarItem({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <View style={styles.barItem}>
      <View style={styles.barLabelRow}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={[styles.barValue, { color }]}>{value}</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export function TransparencyScreen() {
  const d = transparencyData;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>PRESTAÇÃO DE CONTAS</Text>
          <Text style={styles.headerTitle}>Transparência</Text>
          <Text style={styles.headerSub}>Veja como cada real é investido</Text>
        </View>

        <View style={styles.body}>
          {/* Big stats */}
          <View style={styles.bigCard}>
            <Text style={styles.period}>RESUMO · {d.period}</Text>
            <View style={styles.bigGrid}>
              <View style={styles.bigItem}>
                <Text style={styles.bigN}>{d.totalRaised}</Text>
                <Text style={styles.bigL}>Total arrecadado em 2026</Text>
              </View>
              <View style={[styles.bigItem, styles.bigItemMid]}>
                <Text style={styles.bigN}>{d.totalInvested}</Text>
                <Text style={styles.bigL}>Investido em obras</Text>
              </View>
              <View style={styles.bigItem}>
                <Text style={styles.bigN}>{d.housesCompleted}</Text>
                <Text style={styles.bigL}>Casas concluídas</Text>
              </View>
            </View>
          </View>

          {/* Monthly chart */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>ARRECADAÇÃO MENSAL (2026)</Text>
            {d.monthly.map(item => (
              <BarItem key={item.label} label={item.label} value={item.value} pct={item.pct} color={Colors.teal} />
            ))}
          </View>

          {/* Allocation chart */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>DESTINO DOS RECURSOS</Text>
            {d.allocation.map(item => (
              <BarItem key={item.label} label={item.label} value={item.value} pct={item.pct} color={item.color} />
            ))}
          </View>

          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadText}>Baixar relatório completo (PDF)</Text>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  header: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: Colors.teal, marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5, marginBottom: 4 },
  headerSub: { fontSize: 13, color: Colors.text3, lineHeight: 20 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md },
  bigCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.md },
  period: { fontSize: 10, fontWeight: '700', color: Colors.text3, letterSpacing: 0.7, marginBottom: Spacing.md },
  bigGrid: { flexDirection: 'row' },
  bigItem: { flex: 1, alignItems: 'center', paddingVertical: 14, paddingHorizontal: 6 },
  bigItemMid: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: Colors.border },
  bigN: { fontSize: 20, fontWeight: '800', color: Colors.teal, lineHeight: 24 },
  bigL: { fontSize: 10, color: Colors.text3, marginTop: 5, textAlign: 'center', lineHeight: 14 },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.sm },
  cardHeading: { fontSize: 10, fontWeight: '700', color: Colors.text3, letterSpacing: 0.7, marginBottom: Spacing.md },
  barItem: { marginBottom: 14 },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barLabel: { fontSize: 12, color: Colors.text2, fontWeight: '500' },
  barValue: { fontSize: 12, fontWeight: '700' },
  barTrack: { height: 8, backgroundColor: Colors.border, borderRadius: Radius.full, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: Radius.full },
  downloadBtn: { backgroundColor: Colors.white, borderRadius: Radius.md, paddingVertical: 15, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border, ...Shadow.sm },
  downloadText: { fontSize: 13, fontWeight: '700', color: Colors.teal, letterSpacing: 0.2 },
});

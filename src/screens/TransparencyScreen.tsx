import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
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
        <LinearGradient
          colors={['#0D2137', '#1A3A5C', Colors.tealDark]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>📊 Transparência</Text>
          <Text style={styles.headerSub}>Veja como cada real é investido</Text>
        </LinearGradient>

        <View style={styles.body}>
          {/* Big stats */}
          <View style={styles.bigCard}>
            <Text style={styles.period}>📅 Resumo · {d.period}</Text>
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
          <Card heading="💰 Arrecadação mensal (2026)">
            {d.monthly.map(item => (
              <BarItem key={item.label} label={item.label} value={item.value} pct={item.pct} color={Colors.teal} />
            ))}
          </Card>

          {/* Allocation chart */}
          <Card heading="🏗️ Destino dos recursos">
            {d.allocation.map(item => (
              <BarItem key={item.label} label={item.label} value={item.value} pct={item.pct} color={item.color} />
            ))}
          </Card>

          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadText}>📄 Baixar relatório completo (PDF)</Text>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D2137' },
  header: { padding: Spacing.xl, paddingTop: Spacing.xxl, paddingBottom: 36 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.78)' },
  body: { backgroundColor: Colors.cream, padding: Spacing.md, marginTop: -24 },
  bigCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.md },
  period: { fontSize: 11, fontWeight: '700', color: Colors.text3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: Spacing.md },
  bigGrid: { flexDirection: 'row' },
  bigItem: { flex: 1, alignItems: 'center', paddingVertical: 14, paddingHorizontal: 6 },
  bigItemMid: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: Colors.border },
  bigN: { fontSize: 20, fontWeight: '800', color: Colors.teal, lineHeight: 24 },
  bigL: { fontSize: 10, color: Colors.text3, marginTop: 5, textAlign: 'center', lineHeight: 14 },
  barItem: { marginBottom: 14 },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barLabel: { fontSize: 12, color: Colors.text2, fontWeight: '500' },
  barValue: { fontSize: 12, fontWeight: '700' },
  barTrack: { height: 8, backgroundColor: Colors.border, borderRadius: Radius.full, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: Radius.full },
  downloadBtn: { backgroundColor: Colors.white, borderRadius: Radius.md, paddingVertical: 15, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border, ...Shadow.sm },
  downloadText: { fontSize: 14, fontWeight: '700', color: Colors.teal },
});

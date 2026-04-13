import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from '../components/Card';
import { CTAButton } from '../components/CTAButton';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { currentCampaign } from '../data/mock';

export function CampaignScreen() {
  const navigation = useNavigation<any>();
  const pct = currentCampaign.raised / currentCampaign.goal;
  const remaining = currentCampaign.goal - currentCampaign.raised;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.backRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.navigate('Home')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.backLabel}>INÍCIO</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeBadgeText}>Campanha ativa</Text>
          </View>
          <Text style={styles.headerTitle}>{currentCampaign.familyName}</Text>
          <Text style={styles.headerSub}>{currentCampaign.location}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.story}>{currentCampaign.story}</Text>

          {/* Amount card */}
          <View style={styles.amountCard}>
            <View style={styles.amtRow}>
              <Text style={styles.amtLbl}>Meta</Text>
              <Text style={styles.amtVal}>R$ {currentCampaign.goal.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.amtRaisedRow}>
              <Text style={styles.amtLbl}>Arrecadado</Text>
              <Text style={styles.amtRaised}>R$ {currentCampaign.raised.toLocaleString('pt-BR')}</Text>
            </View>

            <View style={{ marginVertical: Spacing.md }}>
              <ProgressBar progress={pct} />
            </View>

            <View style={styles.pctRow}>
              <Text style={styles.pctDone}>{Math.round(pct * 100)}% concluído</Text>
              <Text style={styles.pctLeft}>Faltam R$ {remaining.toLocaleString('pt-BR')}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.donorsLbl}>Parceiros que já contribuíram</Text>
            <View style={styles.donorsRow}>
              {currentCampaign.donors.map(d => (
                <View key={d.name} style={styles.donorChip}>
                  <View style={styles.donorAv}><Text style={styles.donorAvText}>{d.initials}</Text></View>
                  <Text style={styles.donorName}>{d.name}</Text>
                </View>
              ))}
              <View style={[styles.donorChip, { paddingLeft: 11 }]}>
                <Text style={styles.donorName}>+{currentCampaign.extraDonors} mais</Text>
              </View>
            </View>
          </View>

          <CTAButton label="Contribuir agora" variant="terra" onPress={() => navigation.navigate('Donate')} />
          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  header: {
    backgroundColor: Colors.teal,
    padding: Spacing.xl,
    paddingTop: 28,
    paddingBottom: 44,
  },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 14 },
  backBtn: { paddingRight: 4, paddingVertical: 2 },
  backArrow: { fontSize: 22, color: 'rgba(255,255,255,0.85)', fontWeight: '700', lineHeight: 24 },
  backLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: 'rgba(255,255,255,0.85)' },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#76EE76' },
  activeBadgeText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.9)', letterSpacing: 0.3 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md, marginTop: -20 },
  story: { fontSize: 14, color: Colors.text2, lineHeight: 24, marginBottom: Spacing.xl },
  amountCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.md },
  amtRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  amtRaisedRow: { flexDirection: 'row', justifyContent: 'space-between' },
  amtLbl: { fontSize: 12, color: Colors.text3, fontWeight: '500' },
  amtVal: { fontSize: 14, fontWeight: '600', color: Colors.text },
  amtRaised: { fontSize: 26, fontWeight: '800', color: Colors.green },
  pctRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pctDone: { fontSize: 12, fontWeight: '700', color: Colors.green },
  pctLeft: { fontSize: 12, color: Colors.text3 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.lg },
  donorsLbl: { fontSize: 11, color: Colors.text3, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  donorsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  donorChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.cream, borderRadius: Radius.full, paddingHorizontal: 11, paddingVertical: 5, paddingLeft: 5 },
  donorAv: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  donorAvText: { fontSize: 10, fontWeight: '700', color: Colors.white },
  donorName: { fontSize: 12, color: Colors.text2, fontWeight: '500' },
});

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        {/* Hero */}
        <LinearGradient
          colors={['#7B4A1A', Colors.terra, Colors.terraLight]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroBg}>🏠</Text>
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.badge}><Text style={styles.badgeText}>🔴 Campanha ativa</Text></View>
            <Text style={styles.heroTitle}>{currentCampaign.familyName}</Text>
            <Text style={styles.heroSub}>📍 {currentCampaign.location}</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.story}>{currentCampaign.story}</Text>

          {/* Amount card */}
          <View style={styles.amountCard}>
            <View style={styles.amtRow}>
              <Text style={styles.amtLbl}>Meta da campanha</Text>
              <Text style={styles.amtVal}>R$ {currentCampaign.goal.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.amtRow}>
              <Text style={styles.amtLbl}>Já arrecadado</Text>
              <Text style={styles.amtRaised}>R$ {currentCampaign.raised.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={{ marginVertical: Spacing.md }}>
              <ProgressBar progress={pct} />
            </View>
            <View style={styles.pctRow}>
              <Text style={styles.pctDone}>{Math.round(pct * 100)}% concluído</Text>
              <Text style={styles.pctLeft}>Faltam R$ {remaining.toLocaleString('pt-BR')}</Text>
            </View>

            <View style={styles.donorsSec}>
              <Text style={styles.donorsLbl}>Parceiros que já contribuíram:</Text>
              <View style={styles.donorsRow}>
                {currentCampaign.donors.map(d => (
                  <View key={d.name} style={styles.donorChip}>
                    <View style={styles.donorAv}><Text style={styles.donorAvText}>{d.initials}</Text></View>
                    <Text style={styles.donorName}>{d.name}</Text>
                  </View>
                ))}
                <View style={styles.donorChip}>
                  <Text style={styles.donorName}>+{currentCampaign.extraDonors} mais</Text>
                </View>
              </View>
            </View>
          </View>

          <CTAButton
            label="💛 Quero contribuir agora"
            variant="terra"
            onPress={() => navigation.navigate('Donate')}
          />
          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.tealDark },
  hero: { height: 270, position: 'relative', justifyContent: 'flex-end' },
  heroBg: { position: 'absolute', fontSize: 140, opacity: 0.12, alignSelf: 'center', top: 40 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 130, backgroundColor: 'rgba(0,0,0,0.55)' },
  heroContent: { position: 'relative', zIndex: 1, padding: Spacing.xl },
  badge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,70,70,0.85)', borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4, marginBottom: Spacing.sm },
  badgeText: { fontSize: 10, fontWeight: '700', color: Colors.white, textTransform: 'uppercase', letterSpacing: 1 },
  heroTitle: { fontSize: 21, fontWeight: '800', color: Colors.white, letterSpacing: -0.3 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 3 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md, paddingTop: Spacing.lg },
  story: { fontSize: 14, color: Colors.text2, lineHeight: 24, marginBottom: Spacing.xl },
  amountCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.md },
  amtRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  amtLbl: { fontSize: 13, color: Colors.text3 },
  amtVal: { fontSize: 15, fontWeight: '700', color: Colors.text },
  amtRaised: { fontSize: 24, fontWeight: '800', color: Colors.teal },
  pctRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pctDone: { fontSize: 12, fontWeight: '700', color: Colors.teal },
  pctLeft: { fontSize: 12, color: Colors.text3 },
  donorsSec: { marginTop: Spacing.lg, paddingTop: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.border },
  donorsLbl: { fontSize: 12, color: Colors.text3, marginBottom: Spacing.sm },
  donorsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  donorChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.cream, borderRadius: Radius.full, paddingHorizontal: 11, paddingVertical: 5, paddingLeft: 5 },
  donorAv: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  donorAvText: { fontSize: 10, fontWeight: '700', color: Colors.white },
  donorName: { fontSize: 12, color: Colors.text2, fontWeight: '500' },
});

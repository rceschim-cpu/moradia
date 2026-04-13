import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from '../components/Card';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { currentCampaign, projectStats, newsItems } from '../data/mock';
import { useAuth } from '../context/AuthContext';

const NEWS_COLORS: Record<string, { text: string }> = {
  obra:  { text: Colors.teal },
  story: { text: Colors.terra },
  done:  { text: Colors.green },
};

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const { profile, user } = useAuth();
  const firstName = (profile?.name ?? user?.displayName ?? 'Parceiro').split(' ')[0];
  const pct = currentCampaign.raised / currentCampaign.goal;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Image
              source={require('../../assets/logo-teal.jpg')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ── Greeting ── */}
        <View style={styles.greeting}>
          <Text style={styles.greetSub}>Olá, bem-vindo de volta</Text>
          <Text style={styles.greetName}>{firstName}</Text>
          <View style={styles.impactPill}>
            <Text style={styles.impactText}>
              Você já ajudou a construir{' '}
              <Text style={styles.impactBold}>{profile?.housesHelped ?? 0} casas</Text>
            </Text>
          </View>
        </View>

        <View style={styles.body}>

          {/* ── Campanha ── */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Campaign')} activeOpacity={0.8}>
            <Text style={styles.cardLabel}>CAMPANHA EM ANDAMENTO</Text>
            <View style={styles.campRow}>
              <View style={styles.campLeft}>
                <Text style={styles.campName}>{currentCampaign.familyName}</Text>
                <Text style={styles.campSub}>{currentCampaign.location}</Text>
                <View style={{ marginTop: 10 }}>
                  <ProgressBar progress={pct} />
                  <View style={styles.progLabels}>
                    <Text style={styles.raised}>R$ {currentCampaign.raised.toLocaleString('pt-BR')}</Text>
                    <Text style={styles.goal}>de R$ {currentCampaign.goal.toLocaleString('pt-BR')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.campPct}>
                <Text style={styles.campPctN}>{Math.round(pct * 100)}</Text>
                <Text style={styles.campPctSymbol}>%</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ── Stats ── */}
          <View style={styles.statsRow}>
            {[
              { n: projectStats.housesDelivered, l: 'Casas\nentregues' },
              { n: projectStats.activePartners, l: 'Parceiros\nativos' },
              { n: projectStats.livesImpacted, l: 'Vidas\nimpactadas' },
            ].map(s => (
              <View key={s.l} style={styles.statBox}>
                <Text style={styles.statN}>{s.n}</Text>
                <Text style={styles.statL}>{s.l}</Text>
              </View>
            ))}
          </View>

          {/* ── Acesso rápido ── */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>ACESSO RÁPIDO</Text>
            <View style={styles.actionsRow}>
              {[
                { label: 'Transparência', screen: 'Transparency' },
                { label: 'Eventos', screen: 'Events' },
                { label: 'Contato', screen: 'Contact' },
              ].map(a => (
                <TouchableOpacity key={a.screen} style={styles.actionChip} onPress={() => navigation.navigate(a.screen)} activeOpacity={0.7}>
                  <Text style={styles.actionChipText}>{a.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── Novidades ── */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>ÚLTIMAS NOVIDADES</Text>
            {newsItems.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.newsItem, idx === newsItems.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}
                onPress={() => navigation.navigate('News')}
                activeOpacity={0.7}
              >
                <View style={styles.newsLeft}>
                  <Text style={[styles.newsTag, { color: NEWS_COLORS[item.category].text }]}>
                    {item.categoryLabel.toUpperCase()}
                  </Text>
                  <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
                <Text style={styles.newsArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 16 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  scroll: { backgroundColor: Colors.cream },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoWrap: { flex: 1, height: 80, overflow: 'hidden' },
  logo: { width: '100%', height: '100%' },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.terra,
  },

  greeting: {
    backgroundColor: Colors.teal,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 44,
  },
  greetSub: { fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: '400' },
  greetName: { fontSize: 28, fontWeight: '800', color: Colors.white, letterSpacing: -0.5, marginTop: 2, marginBottom: 16 },
  impactPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  impactText: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  impactBold: { fontWeight: '800', color: Colors.white },

  body: { padding: Spacing.md, marginTop: -28 },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.text3,
    marginBottom: Spacing.md,
  },

  campRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  campLeft: { flex: 1 },
  campName: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  campSub: { fontSize: 12, color: Colors.text3 },
  campPct: { alignItems: 'flex-end' },
  campPctN: { fontSize: 36, fontWeight: '800', color: Colors.teal, lineHeight: 40 },
  campPctSymbol: { fontSize: 14, fontWeight: '600', color: Colors.teal, marginTop: -4 },
  progLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  raised: { fontSize: 12, fontWeight: '700', color: Colors.teal },
  goal: { fontSize: 12, color: Colors.text3 },

  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  statBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    ...Shadow.sm,
  },
  statN: { fontSize: 26, fontWeight: '800', color: Colors.teal, lineHeight: 30 },
  statL: { fontSize: 10, color: Colors.text3, marginTop: 4, textAlign: 'center', lineHeight: 14 },

  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  actionChip: {
    borderWidth: 1.5,
    borderColor: Colors.teal,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionChipText: { fontSize: 13, fontWeight: '600', color: Colors.teal },

  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
  },
  newsLeft: { flex: 1 },
  newsTag: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 3 },
  newsTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, lineHeight: 20, marginBottom: 3 },
  newsDate: { fontSize: 11, color: Colors.text3 },
  newsArrow: { fontSize: 22, color: Colors.text3, fontWeight: '300' },
});

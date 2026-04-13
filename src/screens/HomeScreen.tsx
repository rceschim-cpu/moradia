import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card, ProgressBar } from '../components/Card';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { currentCampaign, projectStats, newsItems } from '../data/mock';

const NEWS_COLORS: Record<string, { bg: string; text: string }> = {
  obra: { bg: Colors.tealBg, text: Colors.teal },
  story: { bg: Colors.terraBg, text: Colors.terra },
  done: { bg: Colors.greenBg, text: Colors.green },
};

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const pct = currentCampaign.raised / currentCampaign.goal;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.tealDark, Colors.teal, '#28A99C']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.logoSub}>PROJETO</Text>
              <Text style={styles.logoName}>moradia</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Text style={{ fontSize: 18 }}>🔔</Text>
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
          <Text style={styles.greeting}>Olá, bem-vindo de volta!</Text>
          <Text style={styles.donorName}>Ana Paula 👋</Text>
          <View style={styles.impactPill}>
            <Text style={styles.impactText}>🏠 Você já ajudou a construir <Text style={{ fontWeight: '800' }}>3 casas</Text></Text>
          </View>
        </LinearGradient>

        <View style={styles.cards}>
          {/* Campaign mini */}
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('Campaign')}>
            <Card heading="🏗️ Campanha em andamento">
              <View style={styles.campRow}>
                <View style={styles.campThumb}><Text style={{ fontSize: 28 }}>🏡</Text></View>
                <View style={styles.campInfo}>
                  <Text style={styles.campName}>{currentCampaign.familyName}</Text>
                  <Text style={styles.campSub}>📍 {currentCampaign.location}</Text>
                  <ProgressBar progress={pct} />
                  <View style={styles.progLabels}>
                    <Text style={styles.raised}>R$ {currentCampaign.raised.toLocaleString('pt-BR')}</Text>
                    <Text style={styles.goal}>de R$ {currentCampaign.goal.toLocaleString('pt-BR')}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          {/* Stats */}
          <Card heading="📊 Impacto do projeto">
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statN}>{projectStats.housesDelivered}</Text>
                <Text style={styles.statL}>Casas entregues</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statN}>{projectStats.activePartners}</Text>
                <Text style={styles.statL}>Parceiros ativos</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statN}>{projectStats.livesImpacted}</Text>
                <Text style={styles.statL}>Vidas impactadas</Text>
              </View>
            </View>
          </Card>

          {/* Quick actions */}
          <Card heading="⚡ Acesso rápido">
            <View style={styles.actionsGrid}>
              {[
                { icon: '💛', label: 'Fazer\ndoação', screen: 'Donate' },
                { icon: '📊', label: 'Trans-\nparência', screen: 'Transparency' },
                { icon: '📅', label: 'Eventos', screen: 'Events' },
                { icon: '💬', label: 'Contato', screen: 'Contact' },
              ].map(item => (
                <TouchableOpacity
                  key={item.screen}
                  style={styles.actionBtn}
                  activeOpacity={0.75}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                  <Text style={styles.actionLbl}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* News mini */}
          <Card heading="📰 Últimas novidades">
            {newsItems.map((item, idx) => {
              const c = NEWS_COLORS[item.category];
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.newsItem, idx === newsItems.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}
                  activeOpacity={0.75}
                  onPress={() => navigation.navigate('News')}
                >
                  <View style={[styles.newsImg, { backgroundColor: c.bg }]}>
                    <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
                  </View>
                  <View style={styles.newsContent}>
                    <Text style={[styles.newsTag, { color: c.text }]}>{item.categoryLabel.toUpperCase()}</Text>
                    <Text style={styles.newsTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.newsDate}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Card>

          <View style={{ height: 16 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.tealDark },
  scroll: { backgroundColor: Colors.cream },
  header: { padding: Spacing.xl, paddingBottom: 44 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.xl },
  logoSub: { fontSize: 11, fontWeight: '400', color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase' },
  logoName: { fontSize: 24, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  notifBtn: { width: 38, height: 38, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  notifDot: { width: 8, height: 8, backgroundColor: '#FF5252', borderRadius: 4, position: 'absolute', top: 6, right: 6, borderWidth: 1.5, borderColor: Colors.teal },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 2 },
  donorName: { fontSize: 22, fontWeight: '700', color: Colors.white, marginBottom: Spacing.md },
  impactPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: Spacing.lg, paddingVertical: 9, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  impactText: { fontSize: 13, fontWeight: '500', color: Colors.white },
  cards: { padding: Spacing.md, marginTop: -28 },
  campRow: { flexDirection: 'row', gap: Spacing.md },
  campThumb: { width: 68, height: 68, borderRadius: 14, backgroundColor: Colors.tealBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  campInfo: { flex: 1 },
  campName: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  campSub: { fontSize: 12, color: Colors.text3, marginBottom: Spacing.sm },
  progLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  raised: { fontSize: 12, fontWeight: '700', color: Colors.teal },
  goal: { fontSize: 12, color: Colors.text3 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statBox: { flex: 1, backgroundColor: Colors.cream, borderRadius: Radius.sm, padding: Spacing.md, alignItems: 'center' },
  statN: { fontSize: 22, fontWeight: '800', color: Colors.teal },
  statL: { fontSize: 10, color: Colors.text3, marginTop: 4, textAlign: 'center', lineHeight: 14 },
  actionsGrid: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: { flex: 1, backgroundColor: Colors.cream, borderRadius: 14, padding: Spacing.md, alignItems: 'center', gap: 6 },
  actionLbl: { fontSize: 10, fontWeight: '600', color: Colors.text2, textAlign: 'center', lineHeight: 14 },
  newsItem: { flexDirection: 'row', gap: Spacing.md, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  newsImg: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  newsContent: { flex: 1 },
  newsTag: { fontSize: 10, fontWeight: '700', marginBottom: 3 },
  newsTitle: { fontSize: 13, fontWeight: '600', color: Colors.text, lineHeight: 18, marginBottom: 2 },
  newsDate: { fontSize: 11, color: Colors.text3 },
});

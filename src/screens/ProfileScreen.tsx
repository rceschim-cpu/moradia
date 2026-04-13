import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { donationHistory } from '../data/mock';
import { useAuth } from '../context/AuthContext';

export function ProfileScreen() {
  const { user, profile, logout } = useAuth();

  const displayName = profile?.name ?? user?.displayName ?? 'Parceiro';
  const partnerSince = profile?.partnerSince ?? 'recentemente';
  const totalDonated = profile?.totalDonated ?? 0;
  const housesHelped = profile?.housesHelped ?? 0;

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ],
    );
  }

  // Iniciais do avatar
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.tealDark, Colors.teal, '#28A99C']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Botão logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <Text style={styles.profileSince}>Parceiro desde {partnerSince}</Text>
          <View style={styles.badgesRow}>
            {['🏠 Parceiro', '💛 Recorrente'].map(b => (
              <View key={b} style={styles.badge}><Text style={styles.badgeText}>{b}</Text></View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Impact banner */}
          <LinearGradient
            colors={[Colors.terraDark, Colors.terra, Colors.terraLight]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.impactBanner}
          >
            <Text style={styles.impactBig}>{housesHelped}</Text>
            <Text style={styles.impactLabel}>
              {housesHelped === 1 ? 'casa ajudada a construir' : 'casas ajudadas a construir'}
            </Text>
            <Text style={styles.impactSub}>Você faz parte dessa história 💛</Text>
          </LinearGradient>

          {/* Stats */}
          <Card heading="📊 Seu impacto pessoal">
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statN}>R${'\n'}{totalDonated.toLocaleString('pt-BR')}</Text>
                <Text style={styles.statL}>Total doado</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statN}>{housesHelped}</Text>
                <Text style={styles.statL}>Casas ajudadas</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statN}>0</Text>
                <Text style={styles.statL}>Eventos participados</Text>
              </View>
            </View>
          </Card>

          {/* History */}
          <Card heading="📋 Histórico de doações">
            {donationHistory.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma doação registrada ainda.</Text>
            ) : (
              donationHistory.map(item => (
                <View key={item.id} style={styles.historyItem}>
                  <View style={styles.historyDot}><Text style={{ fontSize: 17 }}>{item.emoji}</Text></View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyLbl}>{item.label}</Text>
                    <Text style={styles.historyDate}>{item.date} · {item.method}</Text>
                  </View>
                  <Text style={styles.historyAmt}>R$ {item.amount}</Text>
                </View>
              ))
            )}
            <TouchableOpacity style={styles.historyMore}>
              <Text style={styles.historyMoreText}>Ver histórico completo →</Text>
            </TouchableOpacity>
          </Card>

          {/* Logout secundário */}
          <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <Text style={styles.logoutCardText}>🚪 Sair da conta</Text>
          </TouchableOpacity>

          <View style={{ height: 16 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.tealDark },
  header: { padding: Spacing.xl, paddingBottom: 44, alignItems: 'center', position: 'relative' },
  logoutBtn: { position: 'absolute', top: Spacing.lg, right: Spacing.xl, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  logoutText: { fontSize: 12, fontWeight: '600', color: Colors.white },
  avatar: { width: 74, height: 74, borderRadius: 37, backgroundColor: 'rgba(255,255,255,0.25)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.45)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  avatarText: { fontSize: 28, fontWeight: '800', color: Colors.white },
  profileName: { fontSize: 20, fontWeight: '800', color: Colors.white },
  profileEmail: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  profileSince: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  badgesRow: { flexDirection: 'row', gap: 8, marginTop: Spacing.md },
  badge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  badgeText: { fontSize: 12, fontWeight: '600', color: Colors.white },
  body: { backgroundColor: Colors.cream, padding: Spacing.md, marginTop: -28 },
  impactBanner: { borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.md, ...Shadow.md },
  impactBig: { fontSize: 44, fontWeight: '800', color: Colors.white, lineHeight: 48 },
  impactLabel: { fontSize: 14, color: Colors.white, opacity: 0.9, marginTop: 6, fontWeight: '500' },
  impactSub: { fontSize: 12, color: Colors.white, opacity: 0.75, marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statBox: { flex: 1, backgroundColor: Colors.cream, borderRadius: Radius.sm, padding: Spacing.md, alignItems: 'center' },
  statN: { fontSize: 16, fontWeight: '800', color: Colors.teal, textAlign: 'center', lineHeight: 22 },
  statL: { fontSize: 10, color: Colors.text3, marginTop: 4, textAlign: 'center', lineHeight: 14 },
  historyItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: Colors.border },
  historyDot: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.tealBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  historyInfo: { flex: 1 },
  historyLbl: { fontSize: 14, fontWeight: '600', color: Colors.text },
  historyDate: { fontSize: 11, color: Colors.text3, marginTop: 2 },
  historyAmt: { fontSize: 15, fontWeight: '800', color: Colors.teal },
  historyMore: { alignItems: 'center', paddingTop: Spacing.md },
  historyMoreText: { fontSize: 13, fontWeight: '700', color: Colors.teal },
  emptyText: { fontSize: 14, color: Colors.text3, textAlign: 'center', paddingVertical: Spacing.lg },
  logoutCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', marginBottom: Spacing.md, ...Shadow.sm },
  logoutCardText: { fontSize: 14, fontWeight: '600', color: '#C62828' },
});

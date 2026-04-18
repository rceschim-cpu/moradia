import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Linking, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Colors, Spacing, Radius, Shadow } from '../theme';

interface PartnerUser {
  uid: string;
  name: string;
  whatsapp?: string;
  birthday?: string;
  lastDonationMonth?: string;
  email: string;
}

function currentYearMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function daysUntilBirthday(birthday: string): number {
  const [day, month] = birthday.split('/').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  let bday = new Date(year, month - 1, day);
  if (bday < today) bday = new Date(year + 1, month - 1, day);
  return Math.round((bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatBirthdayLabel(birthday: string): string {
  const days = daysUntilBirthday(birthday);
  if (days === 0) return 'Hoje!';
  if (days === 1) return 'Amanhã!';
  return `Em ${days} dias`;
}

async function openWhatsApp(whatsapp: string, message: string) {
  const phone = '55' + whatsapp.replace(/\D/g, '');
  const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    Linking.openURL(url);
  } else {
    // Fallback para web
    Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  }
}

export function RemindersScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [overduePartners, setOverduePartners] = useState<PartnerUser[]>([]);
  const [birthdayPartners, setBirthdayPartners] = useState<(PartnerUser & { days: number })[]>([]);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const users: PartnerUser[] = snap.docs.map(d => ({ uid: d.id, ...d.data() } as PartnerUser));
      const month = currentYearMonth();

      // Não doaram este mês
      const overdue = users.filter(u => u.lastDonationMonth !== month);
      setOverduePartners(overdue);

      // Aniversários nos próximos 30 dias
      const bdays = users
        .filter(u => u.birthday && daysUntilBirthday(u.birthday) <= 30)
        .map(u => ({ ...u, days: daysUntilBirthday(u.birthday!) }))
        .sort((a, b) => a.days - b.days);
      setBirthdayPartners(bdays);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os parceiros.');
    } finally {
      setLoading(false);
    }
  }

  function sendDonationReminder(user: PartnerUser) {
    if (!user.whatsapp) {
      Alert.alert('Sem WhatsApp', `${user.name} não tem WhatsApp cadastrado.`);
      return;
    }
    const msg = `Olá, ${user.name}! 🏠\n\nPassamos para lembrar que sua doação mensal ao Projeto Moradia ainda não foi registrada este mês.\n\nSua contribuição é fundamental para continuarmos construindo lares e transformando vidas.\n\nDe casa em casa podemos mudar o mundo! 💚\n\nQualquer dúvida, estamos à disposição.`;
    openWhatsApp(user.whatsapp, msg);
  }

  function sendBirthdayMessage(user: PartnerUser) {
    if (!user.whatsapp) {
      Alert.alert('Sem WhatsApp', `${user.name} não tem WhatsApp cadastrado.`);
      return;
    }
    const msg = `🎉 Feliz aniversário, ${user.name}!\n\nEm seu dia especial, queremos agradecer imensamente por fazer parte do Projeto Moradia. Sua generosidade e parceria nos permitem continuar construindo sonhos e transformando vidas.\n\nQue este ano seja repleto de alegrias e conquistas! 🏠💚\n\nCom carinho, equipe Projeto Moradia.`;
    openWhatsApp(user.whatsapp, msg);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.labelRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Main')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerLabel}>LEMBRETES</Text>
          </View>
          <Text style={styles.headerTitle}>Avisos & Mensagens</Text>
          <Text style={styles.headerSub}>Doações pendentes e aniversários dos parceiros</Text>
        </View>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={Colors.teal} size="large" />
            <Text style={styles.loadingText}>Carregando parceiros...</Text>
          </View>
        ) : (
          <View style={styles.body}>

            {/* Doações pendentes */}
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: Colors.terra }]} />
              <Text style={styles.sectionTitle}>NÃO DOARAM ESTE MÊS</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{overduePartners.length}</Text>
              </View>
            </View>

            {overduePartners.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyEmoji}>✓</Text>
                <Text style={styles.emptyTitle}>Todos em dia!</Text>
                <Text style={styles.emptySub}>Todos os parceiros já doaram este mês.</Text>
              </View>
            ) : (
              overduePartners.map(user => (
                <View key={user.uid} style={styles.partnerCard}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.partnerInfo}>
                    <Text style={styles.partnerName}>{user.name}</Text>
                    <Text style={styles.partnerSub}>
                      {user.whatsapp || 'Sem WhatsApp'} · {user.email}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.whatsappBtn}
                    onPress={() => sendDonationReminder(user)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.whatsappBtnText}>Lembrar</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}

            <View style={{ height: Spacing.xl }} />

            {/* Aniversários */}
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: Colors.teal }]} />
              <Text style={styles.sectionTitle}>ANIVERSÁRIOS PRÓXIMOS (30 DIAS)</Text>
              <View style={[styles.badge, { backgroundColor: Colors.tealBg }]}>
                <Text style={[styles.badgeText, { color: Colors.teal }]}>{birthdayPartners.length}</Text>
              </View>
            </View>

            {birthdayPartners.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyEmoji}>📅</Text>
                <Text style={styles.emptyTitle}>Sem aniversários</Text>
                <Text style={styles.emptySub}>Nenhum aniversário nos próximos 30 dias.</Text>
              </View>
            ) : (
              birthdayPartners.map(user => (
                <View key={user.uid} style={styles.partnerCard}>
                  <View style={[styles.avatar, { backgroundColor: Colors.tealBg }]}>
                    <Text style={[styles.avatarText, { color: Colors.teal }]}>{user.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.partnerInfo}>
                    <Text style={styles.partnerName}>{user.name}</Text>
                    <Text style={[styles.partnerSub, user.days === 0 && { color: Colors.terra, fontWeight: '700' }]}>
                      {user.birthday} · {formatBirthdayLabel(user.birthday!)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.whatsappBtn, { backgroundColor: Colors.tealBg, borderColor: Colors.teal }]}
                    onPress={() => sendBirthdayMessage(user)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.whatsappBtnText, { color: Colors.teal }]}>Parabéns</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}

            <View style={{ height: Spacing.lg }} />
            <TouchableOpacity style={styles.refreshBtn} onPress={loadPartners}>
              <Text style={styles.refreshBtnText}>Atualizar lista</Text>
            </TouchableOpacity>
            <View style={{ height: 24 }} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  header: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backBtn: { paddingRight: 6, paddingVertical: 2 },
  backArrow: { fontSize: 22, color: Colors.teal, fontWeight: '700', lineHeight: 24 },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: Colors.teal },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5, marginBottom: 4 },
  headerSub: { fontSize: 13, color: Colors.text3, lineHeight: 20 },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 16 },
  loadingText: { fontSize: 14, color: Colors.text3 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.md },
  sectionDot: { width: 8, height: 8, borderRadius: 4 },
  sectionTitle: { flex: 1, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, color: Colors.text3 },
  badge: { backgroundColor: Colors.terraBg, borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 12, fontWeight: '700', color: Colors.terra },
  emptyCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.md, ...Shadow.sm },
  emptyEmoji: { fontSize: 28, marginBottom: 8, color: Colors.teal },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  emptySub: { fontSize: 13, color: Colors.text3, textAlign: 'center' },
  partnerCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Shadow.sm,
  },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: Colors.terraBg,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  avatarText: { fontSize: 16, fontWeight: '800', color: Colors.terra },
  partnerInfo: { flex: 1 },
  partnerName: { fontSize: 14, fontWeight: '700', color: Colors.text },
  partnerSub: { fontSize: 11, color: Colors.text3, marginTop: 2 },
  whatsappBtn: {
    borderWidth: 1.5, borderColor: Colors.terra,
    borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 7,
  },
  whatsappBtnText: { fontSize: 12, fontWeight: '700', color: Colors.terra },
  refreshBtn: {
    backgroundColor: Colors.white, borderRadius: Radius.md, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border,
  },
  refreshBtnText: { fontSize: 13, fontWeight: '700', color: Colors.teal },
});

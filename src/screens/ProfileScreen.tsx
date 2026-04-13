import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { donationHistory } from '../data/mock';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../services/firebase';

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, profile, logout } = useAuth();

  const displayName = profile?.name ?? user?.displayName ?? 'Parceiro';
  const partnerSince = profile?.partnerSince ?? 'recentemente';
  const totalDonated = profile?.totalDonated ?? 0;
  const housesHelped = profile?.housesHelped ?? 0;

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editWhatsapp, setEditWhatsapp] = useState(profile?.whatsapp ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!editName.trim()) { Alert.alert('Atenção', 'O nome não pode ser vazio.'); return; }
    setSaving(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: editName.trim() });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          name: editName.trim(),
          whatsapp: editWhatsapp.trim(),
        });
      }
      setEditing(false);
      Alert.alert('Salvo!', 'Seus dados foram atualizados.');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  }

  const initials = displayName.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          {/* Linha topo: voltar + sair */}
          <View style={styles.headerTopRow}>
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
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutBtnText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.profileName}>{editing ? editName : displayName}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <Text style={styles.profileSince}>Parceiro desde {partnerSince}</Text>

          <View style={styles.badgesRow}>
            {['Parceiro', 'Recorrente'].map(b => (
              <View key={b} style={styles.badge}>
                <Text style={styles.badgeText}>{b}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.body}>

          {/* Impact banner */}
          <View style={styles.impactBanner}>
            <Text style={styles.impactLabel}>IMPACTO GERADO</Text>
            <Text style={styles.impactBig}>{housesHelped}</Text>
            <Text style={styles.impactSub}>
              {housesHelped === 1 ? 'casa ajudada a construir' : 'casas ajudadas a construir'}
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>SEU IMPACTO PESSOAL</Text>
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
          </View>

          {/* Editar perfil */}
          <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardHeading}>MEUS DADOS</Text>
              {!editing && (
                <TouchableOpacity onPress={() => { setEditName(displayName); setEditWhatsapp(profile?.whatsapp ?? ''); setEditing(true); }}>
                  <Text style={styles.editBtn}>Editar</Text>
                </TouchableOpacity>
              )}
            </View>

            {editing ? (
              <>
                <Text style={styles.fieldLabel}>NOME</Text>
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  autoCapitalize="words"
                  placeholder="Seu nome"
                  placeholderTextColor={Colors.text3}
                />
                <Text style={styles.fieldLabel}>WHATSAPP</Text>
                <TextInput
                  style={styles.input}
                  value={editWhatsapp}
                  onChangeText={setEditWhatsapp}
                  keyboardType="phone-pad"
                  placeholder="(61) 99999-9999"
                  placeholderTextColor={Colors.text3}
                />
                <Text style={styles.emailNote}>E-mail não pode ser alterado aqui.</Text>
                <View style={styles.editBtnsRow}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditing(false)}>
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
                    {saving ? <ActivityIndicator color={Colors.white} size="small" /> : <Text style={styles.saveBtnText}>Salvar</Text>}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Nome</Text>
                  <Text style={styles.dataValue}>{displayName}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>E-mail</Text>
                  <Text style={styles.dataValue}>{user?.email}</Text>
                </View>
                <View style={[styles.dataRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.dataLabel}>WhatsApp</Text>
                  <Text style={styles.dataValue}>{profile?.whatsapp || '—'}</Text>
                </View>
              </>
            )}
          </View>

          {/* Histórico */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>HISTÓRICO DE DOAÇÕES</Text>
            {donationHistory.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma doação registrada ainda.</Text>
            ) : (
              donationHistory.map(item => (
                <View key={item.id} style={styles.historyItem}>
                  <View style={styles.historyDot}>
                    <Text style={styles.historyDotText}>{item.label.charAt(0)}</Text>
                  </View>
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
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <Text style={styles.logoutCardText}>Sair da conta</Text>
          </TouchableOpacity>

          <View style={{ height: 16 }} />
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
    paddingTop: 20,
    paddingBottom: 44,
  },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backBtn: { paddingRight: 4, paddingVertical: 2 },
  backArrow: { fontSize: 22, color: 'rgba(255,255,255,0.85)', fontWeight: '700', lineHeight: 24 },
  backLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: 'rgba(255,255,255,0.85)' },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  logoutBtnText: { fontSize: 12, fontWeight: '600', color: Colors.white },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md, alignSelf: 'center' },
  avatarText: { fontSize: 26, fontWeight: '800', color: Colors.white },
  profileName: { fontSize: 20, fontWeight: '800', color: Colors.white, textAlign: 'center' },
  profileEmail: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2, textAlign: 'center' },
  profileSince: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4, textAlign: 'center' },
  badgesRow: { flexDirection: 'row', gap: 8, marginTop: Spacing.md, justifyContent: 'center' },
  badge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  badgeText: { fontSize: 11, fontWeight: '600', color: Colors.white, letterSpacing: 0.3 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md, marginTop: -20 },
  impactBanner: { backgroundColor: Colors.terra, borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.md, ...Shadow.md },
  impactLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 8 },
  impactBig: { fontSize: 44, fontWeight: '800', color: Colors.white, lineHeight: 48 },
  impactSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: '500' },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.sm },
  cardHeading: { fontSize: 10, fontWeight: '700', color: Colors.text3, letterSpacing: 0.7, marginBottom: Spacing.md },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  editBtn: { fontSize: 13, fontWeight: '700', color: Colors.teal },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statBox: { flex: 1, backgroundColor: Colors.cream, borderRadius: Radius.sm, padding: Spacing.md, alignItems: 'center' },
  statN: { fontSize: 16, fontWeight: '800', color: Colors.green, textAlign: 'center', lineHeight: 22 },
  statL: { fontSize: 10, color: Colors.text3, marginTop: 4, textAlign: 'center', lineHeight: 14 },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: Colors.text3, letterSpacing: 0.7, marginBottom: 6 },
  input: { backgroundColor: Colors.cream, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: Colors.text, marginBottom: Spacing.md },
  emailNote: { fontSize: 11, color: Colors.text3, marginBottom: Spacing.md },
  editBtnsRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, paddingVertical: 13, alignItems: 'center', borderRadius: Radius.sm, borderWidth: 1.5, borderColor: Colors.border },
  cancelBtnText: { fontSize: 14, fontWeight: '600', color: Colors.text2 },
  saveBtn: { flex: 1, paddingVertical: 13, alignItems: 'center', borderRadius: Radius.sm, backgroundColor: Colors.teal },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: Colors.border },
  dataLabel: { fontSize: 13, color: Colors.text3, fontWeight: '500' },
  dataValue: { fontSize: 13, color: Colors.text, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  historyItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: Colors.border },
  historyDot: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.tealBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  historyDotText: { fontSize: 13, fontWeight: '800', color: Colors.teal },
  historyInfo: { flex: 1 },
  historyLbl: { fontSize: 14, fontWeight: '600', color: Colors.text },
  historyDate: { fontSize: 11, color: Colors.text3, marginTop: 2 },
  historyAmt: { fontSize: 15, fontWeight: '800', color: Colors.green },
  historyMore: { alignItems: 'center', paddingTop: Spacing.md },
  historyMoreText: { fontSize: 13, fontWeight: '700', color: Colors.teal },
  emptyText: { fontSize: 14, color: Colors.text3, textAlign: 'center', paddingVertical: Spacing.lg },
  logoutCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', marginBottom: Spacing.md, borderWidth: 1.5, borderColor: Colors.border },
  logoutCardText: { fontSize: 14, fontWeight: '600', color: '#C62828' },
});

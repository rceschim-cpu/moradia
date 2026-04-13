import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../components/BackButton';
import { CTAButton } from '../components/CTAButton';
import { Colors, Spacing, Radius, Shadow } from '../theme';

const CONTACTS = [
  { tag: 'WA', bg: Colors.tealBg, tagColor: Colors.teal, title: 'WhatsApp', sub: 'Atendimento rápido e humanizado' },
  { tag: 'IG', bg: Colors.terraBg, tagColor: Colors.terra, title: 'Instagram', sub: '@projetomoradia · Siga e compartilhe' },
  { tag: '@', bg: Colors.cream, tagColor: Colors.text2, title: 'E-mail', sub: 'contato@projetomoradia.org.br' },
];

export function ContactScreen() {
  const [msg, setMsg] = useState('');
  const [senderName, setSenderName] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerLabel}>RELACIONAMENTO</Text>
          <Text style={styles.headerTitle}>Fale com a gente</Text>
        </View>

        <View style={styles.body}>
          {CONTACTS.map(c => (
            <TouchableOpacity key={c.title} style={styles.contactRow} activeOpacity={0.85}>
              <View style={[styles.contactTag, { backgroundColor: c.bg }]}>
                <Text style={[styles.contactTagText, { color: c.tagColor }]}>{c.tag}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{c.title}</Text>
                <Text style={styles.contactSub}>{c.sub}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          {/* Message form */}
          <View style={styles.formCard}>
            <Text style={styles.formHeading}>ENVIAR MENSAGEM</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor={Colors.text3}
              value={senderName}
              onChangeText={setSenderName}
            />
            <TextInput
              style={[styles.input, { height: 96 }]}
              placeholder="Sua mensagem..."
              placeholderTextColor={Colors.text3}
              multiline
              value={msg}
              onChangeText={setMsg}
              textAlignVertical="top"
            />
            <CTAButton
              label="Enviar mensagem"
              variant="teal"
              onPress={() => Alert.alert('Mensagem enviada!', 'Entraremos em contato em breve.')}
            />
          </View>

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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: Colors.teal, marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 17, marginBottom: 10, ...Shadow.sm },
  contactTag: { width: 44, height: 44, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  contactTagText: { fontSize: 13, fontWeight: '800', letterSpacing: 0.3 },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  contactSub: { fontSize: 12, color: Colors.text3, marginTop: 2 },
  arrow: { fontSize: 20, color: Colors.text3 },
  formCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginTop: 4, ...Shadow.sm },
  formHeading: { fontSize: 10, fontWeight: '700', color: Colors.text3, letterSpacing: 0.7, marginBottom: Spacing.md },
  input: { backgroundColor: Colors.cream, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, padding: Spacing.md, fontSize: 14, color: Colors.text, marginBottom: Spacing.sm },
});

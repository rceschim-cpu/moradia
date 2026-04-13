import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { CTAButton } from '../components/CTAButton';
import { Colors, Spacing, Radius, Shadow } from '../theme';

const CONTACTS = [
  { icon: '📱', bg: '#E8F5E8', title: 'WhatsApp', sub: 'Atendimento rápido e humanizado' },
  { icon: '📸', bg: '#FCE4EC', title: 'Instagram', sub: '@projetomoradia · Siga e compartilhe' },
  { icon: '✉️', bg: Colors.terraBg, title: 'E-mail', sub: 'contato@projetomoradia.org.br' },
];

export function ContactScreen() {
  const [msg, setMsg] = useState('');
  const [senderName, setSenderName] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={[Colors.tealDark, Colors.teal]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={{ fontSize: 52, marginBottom: 12 }}>🏠</Text>
          <Text style={styles.headerTitle}>Fale com a gente</Text>
          <Text style={styles.headerSub}>Estamos aqui para te ajudar</Text>
        </LinearGradient>

        <View style={styles.body}>
          {CONTACTS.map(c => (
            <TouchableOpacity key={c.title} style={styles.contactRow} activeOpacity={0.85}>
              <View style={[styles.contactIcon, { backgroundColor: c.bg }]}>
                <Text style={{ fontSize: 24 }}>{c.icon}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{c.title}</Text>
                <Text style={styles.contactSub}>{c.sub}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          <Card heading="💌 Envie uma mensagem" style={{ marginTop: 4 }}>
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
              onPress={() => Alert.alert('Mensagem enviada!', 'Entraremos em contato em breve. 💛')}
            />
          </Card>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.tealDark },
  header: { padding: Spacing.xl, paddingTop: Spacing.xxxl, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 5 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.78)' },
  body: { backgroundColor: Colors.cream, padding: Spacing.md },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 17, marginBottom: 10, ...Shadow.sm },
  contactIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  contactSub: { fontSize: 12, color: Colors.text3, marginTop: 2 },
  arrow: { fontSize: 20, color: Colors.text3 },
  input: { backgroundColor: Colors.cream, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, padding: Spacing.md, fontSize: 14, color: Colors.text, marginBottom: Spacing.sm, fontFamily: 'System' },
});

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CTAButton } from '../components/CTAButton';
import { SectionLabel } from '../components/Card';
import { Colors, Spacing, Radius, Shadow } from '../theme';

const AMOUNTS = [20, 50, 100, 150, 200, 0]; // 0 = outro

export function DonateScreen() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [recurrent, setRecurrent] = useState(true);
  const [payment, setPayment] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  function handleConfirm() {
    if (!name || !email) {
      Alert.alert('Atenção', 'Preencha seu nome e e-mail para continuar.');
      return;
    }
    Alert.alert(
      '🎉 Doação confirmada!',
      `Sua doação de R$${selectedAmount}/mês foi registrada.\nObrigada por fazer parte dessa história! 🏠💛`,
      [{ text: 'Ótimo!', style: 'default' }],
    );
  }

  const payOpts = [
    { key: 'pix', icon: '⚡', label: 'Pix' },
    { key: 'card', icon: '💳', label: 'Cartão' },
    { key: 'boleto', icon: '📄', label: 'Boleto' },
  ] as const;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={[Colors.terraDark, Colors.terra, Colors.terraLight]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={{ fontSize: 40, marginBottom: 10 }}>💛</Text>
          <Text style={styles.headerTitle}>Fazer uma doação</Text>
          <Text style={styles.headerSub}>Cada real constrói um lar e{'\n'}transforma uma vida</Text>
        </LinearGradient>

        <View style={styles.body}>
          <SectionLabel text="Frequência da doação" />
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleOpt, recurrent && styles.toggleActive]}
              onPress={() => setRecurrent(true)}
            >
              <Text style={[styles.toggleText, recurrent && styles.toggleTextActive]}>🔄 Mensal recorrente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleOpt, !recurrent && styles.toggleActive]}
              onPress={() => setRecurrent(false)}
            >
              <Text style={[styles.toggleText, !recurrent && styles.toggleTextActive]}>1× Doação única</Text>
            </TouchableOpacity>
          </View>

          <SectionLabel text="Escolha o valor" />
          <View style={styles.amountGrid}>
            {AMOUNTS.map(amt => (
              <TouchableOpacity
                key={amt}
                style={[styles.amtChip, selectedAmount === amt && styles.amtSelected]}
                onPress={() => setSelectedAmount(amt)}
                activeOpacity={0.8}
              >
                <Text style={[styles.amtVal, selectedAmount === amt && { color: Colors.terra }]}>
                  {amt === 0 ? 'Outro' : `R$${amt}`}
                </Text>
                <Text style={styles.amtPer}>{amt === 0 ? 'valor livre' : 'por mês'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <SectionLabel text="Seus dados" />
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor={Colors.text3}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor={Colors.text3}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="WhatsApp (com DDD)"
            placeholderTextColor={Colors.text3}
            keyboardType="phone-pad"
            value={whatsapp}
            onChangeText={setWhatsapp}
          />

          <SectionLabel text="Forma de pagamento" />
          <View style={styles.payRow}>
            {payOpts.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.payOpt, payment === opt.key && styles.paySelected]}
                onPress={() => setPayment(opt.key)}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 26, marginBottom: 6 }}>{opt.icon}</Text>
                <Text style={[styles.payLabel, payment === opt.key && { color: Colors.teal }]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 16 }} />
          <CTAButton
            label={`🏠 Confirmar doação de R$${selectedAmount || '?'}/mês`}
            variant="teal"
            onPress={handleConfirm}
          />
          <Text style={styles.lgpd}>🔒 Dados protegidos pela LGPD · Cancele quando quiser</Text>
          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.terraDark },
  header: { padding: Spacing.xl, paddingTop: Spacing.xxl, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 20 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md, paddingTop: Spacing.xs },
  toggleRow: { flexDirection: 'row', backgroundColor: Colors.cream, borderRadius: Radius.sm, padding: 4, marginBottom: 0 },
  toggleOpt: { flex: 1, paddingVertical: 11, alignItems: 'center', borderRadius: 10 },
  toggleActive: { backgroundColor: Colors.white, ...Shadow.sm },
  toggleText: { fontSize: 13, fontWeight: '500', color: Colors.text3 },
  toggleTextActive: { color: Colors.teal, fontWeight: '700' },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amtChip: { width: '31%', backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.border, borderRadius: 14, paddingVertical: 14, alignItems: 'center', ...Shadow.sm },
  amtSelected: { borderColor: Colors.terra, backgroundColor: Colors.terraBg },
  amtVal: { fontSize: 17, fontWeight: '800', color: Colors.text },
  amtPer: { fontSize: 10, color: Colors.text3, marginTop: 2 },
  input: { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, padding: Spacing.md, fontSize: 14, color: Colors.text, marginBottom: Spacing.sm, fontFamily: 'System' },
  payRow: { flexDirection: 'row', gap: 8 },
  payOpt: { flex: 1, backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.border, borderRadius: 14, paddingVertical: 16, alignItems: 'center', ...Shadow.sm },
  paySelected: { borderColor: Colors.teal, backgroundColor: Colors.tealBg },
  payLabel: { fontSize: 12, fontWeight: '600', color: Colors.text2 },
  lgpd: { fontSize: 11, color: Colors.text3, textAlign: 'center', marginTop: Spacing.md, lineHeight: 18 },
});

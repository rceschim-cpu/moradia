import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CTAButton } from '../components/CTAButton';
import { Colors, Spacing, Radius, Shadow } from '../theme';

const AMOUNTS = [20, 50, 100, 150, 200, 0];

export function DonateScreen() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [recurrent, setRecurrent] = useState(true);
  const [payment, setPayment] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  function handleConfirm() {
    if (!name || !email) { Alert.alert('Atenção', 'Preencha seu nome e e-mail.'); return; }
    Alert.alert(
      'Doação confirmada!',
      `Sua doação de R$${selectedAmount}${recurrent ? '/mês' : ''} foi registrada.\nObrigada por fazer parte dessa história.`,
      [{ text: 'Ótimo!', style: 'default' }],
    );
  }

  const payOpts = [
    { key: 'pix', label: 'Pix' },
    { key: 'card', label: 'Cartão' },
    { key: 'boleto', label: 'Boleto' },
  ] as const;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>FAZER UMA DOAÇÃO</Text>
          <Text style={styles.headerTitle}>Cada real constrói{'\n'}um lar</Text>
        </View>

        <View style={styles.body}>

          {/* Frequência */}
          <Text style={styles.sectionLabel}>Frequência</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleOpt, recurrent && styles.toggleActive]} onPress={() => setRecurrent(true)}>
              <Text style={[styles.toggleText, recurrent && styles.toggleTextActive]}>Mensal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleOpt, !recurrent && styles.toggleActive]} onPress={() => setRecurrent(false)}>
              <Text style={[styles.toggleText, !recurrent && styles.toggleTextActive]}>Única</Text>
            </TouchableOpacity>
          </View>

          {/* Valor */}
          <Text style={styles.sectionLabel}>Valor</Text>
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
                {recurrent && <Text style={styles.amtPer}>{amt === 0 ? 'livre' : '/mês'}</Text>}
              </TouchableOpacity>
            ))}
          </View>

          {/* Dados */}
          <Text style={styles.sectionLabel}>Seus dados</Text>
          <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor={Colors.text3} autoCapitalize="words" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={Colors.text3} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="WhatsApp (com DDD)" placeholderTextColor={Colors.text3} keyboardType="phone-pad" value={whatsapp} onChangeText={setWhatsapp} />

          {/* Pagamento */}
          <Text style={styles.sectionLabel}>Pagamento</Text>
          <View style={styles.payRow}>
            {payOpts.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.payOpt, payment === opt.key && styles.paySelected]}
                onPress={() => setPayment(opt.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.payLabel, payment === opt.key && { color: Colors.teal, fontWeight: '700' }]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: Spacing.lg }} />
          <CTAButton
            label={`Confirmar doação · R$${selectedAmount || '?'}${recurrent ? '/mês' : ''}`}
            variant="terra"
            onPress={handleConfirm}
          />
          <Text style={styles.lgpd}>Dados protegidos pela LGPD · Cancele quando quiser</Text>
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
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: Colors.terra, marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, lineHeight: 34, letterSpacing: -0.5 },
  body: { backgroundColor: Colors.cream, padding: Spacing.md },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.text3, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 10, marginTop: 20 },
  toggleRow: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.sm, padding: 4, borderWidth: 1, borderColor: Colors.border },
  toggleOpt: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  toggleActive: { backgroundColor: Colors.teal },
  toggleText: { fontSize: 13, fontWeight: '500', color: Colors.text3 },
  toggleTextActive: { color: Colors.white, fontWeight: '700' },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amtChip: { width: '31%', backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, paddingVertical: 14, alignItems: 'center', ...Shadow.sm },
  amtSelected: { borderColor: Colors.terra, backgroundColor: Colors.terraBg },
  amtVal: { fontSize: 16, fontWeight: '800', color: Colors.text },
  amtPer: { fontSize: 10, color: Colors.text3, marginTop: 2 },
  input: { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, paddingHorizontal: 16, paddingVertical: 13, fontSize: 14, color: Colors.text, marginBottom: Spacing.sm },
  payRow: { flexDirection: 'row', gap: 8 },
  payOpt: { flex: 1, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, paddingVertical: 14, alignItems: 'center', ...Shadow.sm },
  paySelected: { borderColor: Colors.teal, backgroundColor: Colors.tealBg },
  payLabel: { fontSize: 13, fontWeight: '500', color: Colors.text2 },
  lgpd: { fontSize: 11, color: Colors.text3, textAlign: 'center', marginTop: Spacing.md, lineHeight: 18 },
});

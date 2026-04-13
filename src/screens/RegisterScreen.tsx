import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Radius, Shadow } from '../theme';

interface Props { onGoToLogin: () => void }

export function RegisterScreen({ onGoToLogin }: Props) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirm) { Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.'); return; }
    if (password.length < 6) { Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.'); return; }
    if (password !== confirm) { Alert.alert('Atenção', 'As senhas não coincidem.'); return; }
    setLoading(true);
    try {
      await signUp(name.trim(), email.trim(), password, whatsapp.trim());
    } catch (e: any) {
      const msgs: Record<string, string> = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/weak-password': 'Senha muito fraca.',
      };
      Alert.alert('Erro', msgs[e.code] ?? 'Erro ao criar conta.');
    } finally { setLoading(false); }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Logo area */}
          <View style={styles.logoArea}>
            <Image source={require('../../assets/logo-terra.jpg')} style={styles.logo} resizeMode="contain" />
            <View style={styles.partnersBadge}>
              <Text style={styles.partnersText}>183 parceiros já constroem junto</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Preencha seus dados para começar</Text>

            {[
              { label: 'Nome completo *', placeholder: 'Seu nome', value: name, setter: setName, type: 'default' as const, cap: 'words' as const },
              { label: 'E-mail *', placeholder: 'seu@email.com', value: email, setter: setEmail, type: 'email-address' as const, cap: 'none' as const },
              { label: 'WhatsApp', placeholder: '(61) 99999-9999', value: whatsapp, setter: setWhatsapp, type: 'phone-pad' as const, cap: 'none' as const },
            ].map(f => (
              <View key={f.label}>
                <Text style={styles.label}>{f.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={f.placeholder}
                  placeholderTextColor={Colors.text3}
                  keyboardType={f.type}
                  autoCapitalize={f.cap}
                  autoCorrect={false}
                  value={f.value}
                  onChangeText={f.setter}
                />
              </View>
            ))}

            <Text style={styles.label}>Senha * <Text style={styles.labelHint}>(mín. 6 caracteres)</Text></Text>
            <View style={styles.passRow}>
              <TextInput
                style={[styles.input, styles.inputPass]}
                placeholder="••••••••"
                placeholderTextColor={Colors.text3}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(v => !v)}>
                <Text style={styles.eyeText}>{showPass ? 'ocultar' : 'ver'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar senha *</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.text3}
              secureTextEntry={!showPass}
              value={confirm}
              onChangeText={setConfirm}
            />

            <TouchableOpacity
              style={[styles.btn, loading && { opacity: 0.65 }]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.btnText}>Criar minha conta</Text>}
            </TouchableOpacity>

            <Text style={styles.terms}>
              Ao criar sua conta, você concorda com nossa{' '}
              <Text style={{ color: Colors.teal }}>Política de Privacidade</Text> (LGPD).
            </Text>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>ou</Text>
              <View style={styles.divLine} />
            </View>

            <TouchableOpacity style={styles.secondaryBtn} onPress={onGoToLogin}>
              <Text style={styles.secondaryText}>
                Já tenho conta.{'  '}
                <Text style={{ color: Colors.teal, fontWeight: '700' }}>Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { flexGrow: 1 },
  logoArea: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 28,
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 14,
  },
  logo: { width: 280, height: 100, alignSelf: 'center' },
  partnersBadge: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  partnersText: { fontSize: 12, color: Colors.text2, fontWeight: '500' },
  form: { flex: 1, padding: Spacing.xl, paddingTop: 28 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: 4, letterSpacing: -0.3 },
  subtitle: { fontSize: 14, color: Colors.text3, marginBottom: 24 },
  label: { fontSize: 11, fontWeight: '700', color: Colors.text2, marginBottom: 7, textTransform: 'uppercase', letterSpacing: 0.7 },
  labelHint: { fontSize: 11, fontWeight: '400', color: Colors.text3, textTransform: 'none', letterSpacing: 0 },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  inputPass: { flex: 1, marginBottom: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 },
  eyeBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderTopRightRadius: Radius.sm,
    borderBottomRightRadius: Radius.sm,
    paddingHorizontal: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeText: { fontSize: 11, fontWeight: '600', color: Colors.teal },
  btn: { backgroundColor: Colors.terra, borderRadius: Radius.sm, paddingVertical: 16, alignItems: 'center', marginBottom: 12, ...Shadow.sm },
  btnText: { fontSize: 15, fontWeight: '700', color: Colors.white, letterSpacing: 0.2 },
  terms: { fontSize: 12, color: Colors.text3, textAlign: 'center', lineHeight: 18, marginBottom: Spacing.xl },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: Spacing.xl },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  divText: { fontSize: 12, color: Colors.text3 },
  secondaryBtn: { alignItems: 'center', paddingVertical: 8 },
  secondaryText: { fontSize: 14, color: Colors.text2 },
});

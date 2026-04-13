import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Radius } from '../theme';

interface Props {
  onGoToLogin: () => void;
}

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
    if (!name || !email || !password || !confirm) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await signUp(name.trim(), email.trim(), password, whatsapp.trim());
    } catch (e: any) {
      const msgs: Record<string, string> = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado. Tente entrar.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
        'auth/network-request-failed': 'Sem conexão com a internet.',
      };
      Alert.alert('Erro', msgs[e.code] ?? 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <LinearGradient
            colors={[Colors.terraDark, Colors.terra, Colors.terraLight]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.headerIcon}>💛</Text>
            <Text style={styles.headerTitle}>Torne-se um parceiro</Text>
            <Text style={styles.headerSub}>Junte-se a 183 parceiros que já{'\n'}estão transformando vidas</Text>
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Preencha seus dados para começar</Text>

            <Text style={styles.label}>Nome completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor={Colors.text3}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>E-mail *</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={Colors.text3}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>WhatsApp</Text>
            <TextInput
              style={styles.input}
              placeholder="(61) 99999-9999"
              placeholderTextColor={Colors.text3}
              keyboardType="phone-pad"
              value={whatsapp}
              onChangeText={setWhatsapp}
            />

            <Text style={styles.label}>Senha * <Text style={styles.labelHint}>(mín. 6 caracteres)</Text></Text>
            <View style={styles.passWrap}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                placeholder="••••••••"
                placeholderTextColor={Colors.text3}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(v => !v)}>
                <Text style={{ fontSize: 18 }}>{showPass ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { marginTop: Spacing.lg }]}>Confirmar senha *</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.text3}
              secureTextEntry={!showPass}
              value={confirm}
              onChangeText={setConfirm}
            />

            <TouchableOpacity
              style={[styles.registerBtn, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Colors.terraDark, Colors.terra, Colors.terraLight]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.registerBtnGrad}
              >
                {loading
                  ? <ActivityIndicator color={Colors.white} />
                  : <Text style={styles.registerBtnText}>🏠 Criar minha conta</Text>
                }
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.terms}>
              Ao criar sua conta, você concorda com nossa{' '}
              <Text style={{ color: Colors.teal, fontWeight: '600' }}>Política de Privacidade</Text>
              {' '}(LGPD).
            </Text>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>ou</Text>
              <View style={styles.divLine} />
            </View>

            <TouchableOpacity style={styles.loginLink} onPress={onGoToLogin}>
              <Text style={styles.loginLinkText}>
                Já tenho conta. <Text style={{ color: Colors.teal, fontWeight: '800' }}>Entrar</Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.terraDark },
  scroll: { flexGrow: 1 },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 36, paddingHorizontal: Spacing.xl },
  headerIcon: { fontSize: 40, marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 20 },
  form: {
    flex: 1,
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    padding: Spacing.xl,
    paddingTop: 32,
  },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.text3, marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '700', color: Colors.text2, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  labelHint: { fontSize: 11, fontWeight: '400', color: Colors.text3, textTransform: 'none', letterSpacing: 0 },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    padding: Spacing.md,
    fontSize: 14,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontFamily: 'System',
  },
  passWrap: { flexDirection: 'row' },
  eyeBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderLeftWidth: 0,
    borderTopRightRadius: Radius.sm,
    borderBottomRightRadius: Radius.sm,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtn: { borderRadius: Radius.md, overflow: 'hidden', marginTop: Spacing.lg, marginBottom: Spacing.md },
  registerBtnGrad: { paddingVertical: 17, alignItems: 'center' },
  registerBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white, letterSpacing: -0.2 },
  terms: { fontSize: 12, color: Colors.text3, textAlign: 'center', lineHeight: 18, marginBottom: Spacing.xl },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: Spacing.xl },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  divText: { fontSize: 12, color: Colors.text3, fontWeight: '500' },
  loginLink: { alignItems: 'center', paddingVertical: 8 },
  loginLinkText: { fontSize: 14, color: Colors.text2 },
});

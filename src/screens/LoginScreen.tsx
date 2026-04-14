import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Radius, Shadow } from '../theme';

interface Props { onGoToRegister: () => void }

export function LoginScreen({ onGoToRegister }: Props) {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleLogin() {
    if (!email || !password) { Alert.alert('Atenção', 'Preencha e-mail e senha.'); return; }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (e: any) {
      const msgs: Record<string, string> = {
        'auth/invalid-credential': 'E-mail ou senha incorretos.',
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde.',
      };
      Alert.alert('Erro', msgs[e.code] ?? 'Erro ao entrar. Tente novamente.');
    } finally { setLoading(false); }
  }

  async function handleReset() {
    if (!email) { Alert.alert('Atenção', 'Digite seu e-mail para recuperar a senha.'); return; }
    try {
      await resetPassword(email.trim());
      Alert.alert('E-mail enviado!', 'Verifique sua caixa de entrada para redefinir a senha.');
    } catch { Alert.alert('Erro', 'Não foi possível enviar o e-mail.'); }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Logo area */}
          <View style={styles.logoArea}>
            <Image source={require('../../assets/logo-teal.jpg')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.tagline}>De casa em casa podemos mudar o mundo</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.title}>Bem-vindo de volta</Text>
            <Text style={styles.subtitle}>Entre para acompanhar seu impacto</Text>

            <Text style={styles.label}>E-mail</Text>
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

            <Text style={styles.label}>Senha</Text>
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

            <TouchableOpacity onPress={handleReset} style={styles.forgotWrap}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, loading && { opacity: 0.65 }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.btnText}>Entrar</Text>}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>ou</Text>
              <View style={styles.divLine} />
            </View>

            <TouchableOpacity style={styles.secondaryBtn} onPress={onGoToRegister} activeOpacity={0.8}>
              <Text style={styles.secondaryText}>
                Ainda não é parceiro?{'  '}
                <Text style={{ color: Colors.terra, fontWeight: '700' }}>Cadastre-se</Text>
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
    paddingBottom: 36,
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: { width: 300, height: 100 },
  tagline: { fontSize: 13, color: Colors.text3, marginTop: 12, textAlign: 'center', lineHeight: 20 },
  form: {
    flex: 1,
    padding: Spacing.xl,
    paddingTop: 32,
  },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: 4, letterSpacing: -0.3 },
  subtitle: { fontSize: 14, color: Colors.text3, marginBottom: 28 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text2,
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
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
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
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
  forgotWrap: { alignSelf: 'flex-end', marginTop: 8, marginBottom: 24 },
  forgotText: { fontSize: 13, color: Colors.teal, fontWeight: '600' },
  btn: {
    backgroundColor: Colors.teal,
    borderRadius: Radius.sm,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadow.sm,
  },
  btnText: { fontSize: 15, fontWeight: '700', color: Colors.white, letterSpacing: 0.2 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: Spacing.xl },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  divText: { fontSize: 12, color: Colors.text3 },
  secondaryBtn: { alignItems: 'center', paddingVertical: 8 },
  secondaryText: { fontSize: 14, color: Colors.text2 },
});

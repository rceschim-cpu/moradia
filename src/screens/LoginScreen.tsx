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
  onGoToRegister: () => void;
}

export function LoginScreen({ onGoToRegister }: Props) {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (e: any) {
      const msgs: Record<string, string> = {
        'auth/invalid-credential': 'E-mail ou senha incorretos.',
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde.',
        'auth/network-request-failed': 'Sem conexão com a internet.',
      };
      Alert.alert('Erro', msgs[e.code] ?? 'Erro ao entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!email) {
      Alert.alert('Atenção', 'Digite seu e-mail para recuperar a senha.');
      return;
    }
    try {
      await resetPassword(email.trim());
      Alert.alert('E-mail enviado!', 'Verifique sua caixa de entrada para redefinir a senha. 💛');
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação.');
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <LinearGradient
            colors={[Colors.tealDark, Colors.teal, '#28A99C']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.logoSub}>PROJETO</Text>
            <Text style={styles.logoName}>moradia</Text>
            <Text style={styles.tagline}>Transformando vidas, um lar de cada vez 🏠</Text>
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
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
            <View style={styles.passWrap}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                placeholder="••••••••"
                placeholderTextColor={Colors.text3}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPass(v => !v)}
              >
                <Text style={{ fontSize: 18 }}>{showPass ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleReset} style={styles.forgotWrap}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginBtn, loading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Colors.tealDark, Colors.teal, Colors.tealLight]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.loginBtnGrad}
              >
                {loading
                  ? <ActivityIndicator color={Colors.white} />
                  : <Text style={styles.loginBtnText}>Entrar</Text>
                }
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>ou</Text>
              <View style={styles.divLine} />
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={onGoToRegister} activeOpacity={0.8}>
              <Text style={styles.registerText}>
                Ainda não é parceiro? <Text style={{ color: Colors.terra, fontWeight: '800' }}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.tealDark },
  scroll: { flexGrow: 1 },
  header: { alignItems: 'center', paddingTop: 48, paddingBottom: 40, paddingHorizontal: Spacing.xl },
  logoSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, fontWeight: '400', textTransform: 'uppercase' },
  logoName: { fontSize: 42, fontWeight: '800', color: Colors.white, letterSpacing: -1, marginTop: 2 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 12, textAlign: 'center', lineHeight: 20 },
  form: {
    flex: 1,
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    padding: Spacing.xl,
    paddingTop: 32,
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.text3, marginBottom: 28 },
  label: { fontSize: 12, fontWeight: '700', color: Colors.text2, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
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
  passWrap: { flexDirection: 'row', marginBottom: Spacing.sm },
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
  forgotWrap: { alignSelf: 'flex-end', marginBottom: Spacing.xl, marginTop: 6 },
  forgotText: { fontSize: 13, color: Colors.teal, fontWeight: '600' },
  loginBtn: { borderRadius: Radius.md, overflow: 'hidden', marginBottom: Spacing.xl },
  loginBtnGrad: { paddingVertical: 17, alignItems: 'center' },
  loginBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white, letterSpacing: -0.2 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: Spacing.xl },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  divText: { fontSize: 12, color: Colors.text3, fontWeight: '500' },
  registerBtn: { alignItems: 'center', paddingVertical: 8 },
  registerText: { fontSize: 14, color: Colors.text2 },
});

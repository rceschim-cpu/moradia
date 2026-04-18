import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { currentCampaign, projectStats, transparencyData } from '../data/mock';

function buildHTML(): string {
  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const pct = Math.round((currentCampaign.raised / currentCampaign.goal) * 100);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1A1A1A; background: #fff; }
  .page { padding: 48px 44px; max-width: 720px; margin: 0 auto; }
  .header { border-bottom: 3px solid #1A7B72; padding-bottom: 24px; margin-bottom: 32px; }
  .brand { font-size: 28px; font-weight: 900; color: #1A7B72; letter-spacing: -1px; }
  .brand span { color: #C4724A; }
  .subtitle { font-size: 13px; color: #9A9A9A; margin-top: 4px; }
  .section { margin-bottom: 36px; }
  .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #9A9A9A; border-bottom: 1px solid #E8E4DF; padding-bottom: 8px; margin-bottom: 18px; }
  .campaign-name { font-size: 22px; font-weight: 800; color: #1A1A1A; margin-bottom: 4px; }
  .campaign-loc { font-size: 13px; color: #9A9A9A; margin-bottom: 16px; }
  .story { font-size: 13px; color: #4A4A4A; line-height: 1.7; background: #F7F4F0; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
  .progress-track { height: 14px; background: #E8E4DF; border-radius: 7px; margin-bottom: 8px; }
  .progress-fill { height: 100%; background: #1A7B72; border-radius: 7px; width: ${pct}%; }
  .progress-labels { display: flex; justify-content: space-between; font-size: 13px; }
  .raised { font-weight: 800; color: #2E7D32; }
  .goal-lbl { color: #9A9A9A; }
  .stat-row { display: flex; gap: 12px; margin-bottom: 8px; }
  .stat-box { flex: 1; background: #F7F4F0; border-radius: 10px; padding: 18px 12px; text-align: center; }
  .stat-n { font-size: 30px; font-weight: 900; color: #C4724A; }
  .stat-l { font-size: 11px; color: #9A9A9A; margin-top: 6px; line-height: 1.4; }
  .money-n { color: #2E7D32; }
  .summary-row { display: flex; gap: 12px; margin-bottom: 20px; }
  .summary-box { flex: 1; border: 1.5px solid #E8E4DF; border-radius: 10px; padding: 16px; text-align: center; }
  .summary-val { font-size: 20px; font-weight: 800; color: #2E7D32; }
  .summary-lbl { font-size: 11px; color: #9A9A9A; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #9A9A9A; padding: 8px 0; border-bottom: 2px solid #E8E4DF; }
  td { padding: 10px 0; border-bottom: 1px solid #F7F4F0; color: #4A4A4A; }
  td.val { font-weight: 700; color: #2E7D32; text-align: right; }
  .bar-wrap { display: flex; align-items: center; gap: 8px; }
  .bar-mini { height: 8px; background: #E8E4DF; border-radius: 4px; flex: 1; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; }
  .footer { margin-top: 48px; border-top: 1px solid #E8E4DF; padding-top: 20px; text-align: center; font-size: 11px; color: #9A9A9A; line-height: 1.6; }
  .teal { color: #1A7B72; }
</style>
</head>
<body>
<div class="page">

  <!-- Cabeçalho -->
  <div class="header">
    <div class="brand">Projeto <span>moradia</span></div>
    <div class="subtitle">Relatório Oficial · Gerado em ${date}</div>
  </div>

  <!-- Campanha -->
  <div class="section">
    <div class="section-title">Campanha em Andamento</div>
    <div class="campaign-name">${currentCampaign.familyName}</div>
    <div class="campaign-loc">${currentCampaign.location}</div>
    <div class="story">${currentCampaign.story}</div>
    <div class="progress-track"><div class="progress-fill"></div></div>
    <div class="progress-labels">
      <span class="raised">R$ ${currentCampaign.raised.toLocaleString('pt-BR')} arrecadados</span>
      <span class="goal-lbl">Meta: R$ ${currentCampaign.goal.toLocaleString('pt-BR')}</span>
    </div>
  </div>

  <!-- Impacto -->
  <div class="section">
    <div class="section-title">Impacto do Projeto</div>
    <div class="stat-row">
      <div class="stat-box">
        <div class="stat-n">${projectStats.housesDelivered}</div>
        <div class="stat-l">Casas<br/>entregues</div>
      </div>
      <div class="stat-box">
        <div class="stat-n">${projectStats.livesImpacted}</div>
        <div class="stat-l">Vidas<br/>impactadas</div>
      </div>
      <div class="stat-box">
        <div class="stat-n money-n">${pct}%</div>
        <div class="stat-l">Da meta<br/>atingida</div>
      </div>
    </div>
  </div>

  <!-- Transparência Financeira -->
  <div class="section">
    <div class="section-title">Transparência Financeira · ${transparencyData.period}</div>
    <div class="summary-row">
      <div class="summary-box">
        <div class="summary-val">${transparencyData.totalRaised}</div>
        <div class="summary-lbl">Total arrecadado em 2026</div>
      </div>
      <div class="summary-box">
        <div class="summary-val">${transparencyData.totalInvested}</div>
        <div class="summary-lbl">Investido em obras</div>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Mês</th><th style="text-align:right">Arrecadado</th><th style="width:40%">Progresso</th></tr>
      </thead>
      <tbody>
        ${transparencyData.monthly.map(m => `
        <tr>
          <td>${m.label}</td>
          <td class="val">${m.value}</td>
          <td><div class="bar-mini"><div class="bar-fill" style="width:${m.pct * 100}%;background:#1A7B72"></div></div></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- Destino dos Recursos -->
  <div class="section">
    <div class="section-title">Destino dos Recursos</div>
    <table>
      <thead>
        <tr><th>Categoria</th><th style="text-align:right">%</th><th style="width:40%">Distribuição</th></tr>
      </thead>
      <tbody>
        ${transparencyData.allocation.map(a => `
        <tr>
          <td>${a.label}</td>
          <td style="text-align:right;font-weight:700;color:${a.color}">${a.value}</td>
          <td><div class="bar-mini"><div class="bar-fill" style="width:${a.pct * 100}%;background:${a.color}"></div></div></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <strong class="teal">Projeto moradia</strong> · De casa em casa podemos mudar o mundo<br/>
    contato@projetomoradia.org.br · Relatório gerado pelo aplicativo oficial
  </div>

</div>
</body>
</html>`;
}

export function ReportScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  async function handleGeneratePDF() {
    setLoading(true);
    try {
      const html = buildHTML();
      const { uri } = await Print.printToFileAsync({ html, base64: false });
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Relatório Projeto Moradia' });
      } else {
        Alert.alert('PDF gerado!', `Arquivo salvo em:\n${uri}`);
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF.');
    } finally {
      setLoading(false);
    }
  }

  const pct = Math.round((currentCampaign.raised / currentCampaign.goal) * 100);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.labelRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Main')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerLabel}>RELATÓRIOS</Text>
          </View>
          <Text style={styles.headerTitle}>Gerar Relatório</Text>
          <Text style={styles.headerSub}>PDF estruturado com todos os dados do projeto</Text>
        </View>

        <View style={styles.body}>

          {/* Preview da campanha */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>CAMPANHA ATUAL</Text>
            <Text style={styles.campName}>{currentCampaign.familyName}</Text>
            <Text style={styles.campLoc}>{currentCampaign.location}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
            <View style={styles.progLabels}>
              <Text style={styles.raisedTxt}>R$ {currentCampaign.raised.toLocaleString('pt-BR')}</Text>
              <Text style={styles.goalTxt}>de R$ {currentCampaign.goal.toLocaleString('pt-BR')}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { n: `${projectStats.housesDelivered}`, l: 'Casas\nentregues' },
              { n: `${projectStats.livesImpacted}`, l: 'Vidas\nimpactadas' },
              { n: `${pct}%`, l: 'Da meta\natingida' },
            ].map(s => (
              <View key={s.l} style={styles.statBox}>
                <Text style={styles.statN}>{s.n}</Text>
                <Text style={styles.statL}>{s.l}</Text>
              </View>
            ))}
          </View>

          {/* O que inclui */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>O PDF INCLUI</Text>
            {[
              'Dados completos da campanha em andamento',
              'História da família beneficiada',
              'Arrecadação mensal detalhada (2026)',
              'Destino de cada real investido',
              'Impacto total do projeto',
            ].map(item => (
              <View key={item} style={styles.includeRow}>
                <View style={styles.checkDot} />
                <Text style={styles.includeText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Botão gerar */}
          <TouchableOpacity
            style={[styles.generateBtn, loading && { opacity: 0.65 }]}
            onPress={handleGeneratePDF}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={styles.generateBtnText}>Gerar e compartilhar PDF</Text>
            }
          </TouchableOpacity>

          <Text style={styles.hint}>O arquivo será gerado e você poderá salvar ou compartilhar.</Text>
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
  body: { backgroundColor: Colors.cream, padding: Spacing.md },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.md, ...Shadow.sm },
  cardHeading: { fontSize: 10, fontWeight: '700', color: Colors.text3, letterSpacing: 0.7, marginBottom: Spacing.md },
  campName: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 2 },
  campLoc: { fontSize: 12, color: Colors.text3, marginBottom: 14 },
  progressTrack: { height: 10, backgroundColor: Colors.border, borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: Colors.teal, borderRadius: 5 },
  progLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  raisedTxt: { fontSize: 13, fontWeight: '800', color: Colors.green },
  goalTxt: { fontSize: 12, color: Colors.text3 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  statBox: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, paddingVertical: 16, alignItems: 'center', ...Shadow.sm },
  statN: { fontSize: 24, fontWeight: '800', color: Colors.terra },
  statL: { fontSize: 10, color: Colors.text3, marginTop: 4, textAlign: 'center', lineHeight: 14 },
  includeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  checkDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.teal, flexShrink: 0 },
  includeText: { fontSize: 13, color: Colors.text2, flex: 1 },
  generateBtn: {
    backgroundColor: Colors.teal,
    borderRadius: Radius.sm,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  generateBtnText: { fontSize: 15, fontWeight: '700', color: Colors.white, letterSpacing: 0.2 },
  hint: { fontSize: 12, color: Colors.text3, textAlign: 'center', lineHeight: 18 },
});

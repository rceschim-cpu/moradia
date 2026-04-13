import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { newsItems } from '../data/mock';

const FILTERS = ['Todos', 'Obras', 'Casas entregues', 'Histórias'];

const CATEGORY_STYLE: Record<string, { text: string; label: string }> = {
  obra:  { text: Colors.teal,  label: 'Obra em andamento' },
  story: { text: Colors.terra, label: 'História real' },
  done:  { text: Colors.green, label: 'Casa entregue' },
};

export function NewsScreen() {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState('Todos');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backRow} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backArrow}>‹</Text>
            <Text style={styles.headerLabel}>INFORMATIVO</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novidades</Text>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow} style={styles.filtersBg}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.feed}>
          {newsItems.map(item => {
            const cs = CATEGORY_STYLE[item.category];
            return (
              <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.85}>
                {/* Color bar */}
                <View style={[styles.colorBar, { backgroundColor: cs.text }]} />
                <View style={styles.newsBody}>
                  <Text style={[styles.newsTag, { color: cs.text }]}>{cs.label.toUpperCase()}</Text>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsExcerpt}>{item.excerpt}</Text>
                  <View style={styles.newsFooter}>
                    <Text style={styles.newsDate}>{item.date}</Text>
                    <Text style={styles.readMore}>Ler mais</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{ height: 16 }} />
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
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 10 },
  backArrow: { fontSize: 20, color: Colors.teal, fontWeight: '700', lineHeight: 22 },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: Colors.teal },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  filtersBg: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  filtersRow: { gap: 8, paddingHorizontal: Spacing.xl, paddingVertical: 14 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.border },
  filterActive: { backgroundColor: Colors.teal, borderColor: Colors.teal },
  filterText: { fontSize: 12, fontWeight: '600', color: Colors.text3 },
  filterTextActive: { color: Colors.white },
  feed: { backgroundColor: Colors.cream, padding: Spacing.md },
  newsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    flexDirection: 'row',
    ...Shadow.sm,
  },
  colorBar: { width: 4, minHeight: '100%' },
  newsBody: { flex: 1, padding: Spacing.lg },
  newsTag: { fontSize: 10, fontWeight: '700', letterSpacing: 0.7, marginBottom: 8 },
  newsTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8, lineHeight: 22, letterSpacing: -0.2 },
  newsExcerpt: { fontSize: 13, color: Colors.text2, lineHeight: 20, marginBottom: 14 },
  newsFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  newsDate: { fontSize: 11, color: Colors.text3 },
  readMore: { fontSize: 12, fontWeight: '700', color: Colors.teal },
});

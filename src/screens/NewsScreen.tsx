import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { newsItems } from '../data/mock';

const FILTERS = ['Todos', 'Obras', 'Casas entregues', 'Histórias'];

const CATEGORY_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  obra: { bg: Colors.tealBg, text: Colors.teal, label: 'Obra em andamento' },
  story: { bg: Colors.terraBg, text: Colors.terra, label: 'História real' },
  done: { bg: Colors.greenBg, text: Colors.green, label: 'Casa entregue' },
};

const IMG_COLORS: Record<string, string[]> = {
  obra: [Colors.tealBg, '#99D5CE'],
  story: [Colors.terraBg, '#E8A080'],
  done: [Colors.greenBg, '#A5D6A7'],
};

export function NewsScreen() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.tealDark, Colors.teal]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>📰 Novidades</Text>
          <Text style={styles.headerSub}>Acompanhe o que está acontecendo</Text>
        </LinearGradient>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
          style={styles.filtersBg}
        >
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
            const ic = IMG_COLORS[item.category];
            return (
              <View key={item.id} style={styles.newsCard}>
                <LinearGradient colors={[ic[0], ic[1]]} style={styles.newsImg}>
                  <Text style={{ fontSize: 64 }}>{item.emoji}</Text>
                </LinearGradient>
                <View style={styles.newsBody}>
                  <View style={[styles.tagPill, { backgroundColor: cs.bg }]}>
                    <Text style={[styles.tagText, { color: cs.text }]}>{cs.label.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsExcerpt}>{item.excerpt}</Text>
                  <View style={styles.newsFooter}>
                    <Text style={styles.newsDate}>{item.date}</Text>
                    <Text style={styles.readMore}>Ler mais →</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{ height: 16 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.tealDark },
  header: { padding: Spacing.xl, paddingTop: Spacing.xxl, paddingBottom: Spacing.lg },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.78)' },
  filtersBg: { backgroundColor: Colors.cream },
  filtersRow: { gap: 8, paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 0 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white },
  filterActive: { backgroundColor: Colors.teal, borderColor: Colors.teal },
  filterText: { fontSize: 12, fontWeight: '600', color: Colors.text3 },
  filterTextActive: { color: Colors.white },
  feed: { backgroundColor: Colors.cream, padding: Spacing.md },
  newsCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, overflow: 'hidden', marginBottom: Spacing.md, ...Shadow.sm },
  newsImg: { height: 160, alignItems: 'center', justifyContent: 'center' },
  newsBody: { padding: Spacing.lg },
  tagPill: { alignSelf: 'flex-start', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4, marginBottom: Spacing.sm },
  tagText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  newsTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 7, lineHeight: 22 },
  newsExcerpt: { fontSize: 13, color: Colors.text2, lineHeight: 21, marginBottom: Spacing.md },
  newsFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  newsDate: { fontSize: 11, color: Colors.text3 },
  readMore: { fontSize: 12, fontWeight: '700', color: Colors.teal },
});

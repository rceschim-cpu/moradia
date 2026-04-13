import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { events } from '../data/mock';

export function EventsScreen() {
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>(
    events.reduce((acc, e) => ({ ...acc, [e.id]: e.confirmed }), {}),
  );

  function toggle(id: string) {
    setConfirmed(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#2D1B5C', '#5C3A9C', '#7B52B8']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>📅 Eventos</Text>
          <Text style={styles.headerSub}>Participe e faça parte dessa história</Text>
        </LinearGradient>

        <View style={styles.list}>
          {events.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <View style={[styles.dateBox, { backgroundColor: event.color }]}>
                <Text style={styles.dateDay}>{event.day}</Text>
                <Text style={styles.dateMonth}>{event.month}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{event.title}</Text>
                <Text style={styles.eventDetail}>{event.detail}</Text>
                <TouchableOpacity
                  style={[styles.rsvpBtn, confirmed[event.id] && styles.rsvpConfirmed]}
                  onPress={() => toggle(event.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.rsvpText, confirmed[event.id] && styles.rsvpTextConfirmed]}>
                    {confirmed[event.id] ? '✅ Presença confirmada' : '+ Confirmar presença'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={{ height: 16 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2D1B5C' },
  header: { padding: Spacing.xl, paddingTop: Spacing.xxl, paddingBottom: Spacing.lg },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.78)' },
  list: { backgroundColor: Colors.cream, padding: Spacing.md },
  eventCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: 10, flexDirection: 'row', gap: 14, alignItems: 'flex-start', ...Shadow.sm },
  dateBox: { borderRadius: Radius.sm, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', minWidth: 52, flexShrink: 0 },
  dateDay: { fontSize: 22, fontWeight: '800', color: Colors.white, lineHeight: 26 },
  dateMonth: { fontSize: 10, color: Colors.white, opacity: 0.85, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  eventInfo: { flex: 1 },
  eventName: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 5, lineHeight: 20 },
  eventDetail: { fontSize: 12, color: Colors.text3, marginBottom: 11, lineHeight: 18 },
  rsvpBtn: { alignSelf: 'flex-start', backgroundColor: Colors.tealBg, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 9 },
  rsvpConfirmed: { backgroundColor: Colors.greenBg },
  rsvpText: { fontSize: 12, fontWeight: '700', color: Colors.teal },
  rsvpTextConfirmed: { color: Colors.green },
});

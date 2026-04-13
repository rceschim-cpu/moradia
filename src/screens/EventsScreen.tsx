import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { events } from '../data/mock';

export function EventsScreen() {
  const navigation = useNavigation<any>();
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>(
    events.reduce((acc, e) => ({ ...acc, [e.id]: e.confirmed }), {}),
  );

  function toggle(id: string) {
    setConfirmed(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.labelRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.jumpTo('Home')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerLabel}>AGENDA</Text>
          </View>
          <Text style={styles.headerTitle}>Eventos</Text>
        </View>

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
                    {confirmed[event.id] ? 'Presença confirmada' : '+ Confirmar presença'}
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
  safe: { flex: 1, backgroundColor: Colors.white },
  header: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backBtn: { paddingRight: 6, paddingVertical: 2 },
  backArrow: { fontSize: 22, color: Colors.teal, fontWeight: '700', lineHeight: 24 },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: Colors.teal },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  list: { backgroundColor: Colors.cream, padding: Spacing.md },
  eventCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: 10, flexDirection: 'row', gap: 14, alignItems: 'flex-start', ...Shadow.sm },
  dateBox: { borderRadius: Radius.sm, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', minWidth: 52, flexShrink: 0 },
  dateDay: { fontSize: 22, fontWeight: '800', color: Colors.white, lineHeight: 26 },
  dateMonth: { fontSize: 10, color: Colors.white, opacity: 0.85, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  eventInfo: { flex: 1 },
  eventName: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 5, lineHeight: 20 },
  eventDetail: { fontSize: 12, color: Colors.text3, marginBottom: 11, lineHeight: 18 },
  rsvpBtn: { alignSelf: 'flex-start', borderWidth: 1.5, borderColor: Colors.teal, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 7 },
  rsvpConfirmed: { backgroundColor: Colors.teal, borderColor: Colors.teal },
  rsvpText: { fontSize: 11, fontWeight: '700', color: Colors.teal },
  rsvpTextConfirmed: { color: Colors.white },
});

import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/HomeScreen';
import { CampaignScreen } from '../screens/CampaignScreen';
import { DonateScreen } from '../screens/DonateScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TransparencyScreen } from '../screens/TransparencyScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { AuthNavigator } from './AuthNavigator';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconActive]}>
      <Text style={{ fontSize: 22 }}>{emoji}</Text>
    </View>
  );
}

function DonateFAB() {
  return (
    <View style={styles.fabWrap}>
      <View style={styles.fab}>
        <Text style={{ fontSize: 26 }}>💛</Text>
      </View>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.teal,
        tabBarInactiveTintColor: Colors.text3,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Campaign"
        component={CampaignScreen}
        options={{
          tabBarLabel: 'Campanha',
          tabBarIcon: ({ focused }) => <TabIcon emoji="❤️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          tabBarLabel: 'Doe',
          tabBarIcon: () => <DonateFAB />,
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700', color: Colors.terra },
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Novidades',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📰" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Transparency" component={TransparencyScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Events" component={EventsScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}

// ── Loading splash ────────────────────────────────────────────
function LoadingSplash() {
  return (
    <View style={styles.splash}>
      <Text style={styles.splashLogo}>moradia</Text>
      <ActivityIndicator color={Colors.tealLight} style={{ marginTop: 24 }} />
    </View>
  );
}

// ── Root: decide auth vs app ──────────────────────────────────
function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSplash />;
  if (!user) return <AuthNavigator />;
  return <AppScreens />;
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopColor: '#E8E4DF',
    borderTopWidth: 1,
    height: 82,
    paddingBottom: 16,
    paddingTop: 4,
  },
  tabLabel: { fontSize: 10, fontWeight: '500' },
  iconWrap: { alignItems: 'center', justifyContent: 'center', paddingTop: 2 },
  iconActive: {},
  fabWrap: { alignItems: 'center', justifyContent: 'center', marginTop: -22 },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.terra,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.terra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  splash: { flex: 1, backgroundColor: Colors.tealDark, alignItems: 'center', justifyContent: 'center' },
  splashLogo: { fontSize: 44, fontWeight: '800', color: Colors.white, letterSpacing: -1 },
});

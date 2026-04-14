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

function TabIcon({ char, color, size = 20 }: { char: string; color: string; size?: number }) {
  return <Text style={{ fontSize: size, color, lineHeight: size + 4 }}>{char}</Text>;
}

function DonateTabIcon() {
  return (
    <View style={styles.fabWrap}>
      <View style={styles.fab}>
        <Text style={styles.fabHeart}>♥</Text>
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
        tabBarActiveTintColor: Colors.terra,
        tabBarInactiveTintColor: Colors.text3,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <TabIcon char="⌂" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="Campaign"
        component={CampaignScreen}
        options={{
          tabBarLabel: 'Campanha',
          tabBarIcon: ({ color }) => <TabIcon char="◎" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          tabBarLabel: 'Doe',
          tabBarIcon: () => <DonateTabIcon />,
          tabBarLabelStyle: { ...styles.tabLabel, marginTop: 6 },
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Novidades',
          tabBarIcon: ({ color }) => <TabIcon char="☰" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <TabIcon char="◉" color={color} size={18} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Transparency" component={TransparencyScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}

function LoadingSplash() {
  return (
    <View style={styles.splash}>
      <Text style={styles.splashSub}>PROJETO</Text>
      <Text style={styles.splashName}>moradia</Text>
      <ActivityIndicator color={'rgba(255,255,255,0.4)'} style={{ marginTop: 32 }} />
    </View>
  );
}

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
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 88,
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.2 },
  fabWrap: { alignItems: 'center', justifyContent: 'center', marginTop: -14 },
  fab: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.terra,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.terra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  fabHeart: { fontSize: 20, color: Colors.white, lineHeight: 24 },
  splash: { flex: 1, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  splashSub: { fontSize: 11, fontWeight: '400', color: 'rgba(255,255,255,0.6)', letterSpacing: 4, textTransform: 'uppercase' },
  splashName: { fontSize: 48, fontWeight: '800', color: Colors.white, letterSpacing: -1.5, marginTop: 2 },
});

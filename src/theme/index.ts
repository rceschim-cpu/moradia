export const Colors = {
  teal: '#1A7B72',
  tealLight: '#2A9B90',
  tealDark: '#0F5C55',
  tealBg: '#E8F5F3',
  terra: '#C4724A',
  terraLight: '#D4845A',
  terraDark: '#A55A35',
  terraBg: '#FBF0EB',
  cream: '#F7F4F0',
  white: '#FFFFFF',
  text: '#1A1A1A',
  text2: '#4A4A4A',
  text3: '#9A9A9A',
  border: '#E8E4DF',
  green: '#2E7D32',
  greenBg: '#E8F5E9',
  purple: '#5C3A9C',
  navy: '#1A3A5C',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 10,
  md: 14,
  lg: 16,
  xl: 20,
  full: 100,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 5,
  },
};

export const Typography = {
  h1: { fontSize: 26, fontWeight: '800' as const, letterSpacing: -0.5, color: Colors.text },
  h2: { fontSize: 22, fontWeight: '800' as const, letterSpacing: -0.3, color: Colors.text },
  h3: { fontSize: 18, fontWeight: '700' as const, color: Colors.text },
  h4: { fontSize: 16, fontWeight: '700' as const, color: Colors.text },
  body: { fontSize: 14, fontWeight: '400' as const, color: Colors.text2, lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '400' as const, color: Colors.text3 },
  label: { fontSize: 11, fontWeight: '700' as const, textTransform: 'uppercase' as const, letterSpacing: 0.8, color: Colors.text3 },
};

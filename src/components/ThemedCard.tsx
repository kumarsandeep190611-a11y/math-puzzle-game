// src/components/ThemedCard.tsx

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { DarkGoldTheme, GlassmorphismTheme } from '../constants/themes';

interface ThemedCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({ children, style }) => {
  const { theme } = useGameStore();
  const themeColors = theme === 'darkGold' ? DarkGoldTheme : GlassmorphismTheme;

  const cardStyle = {
    backgroundColor:
      theme === 'darkGold'
        ? themeColors.colors.card
        : 'rgba(26,32,44,0.4)',
    borderColor: themeColors.colors.accent,
    borderWidth: 1,
    shadowColor: themeColors.colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: theme === 'darkGold' ? 0.15 : 0.15,
    shadowRadius: 24,
    elevation: 8,
  };

  return (
    <View style={[styles.card, cardStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
});

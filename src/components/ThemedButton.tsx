import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { DarkGoldTheme, GlassmorphismTheme } from '../constants/themes';

interface ThemedButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
}) => {
  const { theme } = useGameStore();
  const themeColors = theme === 'darkGold' ? DarkGoldTheme : GlassmorphismTheme;

  const baseColors = {
    primary: theme === 'darkGold' ? '#D4AF37' : '#A78BFA',
    secondary: 'transparent',
    tertiary: 'transparent',
  };

  const borderColors = {
    primary: 'transparent',
    secondary: theme === 'darkGold' ? '#D4AF37' : '#A78BFA',
    tertiary: 'transparent',
  };

  const textColors = {
    primary: theme === 'darkGold' ? '#0A0E27' : '#0F1419',
    secondary: theme === 'darkGold' ? '#D4AF37' : '#A78BFA',
    tertiary: theme === 'darkGold' ? '#F5F5F5' : '#F8FAFC',
  };

  const sizes = {
    small: { height: 36, paddingHorizontal: 12, fontSize: 12 },
    medium: { height: 48, paddingHorizontal: 24, fontSize: 16 },
    large: { height: 56, paddingHorizontal: 32, fontSize: 18 },
  };

  const sizeStyle = sizes[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          backgroundColor: variant === 'primary' ? baseColors[variant] : baseColors[variant],
          borderColor: variant !== 'primary' ? borderColors[variant] : 'transparent',
          borderWidth: variant !== 'primary' ? 1.5 : 0,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          {
            fontSize: sizeStyle.fontSize,
            color: textColors[variant],
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  },
});

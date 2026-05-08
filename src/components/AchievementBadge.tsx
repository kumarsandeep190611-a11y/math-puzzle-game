import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { DarkGoldTheme, GlassmorphismTheme } from '../constants/themes';
import { triggerHaptic, playSound } from '../utils/audioHaptic';

interface AchievementBadgeProps {
  visible: boolean;
  title: string;
  description: string;
  bonus: number;
  onClose: () => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  visible,
  title,
  description,
  bonus,
  onClose,
}) => {
  const { theme } = useGameStore();
  const themeColors = theme === 'darkGold' ? DarkGoldTheme : GlassmorphismTheme;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(300));
  const [scaleAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    if (visible) {
      triggerHaptic('unlock');
      playSound('achievement');

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.badgeContent,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
              backgroundColor:
                theme === 'darkGold'
                  ? '#1a1f3a'
                  : 'rgba(26,32,44,0.95)',
              borderColor: themeColors.colors.accent,
            },
          ]}
        >
          <Text style={styles.trophy}>🏆</Text>

          <Text
            style={[
              styles.badgeTitle,
              {
                color:
                  theme === 'darkGold'
                    ? '#D4AF37'
                    : '#A78BFA',
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.badgeDescription,
              {
                color:
                  theme === 'darkGold'
                    ? '#F5F5F5'
                    : '#F8FAFC',
              },
            ]}
          >
            {description}
          </Text>

          <Text
            style={[
              styles.bonus,
              {
                color: themeColors.colors.accent,
              },
            ]}
          >
            +{bonus} Bonus Points
          </Text>

          <TouchableOpacity
            style={[
              styles.closeButton,
              {
                backgroundColor: themeColors.colors.accent,
              },
            ]}
            onPress={onClose}
          >
            <Text
              style={[
                styles.closeButtonText,
                {
                  color:
                    theme === 'darkGold'
                      ? '#0A0E27'
                      : '#0F1419',
                },
              ]}
            >
              Celebrate!
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  badgeContent: {
    borderRadius: 24,
    borderWidth: 2,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 12,
  },
  trophy: {
    fontSize: 80,
    marginBottom: 16,
  },
  badgeTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  bonus: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'Montserrat_700Bold',
  },
  closeButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});

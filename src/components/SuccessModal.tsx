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

interface SuccessModalProps {
  visible: boolean;
  score: number;
  combo: number;
  onClose: () => void;
  onNext: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  score,
  combo,
  onClose,
  onNext,
}) => {
  const { theme } = useGameStore();
  const themeColors = theme === 'darkGold' ? DarkGoldTheme : GlassmorphismTheme;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [scoreAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      triggerHaptic('success');
      playSound('success');

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scoreAnim, {
          toValue: score,
          duration: 600,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [visible]);

  const displayScore = scoreAnim.interpolate({
    inputRange: [0, score],
    outputRange: ['0', String(score)],
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
              backgroundColor:
                theme === 'darkGold'
                  ? '#1a1f3a'
                  : 'rgba(26,32,44,0.95)',
              borderColor: themeColors.colors.accent,
            },
          ]}
        >
          <Text
            style={[
              styles.emoji,
              {
                fontSize: 60,
              },
            ]}
          >
            ✨
          </Text>

          <Text
            style={[
              styles.title,
              {
                color:
                  theme === 'darkGold'
                    ? '#D4AF37'
                    : '#A78BFA',
              },
            ]}
          >
            Correct!
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color:
                  theme === 'darkGold'
                    ? '#F5F5F5'
                    : '#F8FAFC',
              },
            ]}
          >
            You're in the top 1% of math experts!
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text
                style={[
                  styles.statValue,
                  {
                    color: themeColors.colors.accent,
                  },
                ]}
              >
                +{score}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color:
                      theme === 'darkGold'
                        ? '#B0B0B0'
                        : '#CBD5E1',
                  },
                ]}
              >
                Points
              </Text>
            </View>

            <View style={styles.stat}>
              <Text
                style={[
                  styles.statValue,
                  {
                    color: themeColors.colors.accent,
                  },
                ]}
              >
                ×{combo}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color:
                      theme === 'darkGold'
                        ? '#B0B0B0'
                        : '#CBD5E1',
                  },
                ]}
              >
                Combo
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: themeColors.colors.accent,
                },
              ]}
              onPress={onNext}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      theme === 'darkGold'
                        ? '#0A0E27'
                        : '#0F1419',
                  },
                ]}
              >
                Next Puzzle
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 10,
  },
  emoji: {
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
    gap: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: 'Montserrat_700Bold',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});

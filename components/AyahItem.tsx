import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, MEAL_COLORS } from '@/constants/colors';
import { Ayah } from '@/constants/surahs';

type AyahItemProps = {
  ayah: Ayah;
  selectedMeal: string;
};

export default function AyahItem({ ayah, selectedMeal }: AyahItemProps) {
  // Seçilen meale göre dinamik rengi al (artık meal metni için kullanılmayacak)
  const mealAccentColor = MEAL_COLORS[selectedMeal] || COLORS.primary; // Bulunamazsa varsayılan primary renk
  
  // Dinamik arka plan rengi için %10 opaklık (mealAccentColor'dan türetildi)
  const dynamicBgColor = `${mealAccentColor}1A`;

  return (
    <View style={styles.card}>
      {/* Ayah Header: Ayah Numarası ve 'Ayet' yazısı */}
      <View style={styles.header}>
        <View style={[
          styles.numberCircle, 
          { 
            borderColor: mealAccentColor, 
            backgroundColor: dynamicBgColor 
          }
        ]}>
          <Text style={styles.numberText}>{ayah.ayahId}.</Text>
        </View>
        <Text style={styles.ayahLabel}>Ayet</Text>
      </View>

      {/* Arapça Metin (Sağdan Sola) */}
      <Text style={styles.arabicText}>{ayah.arabic}</Text>

      {/* Meal (Türkçe Çeviri) */}
      <View style={styles.mealContainer}>
        <Text style={styles.mealText}>{ayah.meals[selectedMeal]}</Text> {/* Meal metni rengi artık sabit beyaz */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  numberText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  ayahLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 8,
    color: COLORS.textSecondary,
  },
  arabicText: {
    color: COLORS.text, // Arapça metin zaten beyaz
    fontSize: 24,
    fontFamily: 'Inter_400Regular', // İdeal olarak özel bir Arapça font kullanılmalı
    textAlign: 'right', // Arapça sağdan sola yazılır
    lineHeight: 40,
    marginBottom: 20,
  },
  mealContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  mealText: {
    color: COLORS.text, // Meal metni rengi artık sabit beyaz
    fontSize: 17,
    fontFamily: 'Inter_400Regular',
    lineHeight: 28,
  },
});

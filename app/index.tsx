import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Search, ChevronDown, BookCopy } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { COLORS, MEAL_COLORS } from '@/constants/colors'; // MEAL_COLORS buradan import edildi
import { SURAHS } from '@/constants/surahs';
import SurahCard from '@/components/SurahCard';

export default function HomeScreen() {
  const mealOptions = Object.keys(MEAL_COLORS);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[0]);

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
    setIsMenuVisible(false);
  };

  const currentMealColor = MEAL_COLORS[selectedMeal];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable><Menu color={COLORS.text} size={28} /></Pressable>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <BookCopy color={COLORS.primary} size={24} />
          </View>
          <Text style={styles.appName}>KUR'AN MEAL</Text>
        </View>
        <Pressable><Search color={COLORS.text} size={28} /></Pressable>
      </View>

      {/* Go to Ayah */}
      <View style={styles.section}>
        <Pressable style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>Ayete Git</Text>
          <ChevronDown color={COLORS.textSecondary} size={20} />
        </Pressable>
      </View>

      {/* Surah List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Sure Listesi</Text>
        <View style={styles.headerActions}>
          <View>
            {/* Ana Dropdown Metni: Seçili mealin rengini kullan */}
            <Pressable style={styles.mealDropdown} onPress={() => setIsMenuVisible(!isMenuVisible)}>
              <Text style={[styles.dropdownText, { color: currentMealColor }]}>{selectedMeal}</Text>
              <ChevronDown color={isMenuVisible ? currentMealColor : COLORS.textSecondary} size={16} />
            </Pressable>
            
            {isMenuVisible && (
              <BlurView 
                intensity={20}
                tint="dark"
                style={styles.dropdownMenu}
              >
                {mealOptions.map((option, index) => (
                  <Pressable 
                    key={index} 
                    style={[
                      styles.dropdownItem, 
                      index !== mealOptions.length - 1 && styles.itemSeparator
                    ]} 
                    onPress={() => handleSelectMeal(option)}
                  >
                    {/* Dropdown Liste Öğesi: Seçili olanı renklendir ve kalın yap */}
                    <Text 
                      style={[
                        styles.dropdownItemText, 
                        option === selectedMeal && { color: currentMealColor, fontFamily: 'Inter_600SemiBold' }
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </BlurView>
            )}
          </View>

          <Pressable style={styles.orderButton}>
            <Text style={styles.dropdownText}>Mushaf Sırası</Text>
          </Pressable>
        </View>
      </View>

      {/* Surah List */}
      <FlatList
        data={SURAHS}
        renderItem={({ item }) => (
          <SurahCard 
            item={item} 
            mealColor={currentMealColor} 
            selectedMeal={selectedMeal} // selectedMeal prop'u SurahCard'a iletildi
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={() => isMenuVisible && setIsMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  appName: {
    color: COLORS.text,
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  dropdownButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    zIndex: 1,
  },
  listTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownText: {
    // Bu stil artık sadece font ve boyut için kullanılıyor, renk dinamik olarak veriliyor.
    color: COLORS.textSecondary, 
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '110%',
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 220,
    zIndex: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, MEAL_COLORS } from '@/constants/colors';
import { SURAHS, Ayah } from '@/constants/surahs';
import { ACİK_KURAN_API_BASE_URL, AUTHORS_API_URL, MEAL_API_AUTHORS } from '@/constants/api';
import AyahItem from '@/components/AyahItem';

export default function SurahDetailScreen() {
  const { id, selectedMeal } = useLocalSearchParams();
  const surah = SURAHS.find((s) => s.id === Number(id));

  const [fetchedAyahs, setFetchedAyahs] = useState<Ayah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Yazar ID'lerini tutmak için yeni state'ler
  const [authorIdMap, setAuthorIdMap] = useState<{ [name: string]: number }>({});
  const [isAuthorsLoading, setIsAuthorsLoading] = useState(true);
  const [authorsError, setAuthorsError] = useState<string | null>(null);

  // Seçilen meale göre dinamik rengi al
  const mealAccentColor = MEAL_COLORS[selectedMeal as string] || COLORS.primary;

  // Yazar ID'lerini bir kez çekmek için useEffect
  useEffect(() => {
    const fetchAuthors = async () => {
      console.log("--- Yazar Listesi Çekme İşlemi Başladı ---");
      try {
        const response = await fetch(AUTHORS_API_URL);
        if (!response.ok) {
          throw new Error(`API hatası: ${response.status} ${response.statusText}. Yazar listesi alınamadı.`);
        }
        const data = await response.json();
        const map: { [name: string]: number } = {};
        data.data.forEach((author: any) => {
          map[author.name] = author.id;
        });
        setAuthorIdMap(map);
        console.log("Yazar ID Haritası:", map);
      } catch (err: any) {
        console.error("Yazar listesi çekilirken genel bir hata oluştu:", err);
        setAuthorsError("Mealleri yüklerken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edin.");
      } finally {
        setIsAuthorsLoading(false);
        console.log("--- Yazar Listesi Çekme İşlemi Tamamlandı ---");
      }
    };
    fetchAuthors();
  }, []); // Sadece bir kez çalışır

  // Ayetleri çekmek için ana useEffect
  useEffect(() => {
    const fetchAyahs = async () => {
      console.log("--- Ayet Çekme İşlemi Başladı ---");
      console.log("Parametreler: id =", id, ", selectedMeal =", selectedMeal);

      if (!surah || !selectedMeal) {
        const missingInfo = [];
        if (!surah) missingInfo.push("Sure");
        if (!selectedMeal) missingInfo.push("meal");
        const errorMessage = `${missingInfo.join(" veya ")} bilgisi eksik.`;
        console.error("Hata:", errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Yazar ID'leri yüklenene kadar bekleyelim
      if (isAuthorsLoading) {
        console.log("Yazar ID'leri henüz yüklenmedi, bekliyor...");
        return;
      }
      if (authorsError) {
        setError(authorsError); // Yazar yükleme hatasını ana hata olarak göster
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setFetchedAyahs([]); // Önceki ayetleri temizle

      const apiAuthorName = MEAL_API_AUTHORS[selectedMeal as string];
      console.log("API Yazar Adı (MEAL_API_AUTHORS'tan):", apiAuthorName);

      const authorId = authorIdMap[apiAuthorName];

      if (!authorId) {
        const errorMessage = `'${selectedMeal}' meali için API yazar ID'si bulunamadı. Lütfen constants/api.ts dosyasındaki yazar isimlerini ve API'deki yazar listesini kontrol edin.`;
        console.error("Hata:", errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      try {
        // Yeni API uç noktası: /surah/[surah_id]?author=[author_id]
        const apiUrl = `${ACİK_KURAN_API_BASE_URL}/surah/${surah.id}?author=${authorId}`;
        console.log("API İstek URL'si:", apiUrl);

        const response = await fetch(apiUrl);
        console.log("API Yanıt Durumu (response.status):", response.status);
        console.log("API Yanıt Başarılı mı (response.ok):", response.ok);

        if (!response.ok) {
          let errorBody = "Detaylı hata mesajı alınamadı.";
          try {
            errorBody = await response.text();
          } catch (e) {
            console.warn("API hata yanıtı metin olarak okunamadı:", e);
          }
          throw new Error(`API hatası: ${response.status} ${response.statusText}. Detay: ${errorBody}`);
        }
        
        const data = await response.json();
        console.log("API Yanıt Verisi (ilk 2 ayet):", data.data.verses ? data.data.verses.slice(0, 2) : data);

        // API'den gelen veriyi Ayah arayüzümüze dönüştür
        const transformedAyahs: Ayah[] = data.data.verses.map((apiAyah: any) => {
          // API'den gelen her ayet objesi içinde doğrudan 'translation' alanı var
          // ve bu alan, sorguladığımız yazarın çevirisini içermeli.
          return {
            ayahId: apiAyah.verse_number,
            arabic: apiAyah.verse, // Arapça metin 'verse' alanında
            meals: {
              [selectedMeal as string]: apiAyah.translation ? apiAyah.translation.text : "Çeviri bulunamadı.",
            },
          };
        });
        setFetchedAyahs(transformedAyahs);
        console.log("Ayetler başarıyla çekildi ve dönüştürüldü.");
      } catch (err: any) {
        console.error("Ayetler çekilirken genel bir hata oluştu:", err);
        let userErrorMessage = "Ayetler yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.";

        if (err instanceof TypeError && err.message === 'Network request failed') {
          userErrorMessage = "İnternet bağlantınızı kontrol edin veya API'ye ulaşılamıyor olabilir.";
        } else if (err.message.includes("API hatası")) {
          userErrorMessage = err.message;
        } else if (err.message.includes("JSON Parse error")) {
          userErrorMessage = "API'den gelen veri okunamadı. Lütfen daha sonra tekrar deneyin.";
        } else if (err.message) {
            userErrorMessage = `Bir hata oluştu: ${err.message}`;
        }
        setError(userErrorMessage);
      } finally {
        setIsLoading(false);
        console.log("--- Ayet Çekme İşlemi Tamamlandı ---");
      }
    };

    // Yazar ID'leri yüklendiyse ve bir hata yoksa ayetleri çek
    if (!isAuthorsLoading && !authorsError) {
      fetchAyahs();
    }
  }, [id, selectedMeal, surah, isAuthorsLoading, authorsError, authorIdMap]); // Bağımlılıklar güncellendi

  // Yazar listesi yüklenirken veya hata durumunda gösterilecek UI
  if (isAuthorsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
        <Text style={styles.loadingText}>Mealler yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  if (authorsError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{authorsError}</Text>
      </SafeAreaView>
    );
  }

  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Sure bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `${surah.name} Suresi` }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: mealAccentColor }]}>{surah.name} Suresi</Text>
          <Text style={styles.headerSubtitle}>{surah.verseCount} ayettir.</Text>
          <Text style={[styles.mealHeaderTitle, { color: mealAccentColor }]}>
            {selectedMeal} Meali:
          </Text>
        </View>
        
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : fetchedAyahs.length > 0 ? (
            fetchedAyahs.map((ayah) => (
              <AyahItem 
                key={ayah.ayahId} 
                ayah={ayah} 
                selectedMeal={selectedMeal as string}
              />
            ))
          ) : (
            <Text style={styles.placeholderText}>
              {surah.name} suresinin ayetleri bulunamadı veya henüz eklenmedi.
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  mealHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  content: {
    padding: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    marginTop: 40,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export const ACİK_KURAN_API_BASE_URL = "https://api.acikkuran.com";
export const AUTHORS_API_URL = `${ACİK_KURAN_API_BASE_URL}/authors`;

// Uygulamadaki meal isimlerini, Acik Kuran API'sinin kullandığı yazar isimleriyle eşleştirme
// Bu isimler, /authors endpoint'inden gelen 'name' alanıyla birebir eşleşmelidir.
export const MEAL_API_AUTHORS: { [key: string]: string } = {
  "Diyanet Meal": "Diyanet İşleri Başkanlığı", // Örnek: API'deki yazar adı
  "Süleyman Ateş Meal": "Süleyman Ateş", // Örnek: API'deki yazar adı
  "Elmalılı Hamdi Yazır Meal": "Elmalılı Hamdi Yazır", // Örnek: API'deki yazar adı
  // Gelecekte eklenecek diğer mealler için buraya ekleme yapılabilir.
};

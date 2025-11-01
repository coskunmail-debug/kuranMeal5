export interface Ayah {
  ayahId: number;
  arabic: string; // Arapça metin
  meals: { [key: string]: string }; // Meal isimlerine göre çeviriler
}

export interface Surah {
  id: number;
  name: string;
  verseCount: number;
  // ayahs?: Ayah[]; // Artık ayetler API'den çekileceği için bu alan kaldırıldı.
}

// Fâtiha Suresi'nin ayetleri, artık API'den çekileceği için bu sabit kaldırıldı.
// const FATIHA_AYAHS: Ayah[] = [
//   { ayahId: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", meals: {
//     "Diyanet Meal": "Rahmân ve Rahîm olan Allah’ın adıyla.",
//     "Süleyman Ateş Meal": "Rahmân, Rahîm Allah'ın adıyla.",
//     "Elmalılı Hamdi Yazır Meal": "Rahmân ve Rahîm olan Allah'ın adıyla."
//   }},
//   { ayahId: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", meals: {
//     "Diyanet Meal": "Hamd, âlemlerin Rabbi olan Allah’a aittir.",
//     "Süleyman Ateş Meal": "Hamd, âlemlerin Rabbi Allah'a mahsustur.",
//     "Elmalılı Hamdi Yazır Meal": "Hamd, âlemlerin Rabbi Allah'a mahsustur."
//   }},
//   { ayahId: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", meals: {
//     "Diyanet Meal": "O, Rahmân ve Rahîm’dir.",
//     "Süleyman Ateş Meal": "O, Rahmân'dır, Rahîm'dir.",
//     "Elmalılı Hamdi Yazır Meal": "O, Rahmân ve Rahîm'dir."
//   }},
//   { ayahId: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", meals: {
//     "Diyanet Meal": "Din gününün (hesap gününün) sahibidir.",
//     "Süleyman Ateş Meal": "Din gününün sahibidir.",
//     "Elmalılı Hamdi Yazır Meal": "Din gününün sahibidir."
//   }},
//   { ayahId: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", meals: {
//     "Diyanet Meal": "Yalnız sana kulluk ederiz ve yalnız senden yardım dileriz.",
//     "Süleyman Ateş Meal": "Yalnız sana kulluk eder, yalnız senden yardım isteriz.",
//     "Elmalılı Hamdi Yazır Meal": "Yalnız sana ibadet ederiz ve yalnız senden yardım dileriz."
//   }},
//   { ayahId: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", meals: {
//     "Diyanet Meal": "Bizi doğru yola ilet.",
//     "Süleyman Ateş Meal": "Bizi doğru yola ilet.",
//     "Elmalılı Hamdi Yazır Meal": "Bizi doğru yola ilet."
//   }},
//   { ayahId: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", meals: {
//     "Diyanet Meal": "Kendilerine nimet verdiğin kimselerin yoluna. Gazaba uğramışların ve sapmışların yoluna değil.",
//     "Süleyman Ateş Meal": "Kendilerine ni'met verdiğin kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil.",
//     "Elmalılı Hamdi Yazır Meal": "Kendilerine nimet verdiğin kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil."
//   }},
// ];

export const SURAHS: Surah[] = [
  { id: 1, name: 'Fâtiha', verseCount: 7 }, // ayahs alanı kaldırıldı
  { id: 2, name: 'Bakara', verseCount: 286 },
  { id: 3, name: 'Âl-i İmrân', verseCount: 200 },
  { id: 4, name: 'Nisâ', verseCount: 176 },
  { id: 5, name: 'Mâide', verseCount: 120 },
  { id: 6, name: 'En\'âm', verseCount: 165 },
  { id: 7, name: 'A\'râf', verseCount: 206 },
  { id: 18, name: 'Kehf', verseCount: 110 },
  { id: 36, name: 'Yâsîn', verseCount: 83 },
  { id: 55, name: 'Rahmân', verseCount: 78 },
  { id: 67, name: 'Mülk', verseCount: 30 },
  { id: 112, name: 'İhlâs', verseCount: 4 },
  { id: 113, name: 'Felak', verseCount: 5 },
  { id: 114, name: 'Nâs', verseCount: 6 },
];

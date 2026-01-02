import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'uz' | 'en' | 'ru';

interface Translations {
  [key: string]: {
    uz: string;
    en: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
  about: { uz: "Biz haqimizda", en: "About", ru: "О нас" },
  education: { uz: "O'quv bo'limi", en: "Education", ru: "Обучение" },
  games: { uz: "O'yinlar", en: "Games", ru: "Игры" },
  contact: { uz: "Aloqa", en: "Contact", ru: "Контакты" },
  login: { uz: "Kirish", en: "Login", ru: "Войти" },
  register: { uz: "Ro'yxatdan o'tish", en: "Register", ru: "Регистрация" },
  
  // Hero Section
  heroTitle1: { uz: "Kiber", en: "Cyber", ru: "Кибер" },
  heroTitle2: { uz: "xavfsizlikni o'rganing", en: "Security Education", ru: "безопасность" },
  heroSubtitle: { 
    uz: "Kiber hujumlardan himoyalanish, internet xavfsizligi, phishing, parol xavfsizligi va ijtimoiy tarmoqlardagi xavflar haqida bilim oling.", 
    en: "Learn about protection from cyber attacks, internet security, phishing, password safety and social media threats.", 
    ru: "Узнайте о защите от кибератак, интернет-безопасности, фишинге, безопасности паролей и угрозах в социальных сетях." 
  },
  startLearning: { uz: "O'rganishni boshlash", en: "Start Learning", ru: "Начать обучение" },
  learnMore: { uz: "Ko'proq o'rganish", en: "Learn More", ru: "Узнать больше" },
  
  // Stats
  lessons: { uz: "Darslar", en: "Lessons", ru: "Уроки" },
  students: { uz: "O'quvchilar", en: "Students", ru: "Студенты" },
  tests: { uz: "Testlar", en: "Tests", ru: "Тесты" },
  certificates: { uz: "Sertifikatlar", en: "Certificates", ru: "Сертификаты" },
  
  // Features
  whyChooseUs: { uz: "Nega bizni tanlash kerak", en: "Why Choose Us", ru: "Почему выбирают нас" },
  featuresSubtitle: { 
    uz: "Kiber xavfsizlik bo'yicha eng yaxshi ta'lim platformasi", 
    en: "The best cybersecurity education platform", 
    ru: "Лучшая платформа для обучения кибербезопасности" 
  },
  
  feature1Title: { uz: "Zamonaviy darslar", en: "Modern Lessons", ru: "Современные уроки" },
  feature1Desc: { 
    uz: "Eng so'nggi kiber xavfsizlik texnologiyalari va usullari haqida o'rganing", 
    en: "Learn about the latest cybersecurity technologies and methods", 
    ru: "Изучайте новейшие технологии и методы кибербезопасности" 
  },
  
  feature2Title: { uz: "Interaktiv testlar", en: "Interactive Tests", ru: "Интерактивные тесты" },
  feature2Desc: { 
    uz: "O'z bilimlaringizni tekshirib ko'ring va natijalarni kuzating", 
    en: "Test your knowledge and track your results", 
    ru: "Проверяйте свои знания и отслеживайте результаты" 
  },
  
  feature3Title: { uz: "Amaliy o'yinlar", en: "Practical Games", ru: "Практические игры" },
  feature3Desc: { 
    uz: "O'yin orqali kiber xavfsizlik ko'nikmalarini rivojlantiring", 
    en: "Develop cybersecurity skills through games", 
    ru: "Развивайте навыки кибербезопасности через игры" 
  },
  
  feature4Title: { uz: "Video darslar", en: "Video Lessons", ru: "Видеоуроки" },
  feature4Desc: { 
    uz: "Professional murabbiylardan video darslarni tomosha qiling", 
    en: "Watch video lessons from professional instructors", 
    ru: "Смотрите видеоуроки от профессиональных инструкторов" 
  },
  
  feature5Title: { uz: "Sertifikatlar", en: "Certificates", ru: "Сертификаты" },
  feature5Desc: { 
    uz: "Kurslarni tugatganingizda sertifikat oling", 
    en: "Get certificates upon completing courses", 
    ru: "Получайте сертификаты по завершении курсов" 
  },
  
  feature6Title: { uz: "24/7 Yordam", en: "24/7 Support", ru: "Поддержка 24/7" },
  feature6Desc: { 
    uz: "Istalgan vaqtda yordam olish imkoniyati", 
    en: "Get help anytime you need it", 
    ru: "Получайте помощь в любое время" 
  },
  
  // CTA Section
  ctaTitle: { uz: "Kiber xavfsizlikni o'rganishga tayyormisiz?", en: "Ready to learn cybersecurity?", ru: "Готовы изучать кибербезопасность?" },
  ctaSubtitle: { 
    uz: "Hoziroq ro'yxatdan o'ting va kiber xavfsizlik dunyosiga qadam qo'ying", 
    en: "Register now and step into the world of cybersecurity", 
    ru: "Зарегистрируйтесь сейчас и войдите в мир кибербезопасности" 
  },
  
  // Footer
  footerDesc: { 
    uz: "Kiber xavfsizlik ta'limi platformasi. Jamiyatni kiber xavflardan himoya qilishga yordam beramiz.", 
    en: "Cybersecurity education platform. We help protect society from cyber threats.", 
    ru: "Платформа обучения кибербезопасности. Помогаем защитить общество от киберугроз." 
  },
  quickLinks: { uz: "Tezkor havolalar", en: "Quick Links", ru: "Быстрые ссылки" },
  followUs: { uz: "Bizni kuzating", en: "Follow Us", ru: "Следите за нами" },
  rights: { uz: "Barcha huquqlar himoyalangan", en: "All rights reserved", ru: "Все права защищены" },
  
  // Education submenu
  articles: { uz: "Maqolalar", en: "Articles", ru: "Статьи" },
  videoLessons: { uz: "Video darslar", en: "Video Lessons", ru: "Видеоуроки" },
  
  // About page
  aboutTitle: { uz: "Biz haqimizda", en: "About Us", ru: "О нас" },
  aboutMission: { uz: "Bizning maqsadimiz", en: "Our Mission", ru: "Наша миссия" },
  aboutMissionDesc: { 
    uz: "Jamiyatni kiber xavflardan himoya qilish va xavfsiz internet muhitini yaratish", 
    en: "Protecting society from cyber threats and creating a safe internet environment", 
    ru: "Защита общества от киберугроз и создание безопасной интернет-среды" 
  },
  
  // Contact
  contactTitle: { uz: "Biz bilan bog'laning", en: "Contact Us", ru: "Свяжитесь с нами" },
  contactName: { uz: "Ismingiz", en: "Your Name", ru: "Ваше имя" },
  contactEmail: { uz: "Email", en: "Email", ru: "Электронная почта" },
  contactMessage: { uz: "Xabar", en: "Message", ru: "Сообщение" },
  contactSend: { uz: "Yuborish", en: "Send", ru: "Отправить" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

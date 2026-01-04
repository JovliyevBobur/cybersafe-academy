import React, { useState } from 'react';
import { PlayCircle, Clock, Eye, ArrowLeft, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface Video {
  id: number;
  title: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  duration: string;
  views: string;
  level: { uz: string; en: string; ru: string };
  thumbnail: string;
  youtubeId: string;
}

const Videos: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: 1,
      title: { 
        uz: "Kiber xavfsizlikka kirish", 
        en: "Introduction to Cybersecurity", 
        ru: "Введение в кибербезопасность" 
      },
      description: {
        uz: "Bu video darsda kiber xavfsizlik asoslari, uning ahamiyati va asosiy tushunchalar bilan tanishasiz. Kiber hujumlar turlari va ulardan himoyalanish usullarini o'rganasiz.",
        en: "In this video lesson, you will learn about cybersecurity basics, its importance, and key concepts. You will learn about types of cyber attacks and how to protect against them.",
        ru: "В этом видеоуроке вы узнаете об основах кибербезопасности, её важности и ключевых концепциях. Вы изучите типы кибератак и способы защиты от них."
      },
      duration: "12:34",
      views: "15.2K",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop",
      youtubeId: "inWWhr5tnEA"
    },
    {
      id: 2,
      title: { 
        uz: "Parol xavfsizligi asoslari", 
        en: "Password Security Basics", 
        ru: "Основы безопасности паролей" 
      },
      description: {
        uz: "Kuchli parol yaratish, parol menejerlari va ikki faktorli autentifikatsiya haqida batafsil ma'lumot. Zaif parollar xavfi va ularni kuchliroq qilish usullari.",
        en: "Detailed information about creating strong passwords, password managers, and two-factor authentication. The dangers of weak passwords and ways to make them stronger.",
        ru: "Подробная информация о создании надёжных паролей, менеджерах паролей и двухфакторной аутентификации. Опасности слабых паролей и способы их усиления."
      },
      duration: "15:45",
      views: "12.8K",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
      thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop",
      youtubeId: "3NjQ9b3pgIg"
    },
    {
      id: 3,
      title: { 
        uz: "Phishing hujumlarini aniqlash", 
        en: "Detecting Phishing Attacks", 
        ru: "Обнаружение фишинговых атак" 
      },
      description: {
        uz: "Phishing nima, qanday turlar mavjud va ularni qanday aniqlash mumkin. Real misollar bilan phishing xabarlarini tahlil qilish va himoyalanish usullari.",
        en: "What is phishing, what types exist, and how to detect them. Analyzing phishing messages with real examples and protection methods.",
        ru: "Что такое фишинг, какие виды существуют и как их обнаружить. Анализ фишинговых сообщений на реальных примерах и методы защиты."
      },
      duration: "18:20",
      views: "18.5K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop",
      youtubeId: "XBkzBrXlle0"
    },
    {
      id: 4,
      title: { 
        uz: "Xavfsiz internet serfing", 
        en: "Safe Internet Browsing", 
        ru: "Безопасный интернет-серфинг" 
      },
      description: {
        uz: "Internetda xavfsiz harakat qilish, HTTPS ning ahamiyati, xavfsiz saytlarni aniqlash va brauzerni xavfsiz sozlash bo'yicha ko'rsatmalar.",
        en: "Guidelines for safe internet behavior, the importance of HTTPS, identifying secure sites, and secure browser settings.",
        ru: "Рекомендации по безопасному поведению в интернете, важность HTTPS, определение безопасных сайтов и настройка безопасности браузера."
      },
      duration: "20:15",
      views: "21.3K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
      youtubeId: "wqoWnCbEbq8"
    },
    {
      id: 5,
      title: { 
        uz: "Ikki faktorli autentifikatsiya (2FA)", 
        en: "Two-Factor Authentication (2FA)", 
        ru: "Двухфакторная аутентификация (2FA)" 
      },
      description: {
        uz: "2FA nima, nima uchun kerak va qanday sozlash mumkin. Turli xil 2FA usullari va eng xavfsiz variantlar haqida batafsil ma'lumot.",
        en: "What is 2FA, why is it needed, and how to set it up. Detailed information about various 2FA methods and the safest options.",
        ru: "Что такое 2FA, зачем она нужна и как её настроить. Подробная информация о различных методах 2FA и наиболее безопасных вариантах."
      },
      duration: "14:00",
      views: "9.7K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=225&fit=crop",
      youtubeId: "hGRii5f_uSc"
    },
    {
      id: 6,
      title: { 
        uz: "Malware va virus haqida", 
        en: "About Malware and Viruses", 
        ru: "О вредоносных программах и вирусах" 
      },
      description: {
        uz: "Zararli dasturlar turlari, ular qanday tarqaladi va qanday himoyalanish mumkin. Viruslar, troyanlar, ransomware va boshqa malware turlari haqida.",
        en: "Types of malware, how they spread, and how to protect against them. About viruses, trojans, ransomware, and other types of malware.",
        ru: "Типы вредоносного ПО, как они распространяются и как защититься. О вирусах, троянах, вымогателях и других типах malware."
      },
      duration: "22:30",
      views: "24.1K",
      level: { uz: "Yuqori", en: "Advanced", ru: "Продвинутый" },
      thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&h=225&fit=crop",
      youtubeId: "n8mbzU0X2nQ"
    },
    {
      id: 7,
      title: { 
        uz: "VPN nima va qanday ishlaydi", 
        en: "What is VPN and How Does It Work", 
        ru: "Что такое VPN и как он работает" 
      },
      description: {
        uz: "VPN texnologiyasi, uning afzalliklari va kamchiliklari. VPN dan qachon foydalanish kerak va eng yaxshi VPN xizmatlarini tanlash.",
        en: "VPN technology, its advantages and disadvantages. When to use VPN and choosing the best VPN services.",
        ru: "Технология VPN, её преимущества и недостатки. Когда использовать VPN и выбор лучших VPN-сервисов."
      },
      duration: "16:45",
      views: "19.8K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
      youtubeId: "R-JUOpCgTZc"
    },
    {
      id: 8,
      title: { 
        uz: "Ijtimoiy tarmoqlarda xavfsizlik", 
        en: "Social Media Security", 
        ru: "Безопасность в социальных сетях" 
      },
      description: {
        uz: "Ijtimoiy tarmoqlarda shaxsiy ma'lumotlarni himoya qilish, maxfiylik sozlamalari va xavflardan qochish usullari.",
        en: "Protecting personal information on social media, privacy settings, and ways to avoid dangers.",
        ru: "Защита личной информации в социальных сетях, настройки конфиденциальности и способы избежать опасностей."
      },
      duration: "17:30",
      views: "16.4K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
      youtubeId: "S1yJLNzRO6k"
    },
    {
      id: 9,
      title: { 
        uz: "Tarmoq xavfsizligi asoslari", 
        en: "Network Security Basics", 
        ru: "Основы сетевой безопасности" 
      },
      description: {
        uz: "Tarmoq xavfsizligi tushunchasi, firewall, IDS/IPS tizimlari va tarmoqni himoya qilish usullari haqida to'liq ma'lumot.",
        en: "Complete information about network security concepts, firewalls, IDS/IPS systems, and methods of protecting the network.",
        ru: "Полная информация о концепциях сетевой безопасности, файрволах, системах IDS/IPS и методах защиты сети."
      },
      duration: "25:00",
      views: "11.2K",
      level: { uz: "Yuqori", en: "Advanced", ru: "Продвинутый" },
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
      youtubeId: "E03gh1huvW4"
    },
    {
      id: 10,
      title: { 
        uz: "Ransomware hujumlari va himoya", 
        en: "Ransomware Attacks and Protection", 
        ru: "Атаки программ-вымогателей и защита" 
      },
      description: {
        uz: "Ransomware nima, qanday ishlaydi va undan qanday himoyalanish mumkin. Haqiqiy hujumlar misolida tahlil va oldini olish choralari.",
        en: "What is ransomware, how it works, and how to protect against it. Analysis of real attacks and preventive measures.",
        ru: "Что такое вымогатель, как он работает и как защититься. Анализ реальных атак и превентивные меры."
      },
      duration: "19:15",
      views: "13.6K",
      level: { uz: "Yuqori", en: "Advanced", ru: "Продвинутый" },
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop",
      youtubeId: "Vkjr9BmU24k"
    },
    {
      id: 11,
      title: { 
        uz: "Mobil qurilmalar xavfsizligi", 
        en: "Mobile Device Security", 
        ru: "Безопасность мобильных устройств" 
      },
      description: {
        uz: "Smartfon va planshetlarni himoya qilish, mobil ilovalar xavfsizligi va ommaviy Wi-Fi tarmoqlardan xavfsiz foydalanish.",
        en: "Protecting smartphones and tablets, mobile app security, and safe use of public Wi-Fi networks.",
        ru: "Защита смартфонов и планшетов, безопасность мобильных приложений и безопасное использование публичных Wi-Fi сетей."
      },
      duration: "15:50",
      views: "17.9K",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
      youtubeId: "3F5SoGBTYxg"
    },
    {
      id: 12,
      title: { 
        uz: "Xavfsiz onlayn xaridlar", 
        en: "Safe Online Shopping", 
        ru: "Безопасные онлайн-покупки" 
      },
      description: {
        uz: "Internetda xavfsiz xarid qilish qoidalari, ishonchli saytlarni aniqlash va to'lov xavfsizligi bo'yicha maslahatlar.",
        en: "Rules for safe shopping online, identifying trusted sites, and payment security tips.",
        ru: "Правила безопасных покупок в интернете, определение надёжных сайтов и советы по безопасности платежей."
      },
      duration: "13:25",
      views: "20.5K",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop",
      youtubeId: "cPBQhf32N3M"
    }
  ];

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  if (selectedVideo) {
    return (
      <Layout>
        <section className="py-8 bg-background min-h-screen">
          <div className="container mx-auto px-4 max-w-5xl">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedVideo(null)}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {getLang() === 'en' ? 'Back to Videos' : getLang() === 'ru' ? 'Назад к видео' : 'Videolarga qaytish'}
            </Button>

            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              {/* YouTube Embed */}
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title[getLang()]}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {selectedVideo.level[getLang()]}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views}
                  </span>
                </div>

                <h1 className="text-2xl font-bold mb-4">{selectedVideo.title[getLang()]}</h1>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedVideo.description[getLang()]}
                </p>

                <a 
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {getLang() === 'en' ? 'Watch on YouTube' : getLang() === 'ru' ? 'Смотреть на YouTube' : 'YouTubeda ko\'rish'}
                </a>
              </div>
            </div>

            {/* Related Videos */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">
                {getLang() === 'en' ? 'More Videos' : getLang() === 'ru' ? 'Другие видео' : 'Boshqa videolar'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(v => v.id !== selectedVideo.id).slice(0, 3).map((video) => (
                  <div 
                    key={video.id} 
                    onClick={() => setSelectedVideo(video)}
                    className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title[getLang()]}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title[getLang()]}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('videoLessons')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Video lessons from professional instructors to learn cybersecurity'
              : getLang() === 'ru'
              ? 'Видеоуроки от профессиональных инструкторов для изучения кибербезопасности'
              : "Kiber xavfsizlikni o'rganish uchun professional murabbiylardan video darslar"
            }
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                onClick={() => setSelectedVideo(video)}
                className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-card cursor-pointer group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title[getLang()]}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {video.level[getLang()]}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {video.title[getLang()]}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Videos;

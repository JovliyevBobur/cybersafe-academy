import React from 'react';
import { PlayCircle, Clock, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Videos: React.FC = () => {
  const { t } = useLanguage();

  const videos = [
    {
      title: { uz: "Kiber xavfsizlikka kirish", en: "Introduction to Cybersecurity", ru: "Введение в кибербезопасность" },
      duration: "15:30",
      views: "1.2K",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop",
    },
    {
      title: { uz: "Parol xavfsizligi asoslari", en: "Password Security Basics", ru: "Основы безопасности паролей" },
      duration: "12:45",
      views: "980",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
      thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop",
    },
    {
      title: { uz: "Phishing hujumlarini aniqlash", en: "Detecting Phishing Attacks", ru: "Обнаружение фишинговых атак" },
      duration: "18:20",
      views: "1.5K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop",
    },
    {
      title: { uz: "Xavfsiz internet serfing", en: "Safe Internet Browsing", ru: "Безопасный интернет-серфинг" },
      duration: "20:15",
      views: "2.1K",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    },
    {
      title: { uz: "Ikki faktorli autentifikatsiya", en: "Two-Factor Authentication", ru: "Двухфакторная аутентификация" },
      duration: "14:00",
      views: "870",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
      thumbnail: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=225&fit=crop",
    },
    {
      title: { uz: "Malware va virus haqida", en: "About Malware and Viruses", ru: "О вредоносных программах и вирусах" },
      duration: "22:30",
      views: "1.8K",
      level: { uz: "Yuqori", en: "Advanced", ru: "Продвинутый" },
      thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&h=225&fit=crop",
    },
  ];

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

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
              ? 'Video lessons from professional instructors'
              : getLang() === 'ru'
              ? 'Видеоуроки от профессиональных инструкторов'
              : "Professional murabbiylardan video darslar"
            }
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div 
                key={index} 
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

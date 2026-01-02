import React from 'react';
import { BookOpen, Clock, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Articles: React.FC = () => {
  const { t } = useLanguage();

  const articles = [
    {
      title: { uz: "Phishing hujumlaridan himoyalanish", en: "Protection from Phishing Attacks", ru: "Защита от фишинговых атак" },
      excerpt: { 
        uz: "Phishing nima va undan qanday himoyalanish mumkin...", 
        en: "What is phishing and how to protect yourself...", 
        ru: "Что такое фишинг и как защитить себя..." 
      },
      author: "Admin",
      date: "2024-01-15",
      readTime: "5 min",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    },
    {
      title: { uz: "Kuchli parol yaratish sirlari", en: "Secrets of Creating Strong Passwords", ru: "Секреты создания надежных паролей" },
      excerpt: { 
        uz: "Xavfsiz va eslab qolish oson parol yaratish...", 
        en: "Creating secure and memorable passwords...", 
        ru: "Создание безопасных и запоминающихся паролей..." 
      },
      author: "Admin",
      date: "2024-01-10",
      readTime: "7 min",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    },
    {
      title: { uz: "Ijtimoiy tarmoqlarda xavfsizlik", en: "Social Media Security", ru: "Безопасность в социальных сетях" },
      excerpt: { 
        uz: "Ijtimoiy tarmoqlarda shaxsiy ma'lumotlaringizni himoya qiling...", 
        en: "Protect your personal data on social media...", 
        ru: "Защитите свои личные данные в социальных сетях..." 
      },
      author: "Admin",
      date: "2024-01-05",
      readTime: "6 min",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
    },
    {
      title: { uz: "VPN nima va nima uchun kerak?", en: "What is VPN and Why Do You Need It?", ru: "Что такое VPN и зачем он нужен?" },
      excerpt: { 
        uz: "VPN texnologiyasi va uning afzalliklari...", 
        en: "VPN technology and its benefits...", 
        ru: "Технология VPN и ее преимущества..." 
      },
      author: "Admin",
      date: "2024-01-01",
      readTime: "8 min",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
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
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('articles')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Latest articles and guides on cybersecurity'
              : getLang() === 'ru'
              ? 'Последние статьи и руководства по кибербезопасности'
              : "Kiber xavfsizlik bo'yicha eng so'nggi maqolalar"
            }
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <article 
                key={index} 
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {article.level[getLang()]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {article.title[getLang()]}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {article.excerpt[getLang()]}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;

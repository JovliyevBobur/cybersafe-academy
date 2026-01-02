import React from 'react';
import { Shield, Target, Users, Award, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Shield, title: "Xavfsizlik", titleEn: "Security", titleRu: "Безопасность" },
    { icon: Target, title: "Aniqlik", titleEn: "Accuracy", titleRu: "Точность" },
    { icon: Users, title: "Hamkorlik", titleEn: "Collaboration", titleRu: "Сотрудничество" },
    { icon: Award, title: "Sifat", titleEn: "Quality", titleRu: "Качество" },
  ];

  const goals = [
    { uz: "Kiber xavfsizlik bo'yicha bilimlarni ommalashtirish", en: "Popularizing cybersecurity knowledge", ru: "Популяризация знаний о кибербезопасности" },
    { uz: "Internet xavfsizligini ta'minlash usullarini o'rgatish", en: "Teaching internet safety methods", ru: "Обучение методам интернет-безопасности" },
    { uz: "Phishing va boshqa xavflardan himoyalanish", en: "Protection from phishing and other threats", ru: "Защита от фишинга и других угроз" },
    { uz: "Parol xavfsizligi bo'yicha ko'nikmalar berish", en: "Providing password security skills", ru: "Развитие навыков безопасности паролей" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('about')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('aboutTitle')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('footerDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                {t('aboutMission')}
              </span>
              <h2 className="text-3xl font-bold mb-6">{t('aboutMissionDesc')}</h2>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {goal[t('home') === 'Home' ? 'en' : t('home') === 'Главная' ? 'ru' : 'uz']}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold">
                    {t('home') === 'Home' ? value.titleEn : t('home') === 'Главная' ? value.titleRu : value.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">50+</div>
              <div className="text-muted-foreground">{t('lessons')}</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">1000+</div>
              <div className="text-muted-foreground">{t('students')}</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">100+</div>
              <div className="text-muted-foreground">{t('tests')}</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">25+</div>
              <div className="text-muted-foreground">{t('certificates')}</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

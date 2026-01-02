import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, ClipboardCheck, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Education: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: BookOpen,
      title: t('articles'),
      description: {
        uz: "Kiber xavfsizlik bo'yicha eng so'nggi maqolalar va qo'llanmalar",
        en: "Latest articles and guides on cybersecurity",
        ru: "Последние статьи и руководства по кибербезопасности",
      },
      path: '/education/articles',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: PlayCircle,
      title: t('videoLessons'),
      description: {
        uz: "Professional murabbiylardan video darslar",
        en: "Video lessons from professional instructors",
        ru: "Видеоуроки от профессиональных инструкторов",
      },
      path: '/education/videos',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: ClipboardCheck,
      title: t('tests'),
      description: {
        uz: "Bilimlaringizni sinab ko'ring va natijalarni kuzating",
        en: "Test your knowledge and track your results",
        ru: "Проверьте свои знания и отслеживайте результаты",
      },
      path: '/education/tests',
      color: 'from-green-500 to-emerald-500',
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
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('education')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('education')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {getLang() === 'en' 
                ? 'Choose a learning path that suits you best'
                : getLang() === 'ru'
                ? 'Выберите подходящий вам путь обучения'
                : "O'zingizga mos o'quv yo'lini tanlang"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <Link key={index} to={section.path} className="group">
                <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {section.description[getLang()]}
                  </p>
                  <Button variant="ghost" className="group/btn p-0 h-auto">
                    {getLang() === 'en' ? 'Explore' : getLang() === 'ru' ? 'Изучить' : "Ko'rish"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Education;

import React from 'react';
import { ClipboardCheck, Clock, HelpCircle, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Tests: React.FC = () => {
  const { t } = useLanguage();

  const tests = [
    {
      title: { uz: "Kiber xavfsizlik asoslari", en: "Cybersecurity Basics", ru: "Основы кибербезопасности" },
      questions: 15,
      duration: "15",
      difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
      stars: 1,
    },
    {
      title: { uz: "Parol xavfsizligi testi", en: "Password Security Test", ru: "Тест на безопасность паролей" },
      questions: 20,
      duration: "20",
      difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
      stars: 1,
    },
    {
      title: { uz: "Phishing aniqlash", en: "Phishing Detection", ru: "Обнаружение фишинга" },
      questions: 25,
      duration: "25",
      difficulty: { uz: "O'rtacha", en: "Medium", ru: "Средний" },
      stars: 2,
    },
    {
      title: { uz: "Ijtimoiy tarmoqlar xavfsizligi", en: "Social Media Security", ru: "Безопасность социальных сетей" },
      questions: 20,
      duration: "20",
      difficulty: { uz: "O'rtacha", en: "Medium", ru: "Средний" },
      stars: 2,
    },
    {
      title: { uz: "Tarmoq xavfsizligi", en: "Network Security", ru: "Сетевая безопасность" },
      questions: 30,
      duration: "30",
      difficulty: { uz: "Qiyin", en: "Hard", ru: "Сложный" },
      stars: 3,
    },
    {
      title: { uz: "Malware va viruslar", en: "Malware and Viruses", ru: "Вредоносные программы и вирусы" },
      questions: 25,
      duration: "25",
      difficulty: { uz: "Qiyin", en: "Hard", ru: "Сложный" },
      stars: 3,
    },
  ];

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const getDifficultyColor = (stars: number) => {
    if (stars === 1) return 'text-green-500';
    if (stars === 2) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('tests')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Test your knowledge and track your progress'
              : getLang() === 'ru'
              ? 'Проверьте свои знания и отслеживайте свой прогресс'
              : "Bilimlaringizni sinab ko'ring va natijalaringizni kuzating"
            }
          </p>
        </div>
      </section>

      {/* Tests */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex items-center gap-1 text-sm font-medium ${getDifficultyColor(test.stars)}`}>
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < test.stars ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                    {test.difficulty[getLang()]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-4">{test.title[getLang()]}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    <span>{test.questions} {getLang() === 'en' ? 'questions' : getLang() === 'ru' ? 'вопросов' : 'savol'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration} {getLang() === 'en' ? 'min' : getLang() === 'ru' ? 'мин' : 'min'}</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  {getLang() === 'en' ? 'Start Test' : getLang() === 'ru' ? 'Начать тест' : 'Testni boshlash'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tests;

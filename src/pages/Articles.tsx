import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiService, Article } from '@/services/api';

const Articles: React.FC = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await apiService.getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

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
          {loading ? (
            <div className="text-center text-muted-foreground">Yuklanmoqda...</div>
          ) : articles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => {
                const lang = getLang();
                const levelMap: Record<string, string> = {
                  beginner: lang === 'en' ? 'Beginner' : lang === 'ru' ? 'Начальный' : "Boshlang'ich",
                  intermediate: lang === 'en' ? 'Intermediate' : lang === 'ru' ? 'Средний' : "O'rta",
                  advanced: lang === 'en' ? 'Advanced' : lang === 'ru' ? 'Продвинутый' : 'Yuqori',
                };
                return (
                  <article 
                    key={article.id} 
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {levelMap[article.level] || article.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {lang === 'en' ? article.title_en : lang === 'ru' ? article.title_ru : article.title_uz}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {lang === 'en' ? article.excerpt_en : lang === 'ru' ? article.excerpt_ru : article.excerpt_uz}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.read_time}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">Maqolalar mavjud emas</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Articles;

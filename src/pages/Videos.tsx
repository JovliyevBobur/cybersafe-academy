import React, { useEffect, useState } from 'react';
import { PlayCircle, Clock, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiService, Video } from '@/services/api';

const Videos: React.FC = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiService.getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

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
          {loading ? (
            <div className="text-center text-muted-foreground">Yuklanmoqda...</div>
          ) : videos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
                const lang = getLang();
                const levelMap: Record<string, string> = {
                  beginner: lang === 'en' ? 'Beginner' : lang === 'ru' ? 'Начальный' : "Boshlang'ich",
                  intermediate: lang === 'en' ? 'Intermediate' : lang === 'ru' ? 'Средний' : "O'rta",
                  advanced: lang === 'en' ? 'Advanced' : lang === 'ru' ? 'Продвинутый' : 'Yuqori',
                };
                return (
                  <div 
                    key={video.id} 
                    className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-card cursor-pointer group"
                    onClick={() => video.video_url && window.open(video.video_url, '_blank')}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={video.thumbnail || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop'} 
                        alt={lang === 'en' ? video.title_en : lang === 'ru' ? video.title_ru : video.title_uz}
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
                          {levelMap[video.level] || video.level}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {lang === 'en' ? video.title_en : lang === 'ru' ? video.title_ru : video.title_uz}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatViews(video.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">Videolar mavjud emas</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Videos;

import React, { useState } from 'react';
import { Settings, BookOpen, PlayCircle, ClipboardCheck, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import AdminArticles from '@/components/admin/AdminArticles';
import AdminVideos from '@/components/admin/AdminVideos';
import AdminTests from '@/components/admin/AdminTests';

const Admin: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('articles');

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {getLang() === 'en' ? 'Back' : getLang() === 'ru' ? 'Назад' : 'Orqaga'}
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {getLang() === 'en' ? 'Admin Panel' : getLang() === 'ru' ? 'Панель администратора' : 'Admin Panel'}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Manage articles, videos, and tests from here'
              : getLang() === 'ru'
              ? 'Управляйте статьями, видео и тестами отсюда'
              : "Maqolalar, videolar va testlarni shu yerdan boshqaring"
            }
          </p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="articles" className="gap-2">
                <BookOpen className="w-4 h-4" />
                {getLang() === 'en' ? 'Articles' : getLang() === 'ru' ? 'Статьи' : 'Maqolalar'}
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <PlayCircle className="w-4 h-4" />
                {getLang() === 'en' ? 'Videos' : getLang() === 'ru' ? 'Видео' : 'Videolar'}
              </TabsTrigger>
              <TabsTrigger value="tests" className="gap-2">
                <ClipboardCheck className="w-4 h-4" />
                {getLang() === 'en' ? 'Tests' : getLang() === 'ru' ? 'Тесты' : 'Testlar'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <AdminArticles />
            </TabsContent>

            <TabsContent value="videos">
              <AdminVideos />
            </TabsContent>

            <TabsContent value="tests">
              <AdminTests />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

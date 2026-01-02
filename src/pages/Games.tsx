import React from 'react';
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Games: React.FC = () => {
  const { t } = useLanguage();

  const games = [
    {
      title: { uz: "Phishing Detektiv", en: "Phishing Detective", ru: "Фишинг Детектив" },
      description: { 
        uz: "Haqiqiy va soxta xabarlarni aniqlang", 
        en: "Identify real and fake messages", 
        ru: "Определяйте настоящие и поддельные сообщения" 
      },
      icon: "🔍",
      players: "2.5K",
      difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
    },
    {
      title: { uz: "Parol Qal'asi", en: "Password Fortress", ru: "Крепость Паролей" },
      description: { 
        uz: "Kuchli parollar yarating va himoya qiling", 
        en: "Create strong passwords and protect them", 
        ru: "Создавайте надежные пароли и защищайте их" 
      },
      icon: "🏰",
      players: "1.8K",
      difficulty: { uz: "O'rtacha", en: "Medium", ru: "Средний" },
    },
    {
      title: { uz: "Xavfsiz Link", en: "Safe Link", ru: "Безопасная ссылка" },
      description: { 
        uz: "Xavfli va xavfsiz linklar", 
        en: "Dangerous and safe links", 
        ru: "Опасные и безопасные ссылки" 
      },
      icon: "🔗",
      players: "3.1K",
      difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
    },
    {
      title: { uz: "Kiber Mudofaa", en: "Cyber Defense", ru: "Кибер Защита" },
      description: { 
        uz: "Tizimni hujumlardan himoya qiling", 
        en: "Protect the system from attacks", 
        ru: "Защитите систему от атак" 
      },
      icon: "🛡️",
      players: "1.2K",
      difficulty: { uz: "Qiyin", en: "Hard", ru: "Сложный" },
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
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('games')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Learn cybersecurity through interactive games'
              : getLang() === 'ru'
              ? 'Изучайте кибербезопасность через интерактивные игры'
              : "Interaktiv o'yinlar orqali kiber xavfsizlikni o'rganing"
            }
          </p>
        </div>
      </section>

      {/* Games */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {games.map((game, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{game.title[getLang()]}</h3>
                      <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                        {game.difficulty[getLang()]}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{game.description[getLang()]}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{game.players}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span>+50 XP</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                        <Zap className="w-4 h-4 mr-1" />
                        {getLang() === 'en' ? 'Play' : getLang() === 'ru' ? 'Играть' : "O'ynash"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {getLang() === 'en' ? 'Top Players' : getLang() === 'ru' ? 'Лучшие игроки' : "Top o'yinchilar"}
            </h2>
            <p className="text-muted-foreground">
              {getLang() === 'en' ? 'This week\'s leaderboard' : getLang() === 'ru' ? 'Рейтинг этой недели' : "Bu haftalik reyting"}
            </p>
          </div>
          <div className="max-w-md mx-auto space-y-3">
            {[
              { name: "Anvar K.", score: 2850, rank: 1 },
              { name: "Dilnoza S.", score: 2720, rank: 2 },
              { name: "Jasur M.", score: 2580, rank: 3 },
            ].map((player) => (
              <div key={player.rank} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                  player.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                  'bg-amber-600/20 text-amber-600'
                }`}>
                  #{player.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{player.name}</div>
                </div>
                <div className="font-bold text-primary">{player.score} XP</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Games;

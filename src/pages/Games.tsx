import React, { useEffect, useState } from 'react';
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiService, Game } from '@/services/api';

const Games: React.FC = () => {
  const { t } = useLanguage();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await apiService.getGames();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const formatPlayers = (players: number) => {
    if (players >= 1000) {
      return `${(players / 1000).toFixed(1)}K`;
    }
    return players.toString();
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
          {loading ? (
            <div className="text-center text-muted-foreground">Yuklanmoqda...</div>
          ) : games.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {games.map((game) => {
                const lang = getLang();
                const difficultyMap: Record<string, string> = {
                  easy: lang === 'en' ? 'Easy' : lang === 'ru' ? 'Легкий' : 'Oson',
                  medium: lang === 'en' ? 'Medium' : lang === 'ru' ? 'Средний' : "O'rtacha",
                  hard: lang === 'en' ? 'Hard' : lang === 'ru' ? 'Сложный' : 'Qiyin',
                };
                return (
                  <div 
                    key={game.id} 
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl group-hover:scale-110 transition-transform">
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">
                            {lang === 'en' ? game.title_en : lang === 'ru' ? game.title_ru : game.title_uz}
                          </h3>
                          <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                            {difficultyMap[game.difficulty] || game.difficulty}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {lang === 'en' ? game.description_en : lang === 'ru' ? game.description_ru : game.description_uz}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{formatPlayers(game.players_count)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <span>+{game.xp_reward} XP</span>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-primary hover:opacity-90"
                            onClick={() => apiService.incrementGamePlayers(game.id)}
                          >
                            <Zap className="w-4 h-4 mr-1" />
                            {lang === 'en' ? 'Play' : lang === 'ru' ? 'Играть' : "O'ynash"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">O'yinlar mavjud emas</div>
          )}
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

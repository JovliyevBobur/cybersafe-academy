import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Bug, Trophy, RotateCcw, Heart, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Threat {
  id: number;
  type: 'virus' | 'malware' | 'phishing' | 'ddos';
  x: number;
  speed: number;
}

interface Props {
  onBack: () => void;
}

const CyberDefense: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [threats, setThreats] = useState<Threat[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const threatTypes = ['virus', 'malware', 'phishing', 'ddos'] as const;

  const spawnThreat = useCallback(() => {
    const newThreat: Threat = {
      id: Date.now(),
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      x: Math.random() * 80 + 10,
      speed: 1 + Math.random() * level * 0.5,
    };
    setThreats(prev => [...prev, newThreat]);
  }, [level]);

  const destroyThreat = (id: number) => {
    setThreats(prev => prev.filter(t => t.id !== id));
    setScore(prev => prev + 10);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnInterval = setInterval(() => {
      spawnThreat();
    }, 2000 / level);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameOver, level, spawnThreat]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveInterval = setInterval(() => {
      setThreats(prev => {
        const updated = prev.map(t => ({
          ...t,
          y: (t as any).y !== undefined ? (t as any).y + t.speed : t.speed
        }));

        const escaped = updated.filter(t => (t as any).y > 100);
        if (escaped.length > 0) {
          setLives(l => {
            const newLives = l - escaped.length;
            if (newLives <= 0) {
              setGameOver(true);
            }
            return Math.max(0, newLives);
          });
        }

        return updated.filter(t => (t as any).y <= 100);
      });
    }, 100);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (score > 0 && score % 50 === 0) {
      setLevel(l => Math.min(l + 1, 5));
    }
  }, [score]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setLevel(1);
    setThreats([]);
    setGameOver(false);
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'virus': return '🦠';
      case 'malware': return '💀';
      case 'phishing': return '🎣';
      case 'ddos': return '💥';
      default: return '⚠️';
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-4">
            {getLang() === 'en' ? 'Cyber Defense' : getLang() === 'ru' ? 'Кибер Защита' : 'Kiber Mudofaa'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {getLang() === 'en' 
              ? 'Click on threats to destroy them before they reach your system!' 
              : getLang() === 'ru' 
              ? 'Нажимайте на угрозы, чтобы уничтожить их!' 
              : "Xavflarni tizimga yetib kelguncha bosib yo'q qiling!"}
          </p>
          <Button onClick={startGame} size="lg">
            <Zap className="w-5 h-5 mr-2" />
            {getLang() === 'en' ? 'Start Game' : getLang() === 'ru' ? 'Начать игру' : "O'yinni boshlash"}
          </Button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">
            {getLang() === 'en' ? 'Game Over!' : getLang() === 'ru' ? 'Игра окончена!' : "O'yin tugadi!"}
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">{score} XP</p>
          <p className="text-muted-foreground mb-6">
            {getLang() === 'en' ? `Level reached: ${level}` : getLang() === 'ru' ? `Уровень: ${level}` : `Daraja: ${level}`}
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={startGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getLang() === 'en' ? 'Play Again' : getLang() === 'ru' ? 'Играть снова' : "Qayta o'ynash"}
            </Button>
            <Button onClick={onBack}>
              {getLang() === 'en' ? 'Back to Games' : getLang() === 'ru' ? 'К играм' : "O'yinlarga qaytish"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart 
              key={i} 
              className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-muted'}`} 
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {getLang() === 'en' ? 'Level' : getLang() === 'ru' ? 'Уровень' : 'Daraja'}: {level}
        </div>
        <div className="text-lg font-bold text-primary">{score} XP</div>
      </div>

      <div className="relative h-[400px] rounded-2xl bg-gradient-to-b from-card to-muted border border-border overflow-hidden">
        {/* Defense line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-primary to-green-500" />
        
        {/* Shield at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Shield className="w-12 h-12 text-primary animate-pulse" />
        </div>

        {/* Threats */}
        {threats.map(threat => (
          <button
            key={threat.id}
            onClick={() => destroyThreat(threat.id)}
            className="absolute text-3xl cursor-pointer transform hover:scale-125 transition-transform animate-bounce"
            style={{
              left: `${threat.x}%`,
              top: `${(threat as any).y || 0}%`,
            }}
          >
            {getThreatIcon(threat.type)}
          </button>
        ))}

        {/* Warning indicators */}
        {threats.length > 5 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-yellow-500">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-semibold">
              {getLang() === 'en' ? 'High threat level!' : getLang() === 'ru' ? 'Высокая угроза!' : 'Yuqori xavf!'}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        {getLang() === 'en' 
          ? 'Click threats to destroy them!' 
          : getLang() === 'ru' 
          ? 'Нажимайте на угрозы!' 
          : "Xavflarni bosing!"}
      </div>
    </div>
  );
};

export default CyberDefense;

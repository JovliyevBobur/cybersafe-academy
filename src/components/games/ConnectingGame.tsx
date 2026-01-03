import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Lightbulb, RotateCcw, Pause, Play, Trophy, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Card {
  id: number;
  value: string;
  name: string;
  color: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Props {
  onBack: () => void;
}

// Tech icons with colors, names, and logo URLs
const techIcons: Array<{ value: string; name: string; color: string; imageUrl: string }> = [
  { value: 'JS', name: 'JavaScript', color: '#F7DF1E', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { value: 'PY', name: 'Python', color: '#3776AB', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { value: 'TS', name: 'TypeScript', color: '#3178C6', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { value: 'RE', name: 'React', color: '#61DAFB', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { value: 'NG', name: 'Angular', color: '#DD0031', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { value: 'VU', name: 'Vue', color: '#4FC08D', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { value: 'HT', name: 'HTML5', color: '#E34F26', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { value: 'CS', name: 'CSS3', color: '#1572B6', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { value: 'NO', name: 'Node', color: '#339933', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { value: 'GO', name: 'Go', color: '#00ADD8', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { value: 'JA', name: 'Java', color: '#ED8B00', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { value: 'PH', name: 'PHP', color: '#777BB4', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { value: 'RU', name: 'Ruby', color: '#CC342D', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
  { value: 'SW', name: 'Swift', color: '#FA7343', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { value: 'C#', name: 'C#', color: '#239120', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { value: 'DO', name: 'Docker', color: '#2496ED', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { value: 'KU', name: 'K8s', color: '#326CE5', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { value: 'GH', name: 'GitHub', color: '#181717', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { value: 'VS', name: 'VS Code', color: '#007ACC', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg' },
  { value: 'AW', name: 'AWS', color: '#FF9900', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { value: 'AZ', name: 'Azure', color: '#0078D4', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { value: 'GC', name: 'GCloud', color: '#4285F4', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { value: 'LI', name: 'Linux', color: '#FCC624', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { value: 'WI', name: 'Windows', color: '#0078D6', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
  { value: 'AN', name: 'Android', color: '#3DDC84', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { value: 'AP', name: 'Apple', color: '#000000', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original-wordmark.svg' },
  { value: 'BO', name: 'Bootstrap', color: '#7952B3', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { value: 'SV', name: 'Svelte', color: '#FF3E00', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { value: 'RX', name: 'Redux', color: '#764ABC', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { value: 'UN', name: 'Unity', color: '#000000', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
  { value: 'BL', name: 'Blender', color: '#F5792A', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
  { value: 'UE', name: 'Unreal', color: '#313131', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },
];

const ConnectingGame: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [hints, setHints] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [pairsLeft, setPairsLeft] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const getIconsForLevel = (levelNum: number) => {
    // Level 1: 16 pairs (8x8 grid), Level 2: 20 pairs, Level 3: 24 pairs, etc.
    const pairsCount = Math.min(16 + (levelNum - 1) * 4, 32);
    return techIcons.slice(0, pairsCount);
  };

  const initializeGame = useCallback(() => {
    const iconsForLevel = getIconsForLevel(level);
    const pairs = [...iconsForLevel, ...iconsForLevel];
    const shuffled = pairs
      .map((icon, index) => ({
        id: index,
        value: icon.value,
        name: icon.name,
        color: icon.color,
        imageUrl: icon.imageUrl,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setLives(3);
    setHints(3);
    setIsPaused(false);
    setGameOver(false);
    setGameWon(false);
    setPairsLeft(iconsForLevel.length);
    setScore(0);
    setImageErrors(new Set());
  }, [level]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.value === secondCard.value) {
        // Match found
        setCards(prev => prev.map((card, index) => 
          index === first || index === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(m => m + 1);
        setPairsLeft(prev => prev - 1);
        setScore(prev => prev + 100 + (level * 10));
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((card, index) =>
            index === first || index === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
            }
            return newLives;
          });
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flippedCards, cards, level]);

  useEffect(() => {
    if (pairsLeft === 0 && cards.length > 0 && !gameOver) {
      setGameWon(true);
      setScore(prev => prev + (level * 50));
    }
  }, [pairsLeft, cards.length, gameOver]);

  const handleCardClick = (index: number) => {
    if (isPaused || gameOver || gameWon) return;
    if (flippedCards.length >= 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    setCards(prev => prev.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  const handleShuffle = () => {
    if (isPaused || gameOver || gameWon) return;
    setCards(prev => {
      const unmatched = prev.filter(c => !c.isMatched);
      const matched = prev.filter(c => c.isMatched);
      const shuffledUnmatched = [...unmatched].sort(() => Math.random() - 0.5);
      return [...shuffledUnmatched, ...matched].map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
      }));
    });
    setFlippedCards([]);
  };

  const handleHint = () => {
    if (isPaused || gameOver || gameWon || hints <= 0) return;
    if (flippedCards.length > 0) return;

    const unmatched = cards
      .map((card, index) => ({ card, index }))
      .filter(({ card }) => !card.isMatched);

    if (unmatched.length < 2) return;

    // Find a pair
    const valueMap = new Map<string, number[]>();
    unmatched.forEach(({ card, index }) => {
      if (!valueMap.has(card.value)) {
        valueMap.set(card.value, []);
      }
      valueMap.get(card.value)!.push(index);
    });

    let foundPair: number[] | null = null;
    for (const [_, indices] of valueMap) {
      if (indices.length >= 2) {
        foundPair = [indices[0], indices[1]];
        break;
      }
    }

    if (foundPair) {
      // Reveal the pair briefly
      setCards(prev => prev.map((card, i) =>
        foundPair!.includes(i) ? { ...card, isFlipped: true } : card
      ));
      setHints(prev => prev - 1);
      setTimeout(() => {
        setCards(prev => prev.map((card, i) =>
          foundPair!.includes(i) ? { ...card, isFlipped: false } : card
        ));
      }, 2000);
    }
  };

  const handleNextLevel = () => {
    setLevel(prev => prev + 1);
    setGameWon(false);
  };

  const progress = cards.length > 0 ? ((cards.length / 2 - pairsLeft) / (cards.length / 2)) * 100 : 0;

  if (gameOver) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">
            {getLang() === 'en' ? 'Game Over!' : getLang() === 'ru' ? 'Игра окончена!' : 'O\'yin tugadi!'}
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">{score} XP</p>
          <div className="text-muted-foreground mb-6 space-y-1">
            <p>{getLang() === 'en' ? 'Level:' : getLang() === 'ru' ? 'Уровень:' : 'Daraja:'} {level}</p>
            <p>{getLang() === 'en' ? 'Moves:' : getLang() === 'ru' ? 'Ходы:' : 'Harakatlar:'} {moves}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={initializeGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getLang() === 'en' ? 'Retry' : getLang() === 'ru' ? 'Повторить' : 'Qayta urinish'}
            </Button>
            <Button onClick={onBack}>
              {getLang() === 'en' ? 'Back to Games' : getLang() === 'ru' ? 'К играм' : 'O\'yinlarga qaytish'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">
            {getLang() === 'en' ? 'Level Complete!' : getLang() === 'ru' ? 'Уровень пройден!' : 'Daraja yakunlandi!'}
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">{score} XP</p>
          <div className="text-muted-foreground mb-6 space-y-1">
            <p>{getLang() === 'en' ? 'Moves:' : getLang() === 'ru' ? 'Ходы:' : 'Harakatlar:'} {moves}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleNextLevel}>
              {getLang() === 'en' ? 'Next Level' : getLang() === 'ru' ? 'Следующий уровень' : 'Keyingi daraja'}
            </Button>
            <Button onClick={onBack} variant="outline">
              {getLang() === 'en' ? 'Back to Games' : getLang() === 'ru' ? 'К играм' : 'O\'yinlarga qaytish'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const gridCols = 8; // 8x8 grid

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6 space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
              <span className="text-sm font-medium text-muted-foreground">
                {getLang() === 'en' ? 'Neon Tech Matching' : getLang() === 'ru' ? 'Неоновое Техно Совпадение' : 'Neon Texno Moslash'}
              </span>
              <span className="text-lg font-bold text-primary">JS</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
              <span className="text-sm text-muted-foreground">
                {getLang() === 'en' ? 'LEVEL' : getLang() === 'ru' ? 'УРОВЕНЬ' : 'DARAJASI'}
              </span>
              <span className="text-lg font-bold">{level}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
              <span className="text-sm text-muted-foreground">
                {getLang() === 'en' ? 'SCORE:' : getLang() === 'ru' ? 'СЧЕТ:' : 'HISOB:'}
              </span>
              <span className="text-lg font-bold text-primary">{score}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${i <= lives ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`}
              />
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHint}
              disabled={hints <= 0 || isPaused}
              className="relative"
            >
              <Lightbulb className="w-5 h-5" />
              {hints > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {hints}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShuffle}
              disabled={isPaused}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Title and stats */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {getLang() === 'en' ? 'Connecting Game' : getLang() === 'ru' ? 'Игра на соединение' : 'Connecting Game'}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              {getLang() === 'en' ? 'Pairs left:' : getLang() === 'ru' ? 'Пар осталось:' : 'Juftlik qoldi:'} <span className="font-bold text-foreground">{pairsLeft}</span>
            </span>
            <span className="text-muted-foreground">
              {getLang() === 'en' ? 'Moves:' : getLang() === 'ru' ? 'Ходы:' : 'Harakatlar:'} <span className="font-bold text-foreground">{moves}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      {isPaused ? (
        <div className="flex items-center justify-center min-h-[500px] bg-card rounded-2xl border border-border">
          <div className="text-center">
            <Pause className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold text-muted-foreground">
              {getLang() === 'en' ? 'Paused' : getLang() === 'ru' ? 'Пауза' : 'To\'xtatildi'}
            </p>
          </div>
        </div>
      ) : (
        <div className={`grid gap-2 p-4 bg-card rounded-2xl border border-border`}
          style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        >
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2 || isPaused}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center
                transition-all duration-300 transform relative overflow-hidden
                ${card.isFlipped || card.isMatched
                  ? 'bg-background border-2 scale-100'
                  : 'bg-muted hover:bg-muted/80 hover:scale-105 border-2 border-transparent'
                }
                ${card.isMatched ? 'opacity-60' : ''}
              `}
              style={{
                borderColor: card.isFlipped || card.isMatched ? card.color : 'transparent',
                boxShadow: card.isFlipped || card.isMatched
                  ? `0 0 20px ${card.color}40, 0 0 40px ${card.color}20`
                  : 'none',
              }}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-2">
                  <div className="w-12 h-12 flex items-center justify-center mb-1">
                    {imageErrors.has(card.id) ? (
                      <div
                        className="w-full h-full flex items-center justify-center rounded"
                        style={{
                          backgroundColor: card.color + '20',
                          color: card.color,
                        }}
                      >
                        <span className="text-lg font-bold">{card.value}</span>
                      </div>
                    ) : (
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(0 0 8px ' + card.color + '80)' }}
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(card.id));
                        }}
                      />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground text-center px-1 font-medium">
                    {card.name}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-10 h-10 rounded-lg bg-muted-foreground/20 border border-border/50" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectingGame;


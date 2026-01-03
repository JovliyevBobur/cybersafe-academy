import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Timer, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Props {
  onBack: () => void;
}

const cyberIcons = ['🔒', '🛡️', '🔐', '🔑', '💻', '🌐', '📱', '⚡'];

const ConnectingGame: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const initializeGame = () => {
    const pairs = [...cyberIcons, ...cyberIcons];
    const shuffled = pairs
      .map((value, index) => ({ id: index, value, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
    setTimer(0);
    setIsRunning(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.value === secondCard.value) {
        setCards(prev => prev.map((card, index) => 
          index === first || index === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(m => m + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) =>
            index === first || index === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === cyberIcons.length) {
      setGameOver(true);
      setIsRunning(false);
    }
  }, [matches]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    setCards(prev => prev.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    const baseScore = 100;
    const movePenalty = Math.max(0, moves - 8) * 2;
    const timePenalty = Math.floor(timer / 10);
    return Math.max(50, baseScore - movePenalty - timePenalty);
  };

  if (gameOver) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">
            {getLang() === 'en' ? 'Congratulations!' : getLang() === 'ru' ? 'Поздравляем!' : 'Tabriklaymiz!'}
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">{calculateScore()} XP</p>
          <div className="text-muted-foreground mb-6 space-y-1">
            <p>{getLang() === 'en' ? 'Moves:' : getLang() === 'ru' ? 'Ходы:' : 'Harakatlar:'} {moves}</p>
            <p>{getLang() === 'en' ? 'Time:' : getLang() === 'ru' ? 'Время:' : 'Vaqt:'} {formatTime(timer)}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={initializeGame} variant="outline">
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
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-muted-foreground" />
            <span className="font-mono font-bold">{formatTime(timer)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold">{matches}/{cyberIcons.length}</span>
          </div>
        </div>
        <Button onClick={initializeGame} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          {getLang() === 'en' ? 'Restart' : getLang() === 'ru' ? 'Заново' : 'Qayta'}
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3 p-4 bg-card rounded-2xl border border-border">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2}
            className={`aspect-square text-3xl rounded-xl flex items-center justify-center transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-primary/20 rotate-0'
                : 'bg-muted hover:bg-muted/80 hover:scale-105'
            } ${card.isMatched ? 'opacity-60 scale-95' : ''}`}
          >
            {(card.isFlipped || card.isMatched) ? card.value : '?'}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {getLang() === 'en' 
          ? `Moves: ${moves}` 
          : getLang() === 'ru' 
          ? `Ходы: ${moves}` 
          : `Harakatlar: ${moves}`}
      </p>
    </div>
  );
};

export default ConnectingGame;

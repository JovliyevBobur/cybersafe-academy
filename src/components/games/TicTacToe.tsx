import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, User, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  onBack: () => void;
}

type Player = 'X' | 'O' | null;
type Board = Player[];

const TicTacToe: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState<'pvp' | 'pvc' | null>(null);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const calculateWinner = (squares: Board): { winner: Player; line: number[] } | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const minimax = (squares: Board, depth: number, isMaximizing: boolean): number => {
    const result = calculateWinner(squares);
    if (result?.winner === 'O') return 10 - depth;
    if (result?.winner === 'X') return depth - 10;
    if (squares.every(s => s !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          bestScore = Math.max(bestScore, minimax(squares, depth + 1, false));
          squares[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          bestScore = Math.min(bestScore, minimax(squares, depth + 1, true));
          squares[i] = null;
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares: Board): number => {
    let bestScore = -Infinity;
    let bestMove = 0;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // AI move
    if (gameMode === 'pvc' && !calculateWinner(newBoard) && newBoard.some(s => s === null)) {
      setTimeout(() => {
        const aiMove = getBestMove([...newBoard]);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = 'O';
        setBoard(aiBoard);
        setIsXNext(true);
      }, 500);
    }
  };

  const result = calculateWinner(board);
  const isDraw = !result && board.every(s => s !== null);

  const resetGame = () => {
    if (result) {
      if (result.winner === 'X') setScores(s => ({ ...s, x: s.x + 1 }));
      else setScores(s => ({ ...s, o: s.o + 1 }));
    } else if (isDraw) {
      setScores(s => ({ ...s, draws: s.draws + 1 }));
    }
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const newGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ x: 0, o: 0, draws: 0 });
    setGameMode(null);
  };

  if (!gameMode) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <h2 className="text-2xl font-bold mb-6">
            {getLang() === 'en' ? 'Choose Game Mode' : getLang() === 'ru' ? 'Выберите режим игры' : "O'yin turini tanlang"}
          </h2>
          <div className="flex flex-col gap-4">
            <Button 
              onClick={() => setGameMode('pvp')} 
              className="h-16 text-lg bg-gradient-primary"
            >
              <User className="w-6 h-6 mr-3" />
              {getLang() === 'en' ? 'Player vs Player' : getLang() === 'ru' ? 'Игрок против игрока' : "O'yinchi vs O'yinchi"}
            </Button>
            <Button 
              onClick={() => setGameMode('pvc')} 
              variant="outline"
              className="h-16 text-lg"
            >
              <Bot className="w-6 h-6 mr-3" />
              {getLang() === 'en' ? 'Player vs Computer' : getLang() === 'ru' ? 'Игрок против компьютера' : "O'yinchi vs Kompyuter"}
            </Button>
          </div>
          <Button onClick={onBack} variant="ghost" className="mt-6">
            {getLang() === 'en' ? 'Back to Games' : getLang() === 'ru' ? 'К играм' : "O'yinlarga qaytish"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Scoreboard */}
      <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-card border border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-500">X</div>
          <div className="text-sm text-muted-foreground">{scores.x}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {getLang() === 'en' ? 'Draws' : getLang() === 'ru' ? 'Ничья' : 'Durrang'}
          </div>
          <div className="font-bold">{scores.draws}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-500">O</div>
          <div className="text-sm text-muted-foreground">{scores.o}</div>
        </div>
      </div>

      {/* Status */}
      <div className="text-center mb-4">
        {result ? (
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            <Trophy className="w-6 h-6 text-yellow-500" />
            {result.winner === 'X' 
              ? (getLang() === 'en' ? 'X Wins!' : getLang() === 'ru' ? 'X Победил!' : 'X yutdi!') 
              : (getLang() === 'en' ? 'O Wins!' : getLang() === 'ru' ? 'O Победил!' : 'O yutdi!')}
          </div>
        ) : isDraw ? (
          <div className="text-xl font-bold text-muted-foreground">
            {getLang() === 'en' ? "It's a Draw!" : getLang() === 'ru' ? 'Ничья!' : 'Durrang!'}
          </div>
        ) : (
          <div className="text-lg">
            {getLang() === 'en' ? 'Turn:' : getLang() === 'ru' ? 'Ход:' : 'Navbat:'}{' '}
            <span className={`font-bold ${isXNext ? 'text-cyan-500' : 'text-pink-500'}`}>
              {isXNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-card rounded-2xl border border-border">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!result || (gameMode === 'pvc' && !isXNext)}
            className={`aspect-square text-4xl font-bold rounded-xl flex items-center justify-center transition-all duration-200 ${
              cell ? 'bg-muted' : 'bg-muted/50 hover:bg-muted hover:scale-105'
            } ${result?.line.includes(index) ? 'ring-2 ring-yellow-500 bg-yellow-500/20' : ''}`}
          >
            <span className={cell === 'X' ? 'text-cyan-500' : 'text-pink-500'}>
              {cell}
            </span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center mt-6">
        {(result || isDraw) ? (
          <Button onClick={resetGame} className="bg-gradient-primary">
            <RotateCcw className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Next Round' : getLang() === 'ru' ? 'Следующий раунд' : 'Keyingi raund'}
          </Button>
        ) : (
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Restart' : getLang() === 'ru' ? 'Заново' : 'Qayta'}
          </Button>
        )}
        <Button onClick={newGame} variant="ghost">
          {getLang() === 'en' ? 'New Game' : getLang() === 'ru' ? 'Новая игра' : "Yangi o'yin"}
        </Button>
      </div>
    </div>
  );
};

export default TicTacToe;

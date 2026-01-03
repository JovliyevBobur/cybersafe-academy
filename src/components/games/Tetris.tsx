import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Play, Pause, ArrowDown, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  onBack: () => void;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' },
};

type TetrominoType = keyof typeof TETROMINOS;

interface Piece {
  type: TetrominoType;
  x: number;
  y: number;
  shape: number[][];
}

const Tetris: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [board, setBoard] = useState<(string | null)[][]>(
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<TetrominoType | null>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const getRandomPiece = (): TetrominoType => {
    const types = Object.keys(TETROMINOS) as TetrominoType[];
    return types[Math.floor(Math.random() * types.length)];
  };

  const createPiece = (type: TetrominoType): Piece => ({
    type,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOS[type].shape[0].length / 2),
    y: 0,
    shape: TETROMINOS[type].shape.map(row => [...row]),
  });

  const checkCollision = (piece: Piece, board: (string | null)[][], offsetX = 0, offsetY = 0) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x + offsetX;
          const newY = piece.y + y + offsetY;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return true;
          if (newY >= 0 && board[newY][newX]) return true;
        }
      }
    }
    return false;
  };

  const rotatePiece = (piece: Piece): number[][] => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    );
    return rotated;
  };

  const mergePieceToBoard = useCallback((piece: Piece, board: (string | null)[][]) => {
    const newBoard = board.map(row => [...row]);
    const color = TETROMINOS[piece.type].color;
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] && piece.y + y >= 0) {
          newBoard[piece.y + y][piece.x + x] = color;
        }
      }
    }
    return newBoard;
  }, []);

  const clearLines = useCallback((board: (string | null)[][]) => {
    let clearedLines = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell !== null)) {
        clearedLines++;
        return false;
      }
      return true;
    });

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }

    return { newBoard, clearedLines };
  }, []);

  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)));
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    const first = getRandomPiece();
    const second = getRandomPiece();
    setCurrentPiece(createPiece(first));
    setNextPiece(second);
  };

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece(p => p ? { ...p, y: p.y + 1 } : null);
    } else {
      // Lock piece
      const newBoard = mergePieceToBoard(currentPiece, board);
      const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      setLines(l => l + clearedLines);
      setScore(s => s + clearedLines * 100 * level + 10);
      
      if (clearedLines > 0) {
        setLevel(l => Math.min(10, Math.floor((lines + clearedLines) / 10) + 1));
      }

      // Spawn new piece
      if (nextPiece) {
        const newPiece = createPiece(nextPiece);
        if (checkCollision(newPiece, clearedBoard)) {
          setGameOver(true);
          setIsPlaying(false);
        } else {
          setCurrentPiece(newPiece);
          setNextPiece(getRandomPiece());
        }
      }
    }
  }, [currentPiece, board, gameOver, isPaused, nextPiece, level, lines, mergePieceToBoard, clearLines]);

  const moveLeft = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, -1, 0)) {
      setCurrentPiece(p => p ? { ...p, x: p.x - 1 } : null);
    }
  }, [currentPiece, board, gameOver, isPaused]);

  const moveRight = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, 1, 0)) {
      setCurrentPiece(p => p ? { ...p, x: p.x + 1 } : null);
    }
  }, [currentPiece, board, gameOver, isPaused]);

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotated = rotatePiece(currentPiece);
    const testPiece = { ...currentPiece, shape: rotated };
    if (!checkCollision(testPiece, board)) {
      setCurrentPiece(testPiece);
    }
  }, [currentPiece, board, gameOver, isPaused]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    let dropY = 0;
    while (!checkCollision(currentPiece, board, 0, dropY + 1)) {
      dropY++;
    }
    setCurrentPiece(p => p ? { ...p, y: p.y + dropY } : null);
    setTimeout(moveDown, 50);
  }, [currentPiece, board, gameOver, isPaused, moveDown]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      switch (e.key) {
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowUp': rotate(); break;
        case ' ': hardDrop(); break;
        case 'p': setIsPaused(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, moveLeft, moveRight, moveDown, rotate, hardDrop]);

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      const speed = Math.max(100, 1000 - (level - 1) * 100);
      gameLoopRef.current = setInterval(moveDown, speed);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, isPaused, level, moveDown]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    if (currentPiece) {
      const color = TETROMINOS[currentPiece.type].color;
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] && currentPiece.y + y >= 0) {
            displayBoard[currentPiece.y + y][currentPiece.x + x] = color;
          }
        }
      }
    }
    return displayBoard;
  };

  const renderNextPiece = () => {
    if (!nextPiece) return null;
    const piece = TETROMINOS[nextPiece];
    return piece.shape.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-4 h-4 border border-border/30 ${cell ? piece.color : 'bg-transparent'}`}
          />
        ))}
      </div>
    ));
  };

  if (!isPlaying && !gameOver) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <h2 className="text-3xl font-bold mb-4">🎮 Tetris</h2>
          <p className="text-muted-foreground mb-6">
            {getLang() === 'en' 
              ? 'Use arrow keys to move, Up to rotate, Space to drop'
              : getLang() === 'ru'
              ? 'Стрелки для движения, Вверх для вращения, Пробел для броска'
              : "Harakatlantirish uchun strelkalar, Aylantirish uchun yuqori, Tushirish uchun probel"}
          </p>
          <Button onClick={startGame} className="h-14 text-lg bg-gradient-primary">
            <Play className="w-6 h-6 mr-2" />
            {getLang() === 'en' ? 'Start Game' : getLang() === 'ru' ? 'Начать игру' : "O'yinni boshlash"}
          </Button>
          <Button onClick={onBack} variant="ghost" className="mt-4 block mx-auto">
            {getLang() === 'en' ? 'Back to Games' : getLang() === 'ru' ? 'К играм' : "O'yinlarga qaytish"}
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
          <div className="text-muted-foreground mb-6">
            <p>{getLang() === 'en' ? 'Lines:' : getLang() === 'ru' ? 'Линии:' : 'Qatorlar:'} {lines}</p>
            <p>{getLang() === 'en' ? 'Level:' : getLang() === 'ru' ? 'Уровень:' : 'Daraja:'} {level}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={startGame} className="bg-gradient-primary">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getLang() === 'en' ? 'Play Again' : getLang() === 'ru' ? 'Играть снова' : "Qayta o'ynash"}
            </Button>
            <Button onClick={onBack} variant="outline">
              {getLang() === 'en' ? 'Back' : getLang() === 'ru' ? 'Назад' : 'Orqaga'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
      {/* Game Board */}
      <div className="bg-card p-3 rounded-2xl border border-border">
        <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)` }}>
          {renderBoard().map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`w-5 h-5 sm:w-6 sm:h-6 border border-border/20 ${cell || 'bg-muted/30'}`}
              />
            ))
          )}
        </div>
      </div>

      {/* Side Panel */}
      <div className="space-y-4">
        {/* Next Piece */}
        <div className="p-4 bg-card rounded-xl border border-border">
          <div className="text-sm text-muted-foreground mb-2">
            {getLang() === 'en' ? 'Next' : getLang() === 'ru' ? 'Следующий' : 'Keyingi'}
          </div>
          <div className="flex flex-col items-center">{renderNextPiece()}</div>
        </div>

        {/* Stats */}
        <div className="p-4 bg-card rounded-xl border border-border space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{getLang() === 'en' ? 'Score' : getLang() === 'ru' ? 'Очки' : 'Ball'}</span>
            <span className="font-bold text-primary">{score}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{getLang() === 'en' ? 'Lines' : getLang() === 'ru' ? 'Линии' : 'Qatorlar'}</span>
            <span className="font-bold">{lines}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{getLang() === 'en' ? 'Level' : getLang() === 'ru' ? 'Уровень' : 'Daraja'}</span>
            <span className="font-bold">{level}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button onClick={() => setIsPaused(p => !p)} variant="outline" size="sm">
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button onClick={startGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 lg:hidden">
          <Button onClick={moveLeft} variant="outline" size="icon" className="h-12">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Button onClick={rotate} variant="outline" size="icon" className="h-12">
            <RotateCw className="w-6 h-6" />
          </Button>
          <Button onClick={moveRight} variant="outline" size="icon" className="h-12">
            <ArrowRight className="w-6 h-6" />
          </Button>
          <div />
          <Button onClick={moveDown} variant="outline" size="icon" className="h-12">
            <ArrowDown className="w-6 h-6" />
          </Button>
          <Button onClick={hardDrop} variant="secondary" size="icon" className="h-12">
            ⬇⬇
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tetris;

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Flag, Bomb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

interface Props {
  onBack: () => void;
}

const GRID_SIZE = 8;
const MINES_COUNT = 10;

const Minesweeper: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [grid, setGrid] = useState<Cell[][]>(() => generateGrid());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(MINES_COUNT);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  function generateGrid(): Cell[][] {
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = row + dr;
              const nc = col + dc;
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                if (newGrid[nr][nc].isMine) count++;
              }
            }
          }
          newGrid[row][col].adjacentMines = count;
        }
      }
    }

    return newGrid;
  }

  const revealCell = useCallback((row: number, col: number) => {
    if (gameOver || won) return;

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));
      const cell = newGrid[row][col];

      if (cell.isRevealed || cell.isFlagged) return prevGrid;

      cell.isRevealed = true;

      if (cell.isMine) {
        // Reveal all mines
        newGrid.forEach(r => r.forEach(c => {
          if (c.isMine) c.isRevealed = true;
        }));
        setGameOver(true);
        return newGrid;
      }

      // Flood fill for empty cells
      if (cell.adjacentMines === 0) {
        const stack: [number, number][] = [[row, col]];
        while (stack.length > 0) {
          const [r, c] = stack.pop()!;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                const neighbor = newGrid[nr][nc];
                if (!neighbor.isRevealed && !neighbor.isMine && !neighbor.isFlagged) {
                  neighbor.isRevealed = true;
                  if (neighbor.adjacentMines === 0) {
                    stack.push([nr, nc]);
                  }
                }
              }
            }
          }
        }
      }

      // Check win condition
      const revealedCount = newGrid.flat().filter(c => c.isRevealed).length;
      if (revealedCount === GRID_SIZE * GRID_SIZE - MINES_COUNT) {
        setWon(true);
      }

      return newGrid;
    });
  }, [gameOver, won]);

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || won) return;

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));
      const cell = newGrid[row][col];

      if (cell.isRevealed) return prevGrid;

      if (cell.isFlagged) {
        cell.isFlagged = false;
        setFlagsLeft(f => f + 1);
      } else if (flagsLeft > 0) {
        cell.isFlagged = true;
        setFlagsLeft(f => f - 1);
      }

      return newGrid;
    });
  };

  const restartGame = () => {
    setGrid(generateGrid());
    setGameOver(false);
    setWon(false);
    setFlagsLeft(MINES_COUNT);
  };

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return '';
    const colors = ['', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-yellow-600', 'text-cyan-500', 'text-gray-700', 'text-gray-900'];
    return colors[cell.adjacentMines] || '';
  };

  if (gameOver || won) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          {won ? (
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          ) : (
            <Bomb className="w-16 h-16 mx-auto mb-4 text-red-500" />
          )}
          <h2 className="text-2xl font-bold mb-4">
            {won 
              ? (getLang() === 'en' ? 'You Won!' : getLang() === 'ru' ? 'Вы победили!' : 'Siz yutdingiz!')
              : (getLang() === 'en' ? 'Game Over!' : getLang() === 'ru' ? 'Игра окончена!' : "O'yin tugadi!")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {won
              ? (getLang() === 'en' ? 'All mines cleared! +100 XP' : getLang() === 'ru' ? 'Все мины найдены! +100 XP' : "Barcha minalar topildi! +100 XP")
              : (getLang() === 'en' ? 'You hit a mine!' : getLang() === 'ru' ? 'Вы наступили на мину!' : "Minaga tegdingiz!")}
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={restartGame} variant="outline">
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
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-red-500" />
          <span className="font-bold">{flagsLeft}</span>
        </div>
        <Button onClick={restartGame} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          {getLang() === 'en' ? 'Restart' : getLang() === 'ru' ? 'Заново' : 'Qayta'}
        </Button>
      </div>

      <div className="grid gap-1 p-4 bg-card rounded-2xl border border-border">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                className={`w-9 h-9 flex items-center justify-center text-sm font-bold rounded transition-all ${
                  cell.isRevealed
                    ? cell.isMine
                      ? 'bg-red-500/20'
                      : 'bg-muted'
                    : 'bg-primary/20 hover:bg-primary/30'
                } ${getCellColor(cell)}`}
              >
                {cell.isFlagged && !cell.isRevealed && '🚩'}
                {cell.isRevealed && cell.isMine && '💣'}
                {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && cell.adjacentMines}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {getLang() === 'en' 
          ? 'Left click to reveal, right click to flag' 
          : getLang() === 'ru' 
          ? 'ЛКМ - открыть, ПКМ - флаг' 
          : "Chap - ochish, o'ng - bayroq"}
      </p>
    </div>
  );
};

export default Minesweeper;

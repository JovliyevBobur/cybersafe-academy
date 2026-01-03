import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  onBack: () => void;
}

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PLATFORM_WIDTH = 80;
const PLATFORM_HEIGHT = 10;
const BALL_RADIUS = 15;
const PROJECTILE_RADIUS = 8;
const GRAVITY = 0.3;
const BALL_SPAWN_INTERVAL = 2000;
const BALL_SPAWN_Y = 50;

const Ballz: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const lastLevelUpScoreRef = useRef<number>(0);
  
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [platformX, setPlatformX] = useState(GAME_WIDTH / 2 - PLATFORM_WIDTH / 2);
  const [mouseX, setMouseX] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [projectileIdCounter, setProjectileIdCounter] = useState(0);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

  const initializeGame = useCallback(() => {
    setBalls([]);
    setProjectiles([]);
    setScore(0);
    setLevel(1);
    setLives(3);
    setGameOver(false);
    setIsPaused(false);
    setPlatformX(GAME_WIDTH / 2 - PLATFORM_WIDTH / 2);
    setProjectileIdCounter(0);
    lastSpawnRef.current = Date.now();
    lastLevelUpScoreRef.current = 0;
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const checkCollision = (x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
  };

  const shootProjectile = useCallback(() => {
    if (isPaused || gameOver) return;
    
    const newProjectile: Projectile = {
      id: projectileIdCounter,
      x: platformX + PLATFORM_WIDTH / 2,
      y: GAME_HEIGHT - PLATFORM_HEIGHT - 20,
      vx: (mouseX - (platformX + PLATFORM_WIDTH / 2)) * 0.1,
      vy: -8,
      radius: PROJECTILE_RADIUS,
    };
    
    setProjectiles(prev => [...prev, newProjectile]);
    setProjectileIdCounter(prev => prev + 1);
  }, [platformX, mouseX, isPaused, gameOver, projectileIdCounter]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      if (isPaused || gameOver) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const now = Date.now();
      
      // Spawn new balls
      if (now - lastSpawnRef.current > BALL_SPAWN_INTERVAL / (1 + level * 0.1)) {
        const newBall: Ball = {
          id: Date.now(),
          x: Math.random() * (GAME_WIDTH - BALL_RADIUS * 2) + BALL_RADIUS,
          y: BALL_SPAWN_Y,
          vx: (Math.random() - 0.5) * 2,
          vy: 1 + level * 0.2,
          radius: BALL_RADIUS,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setBalls(prev => [...prev, newBall]);
        lastSpawnRef.current = now;
      }

      // Update balls
      setBalls(prev => prev.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy + GRAVITY;

        // Bounce off walls
        if (newX - ball.radius <= 0 || newX + ball.radius >= GAME_WIDTH) {
          newVx = -newVx;
          newX = Math.max(ball.radius, Math.min(GAME_WIDTH - ball.radius, newX));
        }

        // Check if ball hits platform
        if (newY + ball.radius >= GAME_HEIGHT - PLATFORM_HEIGHT - 20 &&
            newY - ball.radius <= GAME_HEIGHT - 20 &&
            newX >= platformX &&
            newX <= platformX + PLATFORM_WIDTH) {
          newVy = -Math.abs(newVy) * 0.8;
          newY = GAME_HEIGHT - PLATFORM_HEIGHT - 20 - ball.radius;
        }

        // Check if ball falls below
        if (newY > GAME_HEIGHT + 50) {
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
            }
            return newLives;
          });
          return null;
        }

        return {
          ...ball,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      }).filter(ball => ball !== null) as Ball[]);

      // Update projectiles
      setProjectiles(prev => prev.map(projectile => ({
        ...projectile,
        x: projectile.x + projectile.vx,
        y: projectile.y + projectile.vy,
      })).filter(projectile => 
        projectile.y > -50 && 
        projectile.x > -50 && 
        projectile.x < GAME_WIDTH + 50
      ));

      // Check collisions between projectiles and balls
      setBalls(prevBalls => {
        const newBalls: Ball[] = [];
        const hitProjectileIds = new Set<number>();
        let scoreIncrease = 0;

        prevBalls.forEach(ball => {
          let hit = false;
          projectiles.forEach(projectile => {
            if (checkCollision(ball.x, ball.y, ball.radius, projectile.x, projectile.y, projectile.radius)) {
              hit = true;
              hitProjectileIds.add(projectile.id);
              scoreIncrease += 10 * level;
            }
          });
          if (!hit) {
            newBalls.push(ball);
          }
        });

        if (hitProjectileIds.size > 0) {
          setProjectiles(prev => prev.filter(p => !hitProjectileIds.has(p.id)));
          if (scoreIncrease > 0) {
            setScore(prev => prev + scoreIncrease);
          }
        }

        return newBalls.length > 0 ? newBalls : prevBalls;
      });

      // Check collisions between balls
      setBalls(prevBalls => {
        const newBalls = [...prevBalls];
        const toRemove = new Set<number>();

        for (let i = 0; i < newBalls.length; i++) {
          if (toRemove.has(newBalls[i].id)) continue;
          for (let j = i + 1; j < newBalls.length; j++) {
            if (toRemove.has(newBalls[j].id)) continue;
            if (checkCollision(newBalls[i].x, newBalls[i].y, newBalls[i].radius, 
                              newBalls[j].x, newBalls[j].y, newBalls[j].radius)) {
              // Bounce
              const dx = newBalls[j].x - newBalls[i].x;
              const dy = newBalls[j].y - newBalls[i].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx);

              const speed1 = Math.sqrt(newBalls[i].vx ** 2 + newBalls[i].vy ** 2);
              const speed2 = Math.sqrt(newBalls[j].vx ** 2 + newBalls[j].vy ** 2);

              newBalls[i].vx = -Math.cos(angle) * speed2 * 0.8;
              newBalls[i].vy = -Math.sin(angle) * speed2 * 0.8;
              newBalls[j].vx = Math.cos(angle) * speed1 * 0.8;
              newBalls[j].vy = Math.sin(angle) * speed1 * 0.8;

              // Separate balls
              const overlap = newBalls[i].radius + newBalls[j].radius - distance;
              if (overlap > 0) {
                newBalls[i].x -= Math.cos(angle) * overlap / 2;
                newBalls[i].y -= Math.sin(angle) * overlap / 2;
                newBalls[j].x += Math.cos(angle) * overlap / 2;
                newBalls[j].y += Math.sin(angle) * overlap / 2;
              }
            }
          }
        }

        return newBalls;
      });

      // Level up
      if (score > 0 && score >= lastLevelUpScoreRef.current + 500) {
        setLevel(prev => prev + 1);
        lastLevelUpScoreRef.current = score;
      }

      // Draw
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      // Draw background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Draw balls
      balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = ball.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw projectiles
      projectiles.forEach(projectile => {
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#4ECDC4';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw platform
      ctx.fillStyle = '#4ECDC4';
      ctx.fillRect(platformX, GAME_HEIGHT - PLATFORM_HEIGHT - 20, PLATFORM_WIDTH, PLATFORM_HEIGHT);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(platformX, GAME_HEIGHT - PLATFORM_HEIGHT - 20, PLATFORM_WIDTH, PLATFORM_HEIGHT);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [balls, projectiles, platformX, isPaused, gameOver, level, score]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPaused || gameOver) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    setMouseX(x);
    setPlatformX(Math.max(0, Math.min(GAME_WIDTH - PLATFORM_WIDTH, x - PLATFORM_WIDTH / 2)));
  };

  const handleMouseDown = () => {
    if (isPaused || gameOver) return;
    setIsShooting(true);
    shootProjectile();
  };

  const handleMouseUp = () => {
    setIsShooting(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isPaused || gameOver) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    setMouseX(x);
    setPlatformX(Math.max(0, Math.min(GAME_WIDTH - PLATFORM_WIDTH, x - PLATFORM_WIDTH / 2)));
  };

  const handleTouchStart = () => {
    if (isPaused || gameOver) return;
    setIsShooting(true);
    shootProjectile();
  };

  const handleTouchEnd = () => {
    setIsShooting(false);
  };

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
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={initializeGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getLang() === 'en' ? 'Play Again' : getLang() === 'ru' ? 'Играть снова' : 'Qayta o\'ynash'}
            </Button>
            <Button onClick={onBack}>
              {getLang() === 'en' ? 'Back to Games' : getLang() === 'ru' ? 'К играм' : 'O\'yinlarga qaytish'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-lg bg-card border border-border">
            <span className="text-sm text-muted-foreground">
              {getLang() === 'en' ? 'Score:' : getLang() === 'ru' ? 'Счет:' : 'Hisob:'}
            </span>
            <span className="ml-2 text-lg font-bold text-primary">{score}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-card border border-border">
            <span className="text-sm text-muted-foreground">
              {getLang() === 'en' ? 'Level:' : getLang() === 'ru' ? 'Уровень:' : 'Daraja:'}
            </span>
            <span className="ml-2 text-lg font-bold">{level}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-card border border-border">
            <span className="text-sm text-muted-foreground">
              {getLang() === 'en' ? 'Lives:' : getLang() === 'ru' ? 'Жизни:' : 'Jonlar:'}
            </span>
            <span className="ml-2 text-lg font-bold text-red-500">{lives}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border p-4">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="w-full rounded-lg bg-background"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }}
        />
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        {getLang() === 'en' 
          ? 'Move mouse to control platform, click to shoot'
          : getLang() === 'ru'
          ? 'Двигайте мышью для управления платформой, кликните для выстрела'
          : 'Platformani boshqarish uchun sichqonchani harakatlantiring, otish uchun bosing'}
      </div>
    </div>
  );
};

export default Ballz;


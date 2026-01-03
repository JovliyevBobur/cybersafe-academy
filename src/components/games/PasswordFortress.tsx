import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, RotateCcw, Shield, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  onBack: () => void;
}

const PasswordFortress: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [round, setRound] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [currentStrength, setCurrentStrength] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const challenges = [
    { uz: "Eng kuchli parol yarating", en: "Create the strongest password", ru: "Создайте самый надежный пароль" },
    { uz: "Kamida 12 ta belgili parol", en: "At least 12 characters", ru: "Минимум 12 символов" },
    { uz: "Maxsus belgilar ishlating (!@#$%)", en: "Use special characters (!@#$%)", ru: "Используйте спецсимволы (!@#$%)" },
    { uz: "Raqamlar va harflar aralashmas", en: "Mix numbers and letters", ru: "Смешайте цифры и буквы" },
    { uz: "Katta va kichik harflar", en: "Upper and lowercase letters", ru: "Заглавные и строчные буквы" },
  ];

  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength += 15;
    if (pwd.length >= 12) strength += 15;
    if (pwd.length >= 16) strength += 10;
    if (/[a-z]/.test(pwd)) strength += 10;
    if (/[A-Z]/.test(pwd)) strength += 15;
    if (/[0-9]/.test(pwd)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength += 20;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setCurrentStrength(calculateStrength(value));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTotalScore(totalScore + currentStrength);
  };

  const nextRound = () => {
    if (round < 5) {
      setRound(round + 1);
      setPassword('');
      setSubmitted(false);
      setCurrentStrength(0);
    } else {
      setGameOver(true);
    }
  };

  const getStrengthLabel = () => {
    if (currentStrength < 30) return { text: getLang() === 'en' ? 'Weak' : getLang() === 'ru' ? 'Слабый' : 'Zaif', color: 'text-red-500', icon: ShieldX };
    if (currentStrength < 60) return { text: getLang() === 'en' ? 'Medium' : getLang() === 'ru' ? 'Средний' : "O'rtacha", color: 'text-yellow-500', icon: ShieldAlert };
    if (currentStrength < 80) return { text: getLang() === 'en' ? 'Strong' : getLang() === 'ru' ? 'Сильный' : 'Kuchli', color: 'text-blue-500', icon: Shield };
    return { text: getLang() === 'en' ? 'Very Strong' : getLang() === 'ru' ? 'Очень сильный' : 'Juda kuchli', color: 'text-green-500', icon: ShieldCheck };
  };

  const restartGame = () => {
    setRound(1);
    setPassword('');
    setTotalScore(0);
    setSubmitted(false);
    setCurrentStrength(0);
    setGameOver(false);
  };

  if (gameOver) {
    const avgScore = Math.round(totalScore / 5);
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">
            {getLang() === 'en' ? 'Game Over!' : getLang() === 'ru' ? 'Игра окончена!' : "O'yin tugadi!"}
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">{totalScore} XP</p>
          <p className="text-muted-foreground mb-6">
            {getLang() === 'en' ? `Average strength: ${avgScore}%` : getLang() === 'ru' ? `Средняя сила: ${avgScore}%` : `O'rtacha kuch: ${avgScore}%`}
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

  const strengthInfo = getStrengthLabel();
  const StrengthIcon = strengthInfo.icon;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          {getLang() === 'en' ? 'Round' : getLang() === 'ru' ? 'Раунд' : 'Raund'} {round} / 5
        </div>
        <div className="text-lg font-bold text-primary">{totalScore} XP</div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border mb-6">
        <h3 className="text-lg font-semibold mb-4">{challenges[round - 1][getLang()]}</h3>
        
        <Input
          type="text"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder={getLang() === 'en' ? 'Enter password...' : getLang() === 'ru' ? 'Введите пароль...' : 'Parol kiriting...'}
          className="mb-4 font-mono"
          disabled={submitted}
        />

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <StrengthIcon className={`w-5 h-5 ${strengthInfo.color}`} />
              <span className={strengthInfo.color}>{strengthInfo.text}</span>
            </div>
            <span className="font-bold">{currentStrength}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                currentStrength < 30 ? 'bg-red-500' :
                currentStrength < 60 ? 'bg-yellow-500' :
                currentStrength < 80 ? 'bg-blue-500' : 'bg-green-500'
              }`}
              style={{ width: `${currentStrength}%` }}
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1 mb-4">
          <p className={password.length >= 8 ? 'text-green-500' : ''}>✓ {getLang() === 'en' ? '8+ characters' : getLang() === 'ru' ? '8+ символов' : '8+ belgi'}</p>
          <p className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>✓ {getLang() === 'en' ? 'Uppercase letter' : getLang() === 'ru' ? 'Заглавная буква' : 'Katta harf'}</p>
          <p className={/[a-z]/.test(password) ? 'text-green-500' : ''}>✓ {getLang() === 'en' ? 'Lowercase letter' : getLang() === 'ru' ? 'Строчная буква' : 'Kichik harf'}</p>
          <p className={/[0-9]/.test(password) ? 'text-green-500' : ''}>✓ {getLang() === 'en' ? 'Number' : getLang() === 'ru' ? 'Цифра' : 'Raqam'}</p>
          <p className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : ''}>✓ {getLang() === 'en' ? 'Special character' : getLang() === 'ru' ? 'Спецсимвол' : 'Maxsus belgi'}</p>
        </div>

        {!submitted ? (
          <Button onClick={handleSubmit} disabled={password.length === 0} className="w-full">
            {getLang() === 'en' ? 'Submit Password' : getLang() === 'ru' ? 'Отправить' : 'Yuborish'}
          </Button>
        ) : (
          <Button onClick={nextRound} className="w-full">
            {round < 5 
              ? (getLang() === 'en' ? 'Next Round' : getLang() === 'ru' ? 'Следующий раунд' : 'Keyingi raund')
              : (getLang() === 'en' ? 'See Results' : getLang() === 'ru' ? 'Результаты' : 'Natijalar')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PasswordFortress;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, Link2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LinkQuestion {
  url: string;
  isSafe: boolean;
  explanation: { uz: string; en: string; ru: string };
}

const links: LinkQuestion[] = [
  {
    url: "https://www.google.com/search?q=cybersecurity",
    isSafe: true,
    explanation: { uz: "Rasmiy Google domeni va HTTPS", en: "Official Google domain with HTTPS", ru: "Официальный домен Google с HTTPS" }
  },
  {
    url: "http://amazon-deals.xyz/free-gift",
    isSafe: false,
    explanation: { uz: "Soxta domen (.xyz) va HTTP (xavfsiz emas)", en: "Fake domain (.xyz) and HTTP (not secure)", ru: "Поддельный домен (.xyz) и HTTP (небезопасно)" }
  },
  {
    url: "https://github.com/microsoft/vscode",
    isSafe: true,
    explanation: { uz: "Rasmiy GitHub va Microsoft repozitoriyasi", en: "Official GitHub and Microsoft repository", ru: "Официальный GitHub и репозиторий Microsoft" }
  },
  {
    url: "https://paypal.com.verify-account.ru/login",
    isSafe: false,
    explanation: { uz: "Subdomen orqali aldash - haqiqiy domen .ru", en: "Subdomain trick - real domain is .ru", ru: "Обман субдоменом - настоящий домен .ru" }
  },
  {
    url: "https://docs.microsoft.com/en-us/windows",
    isSafe: true,
    explanation: { uz: "Rasmiy Microsoft hujjatlar sahifasi", en: "Official Microsoft documentation site", ru: "Официальный сайт документации Microsoft" }
  },
  {
    url: "https://bit.ly/3xK9mN2",
    isSafe: false,
    explanation: { uz: "Qisqartirilgan link - manzil noma'lum", en: "Shortened link - destination unknown", ru: "Сокращенная ссылка - назначение неизвестно" }
  },
  {
    url: "https://www.linkedin.com/in/username",
    isSafe: true,
    explanation: { uz: "Rasmiy LinkedIn profil sahifasi", en: "Official LinkedIn profile page", ru: "Официальная страница профиля LinkedIn" }
  },
  {
    url: "https://secure-banking-login.com/mybank",
    isSafe: false,
    explanation: { uz: "Noma'lum domen - bank rasmiy sahifasi emas", en: "Unknown domain - not official bank site", ru: "Неизвестный домен - не официальный сайт банка" }
  },
];

interface Props {
  onBack: () => void;
}

const SafeLink: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const currentLink = links[currentIndex];

  const handleAnswer = (isSafe: boolean) => {
    const correct = isSafe === currentLink.isSafe;
    setIsCorrect(correct);
    if (correct) setScore(score + 12);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex < links.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setIsCorrect(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card border border-border max-w-md">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">
            {getLang() === 'en' ? 'Game Over!' : getLang() === 'ru' ? 'Игра окончена!' : "O'yin tugadi!"}
          </h2>
          <p className="text-4xl font-bold text-primary mb-4">{score} / 96 XP</p>
          <p className="text-muted-foreground mb-6">
            {score >= 80 
              ? (getLang() === 'en' ? 'Excellent! You can spot dangerous links!' : getLang() === 'ru' ? 'Отлично! Вы можете распознать опасные ссылки!' : "Ajoyib! Siz xavfli linklarni aniqlay olasiz!")
              : score >= 50
              ? (getLang() === 'en' ? 'Good job! Keep learning!' : getLang() === 'ru' ? 'Хорошая работа! Продолжайте учиться!' : "Yaxshi! O'rganishni davom eting!")
              : (getLang() === 'en' ? 'Keep practicing!' : getLang() === 'ru' ? 'Практикуйтесь больше!' : "Ko'proq mashq qiling!")}
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
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} / {links.length}
        </div>
        <div className="text-lg font-bold text-primary">{score} XP</div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link2 className="w-6 h-6 text-primary" />
          <span className="text-sm text-muted-foreground">
            {getLang() === 'en' ? 'Is this link safe?' : getLang() === 'ru' ? 'Эта ссылка безопасна?' : 'Bu link xavfsizmi?'}
          </span>
        </div>
        <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
          {currentLink.url}
        </div>
      </div>

      {!answered ? (
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => handleAnswer(false)} 
            variant="destructive" 
            size="lg"
            className="flex-1 max-w-[200px]"
          >
            <XCircle className="w-5 h-5 mr-2" />
            {getLang() === 'en' ? 'Dangerous' : getLang() === 'ru' ? 'Опасно' : 'Xavfli'}
          </Button>
          <Button 
            onClick={() => handleAnswer(true)} 
            className="flex-1 max-w-[200px] bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {getLang() === 'en' ? 'Safe' : getLang() === 'ru' ? 'Безопасно' : 'Xavfsiz'}
          </Button>
        </div>
      ) : (
        <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-semibold">
              {isCorrect 
                ? (getLang() === 'en' ? 'Correct!' : getLang() === 'ru' ? 'Правильно!' : "To'g'ri!")
                : (getLang() === 'en' ? 'Wrong!' : getLang() === 'ru' ? 'Неправильно!' : "Noto'g'ri!")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{currentLink.explanation[getLang()]}</p>
          <Button onClick={nextQuestion} className="mt-4">
            {currentIndex < links.length - 1 
              ? (getLang() === 'en' ? 'Next' : getLang() === 'ru' ? 'Далее' : 'Keyingisi')
              : (getLang() === 'en' ? 'See Results' : getLang() === 'ru' ? 'Результаты' : 'Natijalar')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SafeLink;

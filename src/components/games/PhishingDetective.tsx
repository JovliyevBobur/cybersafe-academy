import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  isPhishing: boolean;
  hints: { uz: string; en: string; ru: string };
}

const messages: Message[] = [
  {
    id: 1,
    sender: "support@bankofuzbekistan.com",
    subject: "Shoshilinch: Hisobingizni tasdiqlang",
    content: "Hurmatli mijoz, hisobingiz bloklandi. Qayta faollashtirish uchun quyidagi linkni bosing: bit.ly/bank-verify",
    isPhishing: true,
    hints: { uz: "Shubhali link va shoshilinch so'rov", en: "Suspicious link and urgent request", ru: "Подозрительная ссылка и срочный запрос" }
  },
  {
    id: 2,
    sender: "noreply@google.com",
    subject: "Yangi qurilmadan kirish aniqlandi",
    content: "Sizning Google hisobingizga yangi qurilmadan kirildi. Agar bu siz bo'lmasangiz, accounts.google.com saytiga o'ting.",
    isPhishing: false,
    hints: { uz: "Rasmiy Google domeni va to'g'ri URL", en: "Official Google domain and correct URL", ru: "Официальный домен Google и правильный URL" }
  },
  {
    id: 3,
    sender: "lottery-winner@gmail.com",
    subject: "Siz 1,000,000 dollar yutdingiz!",
    content: "Tabriklaymiz! Siz lotereyada yutdingiz. Mukofotni olish uchun bank ma'lumotlaringizni yuboring.",
    isPhishing: true,
    hints: { uz: "Ishonarsiz va'da, bank ma'lumotlari so'rovi", en: "Unrealistic promise, bank details request", ru: "Нереальное обещание, запрос банковских данных" }
  },
  {
    id: 4,
    sender: "hr@microsoft.com",
    subject: "Ish taklifi - Microsoft",
    content: "Sizning CV'ingiz ko'rib chiqildi. Suhbat uchun careers.microsoft.com orqali bog'laning.",
    isPhishing: false,
    hints: { uz: "Rasmiy domen va xavfsiz URL", en: "Official domain and safe URL", ru: "Официальный домен и безопасный URL" }
  },
  {
    id: 5,
    sender: "security@paypa1.com",
    subject: "Hisobingiz to'xtatildi",
    content: "PayPal hisobingiz shubhali faoliyat tufayli to'xtatildi. Hoziroq paypal-secure-verify.com orqali tasdiqlang.",
    isPhishing: true,
    hints: { uz: "Noto'g'ri domen (paypa1 vs paypal) va soxta URL", en: "Wrong domain (paypa1 vs paypal) and fake URL", ru: "Неправильный домен (paypa1 vs paypal) и поддельный URL" }
  },
];

interface Props {
  onBack: () => void;
}

const PhishingDetective: React.FC<Props> = ({ onBack }) => {
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

  const currentMessage = messages[currentIndex];

  const handleAnswer = (isPhishing: boolean) => {
    const correct = isPhishing === currentMessage.isPhishing;
    setIsCorrect(correct);
    if (correct) setScore(score + 20);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex < messages.length - 1) {
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
          <p className="text-4xl font-bold text-primary mb-4">{score} / 100 XP</p>
          <p className="text-muted-foreground mb-6">
            {score >= 80 
              ? (getLang() === 'en' ? 'Excellent! You are a phishing expert!' : getLang() === 'ru' ? 'Отлично! Вы эксперт по фишингу!' : "Ajoyib! Siz phishing ekspertisiz!")
              : score >= 50
              ? (getLang() === 'en' ? 'Good job! Keep learning!' : getLang() === 'ru' ? 'Хорошая работа! Продолжайте учиться!' : "Yaxshi! O'rganishni davom eting!")
              : (getLang() === 'en' ? 'Keep practicing to improve!' : getLang() === 'ru' ? 'Практикуйтесь больше!' : "Ko'proq mashq qiling!")}
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
          {currentIndex + 1} / {messages.length}
        </div>
        <div className="text-lg font-bold text-primary">{score} XP</div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border mb-6">
        <div className="mb-4 pb-4 border-b border-border">
          <div className="text-sm text-muted-foreground mb-1">
            {getLang() === 'en' ? 'From:' : getLang() === 'ru' ? 'От:' : 'Kimdan:'} 
            <span className="text-foreground ml-2 font-mono">{currentMessage.sender}</span>
          </div>
          <div className="font-semibold">{currentMessage.subject}</div>
        </div>
        <p className="text-muted-foreground">{currentMessage.content}</p>
      </div>

      {!answered ? (
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => handleAnswer(true)} 
            variant="destructive" 
            size="lg"
            className="flex-1 max-w-[200px]"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Phishing
          </Button>
          <Button 
            onClick={() => handleAnswer(false)} 
            className="flex-1 max-w-[200px] bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {getLang() === 'en' ? 'Legitimate' : getLang() === 'ru' ? 'Легитимный' : 'Haqiqiy'}
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
          <p className="text-sm text-muted-foreground">{currentMessage.hints[getLang()]}</p>
          <Button onClick={nextQuestion} className="mt-4">
            {currentIndex < messages.length - 1 
              ? (getLang() === 'en' ? 'Next' : getLang() === 'ru' ? 'Далее' : 'Keyingisi')
              : (getLang() === 'en' ? 'See Results' : getLang() === 'ru' ? 'Результаты' : 'Natijalar')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhishingDetective;

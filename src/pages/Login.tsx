import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract name from email for demo (in real app, this would come from backend)
    const userName = formData.email.split('@')[0];
    login(userName, formData.email);
    
    toast({
      title: getLang() === 'en' ? 'Login Successful!' : getLang() === 'ru' ? 'Вход выполнен!' : 'Muvaffaqiyatli kirildi!',
      description: getLang() === 'en' ? 'Welcome back!' : getLang() === 'ru' ? 'Добро пожаловать!' : 'Xush kelibsiz!',
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden px-4">
      <div className="absolute inset-0 cyber-grid" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <img 
              src="/favicon.ico" 
              alt="CyberSafe Edu" 
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-bold text-2xl">
              <span className="text-gradient">CyberSafe</span>
              <span className="text-foreground"> Edu</span>
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
          <h1 className="text-2xl font-bold text-center mb-2">{t('login')}</h1>
          <p className="text-muted-foreground text-center mb-6">
            {getLang() === 'en' ? 'Welcome back! Please login to continue.' : getLang() === 'ru' ? 'С возвращением! Войдите, чтобы продолжить.' : 'Xush kelibsiz! Davom etish uchun kiring.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {getLang() === 'en' ? 'Password' : getLang() === 'ru' ? 'Пароль' : 'Parol'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">
                  {getLang() === 'en' ? 'Remember me' : getLang() === 'ru' ? 'Запомнить меня' : 'Meni eslab qol'}
                </span>
              </label>
              <a href="#" className="text-primary hover:underline">
                {getLang() === 'en' ? 'Forgot password?' : getLang() === 'ru' ? 'Забыли пароль?' : 'Parolni unutdingizmi?'}
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                t('login')
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            {getLang() === 'en' ? "Don't have an account?" : getLang() === 'ru' ? 'Нет аккаунта?' : "Hisobingiz yo'qmi?"}{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              {t('register')}
            </Link>
          </p>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          <Link to="/" className="hover:text-primary transition-colors">
            ← {getLang() === 'en' ? 'Back to home' : getLang() === 'ru' ? 'Вернуться на главную' : 'Bosh sahifaga qaytish'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

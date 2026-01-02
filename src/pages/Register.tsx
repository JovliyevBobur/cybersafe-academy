import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: getLang() === 'en' ? 'Error' : getLang() === 'ru' ? 'Ошибка' : 'Xato',
        description: getLang() === 'en' ? 'Passwords do not match' : getLang() === 'ru' ? 'Пароли не совпадают' : 'Parollar mos kelmaydi',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login(formData.name, formData.email);
    
    toast({
      title: getLang() === 'en' ? 'Registration Successful!' : getLang() === 'ru' ? 'Регистрация успешна!' : "Ro'yxatdan o'tildi!",
      description: getLang() === 'en' ? 'Welcome to CyberGuard!' : getLang() === 'ru' ? 'Добро пожаловать в CyberGuard!' : 'CyberGuard ga xush kelibsiz!',
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 cyber-grid" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Shield className="h-10 w-10 text-primary" />
            <span className="font-bold text-2xl">
              <span className="text-gradient">Cyber</span>
              <span className="text-foreground">Guard</span>
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
          <h1 className="text-2xl font-bold text-center mb-2">{t('register')}</h1>
          <p className="text-muted-foreground text-center mb-6">
            {getLang() === 'en' ? 'Create an account to get started.' : getLang() === 'ru' ? 'Создайте аккаунт, чтобы начать.' : "Boshlash uchun hisob yarating."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {getLang() === 'en' ? 'Full Name' : getLang() === 'ru' ? 'Полное имя' : "To'liq ism"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={getLang() === 'en' ? 'John Doe' : getLang() === 'ru' ? 'Иван Иванов' : 'Ism Familiya'}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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
                  minLength={8}
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

            <div>
              <label className="block text-sm font-medium mb-2">
                {getLang() === 'en' ? 'Confirm Password' : getLang() === 'ru' ? 'Подтвердите пароль' : 'Parolni tasdiqlang'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="rounded border-border mt-1" required />
              <span className="text-sm text-muted-foreground">
                {getLang() === 'en' 
                  ? 'I agree to the Terms of Service and Privacy Policy' 
                  : getLang() === 'ru' 
                  ? 'Я согласен с Условиями использования и Политикой конфиденциальности' 
                  : "Foydalanish shartlari va Maxfiylik siyosatiga roziman"}
              </span>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                t('register')
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            {getLang() === 'en' ? 'Already have an account?' : getLang() === 'ru' ? 'Уже есть аккаунт?' : 'Hisobingiz bormi?'}{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              {t('login')}
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

export default Register;

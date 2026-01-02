import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Eye, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '50+', label: t('lessons') },
    { value: '1000+', label: t('students') },
    { value: '100+', label: t('tests') },
    { value: '25+', label: t('certificates') },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 cyber-grid" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 right-1/4 animate-float opacity-20">
        <Shield className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-1/3 right-1/3 animate-float" style={{ animationDelay: '2s' }}>
        <Lock className="w-12 h-12 text-accent opacity-20" />
      </div>
      <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
        <Eye className="w-10 h-10 text-primary opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">CyberSafe Edu Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient-cyber">{t('heroTitle1')}</span>
              <br />
              <span className="text-foreground">{t('heroTitle2')}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/education">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity group">
                  {t('startLearning')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <div className="w-full aspect-square max-w-lg mx-auto relative">
                {/* Central shield */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-3xl bg-gradient-primary shadow-glow flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Shield className="w-32 h-32 text-white" />
                  </div>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-card shadow-card flex items-center justify-center animate-float">
                    <Lock className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 translate-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-card shadow-card flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                    <Eye className="w-8 h-8 text-accent" />
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 right-0 translate-x-4">
                  <div className="w-18 h-18 rounded-2xl bg-card shadow-card flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                    <Fingerprint className="w-9 h-9 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

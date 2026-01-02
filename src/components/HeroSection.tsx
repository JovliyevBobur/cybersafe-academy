import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Eye, Fingerprint, KeyRound, ShieldCheck, ShieldAlert, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

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

          {/* Illustration - Enhanced Cyber Style */}
          <div className="relative hidden lg:block">
            {/* Grid background effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(0, 255, 195, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 195, 0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            <div className="relative z-10">
              <div className="w-full aspect-square max-w-lg mx-auto relative">
                {/* Glow effect behind central element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full bg-accent/25 blur-3xl animate-pulse-glow" />
                </div>
                
                {/* Central Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-60 h-60 rounded-full bg-gradient-to-br from-primary via-accent to-accent shadow-glow flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <img 
                      src={logo} 
                      alt="CyberSafe Edu" 
                      className="w-52 h-52 rounded-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating Lock icon - top */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-md shadow-lg border border-border/50 flex items-center justify-center animate-float">
                    <Lock className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Floating Shield outline - top left */}
                <div className="absolute top-12 -left-8">
                  <div className="w-12 h-12 flex items-center justify-center animate-float opacity-40" style={{ animationDelay: '0.5s' }}>
                    <Shield className="w-10 h-10 text-primary/50" strokeWidth={1} />
                  </div>
                </div>
                
                {/* Floating smaller shield - top right area */}
                <div className="absolute top-8 right-8">
                  <div className="w-10 h-10 flex items-center justify-center animate-float opacity-30" style={{ animationDelay: '2.5s' }}>
                    <ShieldCheck className="w-8 h-8 text-accent/60" strokeWidth={1} />
                  </div>
                </div>
                
                {/* Floating Eye icon - bottom left */}
                <div className="absolute bottom-8 left-4">
                  <div className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-md shadow-lg border border-accent/30 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                    <Eye className="w-7 h-7 text-accent" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Floating Fingerprint icon - right */}
                <div className="absolute bottom-1/3 -right-4">
                  <div className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-md shadow-lg border border-primary/30 flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                    <Fingerprint className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Floating Key icon - middle left */}
                <div className="absolute top-1/3 -left-6">
                  <div className="w-12 h-12 rounded-lg bg-card/60 backdrop-blur-md shadow-md border border-border/40 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                    <KeyRound className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Floating Lock icon - bottom right */}
                <div className="absolute bottom-16 right-12">
                  <div className="w-10 h-10 flex items-center justify-center animate-float opacity-50" style={{ animationDelay: '3s' }}>
                    <Lock className="w-6 h-6 text-primary/40" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Floating Wifi icon - top area */}
                <div className="absolute top-20 left-1/4">
                  <div className="w-8 h-8 flex items-center justify-center animate-float opacity-35" style={{ animationDelay: '1.8s' }}>
                    <Wifi className="w-5 h-5 text-accent/50" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Floating Shield Alert - bottom area */}
                <div className="absolute bottom-4 left-1/3">
                  <div className="w-8 h-8 flex items-center justify-center animate-float opacity-30" style={{ animationDelay: '2.2s' }}>
                    <ShieldAlert className="w-6 h-6 text-primary/40" strokeWidth={1} />
                  </div>
                </div>
                
                {/* Corner accent squares */}
                <div className="absolute bottom-20 left-20 w-8 h-8 border border-primary/30 rounded-lg transform rotate-12 opacity-50" />
                <div className="absolute top-28 right-16 w-6 h-6 border border-accent/30 rounded-md transform -rotate-12 opacity-50" />
                <div className="absolute bottom-32 right-4 w-5 h-5 border border-primary/20 rounded transform rotate-45 opacity-40" />
                <div className="absolute top-40 left-8 w-4 h-4 border border-accent/25 rounded-sm transform -rotate-6 opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Github, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  const {
    t
  } = useLanguage();
  const socialLinks = [{
    icon: Send,
    href: 'https://t.me/ShirinErkinbayeva',
    label: 'Telegram'
  }, {
    icon: Github,
    href: 'https://github.com/JBoburHacker005',
    label: 'GitHub'
  }, {
    icon: Mail,
    href: 'mailto:jbobur2o1o@gmail.com',
    label: 'Email'
  }, {
    icon: Phone,
    href: 'tel:+998930054287',
    label: 'Phone'
  }];
  const quickLinks = [{
    path: '/',
    label: t('home')
  }, {
    path: '/about',
    label: t('about')
  }, {
    path: '/education',
    label: t('education')
  }, {
    path: '/games',
    label: t('games')
  }, {
    path: '/contact',
    label: t('contact')
  }];
  return <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="CyberSafe Edu" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-bold text-xl">
                <span className="text-gradient">CyberSafe</span>
                <span className="text-foreground"> Edu</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footerDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-semibold mb-4">{t('education')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/education/articles" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('articles')}
                </Link>
              </li>
              <li>
                <Link to="/education/videos" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('videoLessons')}
                </Link>
              </li>
              <li>
                <Link to="/education/tests" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('tests')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>)}
            </div>
            <div className="space-y-3 text-lg" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold" style={{ fontSize: '1.1rem' }}>Muallif:</span>
                  <span className="text-foreground font-medium">Shirin Erkinbayeva</span>
                </div>
                <img 
                  src="/shirin.jpg" 
                  alt="Shirin Erkinbayeva" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/50 shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold" style={{ fontSize: '1.1rem' }}>Yaratuvchi:</span>
                  <span className="text-foreground font-medium">Bobur Jovliyev</span>
                </div>
                <img 
                  src="/bobur.jpg" 
                  alt="Bobur Jovliyev" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent/50 shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} CyberSafe Edu. {t('rights')}.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              
              
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
import React from 'react';
import { BookOpen, PlayCircle, Gamepad2, Award, Headphones, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: Brain,
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: Gamepad2,
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
    {
      icon: PlayCircle,
      title: t('feature4Title'),
      description: t('feature4Desc'),
    },
    {
      icon: Award,
      title: t('feature5Title'),
      description: t('feature5Desc'),
    },
    {
      icon: Headphones,
      title: t('feature6Title'),
      description: t('feature6Desc'),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('whyChooseUs')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('featuresSubtitle')}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

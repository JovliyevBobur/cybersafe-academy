import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { apiService, ContactInfo, SocialLink } from '@/services/api';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contact, social] = await Promise.all([
          apiService.getContactInfo(),
          apiService.getSocialLinks(),
        ]);
        setContactInfo(contact);
        setSocialLinks(social);
      } catch (error) {
        console.error('Failed to fetch contact data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: getLang() === 'en' ? 'Message Sent!' : getLang() === 'ru' ? 'Сообщение отправлено!' : 'Xabar yuborildi!',
      description: getLang() === 'en' 
        ? 'We will get back to you soon.' 
        : getLang() === 'ru' 
        ? 'Мы свяжемся с вами в ближайшее время.' 
        : 'Tez orada siz bilan bog\'lanamiz.',
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const getContactInfoList = () => {
    if (!contactInfo) return [];
    const lang = getLang();
    return [
      {
        icon: Mail,
        title: 'Email',
        value: contactInfo.email,
      },
      {
        icon: Phone,
        title: lang === 'en' ? 'Phone' : lang === 'ru' ? 'Телефон' : 'Telefon',
        value: contactInfo.phone,
      },
      {
        icon: MapPin,
        title: lang === 'en' ? 'Address' : lang === 'ru' ? 'Адрес' : 'Manzil',
        value: lang === 'en' ? contactInfo.address_en : lang === 'ru' ? contactInfo.address_ru : contactInfo.address_uz,
      },
    ];
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('contactTitle')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Have questions? We\'d love to hear from you.'
              : getLang() === 'ru'
              ? 'Есть вопросы? Мы будем рады услышать вас.'
              : "Savollaringiz bormi? Biz bilan bog'laning."
            }
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold mb-6">
                {getLang() === 'en' ? 'Send us a message' : getLang() === 'ru' ? 'Отправьте нам сообщение' : 'Bizga xabar yuboring'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contactName')}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={getLang() === 'en' ? 'John Doe' : getLang() === 'ru' ? 'Иван Иванов' : 'Ism Familiya'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contactEmail')}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contactMessage')}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={getLang() === 'en' ? 'Your message...' : getLang() === 'ru' ? 'Ваше сообщение...' : 'Xabaringiz...'}
                    rows={5}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {getLang() === 'en' ? 'Sending...' : getLang() === 'ru' ? 'Отправка...' : 'Yuborilmoqda...'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('contactSend')}
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {getLang() === 'en' ? 'Contact Information' : getLang() === 'ru' ? 'Контактная информация' : 'Aloqa ma\'lumotlari'}
                </h2>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-muted-foreground">Yuklanmoqda...</div>
                  ) : getContactInfoList().length > 0 ? (
                    getContactInfoList().map((info, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{info.title}</div>
                          <div className="font-medium">{info.value}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground">Ma'lumotlar mavjud emas</div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">{t('followUs')}</h3>
                <div className="flex gap-3 flex-wrap">
                  {loading ? (
                    <div className="text-muted-foreground">Yuklanmoqda...</div>
                  ) : socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ))
                  ) : (
                    <div className="text-muted-foreground">Havolalar mavjud emas</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

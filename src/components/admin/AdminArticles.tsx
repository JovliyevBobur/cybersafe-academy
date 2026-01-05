import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface Article {
  id: number;
  title: { uz: string; en: string; ru: string };
  excerpt: { uz: string; en: string; ru: string };
  content: { uz: string; en: string; ru: string };
  author: string;
  date: string;
  readTime: string;
  level: { uz: string; en: string; ru: string };
}

const defaultArticles: Article[] = [
  {
    id: 1,
    title: { uz: "Phishing hujumlaridan himoyalanish", en: "Protection from Phishing Attacks", ru: "Защита от фишинговых атак" },
    excerpt: { uz: "Phishing nima va undan qanday himoyalanish mumkin...", en: "What is phishing and how to protect yourself...", ru: "Что такое фишинг и как защитить себя..." },
    content: { uz: "Phishing hujumlaridan himoyalanish uchun...", en: "To protect from phishing attacks...", ru: "Для защиты от фишинга..." },
    author: "Shirin Erkinbayeva",
    date: "2024-01-15",
    readTime: "8 min",
    level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" }
  },
  {
    id: 2,
    title: { uz: "Kuchli parol yaratish sirlari", en: "Secrets of Creating Strong Passwords", ru: "Секреты создания надежных паролей" },
    excerpt: { uz: "Xavfsiz va eslab qolish oson parol yaratish...", en: "Creating secure and memorable passwords...", ru: "Создание безопасных и запоминающихся паролей..." },
    content: { uz: "Kuchli parol yaratish uchun...", en: "To create a strong password...", ru: "Для создания надежного пароля..." },
    author: "Bobur Jovliyev",
    date: "2024-01-10",
    readTime: "10 min",
    level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" }
  },
  {
    id: 3,
    title: { uz: "Ijtimoiy tarmoqlarda xavfsizlik", en: "Social Media Security", ru: "Безопасность в социальных сетях" },
    excerpt: { uz: "Ijtimoiy tarmoqlarda shaxsiy ma'lumotlaringizni himoya qiling...", en: "Protect your personal data on social media...", ru: "Защитите свои личные данные в социальных сетях..." },
    content: { uz: "Ijtimoiy tarmoqlarda xavfsizlik...", en: "Social media security...", ru: "Безопасность в социальных сетях..." },
    author: "Shirin Erkinbayeva",
    date: "2024-01-08",
    readTime: "12 min",
    level: { uz: "O'rta", en: "Intermediate", ru: "Средний" }
  }
];

const AdminArticles: React.FC = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({});

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin_articles');
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      setArticles(defaultArticles);
      localStorage.setItem('admin_articles', JSON.stringify(defaultArticles));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('admin_articles', JSON.stringify(newArticles));
  };

  const handleRefresh = () => {
    saveArticles(defaultArticles);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    setFormData({
      id: Date.now(),
      title: { uz: '', en: '', ru: '' },
      excerpt: { uz: '', en: '', ru: '' },
      content: { uz: '', en: '', ru: '' },
      author: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      level: { uz: 'Boshlang\'ich', en: 'Beginner', ru: 'Начальный' }
    });
    setShowForm(true);
    setEditingId(null);
  };

  const handleEdit = (article: Article) => {
    setFormData(article);
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title?.uz || !formData.author) return;
    
    if (editingId) {
      const updated = articles.map(a => a.id === editingId ? { ...formData } as Article : a);
      saveArticles(updated);
    } else {
      saveArticles([...articles, formData as Article]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    saveArticles(articles.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {getLang() === 'en' ? 'Articles Management' : getLang() === 'ru' ? 'Управление статьями' : 'Maqolalar boshqaruvi'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Refresh' : getLang() === 'ru' ? 'Обновить' : 'Yangilash'}
          </Button>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Add Article' : getLang() === 'ru' ? 'Добавить статью' : 'Maqola qo\'shish'}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-muted rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Title (UZ)"
              value={formData.title?.uz || ''}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, uz: e.target.value } })}
            />
            <Input
              placeholder="Title (EN)"
              value={formData.title?.en || ''}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, en: e.target.value } })}
            />
            <Input
              placeholder="Title (RU)"
              value={formData.title?.ru || ''}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, ru: e.target.value } })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Author"
              value={formData.author || ''}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <Input
              placeholder="Read Time (e.g., 5 min)"
              value={formData.readTime || ''}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            />
          </div>
          <Textarea
            placeholder="Content (UZ)"
            value={formData.content?.uz || ''}
            onChange={(e) => setFormData({ ...formData, content: { ...formData.content!, uz: e.target.value } })}
            rows={4}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              {getLang() === 'en' ? 'Save' : getLang() === 'ru' ? 'Сохранить' : 'Saqlash'}
            </Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>
              <X className="w-4 h-4 mr-2" />
              {getLang() === 'en' ? 'Cancel' : getLang() === 'ru' ? 'Отмена' : 'Bekor qilish'}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-medium">{article.title[getLang()]}</h3>
              <p className="text-sm text-muted-foreground">{article.author} • {article.date}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(article)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(article.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticles;

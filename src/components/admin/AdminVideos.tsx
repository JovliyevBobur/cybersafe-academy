import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface Video {
  id: number;
  title: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  duration: string;
  views: string;
  level: { uz: string; en: string; ru: string };
  thumbnail: string;
  youtubeId: string;
}

const defaultVideos: Video[] = [
  {
    id: 1,
    title: { uz: "Kiber xavfsizlikka kirish", en: "Introduction to Cybersecurity", ru: "Введение в кибербезопасность" },
    description: { uz: "Bu video darsda kiber xavfsizlik asoslari...", en: "In this video lesson...", ru: "В этом видеоуроке..." },
    duration: "12:34",
    views: "15.2K",
    level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop",
    youtubeId: "inWWhr5tnEA"
  },
  {
    id: 2,
    title: { uz: "Parol xavfsizligi asoslari", en: "Password Security Basics", ru: "Основы безопасности паролей" },
    description: { uz: "Kuchli parol yaratish haqida...", en: "About creating strong passwords...", ru: "О создании надежных паролей..." },
    duration: "15:45",
    views: "12.8K",
    level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop",
    youtubeId: "3NjQ9b3pgIg"
  },
  {
    id: 3,
    title: { uz: "Phishing hujumlarini aniqlash", en: "Detecting Phishing Attacks", ru: "Обнаружение фишинговых атак" },
    description: { uz: "Phishing nima va qanday aniqlash...", en: "What is phishing and how to detect...", ru: "Что такое фишинг и как обнаружить..." },
    duration: "18:20",
    views: "18.5K",
    level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop",
    youtubeId: "XBkzBrXlle0"
  }
];

const AdminVideos: React.FC = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Video>>({});

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin_videos');
    if (saved) {
      setVideos(JSON.parse(saved));
    } else {
      setVideos(defaultVideos);
      localStorage.setItem('admin_videos', JSON.stringify(defaultVideos));
    }
  }, []);

  const saveVideos = (newVideos: Video[]) => {
    setVideos(newVideos);
    localStorage.setItem('admin_videos', JSON.stringify(newVideos));
  };

  const handleRefresh = () => {
    saveVideos(defaultVideos);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    setFormData({
      id: Date.now(),
      title: { uz: '', en: '', ru: '' },
      description: { uz: '', en: '', ru: '' },
      duration: '',
      views: '0',
      level: { uz: 'Boshlang\'ich', en: 'Beginner', ru: 'Начальный' },
      thumbnail: '',
      youtubeId: ''
    });
    setShowForm(true);
    setEditingId(null);
  };

  const handleEdit = (video: Video) => {
    setFormData(video);
    setEditingId(video.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title?.uz || !formData.youtubeId) return;
    
    if (editingId) {
      const updated = videos.map(v => v.id === editingId ? { ...formData } as Video : v);
      saveVideos(updated);
    } else {
      saveVideos([...videos, formData as Video]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    saveVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className="p-6 bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {getLang() === 'en' ? 'Videos Management' : getLang() === 'ru' ? 'Управление видео' : 'Videolar boshqaruvi'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Refresh' : getLang() === 'ru' ? 'Обновить' : 'Yangilash'}
          </Button>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Add Video' : getLang() === 'ru' ? 'Добавить видео' : 'Video qo\'shish'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="YouTube ID"
              value={formData.youtubeId || ''}
              onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
            />
            <Input
              placeholder="Duration (e.g., 12:34)"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Input
              placeholder="Thumbnail URL"
              value={formData.thumbnail || ''}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />
          </div>
          <Textarea
            placeholder="Description (UZ)"
            value={formData.description?.uz || ''}
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description!, uz: e.target.value } })}
            rows={3}
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
        {videos.map((video) => (
          <div key={video.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <img src={video.thumbnail} alt="" className="w-20 h-12 object-cover rounded" />
              <div>
                <h3 className="font-medium">{video.title[getLang()]}</h3>
                <p className="text-sm text-muted-foreground">{video.duration} • {video.views}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(video)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(video.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVideos;

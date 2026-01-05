import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Question {
  question: { uz: string; en: string; ru: string };
  options: { uz: string; en: string; ru: string }[];
  correctAnswer: number;
}

interface Test {
  id: number;
  title: { uz: string; en: string; ru: string };
  questions: Question[];
  duration: string;
  difficulty: { uz: string; en: string; ru: string };
  stars: number;
}

const defaultTests: Test[] = [
  {
    id: 1,
    title: { uz: "Kiber xavfsizlik asoslari", en: "Cybersecurity Basics", ru: "Основы кибербезопасности" },
    duration: "15",
    difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
    stars: 1,
    questions: [
      {
        question: { uz: "Kiber xavfsizlik nima?", en: "What is cybersecurity?", ru: "Что такое кибербезопасность?" },
        options: [
          { uz: "Kompyuterlarni tuzatish", en: "Fixing computers", ru: "Ремонт компьютеров" },
          { uz: "Raqamli tizimlarni xavflardan himoya qilish", en: "Protecting digital systems from threats", ru: "Защита цифровых систем от угроз" },
          { uz: "Yangi dasturlar yaratish", en: "Creating new software", ru: "Создание нового ПО" },
          { uz: "Internet tezligini oshirish", en: "Increasing internet speed", ru: "Увеличение скорости интернета" }
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: { uz: "Parol xavfsizligi testi", en: "Password Security Test", ru: "Тест на безопасность паролей" },
    duration: "20",
    difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
    stars: 1,
    questions: []
  },
  {
    id: 3,
    title: { uz: "Phishing aniqlash", en: "Phishing Detection", ru: "Обнаружение фишинга" },
    duration: "15",
    difficulty: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
    stars: 2,
    questions: []
  }
];

const AdminTests: React.FC = () => {
  const { t } = useLanguage();
  const [tests, setTests] = useState<Test[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Test>>({});

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin_tests');
    if (saved) {
      setTests(JSON.parse(saved));
    } else {
      setTests(defaultTests);
      localStorage.setItem('admin_tests', JSON.stringify(defaultTests));
    }
  }, []);

  const saveTests = (newTests: Test[]) => {
    setTests(newTests);
    localStorage.setItem('admin_tests', JSON.stringify(newTests));
  };

  const handleRefresh = () => {
    saveTests(defaultTests);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    setFormData({
      id: Date.now(),
      title: { uz: '', en: '', ru: '' },
      questions: [],
      duration: '15',
      difficulty: { uz: 'Oson', en: 'Easy', ru: 'Легкий' },
      stars: 1
    });
    setShowForm(true);
    setEditingId(null);
  };

  const handleEdit = (test: Test) => {
    setFormData(test);
    setEditingId(test.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title?.uz) return;
    
    if (editingId) {
      const updated = tests.map(t => t.id === editingId ? { ...formData } as Test : t);
      saveTests(updated);
    } else {
      saveTests([...tests, formData as Test]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    saveTests(tests.filter(t => t.id !== id));
  };

  return (
    <div className="p-6 bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {getLang() === 'en' ? 'Tests Management' : getLang() === 'ru' ? 'Управление тестами' : 'Testlar boshqaruvi'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Refresh' : getLang() === 'ru' ? 'Обновить' : 'Yangilash'}
          </Button>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            {getLang() === 'en' ? 'Add Test' : getLang() === 'ru' ? 'Добавить тест' : 'Test qo\'shish'}
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
              placeholder="Duration (min)"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Input
              type="number"
              min={1}
              max={3}
              placeholder="Difficulty (1-3)"
              value={formData.stars || 1}
              onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) || 1 })}
            />
          </div>
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
        {tests.map((test) => (
          <div key={test.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-medium">{test.title[getLang()]}</h3>
              <p className="text-sm text-muted-foreground">
                {test.questions.length} {getLang() === 'en' ? 'questions' : getLang() === 'ru' ? 'вопросов' : 'savol'} • {test.duration} min
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(test)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(test.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTests;

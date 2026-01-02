# CyberSafe Edu - Django Backend

## O'rnatish

1. Virtual environment yaratish:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Kerakli paketlarni o'rnatish:
```bash
pip install -r requirements.txt
```

3. Environment variables sozlash:
```bash
cp .env.example .env
# .env faylini tahrirlang
```

4. Ma'lumotlar bazasini yaratish:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Superuser yaratish:
```bash
python manage.py createsuperuser
```

6. Serverni ishga tushirish:
```bash
python manage.py runserver
```

## Admin Panel

Admin panelga kirish: `http://localhost:8000/admin/`

## API Endpoints

- `GET /api/contact/` - Aloqa ma'lumotlari
- `GET /api/social-links/` - Ijtimoiy tarmoq havolalari
- `GET /api/articles/` - Maqolalar
- `GET /api/videos/` - Videolar
- `GET /api/tests/` - Testlar
- `GET /api/games/` - O'yinlar
- `GET /api/footer/` - Footer ma'lumotlari

Barcha endpointlar CRUD operatsiyalarini qo'llab-quvvatlaydi.


# Django Backend va Admin Panel O'rnatish

## 1. Backend O'rnatish

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## 2. Admin Panelga Kirish

1. `http://localhost:8000/admin/` ga kiring
2. Superuser bilan kirish
3. Quyidagi bo'limlarni boshqaring:
   - **Contact Info** - Aloqa ma'lumotlari (Email, Phone, Address)
   - **Social Links** - Ijtimoiy tarmoq havolalari
   - **Articles** - Maqolalar
   - **Videos** - Video darslar
   - **Tests** - Testlar
   - **Games** - O'yinlar
   - **Footer Info** - Footer ma'lumotlari (Muallif, Yaratuvchi)

## 3. Frontend O'rnatish

```bash
npm install
npm run dev
```

## 4. Environment Variables

Frontend uchun `.env` fayl yarating:
```
VITE_API_URL=http://localhost:8000/api
```

## 5. Ma'lumotlarni To'ldirish

### Contact Info
- Email: jbobur2o1o@gmail.com
- Phone: +998 (93) 005-42-87
- Address (O'zbek): Xorazm, O'zbekiston
- Address (English): Khorezm, Uzbekistan
- Address (Русский): Хорезм, Узбекистан

### Social Links
1. Telegram: https://t.me/ShirinErkinbayeva
2. GitHub: https://github.com/JBoburHacker005
3. Email: mailto:jbobur2o1o@gmail.com
4. Phone: tel:+998930054287

### Footer Info
- Author Name: Shirin Erkinbayeva
- Creator Name: Bobur Jovliyev

## API Endpoints

- `GET /api/contact/` - Aloqa ma'lumotlari
- `GET /api/social-links/` - Ijtimoiy tarmoq havolalari
- `GET /api/articles/` - Maqolalar
- `GET /api/videos/` - Videolar
- `GET /api/tests/` - Testlar
- `GET /api/games/` - O'yinlar
- `GET /api/footer/` - Footer ma'lumotlari

Barcha endpointlar CRUD operatsiyalarini qo'llab-quvvatlaydi.


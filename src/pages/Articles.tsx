import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

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

const Articles: React.FC = () => {
  const { t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: { 
        uz: "Phishing hujumlaridan himoyalanish", 
        en: "Protection from Phishing Attacks", 
        ru: "Защита от фишинговых атак" 
      },
      excerpt: { 
        uz: "Phishing nima va undan qanday himoyalanish mumkin...", 
        en: "What is phishing and how to protect yourself...", 
        ru: "Что такое фишинг и как защитить себя..." 
      },
      content: {
        uz: `## Phishing nima?

Phishing — bu kiber jinoyatchilar tomonidan sizning shaxsiy ma'lumotlaringizni o'g'irlash uchun qo'llaniladigan eng keng tarqalgan usullardan biri. Bu hujumda jinoyatchilar o'zlarini ishonchli tashkilot (bank, ijtimoiy tarmoq, davlat idorasi) sifatida ko'rsatib, sizdan maxfiy ma'lumotlarni so'rashadi.

## Phishing turları

### 1. Email Phishing
Bu eng ko'p tarqalgan tur. Jinoyatchilar soxta email yuborib, sizni qo'rqitish yoki shoshiltirish orqali havolaga bosishingizni so'rashadi.

**Misol:** "Sizning hisobingiz bloklandi! 24 soat ichida tasdiqlang" degan xabar.

### 2. Spear Phishing
Bu maqsadli hujum bo'lib, jinoyatchilar siz haqingizda ma'lumot to'plab, shaxsiy xabar yuborishadi.

### 3. Smishing (SMS Phishing)
SMS orqali amalga oshiriladigan phishing. "Siz sovrin yutdingiz!" kabi xabarlar.

### 4. Vishing (Voice Phishing)
Telefon qo'ng'iroqlari orqali amalga oshiriladi. Jinoyatchilar bank xodimi sifatida qo'ng'iroq qilishadi.

## Qanday himoyalanish mumkin?

### ✅ Havolalarni tekshiring
- URL manzilini diqqat bilan o'qing
- HTTPS mavjudligini tekshiring
- Noma'lum qisqartirilgan havolalardan ehtiyot bo'ling

### ✅ Shubhali emaillardan ehtiyot bo'ling
- Grammatik xatolarni izlang
- Jo'natuvchi manzilini tekshiring
- Shoshilinch so'rovlarga ishonmang

### ✅ Ikki faktorli autentifikatsiyani yoqing
- Paroldan tashqari qo'shimcha himoya
- SMS yoki autentifikator ilovasi orqali

### ✅ Antivirus dasturidan foydalaning
- Xavfli saytlarni bloklaydi
- Zararli dasturlardan himoyalaydi

## Phishing emailini qanday aniqlash?

1. **Jo'natuvchi manzili** — @bank.com o'rniga @bank-secure.com kabi soxta domenlar
2. **Shoshilinch so'rovlar** — "Zudlik bilan tizimga kiring!"
3. **Grammatik xatolar** — Professional tashkilotlar xatosiz yozadi
4. **Umumiy murojaat** — "Hurmatli mijoz" o'rniga ismingiz bo'lishi kerak
5. **Shubhali havolalar** — Havola ustiga bosganda boshqa manzil ko'rsatilsa

## Xulosa

Phishing hujumlaridan himoyalanish uchun eng muhimi — ehtiyotkorlik. Hech qachon shubhali havolalarga bosmang va shaxsiy ma'lumotlaringizni email orqali yubormang. Agar shubhangiz bo'lsa, to'g'ridan-to'g'ri rasmiy sayt orqali murojaat qiling.`,
        en: `## What is Phishing?

Phishing is one of the most common methods used by cybercriminals to steal your personal information. In this attack, criminals pose as trustworthy organizations (banks, social networks, government agencies) and request confidential information from you.

## Types of Phishing

### 1. Email Phishing
This is the most common type. Criminals send fake emails trying to scare or rush you into clicking on a link.

**Example:** "Your account has been blocked! Confirm within 24 hours" message.

### 2. Spear Phishing
This is a targeted attack where criminals gather information about you and send personalized messages.

### 3. Smishing (SMS Phishing)
Phishing carried out through SMS. Messages like "You won a prize!"

### 4. Vishing (Voice Phishing)
Carried out through phone calls. Criminals call pretending to be bank employees.

## How to Protect Yourself?

### ✅ Check Links
- Read the URL address carefully
- Check for HTTPS
- Be careful with unknown shortened links

### ✅ Be Cautious of Suspicious Emails
- Look for grammatical errors
- Verify the sender's address
- Don't trust urgent requests

### ✅ Enable Two-Factor Authentication
- Additional protection beyond password
- Through SMS or authenticator app

### ✅ Use Antivirus Software
- Blocks dangerous sites
- Protects from malware

## How to Identify a Phishing Email?

1. **Sender address** — Fake domains like @bank-secure.com instead of @bank.com
2. **Urgent requests** — "Log in immediately!"
3. **Grammatical errors** — Professional organizations write without errors
4. **Generic greeting** — Should use your name instead of "Dear customer"
5. **Suspicious links** — If hovering shows a different address

## Conclusion

The most important thing to protect yourself from phishing attacks is vigilance. Never click on suspicious links and don't send personal information via email. If you have doubts, contact through the official website directly.`,
        ru: `## Что такое Фишинг?

Фишинг — это один из самых распространённых методов, используемых киберпреступниками для кражи вашей личной информации. При этой атаке преступники выдают себя за надёжные организации (банки, социальные сети, государственные органы) и запрашивают у вас конфиденциальную информацию.

## Типы Фишинга

### 1. Email Фишинг
Это самый распространённый тип. Преступники отправляют поддельные письма, пытаясь напугать или торопить вас кликнуть по ссылке.

**Пример:** Сообщение "Ваш аккаунт заблокирован! Подтвердите в течение 24 часов".

### 2. Целевой Фишинг (Spear Phishing)
Это целенаправленная атака, при которой преступники собирают информацию о вас и отправляют персонализированные сообщения.

### 3. Смишинг (SMS Фишинг)
Фишинг через SMS. Сообщения типа "Вы выиграли приз!"

### 4. Вишинг (Голосовой Фишинг)
Осуществляется через телефонные звонки. Преступники звонят, выдавая себя за сотрудников банка.

## Как защитить себя?

### ✅ Проверяйте ссылки
- Внимательно читайте URL-адрес
- Проверяйте наличие HTTPS
- Будьте осторожны с неизвестными сокращёнными ссылками

### ✅ Будьте осторожны с подозрительными письмами
- Ищите грамматические ошибки
- Проверяйте адрес отправителя
- Не доверяйте срочным запросам

### ✅ Включите двухфакторную аутентификацию
- Дополнительная защита помимо пароля
- Через SMS или приложение-аутентификатор

### ✅ Используйте антивирус
- Блокирует опасные сайты
- Защищает от вредоносных программ

## Заключение

Самое важное для защиты от фишинговых атак — это бдительность. Никогда не переходите по подозрительным ссылкам и не отправляйте личную информацию по электронной почте.`
      },
      author: "Shirin Erkinbayeva",
      date: "2024-01-15",
      readTime: "8 min",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    },
    {
      id: 2,
      title: { 
        uz: "Kuchli parol yaratish sirlari", 
        en: "Secrets of Creating Strong Passwords", 
        ru: "Секреты создания надежных паролей" 
      },
      excerpt: { 
        uz: "Xavfsiz va eslab qolish oson parol yaratish...", 
        en: "Creating secure and memorable passwords...", 
        ru: "Создание безопасных и запоминающихся паролей..." 
      },
      content: {
        uz: `## Nima uchun kuchli parol kerak?

Bugungi kunda parol — bu sizning raqamli hayotingizning kaliti. Zaif parol sizni kiber hujumlarga zaif qiladi. Statistikaga ko'ra, ma'lumotlar buzilishlarining 80% zaif yoki o'g'irlangan parollar tufayli sodir bo'ladi.

## Zaif parollar misollari

❌ 123456 (Eng ko'p ishlatiladigan parol!)
❌ password
❌ qwerty
❌ Tug'ilgan sana (01011990)
❌ Ism + yil (Ali2024)
❌ Telefon raqami

## Kuchli parol xususiyatlari

✅ **Uzunlik**: Kamida 12 belgi
✅ **Murakkablik**: Katta va kichik harflar, raqamlar, maxsus belgilar
✅ **Noyoblik**: Har bir hisob uchun alohida parol
✅ **Oldindan aytib bo'lmaydigan**: Shaxsiy ma'lumotlardan foydalanmang

## Kuchli parol yaratish usullari

### 1. Passphrase usuli
Bir necha so'zlarni birlashtirib, eslab qolish oson, lekin murakkab parol yarating:

**Misol:** "MeningSevimliRangimKo'k2024!" 
- Uzun (25 belgi)
- Katta va kichik harflar
- Raqamlar va belgilar
- Eslab qolish oson

### 2. Qisqartma usuli
Gap yoki she'rdan qisqartma yarating:

**Misol:** "Men har kuni soat 7 da turib, 3 km yuguraman!"
**Parol:** Mhks7dT,3kY!

### 3. Almashtirish usuli
Harflarni raqam va belgilarga almashtiring:

A → @, E → 3, I → 1, O → 0, S → $

**Misol:** Xavfsizlik → X@vf$1zl1k

## Parol menejerlari

Parol menejerlaridan foydalaning:
- **Bitwarden** (Bepul va ochiq kodli)
- **LastPass**
- **1Password**
- **KeePass**

### Afzalliklari:
- Bir master parol bilan boshqarish
- Tasodifiy kuchli parollar yaratish
- Xavfsiz saqlash
- Barcha qurilmalarda sinxronlash

## Ikki faktorli autentifikatsiya (2FA)

Paroldan tashqari qo'shimcha himoya qatlami:
- SMS kodi
- Autentifikator ilovasi (Google Authenticator, Authy)
- Biometrik (barmoq izi, yuz tanish)
- Apparatli kalit (YubiKey)

## Parol xavfsizligi qoidalari

1. **Parolni hech kimga bermang** — Hatto IT xodimlariga ham
2. **Bir xil parol ishlatmang** — Har bir hisob uchun alohida
3. **Parolni yozmang** — Yoki xavfsiz joyda saqlang
4. **Muntazam yangilang** — Har 3-6 oyda
5. **Ommaviy Wi-Fi da ehtiyot bo'ling** — Parolni kiritmang

## Xulosa

Kuchli parol — bu sizning raqamli xavfsizligingizning asosi. Passphrase usulidan foydalaning, parol menejerlarini ishlating va albatta 2FA ni yoqing. Bu oddiy qadamlar sizni ko'plab kiber hujumlardan himoya qiladi.`,
        en: `## Why Do You Need a Strong Password?

Today, a password is the key to your digital life. A weak password makes you vulnerable to cyber attacks. According to statistics, 80% of data breaches occur due to weak or stolen passwords.

## Examples of Weak Passwords

❌ 123456 (Most commonly used password!)
❌ password
❌ qwerty
❌ Birth date (01011990)
❌ Name + year (Ali2024)
❌ Phone number

## Characteristics of a Strong Password

✅ **Length**: At least 12 characters
✅ **Complexity**: Upper and lowercase letters, numbers, special characters
✅ **Uniqueness**: Separate password for each account
✅ **Unpredictable**: Don't use personal information

## Methods to Create Strong Passwords

### 1. Passphrase Method
Combine several words to create an easy-to-remember but complex password:

**Example:** "MyFavoriteColorIsBlue2024!"
- Long (25 characters)
- Upper and lowercase letters
- Numbers and symbols
- Easy to remember

### 2. Abbreviation Method
Create an abbreviation from a sentence or poem:

**Example:** "I wake up every day at 7 and run 3 km!"
**Password:** Iwueda7&r3k!

### 3. Substitution Method
Replace letters with numbers and symbols:

A → @, E → 3, I → 1, O → 0, S → $

**Example:** Security → $3cur1ty

## Password Managers

Use password managers:
- **Bitwarden** (Free and open source)
- **LastPass**
- **1Password**
- **KeePass**

### Advantages:
- Manage with one master password
- Generate random strong passwords
- Secure storage
- Sync across all devices

## Two-Factor Authentication (2FA)

Additional layer of protection beyond password:
- SMS code
- Authenticator app (Google Authenticator, Authy)
- Biometric (fingerprint, face recognition)
- Hardware key (YubiKey)

## Conclusion

A strong password is the foundation of your digital security. Use the passphrase method, utilize password managers, and definitely enable 2FA. These simple steps will protect you from many cyber attacks.`,
        ru: `## Зачем нужен надёжный пароль?

Сегодня пароль — это ключ к вашей цифровой жизни. Слабый пароль делает вас уязвимым для кибератак. По статистике, 80% утечек данных происходит из-за слабых или украденных паролей.

## Примеры слабых паролей

❌ 123456 (Самый часто используемый пароль!)
❌ password
❌ qwerty
❌ Дата рождения (01011990)
❌ Имя + год (Ali2024)
❌ Номер телефона

## Характеристики надёжного пароля

✅ **Длина**: Минимум 12 символов
✅ **Сложность**: Заглавные и строчные буквы, цифры, специальные символы
✅ **Уникальность**: Отдельный пароль для каждого аккаунта
✅ **Непредсказуемость**: Не используйте личную информацию

## Методы создания надёжных паролей

### 1. Метод парольной фразы
Объедините несколько слов для создания легко запоминающегося, но сложного пароля:

**Пример:** "МойЛюбимыйЦветСиний2024!"
- Длинный (25 символов)
- Заглавные и строчные буквы
- Цифры и символы
- Легко запомнить

### 2. Метод аббревиатуры
Создайте аббревиатуру из предложения или стихотворения.

### 3. Метод замены
Замените буквы на цифры и символы:

A → @, E → 3, I → 1, O → 0, S → $

## Заключение

Надёжный пароль — это основа вашей цифровой безопасности. Используйте метод парольной фразы, менеджеры паролей и обязательно включите 2FA.`
      },
      author: "Bobur Jovliyev",
      date: "2024-01-10",
      readTime: "10 min",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    },
    {
      id: 3,
      title: { 
        uz: "Ijtimoiy tarmoqlarda xavfsizlik", 
        en: "Social Media Security", 
        ru: "Безопасность в социальных сетях" 
      },
      excerpt: { 
        uz: "Ijtimoiy tarmoqlarda shaxsiy ma'lumotlaringizni himoya qiling...", 
        en: "Protect your personal data on social media...", 
        ru: "Защитите свои личные данные в социальных сетях..." 
      },
      content: {
        uz: `## Ijtimoiy tarmoqlardagi xavflar

Ijtimoiy tarmoqlar hayotimizning ajralmas qismiga aylandi. Lekin ular bilan birga yangi xavflar ham paydo bo'ldi. Har yili millionlab foydalanuvchilar shaxsiy ma'lumotlarini yo'qotishadi.

## Asosiy xavf turlari

### 1. Identifikatsiya o'g'irlanishi
Jinoyatchilar sizning profilingizdan ma'lumot to'plab, sizning nomingizdan harakatlar qilishadi.

### 2. Social Engineering
Manipulyatsiya orqali sizdan maxfiy ma'lumotlarni olish.

### 3. Soxta profillar
Do'stlar yoki kompaniyalar nomidan soxta akkauntlar yaratiladi.

### 4. Malware tarqatish
Havola yoki fayllar orqali zararli dasturlarni tarqatish.

## Himoya choralari

### ✅ Maxfiylik sozlamalarini tekshiring
- Kim sizning postlaringizni ko'ra oladi?
- Shaxsiy ma'lumotlaringiz ochiqmi?
- Do'stlar ro'yxati hammaga ko'rinadimi?

### ✅ Kuchli parol va 2FA
- Har bir ijtimoiy tarmoq uchun alohida parol
- Ikki faktorli autentifikatsiyani yoqing
- Parol menejeridan foydalaning

### ✅ Ehtiyotkorlik bilan ulashing
- Manzil va joylashuvni oshkor qilmang
- Sayohat rejalarini real vaqtda emas, keyin ulashing
- Moliyaviy ma'lumotlarni hech qachon oshkor qilmang

### ✅ Begona havolalarga bosmang
- Do'stlardan kelgan g'alati xabarlarni tekshiring
- URL manzillarini diqqat bilan o'qing
- Qisqartirilgan havolalardan ehtiyot bo'ling

## Platformalar bo'yicha tavsiyalar

### Instagram
- Hisobni yopiq qiling
- Story kimlar ko'rishini sozlang
- Joylashuvni o'chiring

### Facebook
- Profile lock funksiyasidan foydalaning
- Do'stlar ro'yxatini yashiring
- Uchinchi tomon ilovalarni tekshiring

### Telegram
- Telefon raqamini yashiring
- Oxirgi faollik vaqtini o'chiring
- Cloud parolni o'rnating

## Farzandlar xavfsizligi

- Bolalarning ijtimoiy tarmoq faoliyatini nazorat qiling
- Yoshga mos sozlamalarni o'rnating
- Xavflar haqida ochiq suhbatlashing
- Begonalar bilan bog'lanmaslik qoidasini o'rgating

## Xulosa

Ijtimoiy tarmoqlarda xavfsiz bo'lish uchun ongli munosabat kerak. Shaxsiy ma'lumotlaringizni kamroq ulashing, maxfiylik sozlamalarini muntazam tekshiring va shubhali harakatlardan ehtiyot bo'ling.`,
        en: `## Dangers on Social Media

Social media has become an integral part of our lives. But with them came new dangers. Every year, millions of users lose their personal information.

## Main Types of Threats

### 1. Identity Theft
Criminals collect information from your profile and act on your behalf.

### 2. Social Engineering
Obtaining confidential information from you through manipulation.

### 3. Fake Profiles
Fake accounts are created in the name of friends or companies.

### 4. Malware Distribution
Spreading malicious software through links or files.

## Protection Measures

### ✅ Check Privacy Settings
- Who can see your posts?
- Is your personal information public?
- Is your friends list visible to everyone?

### ✅ Strong Password and 2FA
- Separate password for each social network
- Enable two-factor authentication
- Use a password manager

### ✅ Share Carefully
- Don't reveal address and location
- Share travel plans after, not in real-time
- Never disclose financial information

## Conclusion

Being safe on social media requires conscious attitude. Share less personal information, regularly check privacy settings, and be cautious of suspicious activities.`,
        ru: `## Опасности в социальных сетях

Социальные сети стали неотъемлемой частью нашей жизни. Но вместе с ними появились и новые опасности. Ежегодно миллионы пользователей теряют свои личные данные.

## Основные типы угроз

### 1. Кража личности
Преступники собирают информацию из вашего профиля и действуют от вашего имени.

### 2. Социальная инженерия
Получение конфиденциальной информации от вас путём манипуляции.

### 3. Фейковые профили
Создаются фальшивые аккаунты от имени друзей или компаний.

### 4. Распространение вредоносного ПО
Распространение вредоносных программ через ссылки или файлы.

## Меры защиты

### ✅ Проверьте настройки конфиденциальности
- Кто может видеть ваши посты?
- Открыта ли ваша личная информация?
- Виден ли список друзей всем?

## Заключение

Безопасность в социальных сетях требует осознанного отношения. Делитесь меньше личной информацией, регулярно проверяйте настройки конфиденциальности и будьте осторожны с подозрительными действиями.`
      },
      author: "Shirin Erkinbayeva",
      date: "2024-01-05",
      readTime: "7 min",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
    },
    {
      id: 4,
      title: { 
        uz: "VPN nima va nima uchun kerak?", 
        en: "What is VPN and Why Do You Need It?", 
        ru: "Что такое VPN и зачем он нужен?" 
      },
      excerpt: { 
        uz: "VPN texnologiyasi va uning afzalliklari...", 
        en: "VPN technology and its benefits...", 
        ru: "Технология VPN и ее преимущества..." 
      },
      content: {
        uz: `## VPN nima?

VPN (Virtual Private Network) — bu sizning internet ulanishingizni shifrlash va IP manzilingizni yashirish orqali onlayn xavfsizlik va maxfiylikni ta'minlaydigan texnologiya.

## VPN qanday ishlaydi?

1. **Shifrlash**: Barcha ma'lumotlaringiz shifrlanadi
2. **Tunnel yaratish**: Xavfsiz kanal orqali ma'lumot uzatiladi
3. **IP manzilni yashirish**: Sizning haqiqiy joylashuvingiz ko'rinmaydi
4. **VPN serveriga ulanish**: Ma'lumotlar VPN serveri orqali o'tadi

## VPN ning afzalliklari

### 🔒 Maxfiylik
- Internet provayder sizning faoliyatingizni ko'rmaydi
- Ommaviy Wi-Fi da xavfsiz
- Reklama kuzatuvchilaridan himoya

### 🌍 Geografik cheklovlarni chetlab o'tish
- Bloklangan saytlarga kirish
- Boshqa mamlakatlardagi kontentni ko'rish
- Sensorurani aylanib o'tish

### 💼 Biznes uchun
- Masofadan xavfsiz ishlash
- Korporativ tarmoqqa ulanish
- Ma'lumotlarni himoya qilish

## VPN tanlash mezonlari

### ✅ Muhim xususiyatlar:
- **No-log policy**: Ma'lumotlaringiz saqlanmaydi
- **Kuchli shifrlash**: AES-256 standarti
- **Kill switch**: VPN uzilganda internetni bloklash
- **Tezlik**: Tez serverlar
- **Serverlar soni**: Ko'p mamlakatda serverlar

### ⚠️ Bepul VPN larga ehtiyot bo'ling:
- Ma'lumotlaringizni sotishlari mumkin
- Reklama ko'rsatishlari mumkin
- Zaif shifrlash
- Cheklangan tezlik

## Tavsiya etiladigan VPN xizmatlar

1. **NordVPN** — Eng xavfsiz
2. **ExpressVPN** — Eng tez
3. **Surfshark** — Eng arzon
4. **ProtonVPN** — Bepul versiya mavjud

## VPN dan foydalanish qachon kerak?

- ☕ Kafe, mehmonxona Wi-Fi dan foydalanganda
- 🛫 Xorijda sayohat qilganda
- 🏢 Masofadan ishlayotganda
- 🛒 Onlayn xarid qilganda
- 📱 Mobil qurilmalarda

## Xulosa

VPN — bu zamonaviy internet foydalanuvchisi uchun muhim vosita. U sizning maxfiyligingizni himoya qiladi va xavfsiz internet tajribasini ta'minlaydi. Ishonchli VPN xizmatini tanlang va undan doimiy foydalaning.`,
        en: `## What is VPN?

VPN (Virtual Private Network) is a technology that provides online security and privacy by encrypting your internet connection and hiding your IP address.

## How Does VPN Work?

1. **Encryption**: All your data is encrypted
2. **Tunnel creation**: Data is transmitted through a secure channel
3. **IP address hiding**: Your real location is not visible
4. **VPN server connection**: Data passes through VPN server

## Benefits of VPN

### 🔒 Privacy
- Internet provider can't see your activity
- Safe on public Wi-Fi
- Protection from ad trackers

### 🌍 Bypassing Geographic Restrictions
- Access blocked sites
- View content from other countries
- Bypass censorship

### 💼 For Business
- Safe remote work
- Connect to corporate network
- Data protection

## Conclusion

VPN is an important tool for modern internet users. It protects your privacy and provides a safe internet experience. Choose a reliable VPN service and use it regularly.`,
        ru: `## Что такое VPN?

VPN (Virtual Private Network) — это технология, обеспечивающая онлайн-безопасность и конфиденциальность путём шифрования вашего интернет-соединения и скрытия вашего IP-адреса.

## Как работает VPN?

1. **Шифрование**: Все ваши данные шифруются
2. **Создание туннеля**: Данные передаются через защищённый канал
3. **Скрытие IP-адреса**: Ваше реальное местоположение не видно
4. **Подключение к VPN-серверу**: Данные проходят через VPN-сервер

## Преимущества VPN

### 🔒 Конфиденциальность
- Интернет-провайдер не видит вашу активность
- Безопасность в публичном Wi-Fi
- Защита от рекламных трекеров

## Заключение

VPN — это важный инструмент для современного пользователя интернета. Он защищает вашу конфиденциальность и обеспечивает безопасный опыт в интернете.`
      },
      author: "Bobur Jovliyev",
      date: "2024-01-01",
      readTime: "9 min",
      level: { uz: "O'rta", en: "Intermediate", ru: "Средний" },
    },
    {
      id: 5,
      title: { 
        uz: "Malware va viruslardan himoyalanish", 
        en: "Protection from Malware and Viruses", 
        ru: "Защита от вредоносных программ и вирусов" 
      },
      excerpt: { 
        uz: "Zararli dasturlarni aniqlash va ulardan himoyalanish...", 
        en: "Detecting and protecting from malicious software...", 
        ru: "Обнаружение и защита от вредоносных программ..." 
      },
      content: {
        uz: `## Malware nima?

Malware (Malicious Software) — bu kompyuteringizga zarar yetkazish, ma'lumotlarni o'g'irlash yoki nazorat qilish uchun yaratilgan zararli dasturlar.

## Malware turlari

### 🦠 Viruslar
Fayllarni zararlaydi va boshqa kompyuterlarga tarqaladi.

### 🐛 Worms (Qurtlar)
O'z-o'zidan ko'payib, tarmoq orqali tarqaladi.

### 🎭 Trojans (Troyanlar)
Foydali dastur sifatida ko'rinib, yashirin zararli harakatlar qiladi.

### 🔐 Ransomware
Fayllaringizni shifrlaydi va ularni ochish uchun pul talab qiladi.

### 👀 Spyware
Sizning faoliyatingizni kuzatadi va ma'lumotlarni o'g'irlaydi.

### 📢 Adware
Keraksiz reklamalarni ko'rsatadi.

## Infektsiya belgilari

- 🐌 Kompyuter sekinlashdi
- 💻 Noma'lum dasturlar paydo bo'ldi
- 🔄 Browser o'z-o'zidan sahifalarni ochadi
- 📊 Disk yoki protsessor doim band
- 🚫 Antivirus ishlamayapti

## Himoya choralari

### ✅ Antivirus o'rnating
- Windows Defender (Bepul)
- Kaspersky
- Bitdefender
- Malwarebytes

### ✅ Tizimni yangilang
- Windows Update ni yoqing
- Barcha dasturlarni yangilang
- Brauzer kengaytmalarini tekshiring

### ✅ Ehtiyotkor bo'ling
- Noma'lum fayllarni yuklamang
- Pirat dasturlardan qoching
- Email qo'shimchalarini tekshiring

### ✅ Zaxira nusxa oling
- Muhim fayllarni doimiy zaxiralang
- Bulut xizmatlaridan foydalaning
- Tashqi diskda saqlang

## Xulosa

Malwaredan himoyalanish uchun profilaktika eng muhim. Antivirus ishlating, tizimni yangilab turing va internetda ehtiyotkor bo'ling.`,
        en: `## What is Malware?

Malware (Malicious Software) is harmful software created to damage your computer, steal data, or take control.

## Types of Malware

### 🦠 Viruses
Infects files and spreads to other computers.

### 🐛 Worms
Self-replicates and spreads through network.

### 🎭 Trojans
Appears as useful software while performing hidden malicious actions.

### 🔐 Ransomware
Encrypts your files and demands money to unlock them.

### 👀 Spyware
Monitors your activity and steals information.

### 📢 Adware
Shows unwanted advertisements.

## Signs of Infection

- 🐌 Computer slowed down
- 💻 Unknown programs appeared
- 🔄 Browser opens pages by itself
- 📊 Disk or processor always busy
- 🚫 Antivirus not working

## Protection Measures

### ✅ Install Antivirus
- Windows Defender (Free)
- Kaspersky
- Bitdefender
- Malwarebytes

## Conclusion

Prevention is most important for malware protection. Use antivirus, keep your system updated, and be careful on the internet.`,
        ru: `## Что такое Malware?

Malware (Вредоносное ПО) — это вредоносные программы, созданные для повреждения вашего компьютера, кражи данных или получения контроля.

## Типы вредоносного ПО

### 🦠 Вирусы
Заражают файлы и распространяются на другие компьютеры.

### 🐛 Черви
Самовоспроизводятся и распространяются по сети.

### 🎭 Трояны
Выглядят как полезные программы, выполняя скрытые вредоносные действия.

### 🔐 Вымогатели
Шифруют ваши файлы и требуют деньги за их разблокировку.

## Признаки заражения

- 🐌 Компьютер замедлился
- 💻 Появились неизвестные программы
- 🔄 Браузер сам открывает страницы

## Заключение

Профилактика наиболее важна для защиты от вредоносного ПО. Используйте антивирус, обновляйте систему и будьте осторожны в интернете.`
      },
      author: "Shirin Erkinbayeva",
      date: "2023-12-28",
      readTime: "8 min",
      level: { uz: "Yuqori", en: "Advanced", ru: "Продвинутый" },
    },
    {
      id: 6,
      title: { 
        uz: "Xavfsiz onlayn xaridlar", 
        en: "Safe Online Shopping", 
        ru: "Безопасные онлайн-покупки" 
      },
      excerpt: { 
        uz: "Internetda xavfsiz xarid qilish qoidalari...", 
        en: "Rules for safe shopping on the internet...", 
        ru: "Правила безопасных покупок в интернете..." 
      },
      content: {
        uz: `## Onlayn xaridlar xavflari

Onlayn savdo qulay, lekin ehtiyotsizlik qimmatga tushishi mumkin. Har yili millionlab odam firibgarlik qurboniga aylanadi.

## Xavfsiz sayt belgilari

### ✅ HTTPS protokoli
- Manzil satrida qulf belgisi
- "https://" bilan boshlanadi
- SSL sertifikati mavjud

### ✅ Ishonchli kontakt ma'lumotlari
- Jismoniy manzil
- Telefon raqami
- Email manzili

### ✅ Sharhlar va reytinglar
- Boshqa xaridorlar fikrlari
- Mustaqil platformalardagi sharhlar

## To'lov xavfsizligi

### 💳 Virtual karta ishlating
- Alohida onlayn xaridlar uchun karta
- Cheklangan mablag'
- Bir martalik kartalar

### 🔒 Xavfsiz to'lov tizimlari
- PayPal
- Apple Pay
- Google Pay

### ⚠️ Qilmang:
- To'g'ridan-to'g'ri bank hisobidan to'lamang
- Kredit karta ma'lumotlarini saqlamang
- Ommaviy Wi-Fi da to'lov qilmang

## Firibgarlikni aniqlash

### 🚩 Ogohlantiruvchi belgilar:
- Juda arzon narxlar
- Faqat oldindan to'lov
- Shoshilinch takliflar
- Yomon dizayn va xatolar
- Kontakt ma'lumotlari yo'q

## Xulosa

Onlayn xaridlarda ehtiyotkorlik sizning pulingiz va ma'lumotlaringizni himoya qiladi. Faqat ishonchli saytlardan xarid qiling va xavfsiz to'lov usullaridan foydalaning.`,
        en: `## Dangers of Online Shopping

Online shopping is convenient, but carelessness can be costly. Millions of people become victims of fraud every year.

## Signs of a Safe Website

### ✅ HTTPS Protocol
- Lock icon in address bar
- Starts with "https://"
- Has SSL certificate

### ✅ Reliable Contact Information
- Physical address
- Phone number
- Email address

## Payment Security

### 💳 Use Virtual Cards
- Separate card for online shopping
- Limited funds
- One-time cards

### 🔒 Secure Payment Systems
- PayPal
- Apple Pay
- Google Pay

## Conclusion

Caution in online shopping protects your money and information. Only shop from trusted sites and use secure payment methods.`,
        ru: `## Опасности онлайн-покупок

Онлайн-шопинг удобен, но неосторожность может дорого обойтись. Миллионы людей ежегодно становятся жертвами мошенничества.

## Признаки безопасного сайта

### ✅ Протокол HTTPS
- Значок замка в адресной строке
- Начинается с "https://"
- Есть SSL-сертификат

## Заключение

Осторожность при онлайн-покупках защищает ваши деньги и информацию.`
      },
      author: "Bobur Jovliyev",
      date: "2023-12-25",
      readTime: "6 min",
      level: { uz: "Boshlang'ich", en: "Beginner", ru: "Начальный" },
    },
  ];

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  if (selectedArticle) {
    return (
      <Layout>
        <section className="py-8 bg-background min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedArticle(null)}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {getLang() === 'en' ? 'Back to Articles' : getLang() === 'ru' ? 'Назад к статьям' : "Maqolalarga qaytish"}
            </Button>
            
            <article className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {selectedArticle.level[getLang()]}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{selectedArticle.title[getLang()]}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedArticle.readTime}</span>
                </div>
                <span>{selectedArticle.date}</span>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {selectedArticle.content[getLang()].split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={index} className="font-bold text-foreground">{paragraph.replace(/\*\*/g, '')}</p>;
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('✅ ') || paragraph.startsWith('❌ ') || paragraph.startsWith('🔒 ') || paragraph.startsWith('🌍 ') || paragraph.startsWith('💼 ') || paragraph.startsWith('🦠 ') || paragraph.startsWith('🐛 ') || paragraph.startsWith('🎭 ') || paragraph.startsWith('🔐 ') || paragraph.startsWith('👀 ') || paragraph.startsWith('📢 ') || paragraph.startsWith('🐌 ') || paragraph.startsWith('💻 ') || paragraph.startsWith('🔄 ') || paragraph.startsWith('📊 ') || paragraph.startsWith('🚫 ') || paragraph.startsWith('💳 ') || paragraph.startsWith('⚠️ ') || paragraph.startsWith('🚩 ') || paragraph.startsWith('☕ ') || paragraph.startsWith('🛫 ') || paragraph.startsWith('🏢 ') || paragraph.startsWith('🛒 ') || paragraph.startsWith('📱 ')) {
                    return <p key={index} className="ml-4 text-muted-foreground">{paragraph}</p>;
                  }
                  if (paragraph.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                })}
              </div>
            </article>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('articles')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Latest articles and guides on cybersecurity'
              : getLang() === 'ru'
              ? 'Последние статьи и руководства по кибербезопасности'
              : "Kiber xavfsizlik bo'yicha eng so'nggi maqolalar"
            }
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {article.level[getLang()]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {article.title[getLang()]}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {article.excerpt[getLang()]}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;

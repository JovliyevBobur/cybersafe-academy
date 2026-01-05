import React, { useState } from 'react';
import { ClipboardCheck, Clock, HelpCircle, Star, ArrowLeft, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import Certificate from '@/components/Certificate';

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

const Tests: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const tests: Test[] = [
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
        },
        {
          question: { uz: "Eng xavfsiz parol qaysi?", en: "Which is the most secure password?", ru: "Какой пароль самый надежный?" },
          options: [
            { uz: "123456", en: "123456", ru: "123456" },
            { uz: "password", en: "password", ru: "password" },
            { uz: "K@r1m0v_2024!", en: "K@r1m0v_2024!", ru: "K@r1m0v_2024!" },
            { uz: "qwerty", en: "qwerty", ru: "qwerty" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "2FA nima?", en: "What is 2FA?", ru: "Что такое 2FA?" },
          options: [
            { uz: "Ikkita antivirus", en: "Two antiviruses", ru: "Два антивируса" },
            { uz: "Ikki faktorli autentifikatsiya", en: "Two-factor authentication", ru: "Двухфакторная аутентификация" },
            { uz: "Ikkita firewall", en: "Two firewalls", ru: "Два файрвола" },
            { uz: "Ikkita parol", en: "Two passwords", ru: "Два пароля" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Malware nima?", en: "What is malware?", ru: "Что такое malware?" },
          options: [
            { uz: "Foydali dastur", en: "Useful software", ru: "Полезное ПО" },
            { uz: "Zararli dastur", en: "Malicious software", ru: "Вредоносное ПО" },
            { uz: "O'yin dasturi", en: "Gaming software", ru: "Игровое ПО" },
            { uz: "Ofis dasturi", en: "Office software", ru: "Офисное ПО" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "HTTPS da 'S' nimani anglatadi?", en: "What does 'S' in HTTPS stand for?", ru: "Что означает 'S' в HTTPS?" },
          options: [
            { uz: "Speed", en: "Speed", ru: "Speed" },
            { uz: "Secure", en: "Secure", ru: "Secure" },
            { uz: "Server", en: "Server", ru: "Server" },
            { uz: "Simple", en: "Simple", ru: "Simple" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Firewall nima ish qiladi?", en: "What does a firewall do?", ru: "Что делает файрвол?" },
          options: [
            { uz: "Kompyuterni sovutadi", en: "Cools the computer", ru: "Охлаждает компьютер" },
            { uz: "Tarmoq trafikini nazorat qiladi", en: "Controls network traffic", ru: "Контролирует сетевой трафик" },
            { uz: "Fayllarni saqlaydi", en: "Stores files", ru: "Хранит файлы" },
            { uz: "Internetni tezlashtiradi", en: "Speeds up internet", ru: "Ускоряет интернет" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Eng xavfli Wi-Fi qaysi?", en: "Which Wi-Fi is most dangerous?", ru: "Какой Wi-Fi самый опасный?" },
          options: [
            { uz: "Uy Wi-Fi", en: "Home Wi-Fi", ru: "Домашний Wi-Fi" },
            { uz: "Ofis Wi-Fi", en: "Office Wi-Fi", ru: "Офисный Wi-Fi" },
            { uz: "Ommaviy ochiq Wi-Fi", en: "Public open Wi-Fi", ru: "Открытый публичный Wi-Fi" },
            { uz: "Mobil hotspot", en: "Mobile hotspot", ru: "Мобильная точка доступа" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "Ransomware nima qiladi?", en: "What does ransomware do?", ru: "Что делает вымогатель?" },
          options: [
            { uz: "Kompyuterni tezlashtiradi", en: "Speeds up computer", ru: "Ускоряет компьютер" },
            { uz: "Fayllarni shifrlaydi va pul talab qiladi", en: "Encrypts files and demands money", ru: "Шифрует файлы и требует деньги" },
            { uz: "Viruslarni yo'q qiladi", en: "Removes viruses", ru: "Удаляет вирусы" },
            { uz: "Internetni bloklaydi", en: "Blocks internet", ru: "Блокирует интернет" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "VPN nima uchun ishlatiladi?", en: "What is VPN used for?", ru: "Для чего используется VPN?" },
          options: [
            { uz: "O'yinlarni tezlashtirish", en: "Speeding up games", ru: "Ускорение игр" },
            { uz: "Internet ulanishini shifrlash", en: "Encrypting internet connection", ru: "Шифрование интернет-соединения" },
            { uz: "Reklama ko'rsatish", en: "Showing ads", ru: "Показ рекламы" },
            { uz: "Fayllarni saqlash", en: "Storing files", ru: "Хранение файлов" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Kuchli parol qancha belgidan iborat bo'lishi kerak?", en: "How many characters should a strong password have?", ru: "Сколько символов должен содержать надежный пароль?" },
          options: [
            { uz: "4 ta", en: "4", ru: "4" },
            { uz: "6 ta", en: "6", ru: "6" },
            { uz: "8 ta", en: "8", ru: "8" },
            { uz: "12+ ta", en: "12+", ru: "12+" }
          ],
          correctAnswer: 3
        },
        {
          question: { uz: "Antivirus dasturi nima ish qiladi?", en: "What does antivirus software do?", ru: "Что делает антивирус?" },
          options: [
            { uz: "Fayllarni tahrirlaydi", en: "Edits files", ru: "Редактирует файлы" },
            { uz: "Zararli dasturlarni aniqlaydi va yo'q qiladi", en: "Detects and removes malware", ru: "Обнаруживает и удаляет malware" },
            { uz: "Internet tezligini oshiradi", en: "Increases internet speed", ru: "Увеличивает скорость интернета" },
            { uz: "Kompyuterni o'chiradi", en: "Turns off computer", ru: "Выключает компьютер" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Social engineering nima?", en: "What is social engineering?", ru: "Что такое социальная инженерия?" },
          options: [
            { uz: "Ijtimoiy tarmoq yaratish", en: "Creating social networks", ru: "Создание социальных сетей" },
            { uz: "Odamlarni aldab ma'lumot olish", en: "Deceiving people to get information", ru: "Обман людей для получения информации" },
            { uz: "Dastur yozish", en: "Writing software", ru: "Написание программ" },
            { uz: "Veb-sayt yaratish", en: "Creating websites", ru: "Создание сайтов" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Xavfsiz veb-sayt belgisi nima?", en: "What is the sign of a secure website?", ru: "Каков признак безопасного сайта?" },
          options: [
            { uz: "Ko'k rang", en: "Blue color", ru: "Синий цвет" },
            { uz: "Qulf belgisi va HTTPS", en: "Lock icon and HTTPS", ru: "Значок замка и HTTPS" },
            { uz: "Ko'p reklama", en: "Many ads", ru: "Много рекламы" },
            { uz: "Tez yuklanish", en: "Fast loading", ru: "Быстрая загрузка" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Backup nima?", en: "What is backup?", ru: "Что такое резервная копия?" },
          options: [
            { uz: "Kompyuterni o'chirish", en: "Turning off computer", ru: "Выключение компьютера" },
            { uz: "Ma'lumotlarning zaxira nusxasi", en: "Copy of data", ru: "Копия данных" },
            { uz: "Yangi dastur o'rnatish", en: "Installing new software", ru: "Установка нового ПО" },
            { uz: "Internetga ulanish", en: "Connecting to internet", ru: "Подключение к интернету" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Qaysi biri eng xavfsiz?", en: "Which is the safest?", ru: "Что безопаснее всего?" },
          options: [
            { uz: "Bir xil parol ishlatish", en: "Using same password", ru: "Использование одного пароля" },
            { uz: "Parolni yozib qo'yish", en: "Writing down password", ru: "Записывание пароля" },
            { uz: "Parol menejeri ishlatish", en: "Using password manager", ru: "Использование менеджера паролей" },
            { uz: "Qisqa parol ishlatish", en: "Using short password", ru: "Использование короткого пароля" }
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 2,
      title: { uz: "Parol xavfsizligi testi", en: "Password Security Test", ru: "Тест на безопасность паролей" },
      duration: "20",
      difficulty: { uz: "Oson", en: "Easy", ru: "Легкий" },
      stars: 1,
      questions: [
        {
          question: { uz: "Kuchli parol qanday bo'lishi kerak?", en: "What should a strong password be like?", ru: "Каким должен быть надежный пароль?" },
          options: [
            { uz: "Faqat raqamlar", en: "Only numbers", ru: "Только цифры" },
            { uz: "Faqat harflar", en: "Only letters", ru: "Только буквы" },
            { uz: "Harflar, raqamlar va belgilar aralash", en: "Mix of letters, numbers and symbols", ru: "Смесь букв, цифр и символов" },
            { uz: "Tug'ilgan sana", en: "Birth date", ru: "Дата рождения" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "Parolni qanchalik tez-tez o'zgartirish kerak?", en: "How often should you change your password?", ru: "Как часто нужно менять пароль?" },
          options: [
            { uz: "Hech qachon", en: "Never", ru: "Никогда" },
            { uz: "Har kuni", en: "Every day", ru: "Каждый день" },
            { uz: "Har 3-6 oyda", en: "Every 3-6 months", ru: "Каждые 3-6 месяцев" },
            { uz: "Yilda bir marta", en: "Once a year", ru: "Раз в год" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "Qaysi parol eng zaif?", en: "Which password is weakest?", ru: "Какой пароль самый слабый?" },
          options: [
            { uz: "Tr0ub4dor&3", en: "Tr0ub4dor&3", ru: "Tr0ub4dor&3" },
            { uz: "MyD0g$N@me!", en: "MyD0g$N@me!", ru: "MyD0g$N@me!" },
            { uz: "password123", en: "password123", ru: "password123" },
            { uz: "X#9kL@mN2$pQ", en: "X#9kL@mN2$pQ", ru: "X#9kL@mN2$pQ" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "Parol menejerining afzalligi nima?", en: "What is the advantage of a password manager?", ru: "В чем преимущество менеджера паролей?" },
          options: [
            { uz: "Parollarni eslab qolish oson", en: "Easy to remember passwords", ru: "Легко запоминать пароли" },
            { uz: "Har bir hisob uchun noyob kuchli parol", en: "Unique strong password for each account", ru: "Уникальный надежный пароль для каждого аккаунта" },
            { uz: "Parol kerak emas", en: "No password needed", ru: "Пароль не нужен" },
            { uz: "Tezroq kirish", en: "Faster login", ru: "Быстрый вход" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Passphrase nima?", en: "What is a passphrase?", ru: "Что такое парольная фраза?" },
          options: [
            { uz: "Bir so'zli parol", en: "One-word password", ru: "Однословный пароль" },
            { uz: "Bir necha so'zdan iborat parol", en: "Password made of several words", ru: "Пароль из нескольких слов" },
            { uz: "Raqamli parol", en: "Numeric password", ru: "Цифровой пароль" },
            { uz: "Biometrik parol", en: "Biometric password", ru: "Биометрический пароль" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "2FA ning qaysi turi eng xavfsiz?", en: "Which type of 2FA is most secure?", ru: "Какой тип 2FA самый безопасный?" },
          options: [
            { uz: "SMS kod", en: "SMS code", ru: "SMS код" },
            { uz: "Email kod", en: "Email code", ru: "Email код" },
            { uz: "Apparatli kalit (YubiKey)", en: "Hardware key (YubiKey)", ru: "Аппаратный ключ (YubiKey)" },
            { uz: "Telefon qo'ng'irog'i", en: "Phone call", ru: "Телефонный звонок" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "Parolni kim bilan bo'lishish mumkin?", en: "With whom can you share your password?", ru: "С кем можно делиться паролем?" },
          options: [
            { uz: "Eng yaqin do'st", en: "Best friend", ru: "Лучший друг" },
            { uz: "Oila a'zolari", en: "Family members", ru: "Члены семьи" },
            { uz: "Hech kim bilan", en: "No one", ru: "Ни с кем" },
            { uz: "IT xodimi", en: "IT employee", ru: "IT сотрудник" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "Brute force attack nima?", en: "What is a brute force attack?", ru: "Что такое атака грубой силы?" },
          options: [
            { uz: "Jismoniy hujum", en: "Physical attack", ru: "Физическая атака" },
            { uz: "Barcha kombinatsiyalarni sinab ko'rish", en: "Trying all combinations", ru: "Перебор всех комбинаций" },
            { uz: "Phishing hujumi", en: "Phishing attack", ru: "Фишинговая атака" },
            { uz: "Virus yuborish", en: "Sending virus", ru: "Отправка вируса" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Dictionary attack nima?", en: "What is a dictionary attack?", ru: "Что такое словарная атака?" },
          options: [
            { uz: "Lug'at o'g'irlash", en: "Stealing dictionary", ru: "Кража словаря" },
            { uz: "Keng tarqalgan so'zlarni sinab ko'rish", en: "Trying common words", ru: "Перебор распространенных слов" },
            { uz: "Xat yozish", en: "Writing letter", ru: "Написание письма" },
            { uz: "Tarjima qilish", en: "Translating", ru: "Перевод" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Salt nima (parol kontekstida)?", en: "What is salt (in password context)?", ru: "Что такое соль (в контексте пароля)?" },
          options: [
            { uz: "Parolga qo'shiladigan tasodifiy qiymat", en: "Random value added to password", ru: "Случайное значение, добавляемое к паролю" },
            { uz: "Parolni o'chirish", en: "Deleting password", ru: "Удаление пароля" },
            { uz: "Parolni ko'rsatish", en: "Showing password", ru: "Показ пароля" },
            { uz: "Parolni saqlash", en: "Saving password", ru: "Сохранение пароля" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Hash funksiyasi nima qiladi?", en: "What does a hash function do?", ru: "Что делает хеш-функция?" },
          options: [
            { uz: "Parolni shifrlab saqlaydi", en: "Encrypts and stores password", ru: "Шифрует и хранит пароль" },
            { uz: "Parolni bir tomonlama o'zgartiradi", en: "One-way transforms password", ru: "Односторонне преобразует пароль" },
            { uz: "Parolni yuboradi", en: "Sends password", ru: "Отправляет пароль" },
            { uz: "Parolni ko'rsatadi", en: "Shows password", ru: "Показывает пароль" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Biometrik autentifikatsiya nimaga asoslangan?", en: "What is biometric authentication based on?", ru: "На чем основана биометрическая аутентификация?" },
          options: [
            { uz: "Parol", en: "Password", ru: "Пароль" },
            { uz: "Jismoniy xususiyatlar", en: "Physical characteristics", ru: "Физические характеристики" },
            { uz: "Telefon raqami", en: "Phone number", ru: "Номер телефона" },
            { uz: "Email", en: "Email", ru: "Email" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Qaysi biometrik usul eng keng tarqalgan?", en: "Which biometric method is most common?", ru: "Какой биометрический метод самый распространенный?" },
          options: [
            { uz: "Ko'z qorachig'i", en: "Iris", ru: "Радужка глаза" },
            { uz: "Barmoq izi", en: "Fingerprint", ru: "Отпечаток пальца" },
            { uz: "Ovoz", en: "Voice", ru: "Голос" },
            { uz: "Yurish uslubi", en: "Walking style", ru: "Походка" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Credential stuffing nima?", en: "What is credential stuffing?", ru: "Что такое credential stuffing?" },
          options: [
            { uz: "Yangi parol yaratish", en: "Creating new password", ru: "Создание нового пароля" },
            { uz: "O'g'irlangan ma'lumotlarni boshqa saytlarda sinash", en: "Testing stolen credentials on other sites", ru: "Проверка украденных данных на других сайтах" },
            { uz: "Parol saqlash", en: "Storing password", ru: "Хранение пароля" },
            { uz: "Parol o'zgartirish", en: "Changing password", ru: "Смена пароля" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Master parol nima?", en: "What is a master password?", ru: "Что такое мастер-пароль?" },
          options: [
            { uz: "Eng kuchli parol", en: "Strongest password", ru: "Самый надежный пароль" },
            { uz: "Parol menejeriga kirish paroli", en: "Password to access password manager", ru: "Пароль для доступа к менеджеру паролей" },
            { uz: "Administrator paroli", en: "Admin password", ru: "Пароль администратора" },
            { uz: "Bank paroli", en: "Bank password", ru: "Банковский пароль" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Keylogger nima?", en: "What is a keylogger?", ru: "Что такое кейлоггер?" },
          options: [
            { uz: "Klaviatura", en: "Keyboard", ru: "Клавиатура" },
            { uz: "Tugmalar bosilishini yozib oluvchi dastur", en: "Software that records keystrokes", ru: "Программа, записывающая нажатия клавиш" },
            { uz: "Parol menejeri", en: "Password manager", ru: "Менеджер паролей" },
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Shoulder surfing nima?", en: "What is shoulder surfing?", ru: "Что такое shoulder surfing?" },
          options: [
            { uz: "Suzish turi", en: "Type of swimming", ru: "Вид плавания" },
            { uz: "Parol kiritayotganingizni kuzatish", en: "Watching you enter password", ru: "Наблюдение за вводом пароля" },
            { uz: "Sport turi", en: "Type of sport", ru: "Вид спорта" },
            { uz: "O'yin turi", en: "Type of game", ru: "Вид игры" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Passwordless autentifikatsiya nima?", en: "What is passwordless authentication?", ru: "Что такое беспарольная аутентификация?" },
          options: [
            { uz: "Parolsiz kirish usuli", en: "Method of logging in without password", ru: "Способ входа без пароля" },
            { uz: "Parol unutish", en: "Forgetting password", ru: "Забывание пароля" },
            { uz: "Parolni o'chirish", en: "Deleting password", ru: "Удаление пароля" },
            { uz: "Parolni yozish", en: "Writing password", ru: "Запись пароля" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Qaysi autentifikator ilovasi mashhur?", en: "Which authenticator app is popular?", ru: "Какое приложение-аутентификатор популярно?" },
          options: [
            { uz: "Google Authenticator", en: "Google Authenticator", ru: "Google Authenticator" },
            { uz: "Google Chrome", en: "Google Chrome", ru: "Google Chrome" },
            { uz: "Google Maps", en: "Google Maps", ru: "Google Maps" },
            { uz: "Google Photos", en: "Google Photos", ru: "Google Photos" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Parolni qaerda saqlash xavfsiz?", en: "Where is it safe to store passwords?", ru: "Где безопасно хранить пароли?" },
          options: [
            { uz: "Qog'ozda", en: "On paper", ru: "На бумаге" },
            { uz: "Telefonda yozuv sifatida", en: "As note on phone", ru: "В заметках телефона" },
            { uz: "Shifrlangan parol menejerida", en: "In encrypted password manager", ru: "В зашифрованном менеджере паролей" },
            { uz: "Email da", en: "In email", ru: "В email" }
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 3,
      title: { uz: "Phishing aniqlash", en: "Phishing Detection", ru: "Обнаружение фишинга" },
      duration: "25",
      difficulty: { uz: "O'rtacha", en: "Medium", ru: "Средний" },
      stars: 2,
      questions: [
        {
          question: { uz: "Phishing nima?", en: "What is phishing?", ru: "Что такое фишинг?" },
          options: [
            { uz: "Baliq ovlash", en: "Fishing", ru: "Рыбалка" },
            { uz: "Soxta xabarlar orqali ma'lumot o'g'irlash", en: "Stealing info through fake messages", ru: "Кража информации через поддельные сообщения" },
            { uz: "Telefon qo'ng'irog'i", en: "Phone call", ru: "Телефонный звонок" },
            { uz: "Reklama yuborish", en: "Sending ads", ru: "Отправка рекламы" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Phishing email qaysi belgiga ega bo'ladi?", en: "What sign does a phishing email have?", ru: "Какой признак у фишингового письма?" },
          options: [
            { uz: "Rasmiy kompaniya logosi", en: "Official company logo", ru: "Официальный логотип компании" },
            { uz: "Shoshilinch so'rovlar va grammatik xatolar", en: "Urgent requests and grammatical errors", ru: "Срочные просьбы и грамматические ошибки" },
            { uz: "To'g'ri email manzili", en: "Correct email address", ru: "Правильный email адрес" },
            { uz: "Shaxsiy murojaat", en: "Personal greeting", ru: "Личное обращение" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Spear phishing oddiy phishingdan nimasi bilan farq qiladi?", en: "How does spear phishing differ from regular phishing?", ru: "Чем отличается целевой фишинг от обычного?" },
          options: [
            { uz: "Tezroq", en: "Faster", ru: "Быстрее" },
            { uz: "Maqsadli va shaxsiylashtirilgan", en: "Targeted and personalized", ru: "Целенаправленный и персонализированный" },
            { uz: "Arzonroq", en: "Cheaper", ru: "Дешевле" },
            { uz: "Qonuniy", en: "Legal", ru: "Законный" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Smishing nima?", en: "What is smishing?", ru: "Что такое смишинг?" },
          options: [
            { uz: "Email phishing", en: "Email phishing", ru: "Email фишинг" },
            { uz: "SMS orqali phishing", en: "Phishing via SMS", ru: "Фишинг через SMS" },
            { uz: "Telefon qo'ng'irog'i", en: "Phone call", ru: "Телефонный звонок" },
            { uz: "Ijtimoiy tarmoq xabarlari", en: "Social media messages", ru: "Сообщения в соцсетях" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Vishing nima?", en: "What is vishing?", ru: "Что такое вишинг?" },
          options: [
            { uz: "Video phishing", en: "Video phishing", ru: "Видео фишинг" },
            { uz: "Telefon qo'ng'irog'i orqali phishing", en: "Phishing via phone call", ru: "Фишинг через телефонный звонок" },
            { uz: "Virtual phishing", en: "Virtual phishing", ru: "Виртуальный фишинг" },
            { uz: "Vizual phishing", en: "Visual phishing", ru: "Визуальный фишинг" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Shubhali email kelganda nima qilish kerak?", en: "What to do when receiving a suspicious email?", ru: "Что делать при получении подозрительного письма?" },
          options: [
            { uz: "Darhol havolaga bosish", en: "Click link immediately", ru: "Немедленно перейти по ссылке" },
            { uz: "Javob yozish", en: "Reply", ru: "Ответить" },
            { uz: "O'chirish va report qilish", en: "Delete and report", ru: "Удалить и сообщить" },
            { uz: "Boshqalarga yuborish", en: "Forward to others", ru: "Переслать другим" }
          ],
          correctAnswer: 2
        },
        {
          question: { uz: "URL tekshirish nima uchun muhim?", en: "Why is URL checking important?", ru: "Почему важна проверка URL?" },
          options: [
            { uz: "Tezlikni aniqlash uchun", en: "To determine speed", ru: "Для определения скорости" },
            { uz: "Soxta saytlarni aniqlash uchun", en: "To detect fake sites", ru: "Для обнаружения поддельных сайтов" },
            { uz: "Dizaynni ko'rish uchun", en: "To view design", ru: "Для просмотра дизайна" },
            { uz: "Reklamani ko'rish uchun", en: "To view ads", ru: "Для просмотра рекламы" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Bank hech qachon nima so'ramaydi?", en: "What does a bank never ask for?", ru: "Что банк никогда не спрашивает?" },
          options: [
            { uz: "Ism-familiya", en: "Full name", ru: "Имя и фамилия" },
            { uz: "To'liq karta raqami va CVV", en: "Full card number and CVV", ru: "Полный номер карты и CVV" },
            { uz: "Telefon raqami", en: "Phone number", ru: "Номер телефона" },
            { uz: "Manzil", en: "Address", ru: "Адрес" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Typosquatting nima?", en: "What is typosquatting?", ru: "Что такое typosquatting?" },
          options: [
            { uz: "Tez yozish", en: "Fast typing", ru: "Быстрый набор" },
            { uz: "Xato yozilgan domenlardan foydalanish", en: "Using misspelled domains", ru: "Использование неправильно написанных доменов" },
            { uz: "Klaviaturani buzish", en: "Breaking keyboard", ru: "Ломание клавиатуры" },
            { uz: "Matn tahrirlash", en: "Text editing", ru: "Редактирование текста" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Clone phishing nima?", en: "What is clone phishing?", ru: "Что такое клонирование фишинга?" },
          options: [
            { uz: "Asl emailni nusxalash va o'zgartirish", en: "Copying and modifying original email", ru: "Копирование и изменение оригинального письма" },
            { uz: "Yangi email yaratish", en: "Creating new email", ru: "Создание нового письма" },
            { uz: "Email o'chirish", en: "Deleting email", ru: "Удаление письма" },
            { uz: "Email saqlash", en: "Saving email", ru: "Сохранение письма" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Whaling nima?", en: "What is whaling?", ru: "Что такое whaling?" },
          options: [
            { uz: "Kit ovlash", en: "Whale hunting", ru: "Охота на китов" },
            { uz: "Yuqori lavozimli shaxslarga phishing", en: "Phishing targeting executives", ru: "Фишинг, нацеленный на руководителей" },
            { uz: "Dengiz sayohati", en: "Sea voyage", ru: "Морское путешествие" },
            { uz: "Suv ostida suzish", en: "Underwater swimming", ru: "Подводное плавание" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Pharming nima?", en: "What is pharming?", ru: "Что такое pharming?" },
          options: [
            { uz: "Fermerchilik", en: "Farming", ru: "Фермерство" },
            { uz: "DNS ni buzib soxta saytga yo'naltirish", en: "Redirecting to fake site by hacking DNS", ru: "Перенаправление на поддельный сайт через взлом DNS" },
            { uz: "Dori ishlab chiqarish", en: "Drug manufacturing", ru: "Производство лекарств" },
            { uz: "Qishloq xo'jaligi", en: "Agriculture", ru: "Сельское хозяйство" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Angler phishing nima?", en: "What is angler phishing?", ru: "Что такое angler phishing?" },
          options: [
            { uz: "Baliq tutish", en: "Catching fish", ru: "Ловля рыбы" },
            { uz: "Ijtimoiy tarmoqlarda soxta customer support", en: "Fake customer support on social media", ru: "Поддельная поддержка в соцсетях" },
            { uz: "O'yin o'ynash", en: "Playing game", ru: "Игра" },
            { uz: "Video ko'rish", en: "Watching video", ru: "Просмотр видео" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Man-in-the-middle attack nima?", en: "What is a man-in-the-middle attack?", ru: "Что такое атака посредника?" },
          options: [
            { uz: "O'rtadagi odam", en: "Middle person", ru: "Человек посередине" },
            { uz: "Ikki tomon orasidagi aloqani ushlash", en: "Intercepting communication between two parties", ru: "Перехват связи между двумя сторонами" },
            { uz: "Poyga", en: "Race", ru: "Гонка" },
            { uz: "O'yin", en: "Game", ru: "Игра" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Phishing dan himoya uchun eng yaxshi usul?", en: "Best method to protect from phishing?", ru: "Лучший способ защиты от фишинга?" },
          options: [
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" },
            { uz: "Ongli bo'lish va tekshirish", en: "Being aware and verifying", ru: "Осведомленность и проверка" },
            { uz: "VPN ishlatish", en: "Using VPN", ru: "Использование VPN" },
            { uz: "Parolni o'zgartirish", en: "Changing password", ru: "Смена пароля" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Business Email Compromise (BEC) nima?", en: "What is Business Email Compromise?", ru: "Что такое Business Email Compromise?" },
          options: [
            { uz: "Biznes email yaratish", en: "Creating business email", ru: "Создание бизнес-email" },
            { uz: "Kompaniya xodimlarini aldash uchun soxta email", en: "Fake email to deceive company employees", ru: "Поддельный email для обмана сотрудников" },
            { uz: "Email sozlash", en: "Email setup", ru: "Настройка email" },
            { uz: "Email o'chirish", en: "Deleting email", ru: "Удаление email" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "DMARC nima?", en: "What is DMARC?", ru: "Что такое DMARC?" },
          options: [
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" },
            { uz: "Email autentifikatsiya protokoli", en: "Email authentication protocol", ru: "Протокол аутентификации email" },
            { uz: "Parol menejeri", en: "Password manager", ru: "Менеджер паролей" },
            { uz: "VPN turi", en: "Type of VPN", ru: "Тип VPN" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Phishing hujumi muvaffaqiyatli bo'lsa nima qilish kerak?", en: "What to do if a phishing attack is successful?", ru: "Что делать при успешной фишинговой атаке?" },
          options: [
            { uz: "Hech narsa qilmang", en: "Do nothing", ru: "Ничего не делать" },
            { uz: "Parollarni o'zgartiring va bankka xabar bering", en: "Change passwords and notify bank", ru: "Сменить пароли и уведомить банк" },
            { uz: "Kompyuterni o'chiring", en: "Turn off computer", ru: "Выключить компьютер" },
            { uz: "Do'stlarga ayting", en: "Tell friends", ru: "Рассказать друзьям" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "SPF nima?", en: "What is SPF?", ru: "Что такое SPF?" },
          options: [
            { uz: "Quyosh himoyasi", en: "Sun protection", ru: "Защита от солнца" },
            { uz: "Email jo'natuvchini tekshirish protokoli", en: "Email sender verification protocol", ru: "Протокол проверки отправителя email" },
            { uz: "Parol turi", en: "Type of password", ru: "Тип пароля" },
            { uz: "Firewall turi", en: "Type of firewall", ru: "Тип файрвола" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Qaysi qator phishing emailida ko'p uchraydi?", en: "Which phrase is common in phishing emails?", ru: "Какая фраза часто встречается в фишинговых письмах?" },
          options: [
            { uz: "Hurmatli mijoz", en: "Dear customer", ru: "Уважаемый клиент" },
            { uz: "Sizning hisobingiz ZUDLIK bilan tekshirilishi kerak!", en: "Your account URGENTLY needs verification!", ru: "Ваш аккаунт СРОЧНО нуждается в проверке!" },
            { uz: "Rahmat", en: "Thank you", ru: "Спасибо" },
            { uz: "Hayrli kun", en: "Good day", ru: "Добрый день" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Sandbox nima?", en: "What is a sandbox?", ru: "Что такое песочница?" },
          options: [
            { uz: "Bolalar o'yinchog'i", en: "Children's toy", ru: "Детская игрушка" },
            { uz: "Shubhali fayllarni xavfsiz muhitda tekshirish", en: "Testing suspicious files in safe environment", ru: "Проверка подозрительных файлов в безопасной среде" },
            { uz: "Beach turi", en: "Type of beach", ru: "Тип пляжа" },
            { uz: "O'yin turi", en: "Type of game", ru: "Тип игры" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Hovering nima va nima uchun foydali?", en: "What is hovering and why is it useful?", ru: "Что такое наведение и почему оно полезно?" },
          options: [
            { uz: "Uchish", en: "Flying", ru: "Полёт" },
            { uz: "Havolaning haqiqiy manzilini ko'rish", en: "Seeing the real address of a link", ru: "Просмотр реального адреса ссылки" },
            { uz: "O'tirish", en: "Sitting", ru: "Сидение" },
            { uz: "Yurish", en: "Walking", ru: "Ходьба" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Suspicious Activity Report (SAR) nima?", en: "What is a Suspicious Activity Report?", ru: "Что такое отчет о подозрительной активности?" },
          options: [
            { uz: "Sport hisoboti", en: "Sports report", ru: "Спортивный отчет" },
            { uz: "Shubhali faoliyat haqida rasmiy xabar", en: "Official report about suspicious activity", ru: "Официальный отчет о подозрительной деятельности" },
            { uz: "Ob-havo hisoboti", en: "Weather report", ru: "Прогноз погоды" },
            { uz: "Moliyaviy hisobot", en: "Financial report", ru: "Финансовый отчет" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Email header nima uchun tekshiriladi?", en: "Why is the email header checked?", ru: "Зачем проверяется заголовок письма?" },
          options: [
            { uz: "Dizayn uchun", en: "For design", ru: "Для дизайна" },
            { uz: "Haqiqiy jo'natuvchini aniqlash uchun", en: "To identify real sender", ru: "Для определения настоящего отправителя" },
            { uz: "Matn uchun", en: "For text", ru: "Для текста" },
            { uz: "Rasm uchun", en: "For image", ru: "Для изображения" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Phishing awareness training nima uchun muhim?", en: "Why is phishing awareness training important?", ru: "Почему важно обучение распознаванию фишинга?" },
          options: [
            { uz: "Qiziqarli", en: "Interesting", ru: "Интересно" },
            { uz: "Xodimlarni phishing hujumlaridan himoya qilish", en: "Protecting employees from phishing attacks", ru: "Защита сотрудников от фишинговых атак" },
            { uz: "Ish vaqtini to'ldirish", en: "Filling work time", ru: "Заполнение рабочего времени" },
            { uz: "Sertifikat olish", en: "Getting certificate", ru: "Получение сертификата" }
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 4,
      title: { uz: "Ijtimoiy tarmoqlar xavfsizligi", en: "Social Media Security", ru: "Безопасность социальных сетей" },
      duration: "20",
      difficulty: { uz: "O'rtacha", en: "Medium", ru: "Средний" },
      stars: 2,
      questions: [
        {
          question: { uz: "Ijtimoiy tarmoqlarda eng katta xavf nima?", en: "What is the biggest danger on social media?", ru: "Какая самая большая опасность в соцсетях?" },
          options: [
            { uz: "Yomon internet", en: "Bad internet", ru: "Плохой интернет" },
            { uz: "Shaxsiy ma'lumotlar o'g'irlanishi", en: "Personal data theft", ru: "Кража личных данных" },
            { uz: "Yomon dizayn", en: "Bad design", ru: "Плохой дизайн" },
            { uz: "Reklama", en: "Ads", ru: "Реклама" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Profilni yopiq qilish nima uchun muhim?", en: "Why is it important to make your profile private?", ru: "Почему важно сделать профиль закрытым?" },
          options: [
            { uz: "Chiroyli ko'rinish uchun", en: "For nice appearance", ru: "Для красивого вида" },
            { uz: "Begonalar ma'lumotlaringizni ko'rmasligi uchun", en: "So strangers can't see your info", ru: "Чтобы незнакомцы не видели вашу информацию" },
            { uz: "Tezroq ishlashi uchun", en: "For faster performance", ru: "Для быстрой работы" },
            { uz: "Pulni tejash uchun", en: "To save money", ru: "Для экономии денег" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Nima haqida post qilmaslik kerak?", en: "What should you not post about?", ru: "О чем не следует публиковать?" },
          options: [
            { uz: "Sevimli musiqangiz", en: "Your favorite music", ru: "Ваша любимая музыка" },
            { uz: "Ta'til vaqtida uyingiz bo'sh ekanligi", en: "Your house is empty during vacation", ru: "Ваш дом пуст во время отпуска" },
            { uz: "Hobbiylaringiz", en: "Your hobbies", ru: "Ваши хобби" },
            { uz: "Kitob tavsiyalari", en: "Book recommendations", ru: "Рекомендации книг" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Geotagging xavfi nimada?", en: "What is the danger of geotagging?", ru: "В чем опасность геотегов?" },
          options: [
            { uz: "Batareya tez tugaydi", en: "Battery drains fast", ru: "Быстро садится батарея" },
            { uz: "Joylashuvingiz oshkor bo'ladi", en: "Your location is revealed", ru: "Ваше местоположение раскрывается" },
            { uz: "Rasm sifati yomonlashadi", en: "Photo quality decreases", ru: "Качество фото ухудшается" },
            { uz: "Internet sekinlashadi", en: "Internet slows down", ru: "Интернет замедляется" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Soxta profilni qanday aniqlash mumkin?", en: "How to identify a fake profile?", ru: "Как распознать фейковый профиль?" },
          options: [
            { uz: "Ko'p do'stlar", en: "Many friends", ru: "Много друзей" },
            { uz: "Kam post, stock rasmlar, yangi akkaunt", en: "Few posts, stock photos, new account", ru: "Мало постов, стоковые фото, новый аккаунт" },
            { uz: "Chiroyli rasmlar", en: "Beautiful photos", ru: "Красивые фото" },
            { uz: "Ko'p like", en: "Many likes", ru: "Много лайков" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Catfishing nima?", en: "What is catfishing?", ru: "Что такое кэтфишинг?" },
          options: [
            { uz: "Baliq ovlash", en: "Fishing", ru: "Рыбалка" },
            { uz: "Soxta identifikatsiya bilan aldash", en: "Deceiving with fake identity", ru: "Обман с поддельной личностью" },
            { uz: "O'yin turi", en: "Type of game", ru: "Тип игры" },
            { uz: "Suv sporti", en: "Water sport", ru: "Водный спорт" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Uchinchi tomon ilovalaridan nima uchun ehtiyot bo'lish kerak?", en: "Why be careful with third-party apps?", ru: "Почему нужно быть осторожным со сторонними приложениями?" },
          options: [
            { uz: "Qimmat", en: "Expensive", ru: "Дорого" },
            { uz: "Ma'lumotlaringizga kirish huquqi olishi mumkin", en: "Can get access to your data", ru: "Могут получить доступ к вашим данным" },
            { uz: "Sekin ishlaydi", en: "Works slowly", ru: "Работает медленно" },
            { uz: "Ko'p joy egallaydi", en: "Takes much space", ru: "Занимает много места" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Ijtimoiy tarmoqlarda qanday xabarlardan ehtiyot bo'lish kerak?", en: "What messages to be careful of on social media?", ru: "Каких сообщений остерегаться в соцсетях?" },
          options: [
            { uz: "Do'stlardan tabriklar", en: "Congratulations from friends", ru: "Поздравления от друзей" },
            { uz: "Sovrin yutdingiz degan noma'lum xabarlar", en: "Unknown messages saying you won a prize", ru: "Неизвестные сообщения о выигрыше приза" },
            { uz: "Oila a'zolaridan habarlar", en: "Messages from family", ru: "Сообщения от семьи" },
            { uz: "Ish takliflari", en: "Job offers", ru: "Предложения работы" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Doxing nima?", en: "What is doxing?", ru: "Что такое doxxing?" },
          options: [
            { uz: "Hujjat yozish", en: "Writing documents", ru: "Написание документов" },
            { uz: "Shaxsiy ma'lumotlarni ommaga oshkor qilish", en: "Revealing personal info publicly", ru: "Публичное раскрытие личной информации" },
            { uz: "Rasm tahrirlash", en: "Photo editing", ru: "Редактирование фото" },
            { uz: "Video montaj", en: "Video editing", ru: "Монтаж видео" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Ijtimoiy tarmoqlarda 2FA ni yoqish nima uchun muhim?", en: "Why is enabling 2FA on social media important?", ru: "Почему важно включить 2FA в соцсетях?" },
          options: [
            { uz: "Chiroyli ko'rinish uchun", en: "For nice appearance", ru: "Для красивого вида" },
            { uz: "Akkauntni qo'shimcha himoya qilish", en: "Extra account protection", ru: "Дополнительная защита аккаунта" },
            { uz: "Tezroq kirish uchun", en: "For faster login", ru: "Для быстрого входа" },
            { uz: "Do'stlar ko'proq bo'lishi uchun", en: "To get more friends", ru: "Чтобы было больше друзей" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Cyberbullying nima?", en: "What is cyberbullying?", ru: "Что такое кибербуллинг?" },
          options: [
            { uz: "Kompyuter o'yini", en: "Computer game", ru: "Компьютерная игра" },
            { uz: "Internet orqali ta'qib va haqorat", en: "Harassment and insults via internet", ru: "Преследование и оскорбления через интернет" },
            { uz: "Dasturlash", en: "Programming", ru: "Программирование" },
            { uz: "Veb-dizayn", en: "Web design", ru: "Веб-дизайн" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Shaxsiy ma'lumotlarni qanday himoya qilish kerak?", en: "How to protect personal information?", ru: "Как защитить личную информацию?" },
          options: [
            { uz: "Hammaga ulashish", en: "Share with everyone", ru: "Делиться со всеми" },
            { uz: "Minimal ma'lumot ulashish va maxfiylik sozlamalarini tekshirish", en: "Share minimal info and check privacy settings", ru: "Делиться минимумом информации и проверять настройки конфиденциальности" },
            { uz: "Ko'p post qilish", en: "Post a lot", ru: "Много публиковать" },
            { uz: "Hamma so'rovlarni qabul qilish", en: "Accept all requests", ru: "Принимать все запросы" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Instagram da Story ko'ruvchilarini cheklash mumkinmi?", en: "Can you limit Story viewers on Instagram?", ru: "Можно ли ограничить зрителей Stories в Instagram?" },
          options: [
            { uz: "Yo'q", en: "No", ru: "Нет" },
            { uz: "Ha, Close Friends funksiyasi bilan", en: "Yes, with Close Friends feature", ru: "Да, с функцией Close Friends" },
            { uz: "Faqat pullik versiyada", en: "Only in paid version", ru: "Только в платной версии" },
            { uz: "Faqat business akkauntda", en: "Only in business account", ru: "Только в бизнес-аккаунте" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Facebook da Profile Lock nima qiladi?", en: "What does Profile Lock do on Facebook?", ru: "Что делает блокировка профиля на Facebook?" },
          options: [
            { uz: "Akkauntni o'chiradi", en: "Deletes account", ru: "Удаляет аккаунт" },
            { uz: "Do'st bo'lmaganlar uchun ma'lumotlarni cheklaydi", en: "Limits info for non-friends", ru: "Ограничивает информацию для не-друзей" },
            { uz: "Post qilishni bloklaydi", en: "Blocks posting", ru: "Блокирует публикации" },
            { uz: "Xabar yuborishni to'xtatadi", en: "Stops messaging", ru: "Останавливает сообщения" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Online predator lardan qanday himoyalanish kerak?", en: "How to protect from online predators?", ru: "Как защититься от онлайн-хищников?" },
          options: [
            { uz: "Ular bilan do'stlashish", en: "Befriend them", ru: "Подружиться с ними" },
            { uz: "Begonalar bilan shaxsiy ma'lumot ulashmaslik", en: "Not sharing personal info with strangers", ru: "Не делиться личной информацией с незнакомцами" },
            { uz: "Ularni hamma joyda qidirish", en: "Search for them everywhere", ru: "Искать их везде" },
            { uz: "Ular haqida post qilish", en: "Post about them", ru: "Публиковать о них" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Telegram da telefon raqamini yashirish mumkinmi?", en: "Can you hide phone number on Telegram?", ru: "Можно ли скрыть номер телефона в Telegram?" },
          options: [
            { uz: "Yo'q", en: "No", ru: "Нет" },
            { uz: "Ha, Privacy sozlamalarida", en: "Yes, in Privacy settings", ru: "Да, в настройках конфиденциальности" },
            { uz: "Faqat Premium da", en: "Only in Premium", ru: "Только в Premium" },
            { uz: "Faqat guruhlarda", en: "Only in groups", ru: "Только в группах" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Screen time nazorati nima uchun foydali?", en: "Why is screen time control useful?", ru: "Зачем полезен контроль экранного времени?" },
          options: [
            { uz: "Batareya uchun", en: "For battery", ru: "Для батареи" },
            { uz: "Ijtimoiy tarmoqlarda vaqtni nazorat qilish va addiction oldini olish", en: "Controlling time on social media and preventing addiction", ru: "Контроль времени в соцсетях и предотвращение зависимости" },
            { uz: "Telefon uchun", en: "For phone", ru: "Для телефона" },
            { uz: "Internet uchun", en: "For internet", ru: "Для интернета" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Data broker nima?", en: "What is a data broker?", ru: "Что такое брокер данных?" },
          options: [
            { uz: "Bank xodimi", en: "Bank employee", ru: "Сотрудник банка" },
            { uz: "Shaxsiy ma'lumotlarni to'plovchi va sotuvchi kompaniya", en: "Company that collects and sells personal data", ru: "Компания, собирающая и продающая личные данные" },
            { uz: "Dasturchi", en: "Programmer", ru: "Программист" },
            { uz: "Dizayner", en: "Designer", ru: "Дизайнер" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Social media detox nima?", en: "What is social media detox?", ru: "Что такое детокс от соцсетей?" },
          options: [
            { uz: "Yangi akkaunt ochish", en: "Opening new account", ru: "Открытие нового аккаунта" },
            { uz: "Ijtimoiy tarmoqlardan vaqtinchalik voz kechish", en: "Temporarily abstaining from social media", ru: "Временный отказ от соцсетей" },
            { uz: "Ko'proq post qilish", en: "Posting more", ru: "Больше публикаций" },
            { uz: "Yangi do'stlar qo'shish", en: "Adding new friends", ru: "Добавление новых друзей" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Ijtimoiy tarmoqlarda eng xavfsiz parol qaysi?", en: "Which is the safest password for social media?", ru: "Какой пароль самый безопасный для соцсетей?" },
          options: [
            { uz: "instagram123", en: "instagram123", ru: "instagram123" },
            { uz: "Tug'ilgan sana", en: "Birth date", ru: "Дата рождения" },
            { uz: "Uzun, murakkab, noyob parol", en: "Long, complex, unique password", ru: "Длинный, сложный, уникальный пароль" },
            { uz: "Ism + raqam", en: "Name + number", ru: "Имя + число" }
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 5,
      title: { uz: "Tarmoq xavfsizligi", en: "Network Security", ru: "Сетевая безопасность" },
      duration: "30",
      difficulty: { uz: "Qiyin", en: "Hard", ru: "Сложный" },
      stars: 3,
      questions: [
        {
          question: { uz: "Firewall nima?", en: "What is a firewall?", ru: "Что такое файрвол?" },
          options: [
            { uz: "Jismoniy devor", en: "Physical wall", ru: "Физическая стена" },
            { uz: "Tarmoq trafikini filtrlovchi tizim", en: "System that filters network traffic", ru: "Система, фильтрующая сетевой трафик" },
            { uz: "Antivirus dasturi", en: "Antivirus software", ru: "Антивирусная программа" },
            { uz: "Router turi", en: "Type of router", ru: "Тип роутера" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "DDoS hujumi nima?", en: "What is a DDoS attack?", ru: "Что такое DDoS-атака?" },
          options: [
            { uz: "Parol o'g'irlash", en: "Password stealing", ru: "Кража пароля" },
            { uz: "Serverni ortiqcha so'rovlar bilan to'ldirish", en: "Overwhelming server with too many requests", ru: "Перегрузка сервера чрезмерными запросами" },
            { uz: "Ma'lumotlarni shifrlash", en: "Encrypting data", ru: "Шифрование данных" },
            { uz: "Virus yuborish", en: "Sending virus", ru: "Отправка вируса" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "IP manzil nima?", en: "What is an IP address?", ru: "Что такое IP-адрес?" },
          options: [
            { uz: "Email manzili", en: "Email address", ru: "Email адрес" },
            { uz: "Qurilmaning tarmoqdagi yagona identifikatori", en: "Device's unique identifier on network", ru: "Уникальный идентификатор устройства в сети" },
            { uz: "Telefon raqami", en: "Phone number", ru: "Номер телефона" },
            { uz: "Parol turi", en: "Type of password", ru: "Тип пароля" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Port nima?", en: "What is a port?", ru: "Что такое порт?" },
          options: [
            { uz: "Kompyuter qismi", en: "Computer part", ru: "Часть компьютера" },
            { uz: "Tarmoq xizmatlariga kirish nuqtasi", en: "Entry point to network services", ru: "Точка входа к сетевым сервисам" },
            { uz: "Kabel turi", en: "Type of cable", ru: "Тип кабеля" },
            { uz: "Monitor", en: "Monitor", ru: "Монитор" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "SSL/TLS nima uchun ishlatiladi?", en: "What is SSL/TLS used for?", ru: "Для чего используется SSL/TLS?" },
          options: [
            { uz: "Tezlikni oshirish", en: "Increasing speed", ru: "Увеличение скорости" },
            { uz: "Ma'lumotlarni shifrlash", en: "Encrypting data", ru: "Шифрование данных" },
            { uz: "Viruslarni yo'q qilish", en: "Removing viruses", ru: "Удаление вирусов" },
            { uz: "Reklama bloklash", en: "Blocking ads", ru: "Блокировка рекламы" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Intrusion Detection System (IDS) nima qiladi?", en: "What does an Intrusion Detection System do?", ru: "Что делает система обнаружения вторжений?" },
          options: [
            { uz: "Internet tezligini oshiradi", en: "Increases internet speed", ru: "Увеличивает скорость интернета" },
            { uz: "Tarmoqdagi shubhali faoliyatni aniqlaydi", en: "Detects suspicious activity on network", ru: "Обнаруживает подозрительную активность в сети" },
            { uz: "Fayllarni saqlaydi", en: "Stores files", ru: "Хранит файлы" },
            { uz: "Email yuboradi", en: "Sends emails", ru: "Отправляет email" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "MAC manzili nima?", en: "What is a MAC address?", ru: "Что такое MAC-адрес?" },
          options: [
            { uz: "Apple kompyuteri manzili", en: "Apple computer address", ru: "Адрес компьютера Apple" },
            { uz: "Tarmoq qurilmasining fizik manzili", en: "Physical address of network device", ru: "Физический адрес сетевого устройства" },
            { uz: "Email manzili", en: "Email address", ru: "Email адрес" },
            { uz: "Web sayt manzili", en: "Website address", ru: "Адрес сайта" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "DNS nima?", en: "What is DNS?", ru: "Что такое DNS?" },
          options: [
            { uz: "Xavfsizlik protokoli", en: "Security protocol", ru: "Протокол безопасности" },
            { uz: "Domen nomlarini IP manzillarga tarjima qiluvchi tizim", en: "System translating domain names to IP addresses", ru: "Система, переводящая доменные имена в IP-адреса" },
            { uz: "Antivirus turi", en: "Type of antivirus", ru: "Тип антивируса" },
            { uz: "Firewall turi", en: "Type of firewall", ru: "Тип файрвола" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "WPA3 nima?", en: "What is WPA3?", ru: "Что такое WPA3?" },
          options: [
            { uz: "Yangi smartfon", en: "New smartphone", ru: "Новый смартфон" },
            { uz: "Wi-Fi xavfsizlik protokoli", en: "Wi-Fi security protocol", ru: "Протокол безопасности Wi-Fi" },
            { uz: "Kompyuter o'yini", en: "Computer game", ru: "Компьютерная игра" },
            { uz: "Antivirus dasturi", en: "Antivirus software", ru: "Антивирусная программа" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Zero-day vulnerability nima?", en: "What is a zero-day vulnerability?", ru: "Что такое уязвимость нулевого дня?" },
          options: [
            { uz: "Kunlik yangilanish", en: "Daily update", ru: "Ежедневное обновление" },
            { uz: "Hali tuzatilmagan va noma'lum zaiflik", en: "Unknown and unpatched vulnerability", ru: "Неизвестная и неисправленная уязвимость" },
            { uz: "Bepul dastur", en: "Free software", ru: "Бесплатное ПО" },
            { uz: "Yangi xususiyat", en: "New feature", ru: "Новая функция" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Penetration testing nima?", en: "What is penetration testing?", ru: "Что такое тестирование на проникновение?" },
          options: [
            { uz: "Yangi dastur o'rnatish", en: "Installing new software", ru: "Установка нового ПО" },
            { uz: "Tizim xavfsizligini sinab ko'rish uchun hujumlarni simulyatsiya qilish", en: "Simulating attacks to test system security", ru: "Симуляция атак для проверки безопасности системы" },
            { uz: "Tarmoq tezligini tekshirish", en: "Checking network speed", ru: "Проверка скорости сети" },
            { uz: "Antivirus skanerlash", en: "Antivirus scanning", ru: "Сканирование антивирусом" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Sandbox muhiti nima uchun ishlatiladi?", en: "What is a sandbox environment used for?", ru: "Для чего используется sandbox-среда?" },
          options: [
            { uz: "O'yin o'ynash", en: "Playing games", ru: "Игры" },
            { uz: "Shubhali dasturlarni xavfsiz muhitda tekshirish", en: "Testing suspicious software in safe environment", ru: "Проверка подозрительного ПО в безопасной среде" },
            { uz: "Rasmlarni tahrirlash", en: "Editing photos", ru: "Редактирование фото" },
            { uz: "Musiqa tinglash", en: "Listening to music", ru: "Прослушивание музыки" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Packet sniffing nima?", en: "What is packet sniffing?", ru: "Что такое перехват пакетов?" },
          options: [
            { uz: "Pochtani tekshirish", en: "Checking mail", ru: "Проверка почты" },
            { uz: "Tarmoq trafikini ushlash va tahlil qilish", en: "Capturing and analyzing network traffic", ru: "Захват и анализ сетевого трафика" },
            { uz: "Fayllarni yuborish", en: "Sending files", ru: "Отправка файлов" },
            { uz: "Dastur o'rnatish", en: "Installing software", ru: "Установка ПО" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "ARP spoofing nima?", en: "What is ARP spoofing?", ru: "Что такое ARP-спуфинг?" },
          options: [
            { uz: "Tarmoq tezligini oshirish", en: "Increasing network speed", ru: "Увеличение скорости сети" },
            { uz: "MAC manzillarni soxtalashtirish orqali trafikni yo'naltirish", en: "Redirecting traffic by faking MAC addresses", ru: "Перенаправление трафика путем подделки MAC-адресов" },
            { uz: "Yangi qurilma ulash", en: "Connecting new device", ru: "Подключение нового устройства" },
            { uz: "Internet ulash", en: "Connecting internet", ru: "Подключение интернета" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "VLAN nima?", en: "What is VLAN?", ru: "Что такое VLAN?" },
          options: [
            { uz: "Virtual LAN - tarmoqni mantiqiy segmentlarga bo'lish", en: "Virtual LAN - logically segmenting network", ru: "Виртуальная LAN - логическое сегментирование сети" },
            { uz: "VPN turi", en: "Type of VPN", ru: "Тип VPN" },
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" },
            { uz: "Firewall", en: "Firewall", ru: "Файрвол" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Man-in-the-middle hujumidan qanday himoyalanish mumkin?", en: "How to protect from man-in-the-middle attack?", ru: "Как защититься от атаки посредника?" },
          options: [
            { uz: "Ochiq Wi-Fi ishlatish", en: "Using open Wi-Fi", ru: "Использование открытого Wi-Fi" },
            { uz: "VPN va HTTPS ishlatish", en: "Using VPN and HTTPS", ru: "Использование VPN и HTTPS" },
            { uz: "Antivirus o'chirish", en: "Disabling antivirus", ru: "Отключение антивируса" },
            { uz: "Parolni osonlashtirish", en: "Simplifying password", ru: "Упрощение пароля" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Honeypot nima?", en: "What is a honeypot?", ru: "Что такое honeypot?" },
          options: [
            { uz: "Asal idishi", en: "Honey container", ru: "Горшок с медом" },
            { uz: "Hackerlarni jalb qilish uchun qo'yilgan tuzoq tizim", en: "Trap system to attract hackers", ru: "Ловушка для привлечения хакеров" },
            { uz: "Antivirus turi", en: "Type of antivirus", ru: "Тип антивируса" },
            { uz: "VPN turi", en: "Type of VPN", ru: "Тип VPN" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Network segmentation nima uchun muhim?", en: "Why is network segmentation important?", ru: "Почему важна сегментация сети?" },
          options: [
            { uz: "Tarmoq tezligini oshirish", en: "Increasing network speed", ru: "Увеличение скорости сети" },
            { uz: "Hujum tarqalishini cheklash", en: "Limiting attack spread", ru: "Ограничение распространения атаки" },
            { uz: "Arzonroq", en: "Cheaper", ru: "Дешевле" },
            { uz: "Osonroq boshqarish", en: "Easier management", ru: "Легче управлять" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "SIEM nima?", en: "What is SIEM?", ru: "Что такое SIEM?" },
          options: [
            { uz: "Xavfsizlik hodisalarini boshqarish tizimi", en: "Security event management system", ru: "Система управления событиями безопасности" },
            { uz: "Antivirus turi", en: "Type of antivirus", ru: "Тип антивируса" },
            { uz: "Firewall turi", en: "Type of firewall", ru: "Тип файрвола" },
            { uz: "VPN turi", en: "Type of VPN", ru: "Тип VPN" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Lateral movement nima?", en: "What is lateral movement?", ru: "Что такое боковое перемещение?" },
          options: [
            { uz: "Jismoniy harakat", en: "Physical movement", ru: "Физическое движение" },
            { uz: "Hackerning tarmoq ichida bir tizimdan boshqasiga o'tishi", en: "Hacker moving from one system to another within network", ru: "Перемещение хакера от одной системы к другой в сети" },
            { uz: "Tarmoq kabeli", en: "Network cable", ru: "Сетевой кабель" },
            { uz: "Router sozlash", en: "Router setup", ru: "Настройка роутера" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "SOC nima?", en: "What is SOC?", ru: "Что такое SOC?" },
          options: [
            { uz: "Socket turi", en: "Type of socket", ru: "Тип сокета" },
            { uz: "Security Operations Center - xavfsizlik amaliyotlari markazi", en: "Security Operations Center", ru: "Центр операций безопасности" },
            { uz: "Tarmoq kabeli", en: "Network cable", ru: "Сетевой кабель" },
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Encryption at rest nima?", en: "What is encryption at rest?", ru: "Что такое шифрование в состоянии покоя?" },
          options: [
            { uz: "Uzatilayotgan ma'lumotlarni shifrlash", en: "Encrypting data in transit", ru: "Шифрование передаваемых данных" },
            { uz: "Saqlanayotgan ma'lumotlarni shifrlash", en: "Encrypting stored data", ru: "Шифрование хранимых данных" },
            { uz: "Parolni shifrlash", en: "Encrypting password", ru: "Шифрование пароля" },
            { uz: "Email shifrlash", en: "Encrypting email", ru: "Шифрование email" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Endpoint Detection and Response (EDR) nima?", en: "What is Endpoint Detection and Response?", ru: "Что такое EDR?" },
          options: [
            { uz: "Router turi", en: "Type of router", ru: "Тип роутера" },
            { uz: "Qurilmalardagi tahdidlarni aniqlash va javob berish tizimi", en: "System for detecting and responding to threats on devices", ru: "Система обнаружения и реагирования на угрозы на устройствах" },
            { uz: "Email filtri", en: "Email filter", ru: "Email фильтр" },
            { uz: "VPN turi", en: "Type of VPN", ru: "Тип VPN" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Threat intelligence nima?", en: "What is threat intelligence?", ru: "Что такое киберразведка?" },
          options: [
            { uz: "Xavflar haqida ma'lumot to'plash va tahlil qilish", en: "Collecting and analyzing information about threats", ru: "Сбор и анализ информации об угрозах" },
            { uz: "Antivirus yangilanishi", en: "Antivirus update", ru: "Обновление антивируса" },
            { uz: "Firewall sozlash", en: "Firewall setup", ru: "Настройка файрвола" },
            { uz: "VPN o'rnatish", en: "Installing VPN", ru: "Установка VPN" }
          ],
          correctAnswer: 0
        },
        {
          question: { uz: "Incident response plan nima?", en: "What is an incident response plan?", ru: "Что такое план реагирования на инциденты?" },
          options: [
            { uz: "Tartibsizlik", en: "Disorder", ru: "Беспорядок" },
            { uz: "Xavfsizlik hodisalariga javob berish tartibi", en: "Procedure for responding to security incidents", ru: "Порядок реагирования на инциденты безопасности" },
            { uz: "Yangi dastur rejasi", en: "New software plan", ru: "План нового ПО" },
            { uz: "Marketing rejasi", en: "Marketing plan", ru: "Маркетинговый план" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Defense in depth strategiyasi nima?", en: "What is defense in depth strategy?", ru: "Что такое стратегия эшелонированной защиты?" },
          options: [
            { uz: "Bitta himoya qatlamidan foydalanish", en: "Using single defense layer", ru: "Использование одного уровня защиты" },
            { uz: "Ko'p qatlamli himoya tizimi", en: "Multi-layered defense system", ru: "Многоуровневая система защиты" },
            { uz: "Himoyasiz qolish", en: "Remaining unprotected", ru: "Оставаться незащищенным" },
            { uz: "Faqat antivirus ishlatish", en: "Using only antivirus", ru: "Использование только антивируса" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Business continuity plan nima?", en: "What is a business continuity plan?", ru: "Что такое план непрерывности бизнеса?" },
          options: [
            { uz: "Kompaniya yopilishi", en: "Company closure", ru: "Закрытие компании" },
            { uz: "Favqulodda vaziyatlarda ishni davom ettirish rejasi", en: "Plan to continue operations during emergencies", ru: "План продолжения работы в чрезвычайных ситуациях" },
            { uz: "Yangi biznes ochish", en: "Opening new business", ru: "Открытие нового бизнеса" },
            { uz: "Marketing rejasi", en: "Marketing plan", ru: "Маркетинговый план" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Disaster recovery site nima?", en: "What is a disaster recovery site?", ru: "Что такое резервная площадка?" },
          options: [
            { uz: "Turistik joy", en: "Tourist place", ru: "Туристическое место" },
            { uz: "Asosiy tizim ishlamay qolganda ishlatiladvigan zaxira infratuzilma", en: "Backup infrastructure when main system fails", ru: "Резервная инфраструктура при отказе основной системы" },
            { uz: "Yangi ofis", en: "New office", ru: "Новый офис" },
            { uz: "Ma'lumotlar markazi", en: "Data center", ru: "Дата-центр" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Log management nima uchun muhim?", en: "Why is log management important?", ru: "Почему важно управление логами?" },
          options: [
            { uz: "Disk joyini egallaydi", en: "Takes disk space", ru: "Занимает место на диске" },
            { uz: "Xavfsizlik hodisalarini kuzatish va tahlil qilish", en: "Monitoring and analyzing security events", ru: "Мониторинг и анализ событий безопасности" },
            { uz: "Kompyuterni sekinlashtiradi", en: "Slows down computer", ru: "Замедляет компьютер" },
            { uz: "Keraksiz", en: "Unnecessary", ru: "Не нужно" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Vulnerability assessment va penetration testing farqi?", en: "Difference between vulnerability assessment and penetration testing?", ru: "Разница между оценкой уязвимостей и тестированием на проникновение?" },
          options: [
            { uz: "Farqi yo'q", en: "No difference", ru: "Нет разницы" },
            { uz: "VA zaifliklarni aniqlaydi, PT ulardan foydalanib ko'radi", en: "VA identifies vulnerabilities, PT tries to exploit them", ru: "VA выявляет уязвимости, PT пытается их эксплуатировать" },
            { uz: "PT arzonroq", en: "PT is cheaper", ru: "PT дешевле" },
            { uz: "VA qiyinroq", en: "VA is harder", ru: "VA сложнее" }
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 6,
      title: { uz: "Malware va viruslar", en: "Malware and Viruses", ru: "Вредоносные программы и вирусы" },
      duration: "25",
      difficulty: { uz: "Qiyin", en: "Hard", ru: "Сложный" },
      stars: 3,
      questions: [
        {
          question: { uz: "Virus va worm o'rtasidagi asosiy farq?", en: "Main difference between virus and worm?", ru: "Основное отличие вируса от червя?" },
          options: [
            { uz: "Farqi yo'q", en: "No difference", ru: "Нет разницы" },
            { uz: "Worm o'z-o'zidan tarqaladi, virus esa host fayl kerak", en: "Worm self-replicates, virus needs host file", ru: "Червь самораспространяется, вирусу нужен файл-носитель" },
            { uz: "Virus kattaroq", en: "Virus is bigger", ru: "Вирус больше" },
            { uz: "Worm xavfsizroq", en: "Worm is safer", ru: "Червь безопаснее" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Trojan nima?", en: "What is a Trojan?", ru: "Что такое троян?" },
          options: [
            { uz: "Foydali dastur", en: "Useful software", ru: "Полезное ПО" },
            { uz: "Foydali ko'rinib, yashirin zararli dastur", en: "Appears useful but has hidden malicious code", ru: "Выглядит полезным, но содержит скрытый вредоносный код" },
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" },
            { uz: "O'yin", en: "Game", ru: "Игра" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Ransomware qanday ishlaydi?", en: "How does ransomware work?", ru: "Как работает вымогатель?" },
          options: [
            { uz: "Fayllarni o'chiradi", en: "Deletes files", ru: "Удаляет файлы" },
            { uz: "Fayllarni shifrlaydi va pul talab qiladi", en: "Encrypts files and demands money", ru: "Шифрует файлы и требует деньги" },
            { uz: "Kompyuterni tezlashtiradi", en: "Speeds up computer", ru: "Ускоряет компьютер" },
            { uz: "Viruslarni yo'q qiladi", en: "Removes viruses", ru: "Удаляет вирусы" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Spyware nima qiladi?", en: "What does spyware do?", ru: "Что делает шпионское ПО?" },
          options: [
            { uz: "Fayllarni saqlaydi", en: "Stores files", ru: "Хранит файлы" },
            { uz: "Foydalanuvchi faoliyatini kuzatadi", en: "Monitors user activity", ru: "Следит за активностью пользователя" },
            { uz: "O'yinlarni tezlashtiradi", en: "Speeds up games", ru: "Ускоряет игры" },
            { uz: "Internetni tezlashtiradi", en: "Speeds up internet", ru: "Ускоряет интернет" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Rootkit nima?", en: "What is a rootkit?", ru: "Что такое руткит?" },
          options: [
            { uz: "O'simlik ildizi", en: "Plant root", ru: "Корень растения" },
            { uz: "Tizimda yashirincha hukmronlik qiluvchi zararli dastur", en: "Malware that secretly controls system", ru: "Вредоносное ПО, тайно контролирующее систему" },
            { uz: "Antivirus turi", en: "Type of antivirus", ru: "Тип антивируса" },
            { uz: "Foydali vosita", en: "Useful tool", ru: "Полезный инструмент" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Keylogger nima?", en: "What is a keylogger?", ru: "Что такое кейлоггер?" },
          options: [
            { uz: "Klaviatura", en: "Keyboard", ru: "Клавиатура" },
            { uz: "Tugmalar bosilishini yozib oluvchi dastur", en: "Software that records keystrokes", ru: "Программа, записывающая нажатия клавиш" },
            { uz: "Musiqa pleyeri", en: "Music player", ru: "Музыкальный плеер" },
            { uz: "Rasm tahrirlovchi", en: "Photo editor", ru: "Редактор фото" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Adware nima?", en: "What is adware?", ru: "Что такое рекламное ПО?" },
          options: [
            { uz: "Antivirus", en: "Antivirus", ru: "Антивирус" },
            { uz: "Keraksiz reklamalarni ko'rsatuvchi dastur", en: "Software showing unwanted ads", ru: "Программа, показывающая нежелательную рекламу" },
            { uz: "Foydali dastur", en: "Useful software", ru: "Полезное ПО" },
            { uz: "O'yin", en: "Game", ru: "Игра" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Botnet nima?", en: "What is a botnet?", ru: "Что такое ботнет?" },
          options: [
            { uz: "Robot o'yinchoq", en: "Robot toy", ru: "Робот-игрушка" },
            { uz: "Zararlangan kompyuterlar tarmog'i", en: "Network of infected computers", ru: "Сеть заражённых компьютеров" },
            { uz: "Ijtimoiy tarmoq", en: "Social network", ru: "Социальная сеть" },
            { uz: "VPN turi", en: "Type of VPN", ru: "Тип VPN" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Polymorphic malware nima?", en: "What is polymorphic malware?", ru: "Что такое полиморфное ПО?" },
          options: [
            { uz: "Bir xil kod", en: "Same code", ru: "Одинаковый код" },
            { uz: "Har safar o'zgaruvchi kod bilan antivirus dan qochuvchi zararli dastur", en: "Malware evading antivirus by changing code each time", ru: "Вредоносное ПО, избегающее антивирус путем изменения кода" },
            { uz: "Foydali dastur", en: "Useful software", ru: "Полезное ПО" },
            { uz: "O'yin", en: "Game", ru: "Игра" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Fileless malware xususiyati?", en: "Characteristic of fileless malware?", ru: "Особенность бесфайлового ПО?" },
          options: [
            { uz: "Katta hajm", en: "Large size", ru: "Большой размер" },
            { uz: "Diskda fayl sifatida saqlanmaydi", en: "Not stored as file on disk", ru: "Не сохраняется как файл на диске" },
            { uz: "Juda sekin", en: "Very slow", ru: "Очень медленно" },
            { uz: "Faqat Windows da", en: "Only on Windows", ru: "Только на Windows" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Logic bomb nima?", en: "What is a logic bomb?", ru: "Что такое логическая бомба?" },
          options: [
            { uz: "Jismoniy bomba", en: "Physical bomb", ru: "Физическая бомба" },
            { uz: "Ma'lum shartlarda ishga tushadigan zararli kod", en: "Malicious code triggered by certain conditions", ru: "Вредоносный код, срабатывающий при определённых условиях" },
            { uz: "O'yin turi", en: "Type of game", ru: "Тип игры" },
            { uz: "Matematik formula", en: "Math formula", ru: "Математическая формула" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Scareware nima qiladi?", en: "What does scareware do?", ru: "Что делает scareware?" },
          options: [
            { uz: "Qo'rqinchli filmlar ko'rsatadi", en: "Shows scary movies", ru: "Показывает страшные фильмы" },
            { uz: "Soxta xavf haqida ogohlantiradi va pul talab qiladi", en: "Shows fake warnings and demands money", ru: "Показывает ложные предупреждения и требует деньги" },
            { uz: "O'yinlar o'rnatadi", en: "Installs games", ru: "Устанавливает игры" },
            { uz: "Kompyuterni tezlashtiradi", en: "Speeds up computer", ru: "Ускоряет компьютер" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Cryptojacking nima?", en: "What is cryptojacking?", ru: "Что такое криптоджекинг?" },
          options: [
            { uz: "Cryptocurrency sotib olish", en: "Buying cryptocurrency", ru: "Покупка криптовалюты" },
            { uz: "Ruxsatsiz kompyuterni kripto mining uchun ishlatish", en: "Unauthorized use of computer for crypto mining", ru: "Несанкционированное использование компьютера для майнинга" },
            { uz: "Pul o'tkazish", en: "Money transfer", ru: "Денежный перевод" },
            { uz: "Online shopping", en: "Online shopping", ru: "Онлайн покупки" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Malware qanday tarqaladi?", en: "How does malware spread?", ru: "Как распространяется malware?" },
          options: [
            { uz: "Faqat CD orqali", en: "Only through CD", ru: "Только через CD" },
            { uz: "Email, yuklash, USB, soxta saytlar", en: "Email, downloads, USB, fake sites", ru: "Email, загрузки, USB, поддельные сайты" },
            { uz: "Faqat telefon orqali", en: "Only through phone", ru: "Только через телефон" },
            { uz: "Havo orqali", en: "Through air", ru: "Через воздух" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Drive-by download nima?", en: "What is a drive-by download?", ru: "Что такое drive-by загрузка?" },
          options: [
            { uz: "Avtomobilda yuklab olish", en: "Downloading in car", ru: "Загрузка в машине" },
            { uz: "Saytga tashrif buyurganda ruxsatsiz yuklaniladigan zararli dastur", en: "Malware downloaded without permission when visiting site", ru: "Malware, загружаемый без разрешения при посещении сайта" },
            { uz: "USB dan yuklab olish", en: "Downloading from USB", ru: "Загрузка с USB" },
            { uz: "Email dan yuklab olish", en: "Downloading from email", ru: "Загрузка из email" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Antivirus dasturi qanday ishlaydi?", en: "How does antivirus software work?", ru: "Как работает антивирус?" },
          options: [
            { uz: "Faqat internet orqali", en: "Only through internet", ru: "Только через интернет" },
            { uz: "Signature va heuristic tahlil orqali zararli dasturlarni aniqlaydi", en: "Detects malware through signature and heuristic analysis", ru: "Обнаруживает malware через сигнатурный и эвристический анализ" },
            { uz: "Faqat fayllarni o'chiradi", en: "Only deletes files", ru: "Только удаляет файлы" },
            { uz: "Internet tezligini oshiradi", en: "Increases internet speed", ru: "Увеличивает скорость интернета" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Heuristic analysis nima?", en: "What is heuristic analysis?", ru: "Что такое эвристический анализ?" },
          options: [
            { uz: "Matematik tahlil", en: "Mathematical analysis", ru: "Математический анализ" },
            { uz: "Noma'lum zararli dasturlarni xatti-harakatlariga qarab aniqlash", en: "Detecting unknown malware by behavior", ru: "Обнаружение неизвестного malware по поведению" },
            { uz: "Matnni tahlil qilish", en: "Analyzing text", ru: "Анализ текста" },
            { uz: "Rasmlarni tahlil qilish", en: "Analyzing images", ru: "Анализ изображений" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Sandbox nima uchun ishlatiladi?", en: "What is sandbox used for?", ru: "Для чего используется sandbox?" },
          options: [
            { uz: "Bolalar o'yini", en: "Children's game", ru: "Детская игра" },
            { uz: "Shubhali fayllarni xavfsiz muhitda tekshirish", en: "Testing suspicious files in safe environment", ru: "Проверка подозрительных файлов в безопасной среде" },
            { uz: "Musiqa tinglash", en: "Listening to music", ru: "Прослушивание музыки" },
            { uz: "Video ko'rish", en: "Watching video", ru: "Просмотр видео" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Zero-day exploit nima?", en: "What is a zero-day exploit?", ru: "Что такое zero-day эксплойт?" },
          options: [
            { uz: "Kunlik yangilanish", en: "Daily update", ru: "Ежедневное обновление" },
            { uz: "Hali tuzatilmagan zaiflikdan foydalanadigan hujum", en: "Attack exploiting unpatched vulnerability", ru: "Атака, использующая неисправленную уязвимость" },
            { uz: "Bepul dastur", en: "Free software", ru: "Бесплатное ПО" },
            { uz: "O'yin turi", en: "Type of game", ru: "Тип игры" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Malware zararlagan kompyuterni qanday tozalash mumkin?", en: "How to clean a malware-infected computer?", ru: "Как очистить заражённый malware компьютер?" },
          options: [
            { uz: "Kompyuterni tashlab yuborish", en: "Throw away computer", ru: "Выбросить компьютер" },
            { uz: "Antivirus scan, safe mode, zararlangan fayllarni o'chirish", en: "Antivirus scan, safe mode, delete infected files", ru: "Сканирование антивирусом, безопасный режим, удаление заражённых файлов" },
            { uz: "Hech narsa qilmaslik", en: "Do nothing", ru: "Ничего не делать" },
            { uz: "Faqat restart qilish", en: "Just restart", ru: "Просто перезагрузить" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Safe Mode nima uchun foydali?", en: "Why is Safe Mode useful?", ru: "Чем полезен безопасный режим?" },
          options: [
            { uz: "O'yinlar uchun", en: "For games", ru: "Для игр" },
            { uz: "Minimal drayverlar bilan zararli dasturlarni osonroq olib tashlash", en: "Easier malware removal with minimal drivers", ru: "Легче удалить malware с минимальными драйверами" },
            { uz: "Tezroq ishlaydi", en: "Works faster", ru: "Работает быстрее" },
            { uz: "Chiroyli ko'rinish", en: "Nice appearance", ru: "Красивый вид" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Malware Bytes nima?", en: "What is Malwarebytes?", ru: "Что такое Malwarebytes?" },
          options: [
            { uz: "Zararli dastur", en: "Malicious software", ru: "Вредоносное ПО" },
            { uz: "Mashhur anti-malware dasturi", en: "Popular anti-malware software", ru: "Популярная анти-malware программа" },
            { uz: "O'yin", en: "Game", ru: "Игра" },
            { uz: "Video pleyeri", en: "Video player", ru: "Видеоплеер" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Malware infektsiyasi belgilaridan biri?", en: "One sign of malware infection?", ru: "Один признак заражения malware?" },
          options: [
            { uz: "Kompyuter tez ishlaydi", en: "Computer works fast", ru: "Компьютер работает быстро" },
            { uz: "Kompyuter sekinlashadi va noma'lum dasturlar paydo bo'ladi", en: "Computer slows and unknown programs appear", ru: "Компьютер замедляется и появляются неизвестные программы" },
            { uz: "Internet tezlashadi", en: "Internet speeds up", ru: "Интернет ускоряется" },
            { uz: "Ekran yorqinroq bo'ladi", en: "Screen becomes brighter", ru: "Экран становится ярче" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Pirat dasturlarning xavfi nimada?", en: "What is the danger of pirated software?", ru: "В чём опасность пиратского ПО?" },
          options: [
            { uz: "Arzon", en: "Cheap", ru: "Дешево" },
            { uz: "Ko'pincha malware bilan birga keladi", en: "Often comes with malware", ru: "Часто содержит malware" },
            { uz: "Xavfsiz", en: "Safe", ru: "Безопасно" },
            { uz: "Tez ishlaydi", en: "Works fast", ru: "Работает быстро" }
          ],
          correctAnswer: 1
        },
        {
          question: { uz: "Malware Analysis nima?", en: "What is Malware Analysis?", ru: "Что такое анализ malware?" },
          options: [
            { uz: "Malware yaratish", en: "Creating malware", ru: "Создание malware" },
            { uz: "Zararli dasturlarni o'rganish va tushunish", en: "Studying and understanding malicious software", ru: "Изучение и понимание вредоносного ПО" },
            { uz: "Antivirus o'chirish", en: "Disabling antivirus", ru: "Отключение антивируса" },
            { uz: "Kompyuterni buzish", en: "Breaking computer", ru: "Взлом компьютера" }
          ],
          correctAnswer: 1
        }
      ]
    }
  ];

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const getDifficultyColor = (stars: number) => {
    if (stars === 1) return 'text-green-500';
    if (stars === 2) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedTest && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    let correct = 0;
    selectedTest.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedTest.questions.length) * 100);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setShowCertificate(false);
  };

  const startTest = (test: Test) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setShowCertificate(false);
  };

  // Certificate View
  if (showCertificate && selectedTest) {
    const score = calculateScore();
    const currentDate = new Date().toLocaleDateString(getLang() === 'uz' ? 'uz-UZ' : getLang() === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <Layout>
        <section className="py-12 bg-background min-h-screen">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-3xl p-8 border-4 border-primary/30 shadow-2xl">
              <div className="text-center mb-8">
                <Award className="w-20 h-20 mx-auto text-primary mb-4" />
                <h1 className="text-3xl font-bold text-primary mb-2">
                  {getLang() === 'en' ? 'Certificate of Completion' : getLang() === 'ru' ? 'Сертификат об окончании' : 'Tugatish sertifikati'}
                </h1>
                <p className="text-muted-foreground">CyberSafe Academy</p>
              </div>

              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground mb-2">
                  {getLang() === 'en' ? 'This certifies that' : getLang() === 'ru' ? 'Настоящим удостоверяется, что' : 'Ushbu sertifikat tasdiqlaydi'}
                </p>
                <p className="text-2xl font-bold text-foreground mb-4">
                  {getLang() === 'en' ? 'Student' : getLang() === 'ru' ? 'Студент' : "O'quvchi"}
                </p>
                <p className="text-lg text-muted-foreground mb-2">
                  {getLang() === 'en' ? 'has successfully completed' : getLang() === 'ru' ? 'успешно завершил(а)' : 'muvaffaqiyatli yakunladi'}
                </p>
                <p className="text-xl font-semibold text-primary mb-4">
                  {selectedTest.title[getLang()]}
                </p>
                <p className="text-lg">
                  {getLang() === 'en' ? 'with a score of' : getLang() === 'ru' ? 'с результатом' : 'natija bilan'}{' '}
                  <span className="text-2xl font-bold text-green-500">{score}%</span>
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-6">
                <p>{currentDate}</p>
                <p>ID: CERT-{Date.now().toString(36).toUpperCase()}</p>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button onClick={() => setShowCertificate(false)} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {getLang() === 'en' ? 'Back' : getLang() === 'ru' ? 'Назад' : 'Orqaga'}
                </Button>
                <Button onClick={() => window.print()} className="bg-gradient-primary">
                  {getLang() === 'en' ? 'Print Certificate' : getLang() === 'ru' ? 'Распечатать' : "Sertifikatni chop etish"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Certificate View
  if (showCertificate && selectedTest) {
    const score = calculateScore();
    return (
      <Certificate
        testTitle={selectedTest.title[getLang()]}
        score={score}
        date={new Date().toLocaleDateString(getLang() === 'en' ? 'en-US' : getLang() === 'ru' ? 'ru-RU' : 'uz-UZ', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
        onClose={() => setShowCertificate(false)}
      />
    );
  }

  // Result View
  if (showResult && selectedTest) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <Layout>
        <section className="py-12 bg-background min-h-screen">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card rounded-2xl p-8 border border-border text-center">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {passed ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500" />
                )}
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {passed 
                  ? (getLang() === 'en' ? 'Congratulations!' : getLang() === 'ru' ? 'Поздравляем!' : 'Tabriklaymiz!')
                  : (getLang() === 'en' ? 'Try Again' : getLang() === 'ru' ? 'Попробуйте снова' : 'Qayta urinib ko\'ring')
                }
              </h2>

              <p className="text-muted-foreground mb-6">
                {selectedTest.title[getLang()]}
              </p>

              <div className="mb-8">
                <div className="text-5xl font-bold mb-2" style={{ color: passed ? '#22c55e' : '#ef4444' }}>
                  {score}%
                </div>
                <Progress value={score} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {getLang() === 'en' 
                    ? `${selectedAnswers.filter((a, i) => a === selectedTest.questions[i].correctAnswer).length} out of ${selectedTest.questions.length} correct`
                    : getLang() === 'ru'
                    ? `${selectedAnswers.filter((a, i) => a === selectedTest.questions[i].correctAnswer).length} из ${selectedTest.questions.length} правильных`
                    : `${selectedTest.questions.length} tadan ${selectedAnswers.filter((a, i) => a === selectedTest.questions[i].correctAnswer).length} tasi to'g'ri`
                  }
                </p>
              </div>

              {passed ? (
                <div className="bg-green-500/10 rounded-xl p-4 mb-6">
                  <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-500 font-medium">
                    {getLang() === 'en' 
                      ? 'You passed! You can get your certificate.'
                      : getLang() === 'ru'
                      ? 'Вы прошли! Вы можете получить сертификат.'
                      : "Siz o'tdingiz! Sertifikat olishingiz mumkin."
                    }
                  </p>
                </div>
              ) : (
                <div className="bg-red-500/10 rounded-xl p-4 mb-6">
                  <p className="text-red-500">
                    {getLang() === 'en' 
                      ? 'You need at least 70% to pass. Try again!'
                      : getLang() === 'ru'
                      ? 'Нужно минимум 70% для прохождения. Попробуйте снова!'
                      : "O'tish uchun kamida 70% kerak. Qayta urinib ko'ring!"
                    }
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {passed && (
                  <Button onClick={() => setShowCertificate(true)} className="bg-gradient-primary">
                    <Award className="w-4 h-4 mr-2" />
                    {getLang() === 'en' ? 'Get Certificate' : getLang() === 'ru' ? 'Получить сертификат' : 'Sertifikat olish'}
                  </Button>
                )}
                <Button onClick={resetTest} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {getLang() === 'en' ? 'Try Again' : getLang() === 'ru' ? 'Попробовать снова' : 'Qayta urinish'}
                </Button>
                <Button onClick={() => setSelectedTest(null)} variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {getLang() === 'en' ? 'Back to Tests' : getLang() === 'ru' ? 'К тестам' : 'Testlarga qaytish'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Test View
  if (selectedTest) {
    const question = selectedTest.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedTest.questions.length) * 100;

    return (
      <Layout>
        <section className="py-8 bg-background min-h-screen">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTest(null)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {getLang() === 'en' ? 'Exit Test' : getLang() === 'ru' ? 'Выйти из теста' : 'Testdan chiqish'}
              </Button>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{selectedTest.title[getLang()]}</h2>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} / {selectedTest.questions.length}
                </span>
              </div>

              <Progress value={progress} className="h-2 mb-8" />

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-6">{question.question[getLang()]}</h3>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-background hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-primary bg-primary text-white'
                            : 'border-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option[getLang()]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  onClick={handlePrev} 
                  variant="outline"
                  disabled={currentQuestion === 0}
                >
                  {getLang() === 'en' ? 'Previous' : getLang() === 'ru' ? 'Назад' : 'Oldingi'}
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-gradient-primary"
                >
                  {currentQuestion === selectedTest.questions.length - 1
                    ? (getLang() === 'en' ? 'Finish' : getLang() === 'ru' ? 'Завершить' : 'Yakunlash')
                    : (getLang() === 'en' ? 'Next' : getLang() === 'ru' ? 'Далее' : 'Keyingi')
                  }
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Tests List View
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t('tests')}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {getLang() === 'en' 
              ? 'Test your knowledge and get a certificate if you score 70% or higher'
              : getLang() === 'ru'
              ? 'Проверьте свои знания и получите сертификат при результате 70% или выше'
              : "Bilimlaringizni sinab ko'ring va 70% yoki undan yuqori ball olsangiz sertifikat oling"
            }
          </p>
        </div>
      </section>

      {/* Tests */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div 
                key={test.id} 
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex items-center gap-1 text-sm font-medium ${getDifficultyColor(test.stars)}`}>
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < test.stars ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                    {test.difficulty[getLang()]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-4">{test.title[getLang()]}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    <span>{test.questions.length} {getLang() === 'en' ? 'questions' : getLang() === 'ru' ? 'вопросов' : 'savol'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration} {getLang() === 'en' ? 'min' : getLang() === 'ru' ? 'мин' : 'min'}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => startTest(test)}
                >
                  {getLang() === 'en' ? 'Start Test' : getLang() === 'ru' ? 'Начать тест' : 'Testni boshlash'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tests;

from django.db import models
from django.utils import timezone


class ContactInfo(models.Model):
    """Aloqa ma'lumotlari"""
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=50, verbose_name="Telefon")
    address_uz = models.CharField(max_length=255, verbose_name="Manzil (O'zbek)")
    address_en = models.CharField(max_length=255, verbose_name="Address (English)")
    address_ru = models.CharField(max_length=255, verbose_name="Адрес (Русский)")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Aloqa ma'lumoti"
        verbose_name_plural = "Aloqa ma'lumotlari"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} - {self.phone}"


class SocialLink(models.Model):
    """Ijtimoiy tarmoq havolalari"""
    PLATFORM_CHOICES = [
        ('telegram', 'Telegram'),
        ('github', 'GitHub'),
        ('email', 'Email'),
        ('phone', 'Phone'),
    ]
    
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES, verbose_name="Platforma")
    url = models.URLField(verbose_name="Havola")
    label = models.CharField(max_length=100, verbose_name="Label")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    order = models.IntegerField(default=0, verbose_name="Tartib")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Ijtimoiy tarmoq havolasi"
        verbose_name_plural = "Ijtimoiy tarmoq havolalari"
        ordering = ['order', 'platform']

    def __str__(self):
        return f"{self.get_platform_display()} - {self.label}"


class Article(models.Model):
    """Maqolalar"""
    LEVEL_CHOICES = [
        ('beginner', 'Boshlang\'ich'),
        ('intermediate', 'O\'rta'),
        ('advanced', 'Yuqori'),
    ]
    
    title_uz = models.CharField(max_length=255, verbose_name="Sarlavha (O'zbek)")
    title_en = models.CharField(max_length=255, verbose_name="Title (English)")
    title_ru = models.CharField(max_length=255, verbose_name="Заголовок (Русский)")
    excerpt_uz = models.TextField(verbose_name="Qisqa matn (O'zbek)")
    excerpt_en = models.TextField(verbose_name="Excerpt (English)")
    excerpt_ru = models.TextField(verbose_name="Краткий текст (Русский)")
    author = models.CharField(max_length=100, default="Admin", verbose_name="Muallif")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner', verbose_name="Daraja")
    read_time = models.CharField(max_length=10, default="5 min", verbose_name="O'qish vaqti")
    is_published = models.BooleanField(default=True, verbose_name="Nashr qilingan")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Maqola"
        verbose_name_plural = "Maqolalar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_uz


class Video(models.Model):
    """Video darslar"""
    LEVEL_CHOICES = [
        ('beginner', 'Boshlang\'ich'),
        ('intermediate', 'O\'rta'),
        ('advanced', 'Yuqori'),
    ]
    
    title_uz = models.CharField(max_length=255, verbose_name="Sarlavha (O'zbek)")
    title_en = models.CharField(max_length=255, verbose_name="Title (English)")
    title_ru = models.CharField(max_length=255, verbose_name="Заголовок (Русский)")
    duration = models.CharField(max_length=10, verbose_name="Davomiyligi")
    views = models.IntegerField(default=0, verbose_name="Ko'rishlar soni")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner', verbose_name="Daraja")
    thumbnail = models.URLField(blank=True, null=True, verbose_name="Thumbnail URL")
    video_url = models.URLField(blank=True, null=True, verbose_name="Video URL")
    is_published = models.BooleanField(default=True, verbose_name="Nashr qilingan")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Video"
        verbose_name_plural = "Videolar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_uz


class Test(models.Model):
    """Testlar"""
    DIFFICULTY_CHOICES = [
        ('easy', 'Oson'),
        ('medium', 'O\'rtacha'),
        ('hard', 'Qiyin'),
    ]
    
    title_uz = models.CharField(max_length=255, verbose_name="Sarlavha (O'zbek)")
    title_en = models.CharField(max_length=255, verbose_name="Title (English)")
    title_ru = models.CharField(max_length=255, verbose_name="Заголовок (Русский)")
    questions_count = models.IntegerField(default=10, verbose_name="Savollar soni")
    duration = models.IntegerField(default=15, verbose_name="Davomiyligi (minut)")
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='easy', verbose_name="Qiyinlik")
    stars = models.IntegerField(default=1, verbose_name="Yulduzlar (1-3)")
    is_published = models.BooleanField(default=True, verbose_name="Nashr qilingan")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Test"
        verbose_name_plural = "Testlar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_uz


class Game(models.Model):
    """O'yinlar"""
    DIFFICULTY_CHOICES = [
        ('easy', 'Oson'),
        ('medium', 'O\'rtacha'),
        ('hard', 'Qiyin'),
    ]
    
    title_uz = models.CharField(max_length=255, verbose_name="Sarlavha (O'zbek)")
    title_en = models.CharField(max_length=255, verbose_name="Title (English)")
    title_ru = models.CharField(max_length=255, verbose_name="Заголовок (Русский)")
    description_uz = models.TextField(verbose_name="Tavsif (O'zbek)")
    description_en = models.TextField(verbose_name="Description (English)")
    description_ru = models.TextField(verbose_name="Описание (Русский)")
    icon = models.CharField(max_length=10, default="🎮", verbose_name="Icon")
    players_count = models.IntegerField(default=0, verbose_name="O'yinchilar soni")
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='easy', verbose_name="Qiyinlik")
    xp_reward = models.IntegerField(default=50, verbose_name="XP mukofoti")
    is_published = models.BooleanField(default=True, verbose_name="Nashr qilingan")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "O'yin"
        verbose_name_plural = "O'yinlar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title_uz


class FooterInfo(models.Model):
    """Footer ma'lumotlari"""
    author_name = models.CharField(max_length=100, verbose_name="Muallif ismi")
    creator_name = models.CharField(max_length=100, verbose_name="Yaratuvchi ismi")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Footer ma'lumoti"
        verbose_name_plural = "Footer ma'lumotlari"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} - {self.creator_name}"


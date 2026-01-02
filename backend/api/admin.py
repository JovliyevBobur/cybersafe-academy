from django.contrib import admin
from .models import (
    ContactInfo, SocialLink, Article, Video, Test, Game, FooterInfo
)


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['email', 'phone', 'address_uz', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['email', 'phone', 'address_uz', 'address_en', 'address_ru']
    list_editable = ['is_active']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'label', 'url', 'order', 'is_active', 'created_at']
    list_filter = ['platform', 'is_active', 'created_at']
    search_fields = ['platform', 'label', 'url']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'platform']


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title_uz', 'author', 'level', 'read_time', 'is_published', 'created_at']
    list_filter = ['level', 'is_published', 'created_at']
    search_fields = ['title_uz', 'title_en', 'title_ru', 'excerpt_uz', 'author']
    list_editable = ['is_published']
    prepopulated_fields = {}


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title_uz', 'duration', 'views', 'level', 'is_published', 'created_at']
    list_filter = ['level', 'is_published', 'created_at']
    search_fields = ['title_uz', 'title_en', 'title_ru']
    list_editable = ['is_published', 'views']
    readonly_fields = ['views']


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ['title_uz', 'questions_count', 'duration', 'difficulty', 'stars', 'is_published', 'created_at']
    list_filter = ['difficulty', 'stars', 'is_published', 'created_at']
    search_fields = ['title_uz', 'title_en', 'title_ru']
    list_editable = ['is_published', 'stars']
    fieldsets = (
        ('Asosiy ma\'lumotlar', {
            'fields': ('title_uz', 'title_en', 'title_ru', 'is_published')
        }),
        ('Test parametrlari', {
            'fields': ('questions_count', 'duration', 'difficulty', 'stars')
        }),
        ('Vaqt', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ['title_uz', 'icon', 'players_count', 'difficulty', 'xp_reward', 'is_published', 'created_at']
    list_filter = ['difficulty', 'is_published', 'created_at']
    search_fields = ['title_uz', 'title_en', 'title_ru', 'description_uz']
    list_editable = ['is_published', 'players_count', 'xp_reward']
    fieldsets = (
        ('Asosiy ma\'lumotlar', {
            'fields': ('title_uz', 'title_en', 'title_ru', 'description_uz', 'description_en', 'description_ru', 'icon', 'is_published')
        }),
        ('O\'yin parametrlari', {
            'fields': ('players_count', 'difficulty', 'xp_reward')
        }),
        ('Vaqt', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(FooterInfo)
class FooterInfoAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'creator_name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['author_name', 'creator_name']
    list_editable = ['is_active']


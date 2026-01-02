from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactInfoViewSet, SocialLinkViewSet, ArticleViewSet,
    VideoViewSet, TestViewSet, GameViewSet, FooterInfoViewSet
)

router = DefaultRouter()
router.register(r'contact', ContactInfoViewSet, basename='contact')
router.register(r'social-links', SocialLinkViewSet, basename='social-links')
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'videos', VideoViewSet, basename='videos')
router.register(r'tests', TestViewSet, basename='tests')
router.register(r'games', GameViewSet, basename='games')
router.register(r'footer', FooterInfoViewSet, basename='footer')

urlpatterns = [
    path('', include(router.urls)),
]


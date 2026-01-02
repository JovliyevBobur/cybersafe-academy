from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    ContactInfo, SocialLink, Article, Video, Test, Game, FooterInfo
)
from .serializers import (
    ContactInfoSerializer, SocialLinkSerializer, ArticleSerializer,
    VideoSerializer, TestSerializer, GameSerializer, FooterInfoSerializer
)


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        contact = ContactInfo.objects.filter(is_active=True).first()
        if contact:
            serializer = self.get_serializer(contact)
            return Response(serializer.data)
        return Response({})


class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.filter(is_active=True).order_by('order')
    serializer_class = SocialLinkSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = ArticleSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = VideoSerializer

    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        video = self.get_object()
        video.views += 1
        video.save()
        return Response({'views': video.views})


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = TestSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = GameSerializer

    @action(detail=True, methods=['post'])
    def increment_players(self, request, pk=None):
        game = self.get_object()
        game.players_count += 1
        game.save()
        return Response({'players_count': game.players_count})


class FooterInfoViewSet(viewsets.ModelViewSet):
    queryset = FooterInfo.objects.filter(is_active=True)
    serializer_class = FooterInfoSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        footer = FooterInfo.objects.filter(is_active=True).first()
        if footer:
            serializer = self.get_serializer(footer)
            return Response(serializer.data)
        return Response({})


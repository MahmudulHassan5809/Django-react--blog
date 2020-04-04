from articles.models import Article, Category
from articles.serializers import ArticleSerializer, CategorySerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination
from .permission import OwnPostPermission


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class ArticleList(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = PageNumberPagination


class CreateArticle(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        print(request.data)
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            category_obj = Category.objects.get(id=request.data['category'])
            serializer.save(owner=self.request.user,
                            category=category_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserArticle(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        user_obj = User.objects.get(id=user_id)
        artilcles = user_obj.user_articles.all()
        serializer = ArticleSerializer(artilcles, many=True)
        return Response(serializer.data)


class GetArticleById(APIView):
    def get(self, request, *args, **kwargs):
        article_id = kwargs.get('article_id')
        article_obj = Article.objects.get(id=article_id)
        serializer = ArticleSerializer(article_obj)
        return Response(serializer.data)


class CategoryList(APIView):
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class CategoryArticlesList(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get('category_id')
        category_obj = Category.objects.get(id=category_id)
        artilcles = category_obj.category_articles.all()
        serializer = ArticleSerializer(artilcles, many=True)
        return Response(serializer.data)


class ArticleDelete(generics.DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated, OwnPostPermission]

    lookup_field = 'id'

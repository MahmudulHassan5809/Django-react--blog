from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Article, Category
from accounts.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name',)


class ArticleSerializer(serializers.ModelSerializer):
    parser_classes = (MultiPartParser, FormParser,)
    # owner = serializers.StringRelatedField(many=True)
    owner = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        many = True
        model = Article
        fields = ('id', 'title', 'content', 'image',
                  'created_at', 'owner', 'category', 'category_id',)

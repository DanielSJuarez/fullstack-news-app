from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source = 'author.username')
    class Meta:
        model = Article
        fields = ('title', 'text', 'summary', 'image', 'creator')

class ArticleAuthorSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source = 'author.username')
    class Meta:
        model = Article
        fields = ('title', 'text', 'summary', 'image', 'creator', 'phase') 

class ArticleAdminSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source = 'author.username')
    class Meta:
        model = Article
        fields = ('title', 'text', 'summary', 'image', 'creator', 'phase') 
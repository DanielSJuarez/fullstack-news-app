from django.http import request
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer, ArticleAuthorSerializer, ArticleAdminSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .permissions import IsAuthorOrReadOnly
from .updatePermission import IsAuthorToEditOrReadOnly

class ArticleListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ArticleSerializer
    def get_queryset(self):
        return Article.objects.filter(phase='PUB')
    
  
class ArticleAuthorListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = ArticleAuthorSerializer
    def get_queryset(self):
       
        user = self.request.user
        return Article.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
class ArticleApproveListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    queryset = Article.objects.all()
    serializer_class = ArticleAdminSerializer  


class ArticleDetailChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorToEditOrReadOnly,)
    serializer_class = ArticleAuthorSerializer
    def get_queryset(self):
       
        user = self.request.user
        return Article.objects.filter(author=user)
        
class ArticleApproveChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    queryset = Article.objects.all()
    serializer_class = ArticleAdminSerializer  

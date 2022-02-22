from django.urls import path
from .views import ArticleListAPIView, ArticleAuthorListAPIView, ArticleApproveListAPIView, ArticleDetailChangeAPIView,ArticleApproveChangeAPIView

urlpatterns = [
    path('articles/<int:pk>/user/', ArticleDetailChangeAPIView.as_view()),
    path('articles/<int:pk>/admin/', ArticleApproveChangeAPIView.as_view()),
    path('articles/user/', ArticleAuthorListAPIView.as_view()),
    path('articles/admin/', ArticleApproveListAPIView.as_view()),
    path('articles/', ArticleListAPIView.as_view()),
    
]
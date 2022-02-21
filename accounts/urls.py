from django.urls import include, path
from .views import ProfileListAPIView

urlpatterns = [
    path('accounts/', ProfileListAPIView.as_view())
]
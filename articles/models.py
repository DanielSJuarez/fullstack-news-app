from django.db import models
from django.conf import settings
from django.forms import CharField

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255, null=True)
    text = models.TextField()
    image = models.ImageField(upload_to='articles/')



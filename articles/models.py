from django.db import models
from django.conf import settings
from django.forms import CharField

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255, null=True)
    text = models.TextField()
    summary = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to='articles/')

    def __str__(self):
        return self.title



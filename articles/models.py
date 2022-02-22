from django.db import models
from django.conf import settings
from django.forms import CharField

# Create your models here.

class Article(models.Model):
    PHASES = (
        ('Draf', 'Draft'),
        ('Sub', 'Submitted'),
        ('Rej', 'Rejected'),
        ('Pub', 'Published'),
        ('Arch', 'Archived'),
    )
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255, null=True)
    text = models.TextField()
    summary = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to='articles/', null=True)
    phase = models.CharField(max_length=4, choices=PHASES, default='Dar')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.title


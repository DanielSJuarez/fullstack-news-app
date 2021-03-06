# Generated by Django 3.2.12 on 2022-02-22 17:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0003_article_summary'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='article',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='is_archieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='article',
            name='is_draft',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='article',
            name='is_published',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='is_rejected',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='article',
            name='is_submitted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='article',
            name='phase',
            field=models.CharField(choices=[('D', 'Draft'), ('S', 'Submitted'), ('R', 'Rejected'), ('P', 'Published'), ('A', 'Archived')], max_length=1, null=True),
        ),
    ]

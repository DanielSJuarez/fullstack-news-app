# Generated by Django 3.2.12 on 2022-02-22 17:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_remove_article_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='is_archieved',
        ),
        migrations.RemoveField(
            model_name='article',
            name='is_draft',
        ),
        migrations.RemoveField(
            model_name='article',
            name='is_published',
        ),
        migrations.RemoveField(
            model_name='article',
            name='is_rejected',
        ),
        migrations.RemoveField(
            model_name='article',
            name='is_submitted',
        ),
    ]

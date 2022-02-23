# Generated by Django 3.2.12 on 2022-02-22 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0011_alter_article_phase'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='phase',
            field=models.CharField(choices=[('Draf', 'Draft'), ('Sub', 'Submitted'), ('Rej', 'Rejected'), ('Pub', 'Published'), ('Arch', 'Archived')], default='Dar', max_length=4),
        ),
    ]
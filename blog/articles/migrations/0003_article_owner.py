# Generated by Django 3.0.4 on 2020-03-31 17:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0002_article_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_articles', to=settings.AUTH_USER_MODEL),
        ),
    ]

# Generated by Django 4.2.3 on 2023-07-05 12:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('places', '0003_place_hate_user_place_like_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='hate_user',
            field=models.ManyToManyField(default=0, related_name='hate_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='place',
            name='like_user',
            field=models.ManyToManyField(default=0, related_name='like_user', to=settings.AUTH_USER_MODEL),
        ),
    ]

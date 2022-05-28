from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)
    first_name = models.CharField(blank=True, max_length=120)
    last_name = models.CharField(blank=True, max_length=120)

# Create your models here.

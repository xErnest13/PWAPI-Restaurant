from asyncio.windows_events import NULL
from django.db import models

class Order(models.Model):
    price = models.CharField(max_length=200)
    adress = models.CharField(max_length=500)
    phone = models.CharField(max_length=15)
    voucher = models.BooleanField(default=False)

class Food(models.Model):
    food_owner = models.ForeignKey('Order',on_delete=models.CASCADE, blank=True, null=True)
    image_url = models.URLField()
    name = models.CharField(max_length=200)
    ingredients = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

class Drink(models.Model):
    drink_owner = models.ForeignKey('Order',on_delete=models.CASCADE,null=True, blank=True)
    image_url = models.URLField()
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

class Extra(models.Model):
    extra_owner = models.ForeignKey('Order',on_delete=models.CASCADE,null=True, blank=True)
    image_url = models.URLField()
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

from asyncio.windows_events import NULL
from pyexpat import model
from django.db import models
from sqlalchemy import false

class Order(models.Model):
    food = models.CharField(max_length=200)
    drink = models.CharField(max_length=200)
    extra = models.CharField(max_length=200, blank=True, null=True)
    price = models.CharField(max_length=200)
    adress = models.CharField(max_length=500)
    phone = models.CharField(max_length=15)
    voucher = models.BooleanField(default=False)

class Food(models.Model):
    food_owner = models.ForeignKey('Order', related_name='+',
    on_delete=models.CASCADE,)
    name = models.CharField(max_length=200)
    price = models.IntegerField()

class Drink(models.Model):
    drink_owner = models.ForeignKey('Order', related_name='+',
    on_delete=models.CASCADE,)
    name = models.CharField(max_length=200)
    price = models.IntegerField()

class Extra(models.Model):
    extra_owner = models.ForeignKey('Order', related_name='+',
    on_delete=models.CASCADE,)
    name = models.CharField(max_length=200)
    price = models.IntegerField()

from urllib import request
from .models import *
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    food_owner = OrderSerializer(required=False)
    
    class Meta:
        model = Food
        fiedls = "__all__"

class DrinkSerializer(serializers.ModelSerializer):
    drink_owner = OrderSerializer(required=False)
    
    class Meta:
        model = Drink
        fiedls = "__all__"

class ExtraSerializer(serializers.ModelSerializer):
    extra_owner = OrderSerializer(required=False)
    
    class Meta:
        model = Extra
        fiedls = "__all__"
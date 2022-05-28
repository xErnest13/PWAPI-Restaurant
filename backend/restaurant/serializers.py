from urllib import request
from .models import *
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    food_owner = OrderSerializer(required=False, allow_null=True)
    
    class Meta:
        model = Food
        fields = "__all__"

class DrinkSerializer(serializers.ModelSerializer):
    drink_owner = OrderSerializer(required=False,allow_null=True)
    
    class Meta:
        model = Drink
        fields = "__all__"

class ExtraSerializer(serializers.ModelSerializer):
    extra_owner = OrderSerializer(required=False,allow_null=True)
    
    class Meta:
        model = Extra
        fields = "__all__"
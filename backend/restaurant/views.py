from turtle import st
from urllib import response
from django.shortcuts import render
import os
from rest_framework import status
from .serializers import *
from .models import *
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.core.files import File
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from django.http import QueryDict
from django.core.exceptions import ValidationError
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
def get_orders_list(request, *args, **kwargs):
    
    all_orders = Order.objects.all()
    all_orders_ser = OrderSerializer(all_orders, many=True)
    print(all_orders_ser.data)
    return Response(all_orders_ser.data)

@api_view(['POST'])
#@permission_classes([AllowAny])
def post_orders(request, *args, **kwargs):

    if request.method == 'POST':
        print(request.data)
        neworder = OrderSerializer(data=request.data)
        if neworder.is_valid():
            neworder.save()
        
        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def manipulate_order(request, *args, **kwargs):

    try:
        pk = kwargs.get('pk')
        order = Order.objects.get (pk=pk)
        order_ser = OrderSerializer(order, many=True)
    except Order.DoesNotExist:
        response = {
            'data' : 'Order does not exist',
        }

    if request.method == 'GET':
        
        order_ser = OrderSerializer(order, many=True)
        response = {
            'data': order_ser.data,
        }

        return Response(response)

    if request.method == 'PUT':

        new_order = OrderSerializer(order, data=request.data)

        if new_order.is_valid():
            new_order.save()


        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':

        response = {}

        try:
            order.delete()
            response = {
                'message':'success',
            }
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_food_list(request, *args, **kwargs):
    
    all_foods = Food.objects.all()
    all_foods_ser = FoodSerializer(all_foods, many=True)
    
    return Response(all_foods_ser.data)

@api_view(['POST'])
#@permission_classes([AllowAny])
def post_foods(request, *args, **kwargs):

    if request.method == 'POST':
        print(request.data)
        newfood = FoodSerializer(data=request.data)
        
        if newfood.is_valid():
            print("YES")
        else:
            print(newfood.errors)

        if newfood.is_valid():
            newfood.save()
        
        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def manipulate_food(request, *args, **kwargs):

    try:
        pk = kwargs.get('pk')
        food = Food.objects.get(pk=pk)
    except Food.DoesNotExist:
        response = {
            'data' : 'Food does not exist',
        }

    if request.method == 'GET':
        
        food_ser = FoodSerializer(food)
        response = {
            'data': food_ser.data,
        }

        return Response(response)

    if request.method == 'PUT':
        print(food.price)
        print(request.data)
        new_food = FoodSerializer(food, data=request.data)

        print("in try")

        if new_food.is_valid():
            print("YES")
        else:
            print(new_food.errors)
            
        if new_food.is_valid():
            new_food.save()


        try:
            

            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':

        response = {}

        try:
            food.delete()
            response = {
                'message':'success',
            }
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_drink_list(request, *args, **kwargs):
    
    all_drinks = Drink.objects.all()
    all_drinks_ser = DrinkSerializer(all_drinks, many=True)
    
    return Response(all_drinks_ser.data)

@api_view(['POST'])
#@permission_classes([AllowAny])
def post_drinks(request, *args, **kwargs):

    if request.method == 'POST':
        print(request.data)
        newdrink = DrinkSerializer(data=request.data)
        if newdrink.is_valid():
            newdrink.save()
        
        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def manipulate_drink(request, *args, **kwargs):

    try:
        pk = kwargs.get('pk')
        drink = Drink.objects.get(pk=pk)
    except Drink.DoesNotExist:
        response = {
            'data' : 'Drink does not exist',
        }

    if request.method == 'GET':
        
        drink_ser = DrinkSerializer(drink)
        response = {
            'data': drink_ser.data,
        }

        return Response(response)

    if request.method == 'PUT':

        new_drink = DrinkSerializer(drink, data=request.data)

        if new_drink.is_valid():
            new_drink.save()


        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':

        response = {}

        try:
            drink.delete()
            response = {
                'message':'success',
            }
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_extra_list(request, *args, **kwargs):
    
    all_extra = Extra.objects.all()
    all_extra_ser = ExtraSerializer(all_extra, many=True)
    
    return Response(all_extra_ser.data)

@api_view(['POST'])
#@permission_classes([AllowAny])
def post_extra(request, *args, **kwargs):

    if request.method == 'POST':
        print(request.data)
        newextra = ExtraSerializer(data=request.data)
        if newextra.is_valid():
            newextra.save()
        
        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def manipulate_extra(request, *args, **kwargs):

    try:
        pk = kwargs.get('pk')
        extra = Extra.objects.get(pk=pk)
    except Extra.DoesNotExist:
        response = {
            'data' : 'Extra does not exist',
        }

    if request.method == 'GET':
        
        extra_ser = ExtraSerializer(extra)
        response = {
            'data': extra_ser.data,
        }

        return Response(response)

    if request.method == 'PUT':

        new_extra = ExtraSerializer(extra, data=request.data)

        if new_extra.is_valid():
            new_extra.save()


        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':

        response = {}

        try:
            extra.delete()
            response = {
                'message':'success',
            }
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)
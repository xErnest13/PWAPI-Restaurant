from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView,TokenCookieDeleteView
from .serializers import MyTokenObtainPairSerializer
from .serializers import CustomUserSerializer, CustomGetUser, UserSerializer
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response 
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth import get_user_model
UserModel = get_user_model()
from .models import *

class CustomTokenCookieDeleteView(TokenCookieDeleteView):
    """
    Deletes httpOnly auth cookies.
    Used as logout view while using AUTH_COOKIE
    and
    Clears all http cache on the client side.
    """
    
    def post(self, request):
        response = Response({})
        response["Clear-Site-Data"] = '"cache"'
        if api_settings.AUTH_COOKIE:
            self.delete_cookies(response)
        
        return response

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
  

class CurrentUserView(APIView):
	def get(self, request):
		serializer = CustomGetUser(request.user)
		return Response(serializer.data)
    
class GetUsers(APIView):
    
    def get(self,request):
        users =  CustomUser.objects.all()
        print("Users", users[0].username)
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)



class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



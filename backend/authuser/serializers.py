from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext
from difflib import SequenceMatcher
from django.contrib.auth import get_user_model
UserModel = get_user_model()


import re


class UserSerializer(serializers.ModelSerializer):    
   
    class Meta:
        model = UserModel
        fields = ('username', 'email', )


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):


    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        #print("USER",dir(user))
        #print(user.email)
       
        token['user'] = user.username
        token['email'] = user.email
        
        return token


class CustomGetUser(serializers.ModelSerializer):
	class Meta:
		model = CustomUser
		fields = ('email', 'username')



class CustomUserSerializer(serializers.ModelSerializer):
    

    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=12, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}


    #validate password for : lenght, symbol, number, lowercase and uppercase letter
    def validate(self, validated_data):
        string = "login"
        password = validated_data['password']
        email = validated_data['email']
        username = validated_data['username']
        max_similarity = 0.7
        if len(password) < 12:
            raise serializers.ValidationError(ugettext("Password length must be greater than 12 character"))
        elif not re.findall('[()[\]{}|\\`~!@#$%^&*_\-+=;:\'",<>./?]', password):
            raise serializers.ValidationError(ugettext("Your password must contain at least 1 symbol"))
        elif not re.findall('\d', password):
            raise serializers.ValidationError(ugettext("The password must contain at least 1 digit, 0-9."))
        elif not re.findall('[a-z]', password):
            raise serializers.ValidationError(ugettext("The password must contain at least 1 lowercase letter, a-z."))
        elif not re.findall('[A-Z]', password):
            raise serializers.ValidationError(ugettext("The password must contain at least 1 uppercase letter, A-Z."))
        elif string.upper() in password or string.lower() in password:
            raise serializers.ValidationError(ugettext("The password must not contain the 'login' word."))
        elif SequenceMatcher(a=password.lower(), b=username.lower()).quick_ratio() > max_similarity:
            raise serializers.ValidationError(ugettext("The password is too similar to the username."))
        elif SequenceMatcher(a=password.lower(), b=email.lower()).quick_ratio() > max_similarity:
            raise serializers.ValidationError(ugettext("The password is too similar to the email."))
        return validated_data


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
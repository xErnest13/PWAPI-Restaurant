from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (ObtainTokenPairWithColorView, CustomTokenCookieDeleteView,  CustomUserCreate, CurrentUserView, GetUsers)


urlpatterns = [
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),  
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/delete/', CustomTokenCookieDeleteView.as_view(),  name='token_delete'),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/current/', CurrentUserView.as_view(), name='current_user'),
    path("getUsers/", GetUsers.as_view(), name="get_users"),
]
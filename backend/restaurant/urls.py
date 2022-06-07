from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('get_allorders/',views.get_orders_list),
    path('createOrder/', views.post_orders),
    path('order/<int:pk>', views.manipulate_order),
    path('get_allfood/',views.get_food_list),
    path('createFood/',views.post_foods),
    path('food/<int:pk>',views.manipulate_food),
    path('get_alldrink/',views.get_drink_list),
    path('createDrink/',views.post_drinks),
    path('drink/<int:pk>',views.manipulate_drink),
    path('get_allextra/',views.get_extra_list),
    path('createExtra/',views.post_extra),
    path('extra/<int:pk>',views.manipulate_extra),
]
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import response
import coreapi


@api_view()
@renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
def schema_view(request):
    generator = api_schema_generator()
    return response.Response(generator)


def api_schema_generator():
    api_schema = coreapi.Document(
        title="My Swagger",
        content={
            "ORDERS": {
                "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_allorders/",
                    action="get",
                    description="Get all order",             
                ),
                "int_api_post": coreapi.Link(
                    url="/api/restaurant/createOrder/",
                    action="post",
                    description="Create an order",
                    fields=[
                        coreapi.Field(
                            name="Id",
                            required=True,
                            location="path",
                        ),
                    ]                     
                ),
                "int_api_put": coreapi.Link(
                    url="/api/restaurant/order/1",
                    action="put",
                    description="Manipulate Order",
                    fields=[
                        coreapi.Field(
                            name="Id",
                            required=True,
                            location="path",
                            description="ID of the Order"
                        ),
                    ]                     
                ),
                
            },
            "FOOD" : {
                "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_allfood/",
                    action="get",
                    description="Get all food",           
                ),
                "int_api_post": coreapi.Link(
                    url="/api/restaurant/createFood/",
                    action="post",
                    description="Create a food",
                    fields=[
                        coreapi.Field(
                            name="Name",
                            required=True,
                            location="path",
                            description="Name of the food"
                        ),
                        coreapi.Field(
                            name="Ingredients",
                            required=True,
                            location="path",
                            description="Ingredients of the food"
                        ),
                        coreapi.Field(
                            name="Price",
                            required=True,
                            location="path",
                            description="Price of the food"
                        ),
                        coreapi.Field(
                            name="Image",
                            required=True,
                            location="path",
                            description="Image (URL) of the food"
                        ),
                    ]
                ),
                "int_api_put": coreapi.Link(
                    url="/api/restaurant/food/3",
                    action="put",
                    description="Manipulate Food",
                    fields=[
                        coreapi.Field(
                            name="Id",
                            required=True,
                            location="path",
                            description="ID of the Food"
                        ),
                    ]                     
                ),
            },
            "DRINK" : {
                 "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_alldrink/",
                    action="get",
                    description="Get all drink",              
                ),
                "int_api_post": coreapi.Link(
                    url="/api/restaurant/createDrink/",
                    action="post",
                    description="Create a drink",
                    fields=[
                        coreapi.Field(
                            name="Name",
                            required=True,
                            location="path",
                            description="Name of the Drink"
                        ),
                        coreapi.Field(
                            name="Price",
                            required=True,
                            location="path",
                            description="Price of the Drink"
                        ),
                        coreapi.Field(
                            name="Image",
                            required=True,
                            location="path",
                            description="Image (URL) of the Drink"
                        ),
                    ]
                ),
                "int_api_put": coreapi.Link(
                    url="/api/restaurant/drink/2",
                    action="put",
                    description="Manipulate Drink",
                    fields=[
                        coreapi.Field(
                            name="Id",
                            required=True,
                            location="path",
                            description="ID of the Drink"
                        ),
                    ]                     
                ),
            },
            "CAKE": {
                "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_allextra/",
                    action="get",
                    description="Get all cake",         
                ),
                "int_api_post": coreapi.Link(
                    url="/api/restaurant/createExtra/",
                    action="post",
                    description="Create a cake",
                    fields=[
                        coreapi.Field(
                            name="Name",
                            required=True,
                            location="path",
                            description="Name of the cake"
                        ),
                        coreapi.Field(
                            name="Price",
                            required=True,
                            location="path",
                            description="Price of the cake"
                        ),
                        coreapi.Field(
                            name="Image",
                            required=True,
                            location="path",
                            description="Image (URL) of the cake"
                        ),
                    ]
                ),
                "int_api_put": coreapi.Link(
                    url="/api/restaurant/extra/1",
                    action="put",
                    description="Manipulate Cake",
                    fields=[
                        coreapi.Field(
                            name="Id",
                            required=True,
                            location="path",
                            description="ID of the Cake"
                        ),
                    ]                     
                ),
            },
            "USERS" : {
                "int_api_get": coreapi.Link(
                    url="/api/authentication/getUsers/",
                    action="get",
                    description="Get all Users",                 
                ),
                        
                }
            
        }
    )
    return api_schema
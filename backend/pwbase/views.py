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
            "GET ALL ORDER": {
                "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_allorders/",
                    action="get",
                    description="Get all order",
                    fields=[
                        coreapi.Field(
                            name="oreder.id",
                            required=True,
                            location="path",
                        ),
                    ]                     
                ),
            },
            "FOOD" : {
                "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_allfood/",
                    action="get",
                    description="Get all food", 
                    fields=[
                        coreapi.Field(
                            name="food.id",
                            required=True,
                            location="path",
                        ),
                    ]                   
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
            },
            "DRINK" : {
                 "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_alldrink/",
                    action="get",
                    description="Get all drink",
                    fields=[
                        coreapi.Field(
                            name="drink.id",
                            required=True,
                            location="path",
                        ),
                    ]                     
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
            },
            "CAKE": {
                "int_api_get": coreapi.Link(
                    url="/api/restaurant/get_allextra/",
                    action="get",
                    description="Get all cake",
                    fields=[
                        coreapi.Field(
                            name="cake.id",
                            required=True,
                            location="path",
                        ),
                    ]                     
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
            },
            
        }
    )
    return api_schema
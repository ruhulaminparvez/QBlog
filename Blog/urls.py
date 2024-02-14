from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

blogItem = DefaultRouter()

blogItem.register('blog', BlogView)

urlpatterns = [
    path('', include(blogItem.urls)),
]


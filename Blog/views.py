from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializer import *
from account.permission import *
from .utils.viewCounter import blog_view_cout

# Create your views here.

class BlogView(viewsets.ModelViewSet):
    permission_classes = [BlogOwner]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()

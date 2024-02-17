from django.shortcuts import render
from rest_framework import generics, viewsets
from Blog.serializer import *
from account.permission import *

# view for Author
class BlogView(viewsets.ModelViewSet):
    permission_classes = [BlogOwner]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)
    
class CategoryView(viewsets.ModelViewSet):
    permission_classes = [IsAuthor]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    


    

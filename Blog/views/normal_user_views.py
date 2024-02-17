from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response
from Blog.serializer import *
from account.permission import *
from Blog import utils

# view for normal user
class BlogListView(generics.ListAPIView):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)
    
class BlogDetailView(generics.RetrieveAPIView):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
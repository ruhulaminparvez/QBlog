from rest_framework import serializers
from account.models import *
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username')
        read_only = True

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name')

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
class BlogSearchSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=False, read_only=True)
    category = CategorySerializer(many=False, read_only=True)
    class Meta:
        model = Blog
        fields = ('id', 'author', 'category', 
                  'title')
        read_only = True
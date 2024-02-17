from rest_framework import serializers
from account.models import *
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
        read_only = True

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
class BlogSearchSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username')
    category = serializers.CharField(source='category.name')
    class Meta:
        model = Blog
        fields = ('id', 'author', 'category', 'title')
        read_only = True
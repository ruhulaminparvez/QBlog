from django.db import models
from account.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    banner_url = models.ImageField(upload_to='blog/banner/', null=True, blank=True)
    details = models.TextField()
    total_views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['author']),
            models.Index(fields=['category']),
            models.Index(fields=['title']),
        ]

    

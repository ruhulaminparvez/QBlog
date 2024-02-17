from django.urls import path, include
from Blog import views
from rest_framework.routers import DefaultRouter

blogItem = DefaultRouter()

blogItem.register('blog', views.BlogView)

urlpatterns = [
    path('', include(blogItem.urls)),
    path('search/<str:query>/', views.SearchBlog.as_view()),
]


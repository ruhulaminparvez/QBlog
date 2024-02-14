from django.urls import path
from .views  import *   

urlpatterns = [
    path('register', createAccount, name='createAccount'),
    path('users/', AccountView.as_view(), name='users'),
]
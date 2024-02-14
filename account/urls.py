from django.urls import path
from .views  import createAccount   

urlpatterns = [
    path('register', createAccount, name='createAccount'),
]
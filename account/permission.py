from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class Authenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
    
class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user.user_type == 'author'
    
class IsAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user.user_type == 'admin'

class IsNormalUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user.user_type == 'normal'

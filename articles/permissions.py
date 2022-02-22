from cmath import phase
from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS: 
            return True
        if request.method == 'POST':
            if request.data.get('phase', False):
                if not request.user.is_staff and request.data['phase'] == 'Pub':
                    return False
                elif not request.user.is_staff and request.data['phase'] == 'Arch':
                    return False
                elif not request.user.is_staff and request.data['phase'] == 'Rej':
                    return False         
        return True
             
    def has_object_permission(self, request, view, obj): 
        if request.method in permissions.SAFE_METHODS: 
            return True
        elif obj.author == request.user and obj.phase == 'Draf':
            return True
        elif obj.author == request.user and obj.phase == 'Sub':
            return True     
        return False


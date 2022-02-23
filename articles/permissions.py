from cmath import phase
from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS: 
            return True
        if request.method == 'POST':
            if request.data.get('phase', False):
                if not request.user.is_staff and request.data['phase'] == 'PUB':
                    return False
                elif not request.user.is_staff and request.data['phase'] == 'ARC':
                    return False
                elif not request.user.is_staff and request.data['phase'] == 'REJ':
                    return False         
        return True


             
    


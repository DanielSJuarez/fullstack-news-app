from rest_framework import permissions

class IsAuthorToEditOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

            if request.method in permissions.SAFE_METHODS:
                return True
            if request.method == 'PUT' or request.method == 'PATCH' or request.method == 'DELETE':
                if request.data.get('phase', False):
                    if not request.user.is_staff and request.data['phase'] == 'PUB':
                        return False
                    elif not request.user.is_staff and request.data['phase'] == 'ARC':
                        return False
                    elif not request.user.is_staff and request.data['phase'] == 'REJ':
                        return False         
            return True
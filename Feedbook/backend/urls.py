from django.urls import path
from .views import CreateMessageAPIView
from .views import UpdateUserPhotoURL

urlpatterns = [
    path('create-message/', CreateMessageAPIView.as_view(), name='create-message'),
    path('user-profile-update/', UpdateUserPhotoURL.as_view(), name='update-photo'),
]
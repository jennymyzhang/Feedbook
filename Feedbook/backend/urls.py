from django.urls import path
from .views import CreateMessageAPIView
from .views import UpdateUserPhotoURL, ChatListView, ChatCreateAPIView

urlpatterns = [
    path('create-message/', CreateMessageAPIView.as_view(), name='create-message'),
    path('create-chat/', ChatCreateAPIView.as_view(), name='create-chat'),
    path('user-profile-update/', UpdateUserPhotoURL.as_view(), name='update-photo'),
    path('chats/<int:user_id>/', ChatListView.as_view(), name='chat-list'),
]
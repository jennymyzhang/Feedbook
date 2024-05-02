from rest_framework import serializers
from .models import Message
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['userid', 'message']



User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'photoURL')
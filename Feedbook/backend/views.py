# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer
from urllib.parse import quote
import json
from .models import Chat
from .serializers import ChatSerializer
from .witParse import parseMessage
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserCreateSerializer
import logging
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
authentication_classes = [JWTAuthentication]

class GetUserDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserCreateSerializer(request.user)
        return Response(serializer.data)

class UpdateUserPhotoURL(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        logging.debug(self)
        logging.debug(self)
        
        user = request.user 
        new_photo_url = request.data.get('photoURL')
        logging.debug(new_photo_url)
        logging.debug(user)

        if not new_photo_url:
            return JsonResponse({'error': 'No photo URL provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.photoURL = new_photo_url
        user.save()

        serializer = UserCreateSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ChatListView(APIView):
    def get(self, request, user_id):
        # Fetch the chats where the user is a participant
        chats = Chat.objects.filter(user_id=user_id).order_by('-created_at')
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)

ACCESS_TOKEN = "TC3KQHHCV3WKXYI64TRPQT4XLIHKYVS2"

URI = 'https://api.wit.ai/message?v=20240304&q='

AUTH = 'Bearer ' + ACCESS_TOKEN

import requests 

response = requests.get("https://api-server.dataquest.io/economic_data/countries") 
data = response.json()


class CreateMessageAPIView(APIView):
    def post(self, request):
        chat_id = request.data.get('chat_id')
        user_id = request.data.get('user_id')
        message_text = request.data.get('message')
        res = self.getResponseFromWit(message_text, user_id)
        message_data = {
            'message': message_text,
            'chat': chat_id,
            'response': res,
        }
        message_serializer = MessageSerializer(data=message_data)
        if message_serializer.is_valid():
            message_instance = message_serializer.save()
            chats = Chat.objects.filter(user_id=user_id).order_by('-created_at')
            chat_serializer = ChatSerializer(chats, many=True)
            return Response(chat_serializer.data, status=status.HTTP_201_CREATED)
        return Response(chat_serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
    def getResponseFromWit(self, message, user_id) :
        response = requests.get(URI + quote(message), headers={'Authorization': AUTH, 'content_type': 'application/json'}).json()
        witResponse = parseMessage(response, user_id)
        return witResponse.parse()

class ChatCreateAPIView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')

        # Create an empty chat for the user
        chat = Chat.objects.create(user_id=user_id)

        chats = Chat.objects.filter(user_id=user_id).order_by('-created_at')
        chat_serializer = ChatSerializer(chats, many=True)
        
        response_data = {
            'chat_id': chat.id,
            'chats': chat_serializer.data
        }
        
        return Response(response_data, status=status.HTTP_201_CREATED)

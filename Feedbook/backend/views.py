# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer
from urllib.parse import quote
import json
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
    


ACCESS_TOKEN = "TC3KQHHCV3WKXYI64TRPQT4XLIHKYVS2"

URI = 'https://api.wit.ai/message?v=20240304&q='

AUTH = 'Bearer ' + ACCESS_TOKEN

import requests 

response = requests.get("https://api-server.dataquest.io/economic_data/countries") 
data = response.json()


class CreateMessageAPIView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res = self.getResponseFromWit(serializer.data["message"])
            return Response(res, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def getResponseFromWit(self, message) :
        response = requests.get(URI + quote(message), headers={'Authorization': AUTH, 'content_type': 'application/json'}).json()
        witResponse = parseMessage(response)
        return json.dumps({"message":witResponse.parse()})
    

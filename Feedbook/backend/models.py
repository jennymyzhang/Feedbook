from django.db import models
from django.conf import settings
import datetime
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User

class Chat(models.Model):
    id = models.AutoField(primary_key=True) 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chats', null=True,)
    created_at = models.DateTimeField(default=datetime.datetime.now)
    
class Message(models.Model):
    id = models.AutoField(primary_key=True) 
    message = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(default=datetime.datetime.now)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages', null=True,)
    
    
class Feed(models.Model):
    id = models.AutoField(primary_key=True) 
    babyName = models.TextField()
    food = models.TextField()
    mass = models.TextField()
    volume = models.TextField()
    time = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feeds', null=True,)



class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        max_id = UserAccount.objects.aggregate(max_id=models.Max('id'))['max_id'] or 0
        next_id = max_id + 1
        
        email = self.normalize_email(email)
        user = self.model(email=email,id=next_id, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True) 
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    photoURL = models.URLField(max_length=500, blank=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    
    def __str__(self):
        return self.email

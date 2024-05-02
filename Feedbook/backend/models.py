from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User

class Message(models.Model):
    message = models.TextField()
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    userid = models.IntegerField()
    
class Feed(models.Model):
    babyName = models.TextField()
    userid = models.IntegerField()
    food = models.TextField()
    mass = models.TextField()
    volume = models.TextField()
    time = models.TextField()
    #user = models.ForeignKey(User, on_delete=models.CASCADE)



class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
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

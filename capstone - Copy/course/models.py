from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    completed = models.BooleanField(default=False)
    progress = models.DecimalField(max_digits=15, decimal_places=10, default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    last_accessed = models.DateTimeField(auto_now=True)

class Video(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='video')
    video_name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    
class Reviews(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
  

# Create your models here.

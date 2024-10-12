from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

    
class Follow(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name="followings")
    user_follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")

   

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField(max_length=500, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
 

    
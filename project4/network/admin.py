from django.contrib import admin
from .models import User, Post, Follow


class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "content")



class FollowAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_follower')
    
admin.site.register(User)
admin.site.register(Post, PostAdmin)
admin.site.register(Follow, FollowAdmin)
# Register your models here.

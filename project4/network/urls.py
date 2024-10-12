
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post", views.post, name="post"),
    path("profile/<str:username>/", views.profile, name="profile"),
    path("follow/<str:username>/", views.follow, name="follow"),
    path("likes/<int:postId>/", views.likes, name="likes"),
    path("edit", views.edit, name="edit"),
    path("followings/", views.followings, name="followings"),

]

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.paginator import Paginator
from .models import User, Post, Follow


def index(request):
    posts = Post.objects.all().order_by("id").reverse()

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number
                                  )
    posts_with_likes = []
    for post in page_obj:
        posts_with_likes.append({
            "post": post,
            "is_liking": request.user in post.likes.all()
        })

    return render(request, "network/index.html", {
        "posts": posts_with_likes,
        "page_obj": page_obj
    })

def post(request):
    if request.method == "POST":
        content = request.POST.get('compose-body')
        post = Post (
            user = request.user,
            content=content,
        )

        post.save()
        return HttpResponseRedirect(reverse(index))

@csrf_exempt
def likes(request, postId):
    if request.method == "POST":
        user = request.user
        post = Post.objects.get(id=postId)
        if user in post.likes.all():
            post.likes.remove(user)
            post.save()
            return JsonResponse({'message': 'Unliked successfully',
                                 'username': post.user.username
                        },status=200)
        else:
            post.likes.add(user)
            post.save()
            return JsonResponse({'message': 'Liked successfully',
                                 'username': post.user.username
                        }, status=200)


@csrf_exempt
def edit(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post_id = data.get('post_id')
        new_content = data.get('new_content')

        post = Post.objects.get(id=post_id)
        post.content = new_content
        post.save()
        return JsonResponse({'message': 'Post updated successfully'}, status=200)
    
    return JsonResponse({'error': 'Post not found'}, status=404)

def profile(request, username):
    user = User.objects.filter(username=username).first()

    if user is None:
        return JsonResponse({'error': 'User not found'}, status=404)
    
    posts = user.posts.all().order_by("id").reverse()
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    posts_data = []
    for post in page_obj:
        posts_data.append({
            "id": post.id,
            "content": post.content,
            "timestamp": post.timestamp.strftime('%b. %d, %Y, %I:%M %p').capitalize(),
            "likes": post.likes.count(),
            "is_liking": request.user in post.likes.all(),
            "username": post.user.username,
            
        })

    is_following = Follow.objects.filter(user=request.user, user_follower=user).exists()
   
        
    data = {
        "username": user.username,
        "email": user.email,
        "posts": posts_data,
        "following_count": user.followings.count(),
        "follower_count": user.followers.count(),
        "is_following": is_following,
        "request_user": request.user.username,
        "page_obj": {
            "has_next": page_obj.has_next(),
            "has_previous": page_obj.has_previous(),
            "next_page_number": page_obj.next_page_number() if page_obj.has_next() else None,
            "previous_page_number": page_obj.previous_page_number() if page_obj.has_previous() else None,
            "number": page_obj.number,
            "paginator": {
                "num_pages": paginator.num_pages
            }
        }
        
    }
    return JsonResponse(data)

@csrf_exempt
def follow(request, username):
    user = User.objects.filter(username=username).first()
    if not user:
        return JsonResponse({'error': 'User not found'}, status=404)
    if request.method == 'POST':
        is_following = Follow.objects.filter(user=request.user, user_follower=user).first()

        if is_following:
            is_following.delete()
     
            return JsonResponse({'message': 'Unfollowed successfully'}, status=200)
        
        else: 
            follow = Follow(
            user = request.user,
            user_follower = user,
            )
            follow.save()
            return JsonResponse({'message': 'Followed successfully'}, status=200)
        
    return JsonResponse({'error': 'Invalid request'}, status=400)

def followings(request):
    following = Follow.objects.filter(user=request.user).values_list('user_follower', flat=True)
    posts = Post.objects.filter(user__in=following).order_by("id").reverse()

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    posts_data = []
    for post in page_obj:
        posts_data.append({
            'id': post.id,
            'user': post.user.username,
            'content': post.content,
            'timestamp': post.timestamp.strftime('%b. %d, %Y, %I:%M %p').capitalize(),
            'likes_count': post.likes.count(),
            'is_liking': request.user in post.likes.all(),
        })

    return JsonResponse({
        'posts': posts_data,
        'page_obj': {
            "has_next": page_obj.has_next(),
            "has_previous": page_obj.has_previous(),
            "next_page_number": page_obj.next_page_number() if page_obj.has_next() else None,
            "previous_page_number": page_obj.previous_page_number() if page_obj.has_previous() else None,
            "number": page_obj.number,
            "paginator": {
                "num_pages": paginator.num_pages
            }
        }
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

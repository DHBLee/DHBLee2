from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from .models import User, Progress, Video, Reviews
import json
from decimal import Decimal


# Create your views here.
def index(request):
    rev = Reviews.objects.all().order_by("id").reverse()
    return render(request, "course/index.html", {
        "review": rev,
    })

@csrf_exempt
def update_progress(request):
    if request.method == "POST":
        data = json.loads(request.body)
        video_name = data.get('video_name')
        progress = data.get('progress')
        completed = data.get('completed')

      
        is_video = Video.objects.filter(user=request.user, video_name=video_name).exists()
       
        if is_video:
            return JsonResponse({'message': 'User already watched this Video',
                                 'progress': 'error'}, status=200)
        else:

            if float(progress) < 100:
                try:
                    prog = Progress.objects.get(user=request.user)
                    prog.progress += Decimal('6.6666666667')
                    temporary = prog.progress + 1
                    if float(temporary) >=  100:
                        prog.completed = True

                    prog.save()

                except Progress.DoesNotExist:
                    prog = Progress (
                        user = request.user,
                        progress = Decimal('6.6666666667'),
                    )
                    prog.save()
            elif float(progress) >=  100:
                prog = Progress.objects.get(user=request.user)
                prog.completed = True
                prog.save()

            video = Video (
                user = request.user,
                video_name = video_name,
                completed = completed,
            )
            video.save()
            return JsonResponse({'message': 'Post updated successfully',
                             'progress': prog.progress,
                             'progress_completed': prog.completed}, status=200)
    else:
        return JsonResponse({'message': 'Post updated successfully'}, status=200)

@login_required
def get_progress(request):
    if request.method == "GET":
        videos = Video.objects.filter(user=request.user)
        prog = Progress.objects.get(user=request.user)
        video_data = []
        for video in videos:
            video_data.append ({
                "video_name": video.video_name,
                "completed": video.completed,
            })
        try: 
            return JsonResponse({"progress": prog.progress,
                                 "videos": video_data,
                                 "progress_completed": prog.completed,}, status=200)
        except Progress.DoesNotExist:
            return JsonResponse({"progress": 0,
                                 "videos": video_data,
                                 "progress_completed": prog.completed,}, status=200)

def reviews(request):
    if request.method == "POST":
        review = request.POST["review"]
        if review:
            try:
                rev = Reviews(
                    user = request.user,
                    content = review,
                )
                rev.save()
                return render(request, "course/review.html")
            except Exception as e:
                return render(request, "course/review.html", {
                    "error": f"An error occured: {str(e)}",
                })
        else:
            return render(request, "course/error.html")
    else:
        pass

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]


        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "course/register.html", {
                "message": "Passwords must match."
            })

  
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "course/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "course/register.html")
    

def login_view(request):
    if request.method == "POST":

   
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "course/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "course/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


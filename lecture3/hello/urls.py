from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path("<str:name>", views.greet, name="greet"), #put a name on the url and that show in the page
    path("brian", views.brian, name="brian"),
    path("david", views.david, name="david"),
]
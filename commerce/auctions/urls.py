from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("active_listing", views.active_listing, name="active_listing"),
    path("new_listing", views.new_listing, name="new_listing"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("listing/<int:id>/", views.listing, name="listing"),
    path("close/<int:id>/", views.close, name="close"),
]

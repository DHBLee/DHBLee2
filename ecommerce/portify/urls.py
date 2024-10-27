from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("mens_fragrances", views.mens_fragrances, name="mens_fragrances"),
    path("womens_fragrances", views.womens_fragrances, name="womens_fragrances"),
    path("logout", views.logout_view, name="logout"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("shoppingcart", views.shoppingcart, name="shoppingcart"),
    path("add_tocart", views.add_tocart, name="add_tocart"),
    path("candles", views.candles, name="candles"),
    path("shampooconditioner", views.shampooconditioner, name="shampooconditioner"),
    path("fragrances", views.fragrances, name="fragrances"),
    path("skincare", views.skincare, name="skincare"),
    path("bodysoaps", views.bodysoaps, name="bodysoaps"),
    path("about", views.about, name="about"),
    path("services", views.services, name="services"),
    path("remove_item/<int:item_id>/", views.remove_item, name="remove_item"),

    path("<str:category>/<int:id>/", views.product_detail, name="product_detail"),
]
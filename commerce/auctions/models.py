from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Category(models.Model):
    categoryname = models.CharField(max_length=64)

    def __str__(self):
        return self.categoryname

class Auction_listings(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField(blank=True, null=True)
    bid = models.DecimalField(max_digits=10, decimal_places=2)
    url = models.URLField(blank=True, null=True)
    now = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="listings")



class Bids(models.Model):
    auction = models.ForeignKey(Auction_listings, on_delete=models.CASCADE, related_name="bids")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)



class Comments(models.Model):
    auction = models.ForeignKey(Auction_listings, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Watchlist(models.Model):
    auction = models.ForeignKey(Auction_listings, on_delete=models.CASCADE, related_name="watchlist")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Auction_results(models.Model):
    auction = models.ForeignKey(Auction_listings, on_delete=models.SET_NULL, null=True, blank=True)
    winner = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    message = models.TextField(blank=True, null=True)



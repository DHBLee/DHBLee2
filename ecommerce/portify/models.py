from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Fragrances(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    male = models.BooleanField(default=False)
    women = models.BooleanField(default=False)
    category = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Candles(models.Model):
    name = models.CharField(max_length=255)
    scent = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name

class Skincare(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    male = models.BooleanField(default=False)
    women = models.BooleanField(default=False)
    category = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Shoppingcart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fragrances = models.ForeignKey(Fragrances, on_delete=models.CASCADE, null=True, blank=True)
    candles = models.ForeignKey(Candles, on_delete=models.CASCADE, null=True, blank=True)
    skincare = models.ForeignKey(Skincare, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.username}'s Shopping Cart"


# Create your models here.

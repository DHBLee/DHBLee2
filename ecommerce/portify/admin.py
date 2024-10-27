from django.contrib import admin
from .models import User, Fragrances, Candles, Skincare, Shoppingcart

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name','is_staff')
    search_fields = ('username', 'email')

class FragrancesAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'male', 'women')
    search_fields = ('name', 'category')
    list_filter = ('male', 'women', 'category')
    list_editable = ('price',)

class ShoppingcartAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_price', 'price')
    search_fields = ('user__username',)
    autocomplete_fields = ['user']
    list_editable = ('total_price',)

class CandlesAdmin(admin.ModelAdmin):
    list_display = ('name', 'scent', 'price')
    search_fields = ('name', 'scent')
    list_filter = ('scent',)
    list_editable = ('price',)

class SkincareAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'male', 'women')
    search_fields = ['name']
    list_filter = ('male', 'women', 'category')
    list_editable = ('price',)


admin.site.register(User, UserAdmin)
admin.site.register(Fragrances, FragrancesAdmin)
admin.site.register(Candles, CandlesAdmin)
admin.site.register(Skincare, SkincareAdmin)
admin.site.register(Shoppingcart, ShoppingcartAdmin)
# Register your models here.

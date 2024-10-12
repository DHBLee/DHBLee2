
from django.contrib import admin
from .models import User, Bids, Comments, Auction_listings, Auction_results
# Register your models here.

class Auction_listingAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "bid", "url")

class BidAdmin(admin.ModelAdmin):
    list_display = ("user", "bid_amount", "auction")

class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "content", "auction")

class Auction_resultAdmin(admin.ModelAdmin):
    list_display = ("auction", "winner", "bid_amount")


admin.site.register(User)
admin.site.register(Auction_listings, Auction_listingAdmin)
admin.site.register(Bids, BidAdmin)
admin.site.register(Comments, CommentAdmin)
admin.site.register(Auction_results, Auction_resultAdmin)


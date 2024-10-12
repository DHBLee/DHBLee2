from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import User, Auction_listings, Bids, Comments, Watchlist, Auction_results, Category
import datetime





def index(request):
    if request.user.is_authenticated:
        listings = Auction_listings.objects.filter(owner=request.user)
        auction_results = Auction_results.objects.filter(winner=request.user)
        user_bids = Bids.objects.filter(user=request.user)
        unique_bids = {bid.auction.id: bid.auction for bid in user_bids}
        bid_listings = list(unique_bids.values())

        return render(request, "auctions/index.html", {
            "listings": listings,
            "auction_results": auction_results,
            "bid_listings": bid_listings,
        })
    else:
        return HttpResponseRedirect(reverse('active_listing'))
    
def close(request, id):
    if request.method == "POST":
        listing = Auction_listings.objects.filter(id=id).first()

        highest_bid = Bids.objects.filter(auction=listing).order_by('-bid_amount').first()
        if highest_bid:
            winner = highest_bid.user
            message = f'Congratulations! You have won the auction for "{listing.title}" with a bid of ${highest_bid.bid_amount}.'

            results = Auction_results (
                auction=listing,
                winner=winner,
                bid_amount=highest_bid.bid_amount,
                message=message,
            )
            results.save()

        listing.delete()

    return HttpResponseRedirect(reverse("index"))

   

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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

@login_required
def new_listing(request):
    return render(request, "auctions/new_listing.html")


def active_listing(request):
    
    if request.method == "POST":
        now = datetime.datetime.now()
        title = request.POST.get('title')
        description= request.POST.get('description')
        bid = request.POST.get('bid')
        url = request.POST.get('url')
        category = request.POST.get('category')

        Cat = Category (
            categoryname=category,
        )
        Cat.save()

        listings = Auction_listings(
            title=title,
            description=description,
            bid=bid,
            url=url,
            owner=request.user,
            category=Cat,
            now=now,
        )
        
        listings.save()
        return render(request, "auctions/active_listing.html", {
                    "listing": Auction_listings.objects.all()
                        })
    
    else:
        category = request.GET.get('category')

        if category:
            listings = []
            category_name = Category.objects.filter(categoryname=category).first()
            for listing in Auction_listings.objects.all():
                if str(listing.category) == str(category_name):   
                    listings.append(listing)
        else:
            listings = Auction_listings.objects.all()

        return render(request, "auctions/active_listing.html", {
            "listing": listings 
        })
    
def listing(request, id):
    listing = Auction_listings.objects.filter(id=id).first()
    current_comment = Comments.objects.filter(auction=listing)
    all_bids = Bids.objects.filter(auction=listing)
    current_watchlist = Watchlist.objects.filter(auction=listing)
    highest_bid = Bids.objects.filter(auction=listing).order_by('-bid_amount').first()

    
    if request.method == 'POST':
        form_type = request.POST.get('form_type')
        if form_type == "listing_form":
            bid_amount = request.POST.get('bid')
            comment1 = request.POST.get('comment')

            if highest_bid is None and float(bid_amount) > float(listing.bid):
                highest_bid = Bids (
                    auction=listing,
                    user=request.user,
                    bid_amount=bid_amount,
                )
                comment2 = Comments(
                            auction=listing,
                            user=request.user,
                            content=comment1,
                        )
                highest_bid.save()
                comment2.save()

                return render(request, "auctions/listing.html", {
                    "bid": bid_amount,
                    "listing": listing,
                    "id": listing.id,
                    "comment": current_comment,
                    "bids":all_bids,
                    "highest_bid": highest_bid,
                    "current_watchlist": current_watchlist,
                })
            else:
                if highest_bid:
                    if float(bid_amount) > float(highest_bid.bid_amount):
                        highest_bid.bid_amount = bid_amount
                        bid = Bids(
                            auction=listing,
                            user=request.user,
                            bid_amount=bid_amount,
                        )
                        comment2 = Comments(
                            auction=listing,
                            user=request.user,
                            content=comment1,
                        )
                        comment2.save()
                        bid.save()

                        return render(request, "auctions/listing.html", {
                            "bid": bid,
                            "listing": listing,
                            "id": listing.id,
                            "comment": current_comment,
                            "bids":all_bids,
                            "highest_bid": highest_bid,
                            "current_watchlist": current_watchlist,
                        })
                else:
                   if float(bid_amount) > float(listing.bid):
                        highest_bid.bid_amount = bid_amount
                        bid = Bids(
                            auction=listing,
                            user=request.user,
                            bid_amount=bid_amount,
                        )
                        comment2 = Comments(
                            auction=listing,
                            user=request.user,
                            content=comment1,
                        )
                        comment2.save()
                        bid.save()

                        return render(request, "auctions/listing.html", {
                            "bid": bid,
                            "listing": listing,
                            "id": listing.id,
                            "comment": current_comment,
                            "bids":all_bids,
                            "highest_bid": highest_bid,
                            "current_watchlist": current_watchlist,
                        })

            return render(request, "auctions/listing.html", {
                "listing": listing,
                "message": "Your bid must be higher than the current bid",
                "id": listing.id,
                "comment": current_comment,
                "bids":all_bids,
                "highest_bid": highest_bid,
                "current_watchlist": current_watchlist,
            })
        elif form_type == "watchlist_form":
            watchlist = Watchlist (
                auction=listing,
                user=request.user,
            )
            watchlist.save()
            current_watchlist = Watchlist.objects.filter(auction=listing)
            return render(request, "auctions/listing.html", {
                "listing": listing, 
                "id":listing.id,
                "comment": current_comment,
                "bids":all_bids,
                "highest_bid": highest_bid,
                "current_watchlist": current_watchlist,
                "message1":"A listing was added to your watchlist page",
                
            })
        elif form_type == "remove_watchlist_form":
            if current_watchlist:
                current_watchlist.delete()
                return render(request, "auctions/listing.html", {
                    "listing": listing, 
                    "id":listing.id,
                    "comment": current_comment,
                    "bids":all_bids,
                    "highest_bid": highest_bid,
                    "message3":"A listing was removed to your watchlist page",
                    "current_watchlist": current_watchlist,
                })
              
    else:
        if current_watchlist:
            return render(request, "auctions/listing.html", {
                "listing": listing,
                "id": listing.id,
                "comment": current_comment,
                "bids":all_bids,
                "highest_bid": highest_bid,
                "current_watchlist": current_watchlist,
                
        })
        return render(request, "auctions/listing.html", {
            "listing": listing,
            "id": listing.id,
            "comment": current_comment,
            "bids":all_bids,
            "highest_bid": highest_bid,
            "current_watchlist": current_watchlist,
        })
    
@login_required
def watchlist(request):
    user_watchlist = Watchlist.objects.filter(user=request.user)

    return render(request, "auctions/watchlist.html", {
        "watchlists": user_watchlist,
    })
    


from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.paginator import Paginator
from .models import User, Candles, Fragrances, Skincare, Shoppingcart

# Create your views here.
def index(request):
    return render(request, "portify/index.html")

def mens_fragrances(request):
    collection = request.GET.get('collection', '')

    if collection:
        fragrances = Fragrances.objects.filter(category__iexact=collection, male=True, women=False)
    else:
        fragrances = Fragrances.objects.filter(male=True, women=False)

    return render(request, "portify/mens_fragrances.html", {
        'fragrances': fragrances
    })

def womens_fragrances(request):
    collection = request.GET.get('collection', '')

    if collection:
        fragrances = Fragrances.objects.filter(category__iexact=collection, women=True,  male=False)
    else:
        fragrances = Fragrances.objects.filter(women=True, male=False)

    return render(request, "portify/womens_fragrances.html", {
        'fragrances' : fragrances
    })

def candles(request):
    collection = request.GET.get('collection', '')

    if collection:
        candles = Candles.objects.filter(scent__iexact=collection)
    else:
        candles = Candles.objects.all()
    return render(request, "portify/candles.html", {
        'candles' : candles
    })

def shampooconditioner(request):
    skincares = Skincare.objects.filter(category__iexact='shampoo', )
    collection = request.GET.get('collection', '')

    if collection:
        if collection == "male":
            genders = skincares.filter(male=True)
            return render(request, "portify/shampooconditioner.html", {
                'genders' : genders
            })
        elif collection == "women":
            genders = skincares.filter(women=True)
            return render(request, "portify/shampooconditioner.html", {
                'genders' : genders
            })
    else:
        genders = skincares
        
    return render(request, "portify/shampooconditioner.html", {
            'genders' : genders
        })

def skincare(request):
    skincares = Skincare.objects.all()

    return render(request, "portify/skincare.html", {
        'skincares' : skincares
    })

def fragrances(request):
    fragrances = Fragrances.objects.filter(women=True, male=True)

    return render(request, "portify/fragrances.html", {
        'fragrances' : fragrances
    })

def bodysoaps(request):
    skincares = Skincare.objects.filter(category__iexact='bodysoaps', )
    collection = request.GET.get('collection', '')

    if collection:
        if collection == "male":
            genders = skincares.filter(male=True)
            return render(request, "portify/bodysoaps.html", {
                'genders' : genders
            })
        elif collection == "women":
            genders = skincares.filter(women=True)
            return render(request, "portify/bodysoaps.html", {
                'genders' : genders
            })
    else:
        genders = skincares

    return render(request, "portify/bodysoaps.html", {
            'genders' : genders
        })
   
def product_detail(request, category, id):
    if category == 'fragrances':
        product = Fragrances.objects.filter(id=id).first()
    elif category == 'candles':
        product = Candles.objects.filter(id=id).first()
    elif category == 'skincare':
        product = Skincare.objects.filter(id=id).first()
    else:
        product = None

    return render(request, 'portify/product_detail.html', {
        'product' : product
    })

def services(request):
    return render(request, "portify/services.html")

def about(request):
    return render(request, "portify/about.html")


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "portify/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "portify/login.html")
    

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "portify/register.html", {
                "message": "Password must match."
            })
        
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "portify/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "portify/register.html")

@login_required
def add_tocart(request):
    if request.method == "POST":
        print('gumagana')
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')
            user = request.user
            print('gumana')

            product = None
            product_model = None

            for model in [Fragrances, Candles, Skincare]:
                try:
                    product = model.objects.get(id=product_id)
                    product_model = model
                    break
                except model.DoesNotExist:
                    continue
            print(product)
            print(product_model)
            if product:
                print(product.price)
                items = Shoppingcart (
                    user=user,
                    price=product.price,
                    **{f"{product_model.__name__.lower()}": product}
                )
                items.save()
                print('wow')
                return JsonResponse({'success': True})
        
            else:
                return JsonResponse({'success': False, 'error': str(e)})
            
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
def shoppingcart(request):
    items = Shoppingcart.objects.filter(user=request.user)
    total_price = sum(item.price for item in items)

    cart_items = []
    for item in items:
        if item.fragrances:
            product_image = item.fragrances.image.url
            product_name = item.fragrances.name
        elif item.candles:
            product_image = item.candles.image.url
            product_name = item.candles.name
        elif item.skincare:
            product_image = item.skincare.image.url
            product_name = item.skincare.name
        else:
            product_image = None
            product_name = "Unknown Product"
        print(product_name)
        cart_items.append({
            'image': product_image,
            'name': product_name,
            'price': item.price,
            'id': item.id
        })

    return render(request, "portify/shoppingcart.html", {
        'items' : cart_items, 'total_price' : total_price
    })

def remove_item(request, item_id):
    if request.method == "POST":
        print(item_id)
        try:
            cart = Shoppingcart.objects.filter(user=request.user, id=item_id)
            cart.delete()
            return JsonResponse({'status': 'success'}, status=200)
        except Shoppingcart.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'Item not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'failed', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'failed', 'message': 'Invalid request method'}, status=400)
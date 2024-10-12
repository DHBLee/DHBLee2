from django.shortcuts import render
import markdown2, random
import sys
from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry_page(request, title):
    entry = util.get_entry(title)
    entries = util.list_entries()
    matching_entries = [entry for entry in entries if title.upper() in entry.upper()]
    if entry:
        converted = markdown2.markdown(entry)
        return render(request, "encyclopedia/entry.html", {
            "title": matching_entries[0],
            "content": converted
        })
        
    elif matching_entries:
        return render(request, "encyclopedia/search_results.html", {
            "title": matching_entries[0]
        })
    else:
        return render(request, "encyclopedia/error.html")
    
def new_page(request, title, description):
    new = util.save_entry(title, description)
    converted = markdown2.markdown(new)
    return render(request, "encyclopedia/entry.html", {
        "title": title,
        "content": converted
    })
    
       

def search(request):
    if request.method == "GET":
        query = request.GET.get('q')
        return entry_page(request,query)
    else:
        return render(request, "encyclopedia/error.html")
    
def create_page(request):
    if request.method == "POST":
        title = request.POST.get('title')
        description= request.POST.get('description')
        if not title or not description:
            return render(request, "encyclopedia/create_page.html", {
            "error_message": "Failed to upload a new page."
        })
        
        elif title.upper() in [entry.upper() for entry in util.list_entries()]:
            return render(request, "encyclopedia/create_page.html", {
            "error_message": "Failed to upload a new page."
        })
        else:
            return new_page(request, title, description)
            
    else:
        return render(request, "encyclopedia/create_page.html")
    
def update_page(request):
    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')
        if description:
            new = util.save_entry(title, description)

            converted = markdown2.markdown(new)
            return render(request, "encyclopedia/entry.html", {
                "title": title,
                "content": converted
            })

def edit_page(request, title):
    description = util.get_entry(title)
    return render(request, "encyclopedia/edit_page.html", {
        "title": title,
        "description": description
    })

def random_page(request):
    page = random.choice(util.list_entries())
    page_content = util.get_entry(page)
    converted = markdown2.markdown(page_content)
    return render(request, "encyclopedia/entry.html", {
        "title":page,
        "content": converted
        })


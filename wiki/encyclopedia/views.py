from django.shortcuts import render
import markdown2
import sys
from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry_page(request, title):
    entry = util.get_entry(title)
    entries = util.list_entries()
    matching_entries = [entry for entry in entries if title.lower() in entry.lower()]
    if entry:
        converted = markdown2.markdown(entry)
        print("sdfgh")
        return render(request, "encyclopedia/entry.html", {
            "title": title,
            "content": converted
        })
        
    elif matching_entries:
        return render(request, "encyclopedia/search_results.html", {
            "title": matching_entries[0]
        })
    else:
        return render(request, "encyclopedia/error.html")
    
def search(request):
    query = request.GET.get('q')
    print(query)
    if query:
        return entry_page(request,query)
    else:
        return render(request, "encyclopedia/error.html")
    

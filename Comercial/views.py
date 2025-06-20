from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def anadirReqs(request):
    return render(request, 'anadirReqs.html')
from rest_framework.views import APIView 
from rest_framework.response import Response
from .models import Place
from users.models import User
from .serializers import PlaceSerializer
from django.shortcuts import render,redirect
# from urllib.parse import quote
import requests


class TestPage(APIView):
    def get(self,request):
        places = Place.objects.all()
        users = User.objects.all()
        return render(request,'testpage.html',{'places':places,'users':users})

class AllPlaces(APIView):
    def get(self,request):
        places = Place.objects.all().order_by('title')
        serializer = PlaceSerializer(places,many=True)
        return Response(serializer.data)


class DeletePlace(APIView):    
    def delete(self,request,place_id):
        place = Place.objects.get(id=place_id)
        if (place.user == request.user) or (request.user.id == 1):
            place.delete()
            return Response('delete completes')
        else:
            raise PermissionError

class CreatePlace(APIView):
    def post(self,request):
        serializer = PlaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return redirect('/api/v1/places')
        return Response(serializer.errors)
    
class SearchPlace(APIView):
    def post(sel,request):
        client_id = 'F1xqiIHmXrSUT6TFuntC'
        client_secret = '0tA26WL4FW'
        headers = {'X-Naver-Client-Id':client_id,'X-Naver-Client-Secret':client_secret}

        place_search_url = 'https://openapi.naver.com/v1/search/local.json?query='
        kw = request.data['place'] + '신사점'    
        place_url = place_search_url + kw + '$&display=1'
        place_result = requests.get(place_url,headers = headers).json()

        place_result_none_b = place_result['items'][0]['title'].replace('<b>', '')
        
        place_result_none_b = place_result_none_b.replace('</b>', '')

        place_result['items'][0]['title'] = place_result_none_b

        place_image_url = 'https://openapi.naver.com/v1/search/image?query='
        image_url = place_image_url + kw + '$&display=1'
        image_result = requests.get(image_url,headers = headers).json() 
        return Response({'place':place_result,"image":image_result})
        # return Response(place_result_none_b)
        
class ModifyPlace(APIView):
    def put(self,request,place_id):
        place = Place.objects.get(id=place_id)
        
        if (place.user != request.user) or (request.user.id != 1):
            raise PermissionError
        
        serializer = PlaceSerializer(
            place,
            data = request.data,
            partial = True,
            context = {'request':request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response('Modify Complete!')
        else:
            return Response(serializer.errors)

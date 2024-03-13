from django.shortcuts import render,HttpResponse
import json
import cv2
from django.http import JsonResponse
from PIL import Image
from django.views.decorators.csrf import csrf_exempt
import numpy as np 
from datetime import datetime
import os
from .helper import faceditector
from .helper.lipstic import drawLips 
from .helper.foundation import apply_foundation

def generate_unique_string():
    # Get the current date and time
    current_datetime = datetime.now()
    # Generate a unique string using the current date and time
    unique_string = current_datetime.strftime("%Y%m%d%H%M%S%f")
    return str(unique_string)


# used to send the image
def ret_http_image(img):
    if img is None:
        return HttpResponse("no image generated",status=404)

    _,img_encoded=cv2.imencode('.jpg',img)
    img=img_encoded.tobytes()
    return HttpResponse(img,content_type='image/jpeg')


# Create your views here.
def home(requst):
    return HttpResponse('hello world')


@csrf_exempt
def receive_image(request):
    if request.method == 'POST':
        try:
            # Access the image file from the request
            image_file = request.FILES['image']
            # Access other form fields if needed
            field1 = request.POST.get('name')
            # open image file using pil image library
            image=Image.open(image_file)
            #converting the image to http formate
            image=np.array(image)
            # save the image
            points=faceditector.detect_landmarks(image)
            request.session['points']=points
            path=os.getcwd()
            folder_path=path+'/tools/images/'
            path=folder_path+generate_unique_string()+".jpg"
            cv2.imwrite(path,cv2.cvtColor(image,cv2.COLOR_RGB2BGR))
            print(path)
            request.session['image']=path
            return JsonResponse({'message': 'Image processed successfully', 'name': field1})
        except Exception as e:
            return JsonResponse({'error': 'Error processing image', 'details': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    

@csrf_exempt
def draw_lipstic(request):
    if request.method=='POST':
        raw_data=request.body
        jsondata=json.loads(raw_data)
        # print(jsondata)
        if 'r' not in jsondata or 'g' not in jsondata or 'b' not in jsondata or 'saturation' not in jsondata:
            return JsonResponse({'error':'missing rgb or saturation values for lips'},status=422)
        img=request.session['image']
        img=cv2.imread(img)
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        points=request.session['points']
        img=drawLips(img,points,jsondata['r'],jsondata['g'],jsondata['b'],jsondata['saturation'])
        return ret_http_image(img)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt    
def foundation(request):
    if request.method=='POST':
        raw_data=request.body
        jsondata=json.loads(raw_data)
        # print(jsondata)
        if 'r' not in jsondata or 'g' not in jsondata or 'b' not in jsondata or 'saturation' not in jsondata:
            return JsonResponse({'error':'missing rgb or saturation values for foundation'},status=422)
        img=request.session['image']
        img=cv2.imread(img)
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        img=apply_foundation(img,jsondata['r'],jsondata['g'],jsondata['b'],jsondata['saturation'])
        return ret_http_image(img)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

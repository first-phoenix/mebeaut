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
from .helper.eyeliner import applyEyeLiners
import base64
import io

def generate_unique_string():
    # Get the current date and time
    current_datetime = datetime.now()
    # Generate a unique string using the current date and time
    unique_string = current_datetime.strftime("%Y%m%d%H%M%S%f")
    return str(unique_string)


# used to send the image
def ret_http_image(img):
    # Convert the NumPy array to a PIL Image
    image = Image.fromarray(img)

    # Create a BytesIO object to hold the image data
    image_buffer = io.BytesIO()

    # Save the PIL Image to the BytesIO object in PNG format
    image.save(image_buffer, format='PNG')

    # Get the base64 encoded string
    base64_image_string = base64.b64encode(image_buffer.getvalue()).decode()
    raw_data=json.dumps({'image':'data:image/png;base64,'+base64_image_string})
    # raw_data=json.dumps({'image':'hello'})
    # print(raw_data)

    return HttpResponse(raw_data,content_type='application/json')
    # if img is None:
    #     return HttpResponse("no image generated",status=404)
    # _,img_encoded=cv2.imencode('.jpg',img)
    # img=img_encoded.tobytes()
    # print(img)
    # return HttpResponse(img,content_type='image/jpeg')


# Create your views here.
def home(requst):
    return HttpResponse('hello world')


@csrf_exempt
def receive_image(request):
    if request.method == 'POST':
        try:
            raw_data=json.loads(request.body)
            print(raw_data)
            raw_data=raw_data['image']
            raw_data=raw_data[22:]
            # Decode the base64 string to binary data
            binary_data = base64.b64decode(raw_data)
            # Convert binary data to a PIL Image
            image = Image.open(io.BytesIO(binary_data))
            # Convert the PIL Image to a NumPy array
            image = np.array(image)
            # save the image
            points=faceditector.detect_landmarks(image)
            request.session['points']=points
            path=os.getcwd()
            folder_path=path+'/tools/images/'
            path=folder_path+generate_unique_string()+".jpg"
            cv2.imwrite(path,cv2.cvtColor(image,cv2.COLOR_RGB2BGR))
            request.session['image']=path
            return JsonResponse({'message': 'Image processed successfully'})
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
        img=apply_foundation(img,jsondata['r'],jsondata['g'],jsondata['b'])
        return ret_http_image(img)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt    
def eyeline(request):
    if request.method=='POST':
        raw_data=request.body
        jsondata=json.loads(raw_data)
        # print(jsondata)
        if 'r' not in jsondata or 'g' not in jsondata or 'b' not in jsondata or 'thickness' not in jsondata:
            return JsonResponse({'error':'missing rgb or thickness values for eyeline'},status=422)
        img=request.session['image']
        img=cv2.imread(img)
        # img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        points=request.session['points']
        img=applyEyeLiners(img,points,rgbColor=(jsondata['r'],jsondata['g'],jsondata['b']),thickness=jsondata['thickness'])
        return ret_http_image(img)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt    
def makeup(request):
    if request.method=='POST':
        raw_data=request.body
        jsondata=json.loads(raw_data)
        # print(jsondata)
        img=request.session['image']
        points=request.session['points']
        img=cv2.imread(img) #BGR image
        if 'lipstick' in jsondata:
            if 'r' not in jsondata['lipstick'] or 'g' not in jsondata['lipstick'] or 'b' not in jsondata['lipstick']:
                return JsonResponse({'error':'missing rgb or saturation values for lips'},status=422)
            img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB) #RGB image
            img=drawLips(img,points,jsondata['lipstick']['r'],jsondata['lipstick']['g'],jsondata['lipstick']['b']) #BGR image
            # img=drawLips(img,points,255,0,0)
        if 'foundation' in jsondata:
            if 'r' not in jsondata['foundation'] or 'g' not in jsondata['foundation'] or 'b' not in jsondata['foundation']:
                return JsonResponse({'error':'missing rgb or saturation values for foundation'},status=422)
            img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
            img=apply_foundation(img,jsondata['foundation']['r'],jsondata['foundation']['g'],jsondata['foundation']['b'])
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        if 'eyeliner' in jsondata:
            if 'r' not in jsondata['eyeliner'] or 'g' not in jsondata['eyeliner'] or 'b' not in jsondata['eyeliner']:
                return JsonResponse({'error':'missing rgb or saturation values for lips'},status=422)
            img=applyEyeLiners(img,points,rgbColor=(jsondata['eyeliner']['r'],jsondata['eyeliner']['g'],jsondata['eyeliner']['b']))
        cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        return ret_http_image(img)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

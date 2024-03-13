import cv2
import numpy as np


def upperLip(landmarks):
    array=[49,50,51,52,53,54,55,65,64,63,62,61,49]
    return [landmarks[point-1] for point in array]

def lowerLip(landmarks):
    array=[49,61,68,67,66,65,55,56,57,59,59,60,49]
    return [landmarks[point-1] for point in array]

def createBox(img,upper,lower):
    poly1=np.array(upper,np.int32).reshape((-1,1,2))
    poly2=np.array(lower,np.int32).reshape((-1,1,2))
    mask = np.zeros_like(img)
    mask = cv2.fillPoly(mask,[poly1,poly2],(255,255,255))
    return mask

def drawLips(img,points,r,g,b,saturation):
    imgOriginal=cv2.cvtColor(img,cv2.COLOR_RGB2BGR)
    imgLips=createBox(img,upperLip(points),lowerLip(points))
    imgColorLips=np.zeros_like(imgLips)
    imgColorLips[:]=b,g,r #fill BGR value
    imgColorLips=cv2.bitwise_and(imgLips,imgColorLips)
    imgColorLips=cv2.GaussianBlur(imgColorLips,(7,7),10)
    imgColorLips=cv2.addWeighted(imgOriginal,1,imgColorLips,saturation,0)
    return imgColorLips
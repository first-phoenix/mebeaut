import numpy as np
import cv2

def leftEye(landmarks):
    array=[37,38,39,40,41,42,37]
    return [landmarks[point-1] for point in array]

def rightEye(landmarks):
    array=[43,44,45,46,47,48,43]
    return [landmarks[point-1] for point in array]

def applyEyeLiners(img,landmarks,rgbColor=(0,0,0),thickness=1):
    leftEyeLandmarks=leftEye(landmarks)
    rightEyeLandmarks=rightEye(landmarks)
    poly1=np.array(leftEyeLandmarks,np.int32).reshape((-1,1,2))
    poly2=np.array(rightEyeLandmarks,np.int32).reshape((-1,1,2))
    return cv2.polylines(img.copy(),[poly1,poly2],isClosed=True,color=rgbColor,thickness=thickness)
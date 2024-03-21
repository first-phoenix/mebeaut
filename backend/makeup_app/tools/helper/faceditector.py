from . import faceblendcommon as fbc
import dlib
import os
def detect_landmarks(img):
    PREDICTOR_PATH= os.getcwd()+r"\tools\helper\shape_predictor_68_face_landmarks.dat"
    faceDetector=dlib.get_frontal_face_detector()
    landmarkDetector=dlib.shape_predictor(PREDICTOR_PATH)
    points=fbc.getLandmarks(faceDetector,landmarkDetector,img)
    return points
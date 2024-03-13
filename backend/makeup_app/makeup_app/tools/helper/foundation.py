import cv2
import numpy as np
def apply_foundation(img,r,g,b,saturation):
    # Load the image
    image = cv2.cvtColor(img,cv2.COLOR_RGB2BGR)
    img=image.copy()
    # Define the color range for the object you want to change
    lower_color = np.array([108, 23, 82])  # Lower bound of the color range (BGR format)
    upper_color = np.array([179, 255, 255])  # Upper bound of the color range (BGR format)
    # Create a mask for the object
    mask = cv2.inRange(image, lower_color, upper_color)
    # Apply color transformation
    image[mask > 0] = [b,g,r] 
    # image=cv2.GaussianBlur(image,(7,7),10)
    image=cv2.addWeighted(img,1,image,saturation,0)
    return image

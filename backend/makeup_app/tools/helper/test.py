from foundation import apply_foundation
import cv2

img=cv2.imread(r"C:\Users\arpan.a.mandal\Desktop\project\main_app\makeup_app\tools\images\image_test.jpg")
img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
folder=r"C:\Users\arpan.a.mandal\Desktop\project\main_app\makeup_app\tools\helper\Images_with_different_saturation_and_foundation_color"

for r in range(1,256,15):
    for g in range(1,256,15):
        for b in range(1,256,15):
            for s in range (1,60,6):
                res_img=apply_foundation(img,r,g,b,s/100)
                # res_img=cv2.cvtColor(res_img,cv2.COLOR_BGR2RGB)
                name='\image_'+str(r)+'_'+str(g)+'_'+str(b)+'_'+str(s)+'.jpg'
                cv2.imwrite(folder+name,res_img)
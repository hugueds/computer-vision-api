import os
import cv2 as cv

TARGET_SIZE = (640, 480)

PATH = 'images/boxes/ok'

for f in os.listdir(PATH):
    ext = f.split('.')[-1].lower()
    if ext == 'png' or ext == 'jpg' or ext == 'jpeg':        
        img = cv.imread(f'{PATH}\{f}', -1)                    
        img = cv.resize(img, TARGET_SIZE)        
        cv.imwrite(f'{PATH}/{f}', img)
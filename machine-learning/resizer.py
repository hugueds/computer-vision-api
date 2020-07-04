import os
import cv2 as cv

TARGET_SIZE = (640, 480)

PATH = 'images/boxes/'

for folder in os.listdir(PATH):
    print('Reading folder ' + folder)
    for f in os.listdir(f'{PATH}/{folder}'):
        print('Reading File ' + f)
        ext = f.split('.')[-1].lower()
        if ext == 'png' or ext == 'jpg' or ext == 'jpeg':        
            img = cv.imread(f'{PATH}/{folder}/{f}', -1)                    
            img = cv.resize(img, TARGET_SIZE)        
            cv.imwrite(f'{PATH}/{folder}/{f}', img)
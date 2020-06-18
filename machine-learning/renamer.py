import os 
import argparse

parser = argparse.ArgumentParser()

PATH = 'images/boxes/'

for folder in os.listdir(PATH):
    i = 999
    for f in os.listdir(f'{PATH}/{folder}'):
        ext = f.split('.')[-1].lower()
        if ext == 'png' or ext == 'jpg' or ext == 'jpeg':
            if ext == 'jpeg':
                ext ='jpg'
            new_name = f'{PATH}/{folder}/{str(i)}.{ext}'        
            os.rename(f'{PATH}/{folder}/{f}', f'{new_name}')
            i += 1

for folder in os.listdir(PATH):
    i = 0
    for f in os.listdir(f'{PATH}/{folder}'):
        ext = f.split('.')[-1].lower()
        if ext == 'png' or ext == 'jpg' or ext == 'jpeg':            
            new_name = f'{PATH}/{folder}/{str(i)}.{ext}'        
            os.rename(f'{PATH}/{folder}/{f}', f'{new_name}')
            i += 1
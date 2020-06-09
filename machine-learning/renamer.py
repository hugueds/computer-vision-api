import os 
import argparse

parser = argparse.ArgumentParser()

PATH = 'images/boxes/ok'

i = 0

for f in os.listdir(PATH):
    ext = f.split('.')[-1].lower()
    if ext == 'png' or ext == 'jpg' or ext == 'jpeg':        
        new_name = f'{PATH}/{str(i)}.{ext}'        
        os.rename(f'{PATH}/{f}', f'{new_name}')
        i += 1


import cv2
import base64
import numpy as np

base = 'data:image/jpg;base64,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)'

def data_uri_to_cv2_img(uri):
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

data_uri = base
img = data_uri_to_cv2_img(data_uri)
cv2.imshow('image',img)

cv2.waitKey(0)
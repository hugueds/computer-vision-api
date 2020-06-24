import cv2 as cv
import numpy as np 
import tensorflow as tf 
from tensorflow.keras.applications.mobilenet_v2 import decode_predictions

model = tf.keras.applications.MobileNetV2(
    input_shape=(128,128,3),
    alpha=1.0,
    include_top=True,
    weights="imagenet",    
    pooling=None,
    classes=1000,    
)

cap = cv.VideoCapture(0)

while True:

    _, frame = cap.read()

    pred_img = frame.copy()

    pred_img = cv.resize(pred_img, (128,128))
    pred_img = pred_img / 255
    pred_img = np.expand_dims(pred_img, axis=0)

    res = model.predict(pred_img)
    pred = decode_predictions(res, top=1)[0][0]
    

    cv.putText(frame, f'{pred[1]} - { round(pred[2], 2)}', (20, 30), cv.FONT_HERSHEY_SIMPLEX, 1, (0,200,0), 2)

    print(pred)

    cv.imshow('Frame', frame)

    if cv.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv.destroyAllWindows()
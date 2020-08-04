export const environment = {
  production: false,
  server: 'https://10.33.22.113:5000/api',
  modelPath: 'https://10.33.22.113:5000/model/{model}/model.json'
};

export const quaggaConfig = {

  debug: false,
  frequency: 5,
  numOfWorkers: 4,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      width: { min: 640 },
      height: { min: 480 },
      aspectRatio: { min: 1, max: 100 },
      facingMode: 'environment'
    }
  },

  decoder: {
    readers: ["code_128_reader", 'ean_reader', 'ean_8_reader']
  }
}

export const cameraConstraints = {
  audio: false,
  video: {
    width: { min: 640 },
    height: { min: 480 },
  },
  advanced: [{
    facingMode: "environment"
  }]
}

export const MOBILE_WIDTH = 600;

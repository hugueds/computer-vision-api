export const environment = {
  production: true,
  server: 'https://10.33.22.113:5000/api'
};

export const quaggaConfig = {

  debug: false,
  frequency: 2,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: null,
    // target: this.video.nativeElement,
  },
  decoder: {
    readers: ["code_128_reader", 'ean_reader', 'ean_8_reader']
  }
}

export const cameraConstraints = {
  audio: false,
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
  advanced: [{
    facingMode: "environment"
  }]
}

export const MOBILE_WIDTH = 600;

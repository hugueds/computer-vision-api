// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: 'http://127.0.0.1:5000/api',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA_buS-5gVDwV8vWWyg75d4iCIiPx7ZtM0",
    authDomain: "acutality.firebaseapp.com",
    databaseURL: "https://acutality.firebaseio.com",
    projectId: "acutality",
    storageBucket: "acutality.appspot.com",
    messagingSenderId: "587709653042"
  }
};

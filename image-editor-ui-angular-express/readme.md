# Web (Angular and Express): Image Editor UI

This is an example of using the Creative SDK for web with Angular and Express.

The code for loading and launching the Creative SDK Image Editor can be found in `client/pre-build/home/home.controller.js`.

The image is served from `server/images` via a static path defined in `server/app.js`.

## How to use

Just follow the steps below.

### In your browser

1. [Register a new app for the Creative SDK](https://creativesdk.adobe.com/myapps.html)
2. Note your Client ID. You will need it soon.

### In your local development environment

1. `git clone` [the parent repo](https://github.com/CreativeSDK/web-getting-started-samples)
1. `cd` into this subdirectory
1. Run `npm install`
1. Add your Creative SDK Client ID as a string in `client/pre-build/home/home.controller.js` (replacing the string `<YOUR_API_KEY>`)
1. In one terminal tab, run `gulp` and leave it running
1. In a second terminal tab, run `npm start`, then load `localhost:4545` in your browser

## Learn more

Check out the [Getting started guide](https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html) for configuration options and more!
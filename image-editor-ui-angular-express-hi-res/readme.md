# Web (Angular and Express): Image Editor UI, High Resolution

This is an example of using the Creative SDK Image Editor for Web with Angular and Express. It shows one way to set up your client and server for **High Resolution image editing**. 

_**Note:** Approval is required for High Resoltion image editing to work in the Web Image Editor. For more information about getting approval, see the [High Resolution image editing guide](https://creativesdk.adobe.com/docs/android/#/articles/highresolution/index.html)._

## How to use

Just follow the steps below. Note that high resolution image editing will only work if you have been approved (see above).

### In your browser

1. [Register a new app for the Creative SDK](https://creativesdk.adobe.com/myapps.html)
2. Note your Client ID and Secret. You will need them soon.

### In your local development environment

1. `git clone` [the parent repo](https://github.com/CreativeSDK/web-getting-started-samples)
1. `cd` into this subdirectory
1. Run `npm install`
1. Make a new file named `apiKeys.js` in `/server` with this code:
	
	```
	module.exports = {
		creativeSdkKey: "<YOUR_API_KEY>",
		creativeSdkSecret: "<YOUR_API_SECRET>"
	}
	```

	1. Add your Client ID and Secret in place of the strings above
	1. This file is **gitignored** so you can avoid exposing your keys in GitHub

1. In one terminal tab, run `gulp` and leave it running
1. In a second terminal tab, run `npm start`, then load `localhost:4545` in your browser

## Learn more

Check out the [High Resolution image editing guide](https://creativesdk.adobe.com/docs/android/#/articles/highresolution/index.html) for configuration options and more!
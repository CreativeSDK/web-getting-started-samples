# Web: Creative Cloud Files API

This directory contains sample code for using the Creative Cloud Files API for Web.

Check out the [Creative Cloud Files API guide](https://github.com/CreativeSDK/web-getting-started-samples/blob/master/creative-cloud-files-api/guide/creative-cloud-files-api.md) for configuration options and more!

### Contents

1. [Relevant files](#relevant-files)
1. [How to use locally](#how-to-use-locally)
1. [Sample JavaScript content](#sample-javascript-content)
1. [Learn more](#learn-more)

## Relevant files

- `./index.html`
- `./index.js`
- `../guide/creative-cloud-files-api.md`

## How to use locally

Follow the steps below.

### In your browser

1. [Register a new app for the Creative SDK](https://creativesdk.zendesk.com/hc/en-us/articles/216369343-Why-and-how-to-register-my-app-)
	
	Note your Client ID (API Key). You will need it soon.

1. [Follow the Configuration instructions in the User Auth UI guide](https://github.com/CreativeSDK/web-getting-started-samples/blob/master/user-auth-ui/guide/user-auth-ui.md#config)

	You will use the `redirectims.html` file you create in the next section


### In your local development environment

1. `git clone` [the parent repo](https://github.com/CreativeSDK/web-getting-started-samples)
1. `cd` into this subdirectory
1. Add the `redirectims.html` file you created in the previous section to the top-level of this subdirectory
1. Create a file called `config.js` and add the following code:

	```
	var CONFIG = {
		CSDK_CLIENT_ID: "<YOUR_API_KEY_HERE>"
	}
	```

	Be sure to replace the string above with your Client ID (API Key).

1. Set up SSL

	`openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes`

	This will add a `server.pem` file to this subdirectory.

1. Start your local `https` server
1. Access the sample site using the local URL you entered when registering your app in the previous section above

	Note that the local URL will need to be registered in your local `hosts` file in order to use this repo locally.

### File structure

Upon successful setup, you will have the following items in this directory:

- `img/`
- `.gitignore`
- `config.js` (added by you in the steps above)
- `index.html`
- `index.js`
- `readme.md`
- `redirectims.html` (added by you in the steps above)
- `server.pem` (added by you in the steps above)
- `style.css`

## Sample JavaScript content

The sample script (`index.js`) in this repo is written in vanilla JavaScript to allow for accessbility to the widest possible range of JavaScript developers.

The script is broken up into 3 sections:

1. UI Element Setup
1. Intialization
1. Helper functions

The most relevant areas to look at when learning about the Creative Cloud Files API are:

1. The `AdobeCreativeSDK.init()` call
1. The `uploadFile()` helper function
1. The `getCCFolderAssets()` helper function
1. The `downloadCCAssetRendition()` helper function

## Learn more

Check out the [Creative Cloud Files API guide](https://github.com/CreativeSDK/web-getting-started-samples/blob/master/creative-cloud-files-api/guide/creative-cloud-files-api.md) for configuration options and more!
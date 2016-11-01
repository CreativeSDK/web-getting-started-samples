# Web: Getting Started

This directory contains sample code to accompany the Creative SDK Getting Started guide for Web.

Check out the [Getting Started guide](https://github.com/CreativeSDK/web-getting-started-samples/blob/master/getting-started/guide/getting-started.md) for more details!

### Contents

1. [Relevant files](#relevant-files)
1. [How to use locally](#how-to-use-locally)
1. [Learn more](#learn-more)

## Relevant files

- `./index.html`
- `./index.js`
- `../guide/getting-started.md`

## How to use locally

Follow the steps below.

### In your browser

1. [Register a new app for the Creative SDK](https://creativesdk.zendesk.com/hc/en-us/articles/216369343-Why-and-how-to-register-my-app-)
	
	Note your Client ID (API Key). You will need it soon.


### In your local development environment

1. `git clone` [the parent repo](https://github.com/CreativeSDK/web-getting-started-samples)
1. `cd` into this subdirectory
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

	You will know you are set up correctly if you have access to the `AdobeCreativeSDK` object in your browser console.

### File structure

Upon successful setup, you will have the following items in this directory:

- `.gitignore`
- `config.js` (added by you in the steps above)
- `index.html`
- `index.js`
- `readme.md`
- `server.pem` (added by you in the steps above)

## Learn more

Check out the [Getting Started guide](https://github.com/CreativeSDK/web-getting-started-samples/blob/master/getting-started/guide/getting-started.md) for more details!
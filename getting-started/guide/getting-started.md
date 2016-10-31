# Getting started with the Creative SDK for Web

The Creative SDK lets you build applications that integrate with the Adobe Creative Cloud and leverage its power to benefit your users. 

From letting your users import from and save to their Creative Cloud storage, to offering innovative creative tools for your application, the Creative SDK will help you expand the features of your app with the Adobe Creative Cloud platform.

This guide shows you how to get up and running with the Creative SDK for Web, including how to authenticate your client, a necessary step for integration with the SDK.

## Contents

1. [GitHub](#github)
1. [Prerequisites](#prerequisites)
1. [Registering Your Application](#register)
1. [Adding the SDK to a New Project](#new-project)
1. [Initializing the SDK](#init)
1. [What's Next?](#whats-next)
1. [Explore the Creative SDK for Web Documentation](#explore)


<a name="github"></a>
## GitHub

You can find companion GitHub repos for the Creative SDK developer guides [on the Creative SDK GitHub organization](https://github.com/CreativeSDK/web-getting-started-samples). 

Be sure to follow all instructions in the `readme`.


<a name="prerequisites"></a>
## Prerequisites

1. Before you can work with the Creative SDK, you must register your application and get Client ID (API Key) and Client Secret values. For details, see the "Registering Your Application" section of this guide.
1. The following software is required:

    - **Supported browsers**: Chrome 53+, Safari 9+, Firefox 45+, Edge, IE11+
	- **SSL required**: Your site must support SSL on any page that integrates the Creative SDK.


<a name="register"></a>
## Registering Your Application

When you register your application, you are automatically approved for Development Mode. 

_**Important:** Your Client ID (API Key) must be [approved for **Production Mode** by Adobe](https://creativesdk.zendesk.com/hc/en-us/articles/204601215-How-to-complete-the-Production-Client-ID-Request) before you release your app._ See the "What's Next?" section of this guide for details on submitting your app for Production Mode approval.

To register your application for Development Mode, follow these steps:

1. Go to the <a href="https://adobe.io/console/" target="_blank">Adobe.io Console</a>
1. Click "+ New Integration"
1. Click "Adobe ID Key", then "Next"

Fill out the **Integration Info** form: 

1. Select "Web" as your platform
1. Enter your Integration Name

    This is your app name, and will be displayed to the user when they authorize your app during the User Auth process.
    
1. Enter your Default redirect URI

    This should be your root domain.

1. Enter a comma-separated list of redirect URIs

    Used to verify that your Client ID is being used by your site and your site alone.

    List any subdomains here. Note that you cannot use regex here.

1. Enter a description of your app

    Shown only to you when you access this Console, and to Adobe for internal purposes, including during the app approval process.

1. Fill out the Captcha
1. Click the "Next" button

On the next page, add **Integration services**:

1. Click the "Add service" dropdown
1. Select "Creative SDK"
1. Click the "Add service" button
1. Scroll to the bottom of the page and click the "Save" button

_**Note:** As part of registering your application, you are given a Client ID (API Key). We will use this in the steps below._


<a name="new-project"></a>
## Adding the SDK to a New Project

The Creative SDK for Web doesn’t require that you download any special files or libraries. Instead, you simply include the Creative SDK script in your website, which will load the necessary resources:

```language-html
<body>

    <!-- Your HTML here -->

    <script type="text/javascript" src="https://cdn-creativesdk.adobe.io/v1/csdk.js"></script>
</body>
```

_**Important:** As seen in the code above, the `csdk.js` script needs to be placed inside the `<body>` element, ideally just before the closing `</body>` tag so as not to delay page loading._

The `csdk.js` script creates an `AdobeCreativeSDK` object that you can use to access all of the functionality within the Creative SDK.


<a name="init"></a>
## Initializing the SDK

Initialization is a required step before integrating any Creative SDK components. 

As part of initialization, you authenticate your client with the Client ID (API Key) you have obtained from the Adobe.io Console (see the "Registering Your Application" section above).

Initialization is also where you can check for common setup errors and handle them accordingly.

### Code

See comments **#1-4** in the code below:

```language-javascript
/* 1) Initialize the AdobeCreativeSDK object */
AdobeCreativeSDK.init({
	/* 2) Add your Client ID (API Key) */
    clientID: '<YOUR_CLIENT_ID_HERE>',
    onError: function(error) {
        /* 3) Handle any global or config errors */
        if (error.type === AdobeCreativeSDK.ErrorTypes.AUTHENTICATION) { 
            /* 
            	Note: this error will occur when you try 
                to launch a component without checking if 
            	the user has authorized your app. 
            	
            	From here, you can trigger 
                AdobeCreativeSDK.loginWithRedirect().
            */
            console.log('You must be logged in to use the Creative SDK');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.GLOBAL_CONFIGURATION) { 
            console.log('Please check your configuration');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.SERVER_ERROR) { 
            console.log('Oops, something went wrong');
        }
    }
});
```

At this point, try reloading your web page to verify if Initialization has been set up correctly.

### Success

You can check that the setup is correct by opening your web console and verifying that you have access to the `AdobeCreativeSDK` object.

### Error

If you get an `XMLHttpRequest` error due to `'Access-Control-Allow-Origin'`, there is likely an issue with your SSL setup (as noted in the "Prerequisites" section of this guide, SSL is required).


<a name="whats-next"></a>
## What's Next?

### Terms of Use (TOU) and Branding

See the guidelines in [Using the Creative Cloud Badge and Brand](https://creativesdk.adobe.com/docs/android/#/brandguidelines/index.html) and the [Terms of Use](http://wwwimages.adobe.com/content/dam/Adobe/en/legal/servicetou/Creative_SDK-en_US.pdf). 

### Submit Your Application for Review

Adobe must review all applications that use the Creative SDK before they are released. 

[Instructions for submitting your app for review are here](https://creativesdk.zendesk.com/hc/en-us/articles/204601215-How-to-complete-the-Production-Client-ID-Request).


### Troubleshooting and Support

Articles about common issues are at [help.creativesdk.com](http://help.creativesdk.com/), along with a place to submit tickets for bugs, feature requests, and general feedback.


<a name="explore"></a>
## Explore the Creative SDK for Web Documentation

The Creative SDK offers a number of components. Each one can be added to your app individually, as you need them, for your unique integration. 

See our other developer guides to learn more:

- [User Auth UI](https://creativesdk.adobe.com/docs/web/#/articles/userauthui/index.html)
- [Creative Cloud Files API](https://creativesdk.adobe.com/docs/web/#/articles/ccfiles/index.html)
- [Asset Browser UI](https://creativesdk.adobe.com/docs/web/#/articles/assetbrowser/index.html)
- [Image Editor UI](https://creativesdk.adobe.com/docs/web/#/articles/imageeditorui/index.html)
- [Image Editor UI Hi-Res API](https://creativesdk.adobe.com/docs/web/#/articles/highresolution/index.html)
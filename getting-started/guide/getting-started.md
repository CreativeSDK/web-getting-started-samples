# Getting started with the Creative SDK for Web

The Creative SDK lets you build applications that integrate with the Adobe Creative Cloud and leverage its power to benefit your users. 

From letting your users import from and save to their Creative Cloud storage, to offering innovative creative tools for your application, the Creative SDK will help you expand the features of your app by using the Adobe platform.

This guide shows you how to get up and running with the Creative SDK for Web, including how to authenticate your client, a necessary step for integration with the SDK.

## Contents

1. [GitHub](#github)
1. [Prerequisites](#prerequisites)
1. [Registering Your Application](#register)
1. [Adding the SDK to a New Project](#new-project)
1. [Integrating Client Auth](#client-auth)
1. [What's Next?](#whats-next)
1. [Explore the Creative SDK for Web Documentation](#explore)


<a name="github"></a>
## GitHub

You can find companion GitHub repos for the Creative SDK developer guides [on the Creative SDK GitHub organization](https://github.com/CreativeSDK/web-getting-started-samples). 

Be sure to follow all instructions in the `readme`.


<a name="prerequisites"></a>
## Prerequisites

1. Before you can work with the Creative SDK, you must register your application and get Client ID and Client Secret values. For details, see [Registering Your Application](#register).
1. The following software is required:

    - **Supported browsers**: Chrome 53+, Safari 9+, Firefox 45+, Edge, IE11+
	- **SSL required**: Your site must support SSL on any page that integrates the Creative SDK.


<a name="register"></a>
## Registering Your Application

When you register your application, you are automatically approved for Development Mode. 

_Your Client ID (API Key) must be [approved for **Production Mode** by Adobe](https://creativesdk.zendesk.com/hc/en-us/articles/204601215-How-to-complete-the-Production-Client-ID-Request) before you release your app._ See the [What's Next?](#whats-next) section for details on submitting your app for Production Mode approval.

To register your application for Development Mode, follow these steps:

1. Go to the [Adobe.io Console](adobe.io/console/)
1. Click "+ New Integration"
1. Click "Adobe ID Key", then "Next"
1. Fill out the form, then click "Next" (be sure to select "Web" as your platform)

_**Important:** As part of registering your application, you are given a Client ID (API Key). We will use this in the steps below._


<a name="new-project"></a>
## Adding the SDK to a New Project

The Creative SDK for web doesn’t require that you download any special files or libraries. Instead, you simply include a bit of JavaScript in your web site that loads the necessary resources. 

```html
<body>

    <!-- Your HTML here -->

    <script type="text/javascript" src="https://cdn-creativesdk.adobe.io/0.3/csdk.js"></script>
</body>
```

The JavaScript creates an `AdobeCreativeSDK` object that you can use to access all of the functionality within the Creative SDK.


<a name="client-auth"></a>
## Integrating Client Auth

Client authentication indentifies your site to Adobe. It is a required step before integrating any Creative SDK components. 

You can authenticate your client with the Client ID (API Key) you have obtained from the Adobe.io Console (see "Registering Your Application" above).

### Code

See comments **#1-4** in the code below:

```javascript
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

At this point, try reloading your web page to verify if Client Auth has been set up correctly.

### Success

You will know the setup is correct by opening your web console and verifying that you have access to the `AdobeCreativeSDK` object.

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

The Creative SDK offers a number of components. Each one can be added to your app individually, as you need them, for your unique integration. See our other developer guides to learn more.
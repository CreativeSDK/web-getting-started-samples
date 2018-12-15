# User Auth UI

Most Creative SDK components require an authenticated user. Before launching the components, you’ll need to ask your user for permission to access their Creative Cloud content. You do this by ensuring that the user is logged in with their Adobe ID and has granted you access.

The User Auth UI component provides the user with a familiar Adobe ID login screen. Your user can enter their Adobe ID username and password, then verify the app name they are granting access to, and the scope of its access.

![](https://s3.amazonaws.com/csdk-assets-aviary-prod-us-east-1/web/user-auth-login.png)

In this guide, we will cover how to display the Creative SDK User Auth UI component and check for an authenticated user.

By the end of this guide, we will have a Web page that:

1. Shows the Adobe ID login window when the user presses a button (if they are not already logged in)
2. Allows the user to log out by pressing a button


## Contents

1. [GitHub](#github)
1. [Prerequisites](#prereqs)
1. [Configuration](#config)
1. [Allowing the user to log in](#login)
1. [Allowing the user to log out](#logout)
1. [Troubleshooting and Known Issues](#troubleshooting)


<a name="github"></a>
## GitHub

You can find companion GitHub repos for the Creative SDK developer guides [on the Creative SDK GitHub organization](https://github.com/CreativeSDK/web-getting-started-samples). 

Be sure to follow all instructions in the `readme`.


<a name="prereqs"></a>
## Prerequisites
This guide will assume that you have installed all software and completed all of the steps in the [Getting Started guide](https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html).

_**Important:** Your Client ID must be [approved for **Production Mode** by Adobe](https://creativesdk.zendesk.com/hc/en-us/articles/204601215-How-to-complete-the-Production-Client-ID-Request) before you release your app._


<a name="config"></a>
## Configuration
In order for login to work, you'll need to store a small HTML file, named `redirectims.html`, on your server. This file will contain your Client ID (API Key).

To set up:

1. [Download the `redirectims.html` file](https://cdn-creativesdk.adobe.io/0.3/redirectims.html)
1. Add your own Client ID (API Key) to the file
1. Upload the file to the **root** path of your web application 
    Example: `https://mydomain.com/redirectims.html`


<a name="login"></a>
## Allowing the user to log in

Before launching any of the Creative SDK components, you’ll need to ask your user for permission to access their content. You do this by ensuring that the user is logged in and has granted you access.

Assume you have the following button in your HTML:

```language-html
<button id="csdk-login">Log in to Creative Cloud</button>
```

_**Important:** The `AdobeCreativeSDK.login()` function, shown in use below, must be executed as the direct result of a **user click event**, otherwise the popup will be blocked by the browser._

As an example, see comments **#1-4** in the code below:

```language-javascript
/* 1) Add a click handler to a button that calls a helper function */
document.getElementById("csdk-login").addEventListener('click', handleCsdkLogin, false);

/* 2) Make a helper function */
function handleCsdkLogin() {

    /* 3) Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* 4) Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            // The user is logged in and has authorized your site. 
            console.log('Logged in!');
        } else {
            // Trigger a login
            AdobeCreativeSDK.login(handleCsdkLogin);
        }
    });
}
```

With this code, a user who hasn't yet logged in with their Adobe ID, will see the User Auth UI component open in a pop-up window:

![](https://s3.amazonaws.com/csdk-assets-aviary-prod-us-east-1/web/user-auth-login.png)

Your user can now enter their username and password. Successful login (or existing login status) will trigger the `console.log` in the code above.

### Error response on login

After entering your login credentials, if you see the following error in the pop-up window:

```
Error response

Error code 404.

Message: File not found.

Error code explanation: 404 = Nothing matches the given URI.
```

This means you have not successfully set up the required `redirectims.html` file on your server. 

See the "Configuration" section of this guide for details.


<a name="logout"></a>
## Allowing the user to log out

Allowing a user to log out can be handled in code similarly to the login flow.

Assume you have the following button in your HTML:

```language-html
<button id="csdk-logout">Log out of Creative Cloud</button>
```

For an example, see comments **#1-4** in the code below:

```language-javascript
/* 1) Add a click handler to a button that calls a helper function */
document.getElementById("csdk-logout").addEventListener('click', handleCsdkLogout, false);

/* 2) Make a helper function */
function handleCsdkLogout() {

    /* 3) Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* 4) Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            AdobeCreativeSDK.logout();
            console.log('Logged out!');
        } else {
            console.log('Not logged in!');
        }

    });
}
```

Now that you have implemented User Auth, you're ready to move on the other Creative SDK components that require an authenticated user!


<a name="troubleshooting"></a>
## Troubleshooting and Known Issues
Articles about common issues are at [help.creativesdk.com](http://help.creativesdk.com/), along with a place to submit tickets for bugs, feature requests, and general feedback.
/* 1) Add click handlers to call your helper functions */
document.getElementById("csdk-login").addEventListener('click', handleCsdkLogin, false);
document.getElementById("csdk-logout").addEventListener('click', handleCsdkLogout, false);


/* Initialize the AdobeCreativeSDK object */
AdobeCreativeSDK.init({
    /* Add your Client ID (API Key) */
    clientID: CONFIG.CSDK_CLIENT_ID,
    onError: function(error) {
        /* Handle any global or config errors */
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
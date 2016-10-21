/* Add click handlers to call your helper functions */
document.getElementById("csdk-login").addEventListener('click', handleCsdkLogin, false);
document.getElementById("csdk-logout").addEventListener('click', handleCsdkLogout, false);
document.getElementById("upload-cc-file").addEventListener('click', uploadFile, false);


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


/* Make a helper function */
function handleCsdkLogin() {

    /* Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            // The user is logged in and has authorized your site. 
            console.log('Logged in!');
        } else {
            // Trigger a login
            AdobeCreativeSDK.login(handleCsdkLogin);
        }
    });
}

/* Make a helper function */
function handleCsdkLogout() {

    /* Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            AdobeCreativeSDK.logout();
            console.log('Logged out!');
        } else {
            console.log('Not logged in!');
        }

    });
}

/* Make a helper function */
function uploadFile() {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* 1) Get the first element from the FileList */
        var file = document.getElementById("fileItem").files[0];

        /* 2) If the user is logged in AND their browser can upload */
        if (csdkAuth.isAuthorized && AdobeCreativeSDK.API.Files.canUpload()) {

            /* 3) Make a params object to pass to Creative Cloud */
            var params = {
                data: file,
                folder: "My CSDK App"
            }

            /* 4) Upload, handling error and success in your callback */
            AdobeCreativeSDK.API.Files.upload(params, function(result) {
                if (result.error) {
                    console.log(result.error);
                    return;
                }

                // Success
                console.log(result.file); 
            });
        } else {
            // User is not logged in, trigger a login
            handleCsdkLogin();
        }
    });
}
/*
    UI ELEMENT SETUP
*/
/* Basic UI elements */
var folderContentsDiv = document.getElementById("folder-contents");
var imageElement = document.getElementById("downloaded-cc-rendition");
var fileInput = document.getElementById("file-item");
var uploadFileName = document.getElementById("upload-file-name");

var folderThrobber = document.getElementById("folder-throbber");
var renditionThrobber = document.getElementById("rendition-throbber");
var uploadThrobber = document.getElementById("upload-throbber");

/* Buttons */
var logoutButton = document.getElementById("csdk-logout");
var uploadButton = document.getElementById("upload-cc-file");
var getAssetsButton = document.getElementById("get-cc-folder-assets");

/* Add click handlers to call your helper functions */
logoutButton.addEventListener('click', handleCsdkLogout, false);
uploadButton.addEventListener('click', uploadFile, false);
getAssetsButton.addEventListener('click', getCCFolderAssets, false);
fileInput.addEventListener('change', displayUploadFileName, false);


/*
  INTIALIZATION  
*/
/* Handle logout button visibility on DOM load */
document.addEventListener('DOMContentLoaded', function(){handleCsdkLogin(false)}, false);

/* Initialize the AdobeCreativeSDK object */
AdobeCreativeSDK.init({
    /* Add your Client ID (API Key) */
    clientID: CONFIG.CSDK_CLIENT_ID,
    /* Add the Asset API */
    API: ["Asset"],
    onError: function(error) {
        console.log(error);
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
            logoutButton.style.visibility = "hidden";
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.GLOBAL_CONFIGURATION) { 
            console.log('Please check your configuration');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.SERVER_ERROR) { 
            console.log('Oops, something went wrong');
        }
    }
});


/*
  HELPER FUNCTIONS  
*/
function handleCsdkLogin(triggerLogin, callback) {

    var triggerLogin = triggerLogin || false;

    /* Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            // The user is logged in and has authorized your site. 
            console.log('Logged in!');
            logoutButton.style.visibility = "visible";

            if (callback) {
                callback();
            }
        } else if (triggerLogin) {
            // Trigger a login
            console.log("handleCsdkLogin() else")
            console.log(triggerLogin)
            AdobeCreativeSDK.login(function(){handleCsdkLogin(true, callback)});
        }
    });
}

function handleCsdkLogout() {

    /* Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            AdobeCreativeSDK.logout();
            resetUI();
            logoutButton.style.visibility = "hidden";
            console.log('Logged out!');
        } else {
            console.log('Not logged in!');
        }

    });
}

function displayUploadFileName() {
    var fileName = fileInput.files[0].name;
    uploadFileName.innerHTML = fileName;
}

function uploadFile() {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        var uploadResultIndicator = document.getElementById("upload-result-indicator");

        /* 1) Get the first element from the FileList */
        var file = fileInput.files[0];     
        if (!file) {
            showUploadStatus("Choose a file to upload!");
            return;
        }

        /* 2) If the user is logged in AND their browser can upload */
        //if (csdkAuth.isAuthorized && AdobeCreativeSDK.API.Files.canUpload()) {

        if (csdkAuth.isAuthorized && AdobeCreativeSDK.API.Files.canUpload()) {

            uploadThrobber.style.visibility = "visible";

            /* 3) Make a params object to pass to Creative Cloud */
            var params = {
                data: file,
                folder: "CSDK App test",
                overwrite: false
            }

            /* 4) Upload, handling error and success in your callback */
            AdobeCreativeSDK.API.Files.upload(params, function(result) {
                uploadThrobber.style.visibility = "hidden";

                if (result.error) {
                    console.log(result.error);

                    showUploadStatus("Upload error!");
                    return;
                }

                // Success
                console.log("Uploaded file:", result.data);
                showUploadStatus("Uploaded!");
                return;
            });
        } else if (!csdkAuth.isAuthorized) {

            // User is not logged in, trigger a login
            console.log("uploadFile else")
            handleCsdkLogin(true, uploadFile);
        }

        function showUploadStatus(message) {
            uploadResultIndicator.innerHTML = message;
            window.setTimeout(clearUploadStatus, 2000);
        }

        function clearUploadStatus() {
            uploadResultIndicator.innerHTML = "";
            uploadFileName.innerHTML = "";
        }
    });
}

function getCCFolderAssets() {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        resetUI();

        if (csdkAuth.isAuthorized) {

            folderThrobber.style.visibility = "visible";

            /* 1) Make a params object to pass to Creative Cloud */
            var params = {
                path: "/files/CSDK App test" // defaults to root if not set
            }

            /* 2) Request an array of assets from Creative Cloud */
            AdobeCreativeSDK.API.Files.getAssets(params, function(result) {
                
                folderThrobber.style.visibility = "hidden";

                if (result.error) {
                    console.log(result.error);

                    showErrorMessage(result.error.errorMsg);
                    return;
                }

                // If folder is empty
                if (result.data.length === 0) {
                    showEmptyFolderMessage();
                    return;
                }

                // Success, an array of assets
                addDownloadButtonsToDOM(result.data);                
            });
        }
        else if (!csdkAuth.isAuthorized) {
            // User is not logged in, trigger a login
            console.log("getCCFolderAssets false")
            handleCsdkLogin(true, getCCFolderAssets);
        }

        function showErrorMessage(message) {
            var p = document.createElement('p');
            p.innerHTML = message;

            folderContentsDiv.appendChild(p);
        }

        function showEmptyFolderMessage() {
            var p = document.createElement('p');
            p.innerHTML = "Nothing in the \"My CSDK App test\" folder. Try uploading something first.";

            folderContentsDiv.appendChild(p);
        }

        function addDownloadButtonsToDOM(assetArray) {
            for (let i = 0; i < assetArray.length; i++) {
                // Create elements to be appended to DOM
                var div = document.createElement('div');
                var button = document.createElement('button');
                var fileNameSpan = document.createElement('span');
                var fileSizeSpan = document.createElement('span');

                // Get file data to be used in DOM
                var fileName = assetArray[i].name;
                var fileSize = assetArray[i].fileSize;
                var filePath = assetArray[i].path;

                // Add content to new elements
                button.innerHTML = "Download";
                button.className += " btn btn-primary";
                fileNameSpan.innerHTML = " " + fileName;
                fileSizeSpan.innerHTML = " (" + Math.round(fileSize/1024) + " KB)";

                // Attach click handlers to buttons
                (function addListener(filePath) {

                    button.addEventListener('click', function(){downloadCCAssetRendition(filePath)}, false);

                })(filePath)

                // Append elements to DOM
                div.appendChild(button);
                div.appendChild(fileNameSpan);
                div.appendChild(fileSizeSpan);
                folderContentsDiv.appendChild(div);
            }
        }
    });
}

function downloadCCAssetRendition(filePath) {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        if (csdkAuth.isAuthorized) {

            renditionThrobber.style.visibility = "visible";

            /* 1) Make a params object to pass to Creative Cloud */
            var params = {
                path: filePath,
                type: AdobeCreativeSDK.Constants.Asset.RenditionType.JPEG,
            }

            /* 2) Request an asset rendition from Creative Cloud */
            AdobeCreativeSDK.API.Files.getRendition(params, function(result) {
                renditionThrobber.style.visibility = "hidden";

                if (result.error) {
                    console.log(result.error);
                    return;
                }

                // Success, attach the downloaded image to the DOM element
                imageElement.src = result.data;
            });

        }
        else if (!csdkAuth.isAuthorized) {
            // User is not logged in, trigger a login
            console.log("downloadCCAssetRendition else if")
            handleCsdkLogin(true, function(){downloadCCAssetRendition(filePath)});
        }
    });
}

function resetUI() {
    folderContentsDiv.innerHTML = "";
    imageElement.src = "";
}
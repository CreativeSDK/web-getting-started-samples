# Creative Cloud Files API

In addition to the [Asset Browser UI component](), which provides a rich Creative Cloud UI experience for your users, the Creative SDK also provides headless APIs for accessing Creative Cloud Files directly. 

This guide demonstrates how to use these APIs to **download** existing files from a user's Creative Cloud account, and how to **upload** new files as well.

By the end of this guide, we will have a Web page that can:

1. **Upload** new files to a user's Creative Cloud account
1. **Download** existing files from a user's Creative Cloud account


## Contents

1. [GitHub](#github)
1. [Prerequisites](#prereqs)
1. [Uploading an asset](#upload)
1. [Getting Creative Cloud assets](#assets)
1. [Downloading an asset rendition](#download)
1. [References](#references)
1. [Troubleshooting and Known Issues](#troubleshooting)


<a name="github"></a>
## GitHub

You can find companion GitHub repos for the Creative SDK developer guides [on the Creative SDK GitHub organization](https://github.com/CreativeSDK/web-getting-started-samples). 

Be sure to follow all instructions in the `readme`.


<a name="prereqs"></a>
## Prerequisites
This guide will assume that you have completed all of the steps in the following guides:

1. [Getting Started](https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html)
2. [User Auth UI](https://creativesdk.adobe.com/docs/web/#/articles/userauthui/index.html)

_**Note:**_

- This component requires that the user is **logged in with their Adobe ID**.
- _Your Client ID must be [approved for **Production Mode** by Adobe](https://creativesdk.zendesk.com/hc/en-us/articles/204601215-How-to-complete-the-Production-Client-ID-Request) before you release your app._


<a name="upload"></a>
## Uploading an asset

The file you want to upload to Creative Cloud can be passed as a `File` from a [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList) or a blob. We'll use a `File` in this example.

Assume you have the following elements in your HTML:

```
<input id="fileItem" type="file">
<button id="upload-cc-file">Upload file to Creative Cloud</button>
```

In your JavaScript, add a click handler for the upload button:

```
document.getElementById("upload-cc-file").addEventListener('click', uploadFile, false);
```

Then you can create your `uploadFile()` helper function. As an example, see comments **#1-4** in the code below:

```
/* Make a helper function */
function uploadFile() {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* 1) If the user is logged in AND their browser can upload */
        if (csdkAuth.isAuthorized) {
            if (AdobeCreativeSDK.API.Files.canUpload()) {

                /* 2) Get the first element from the FileList */
                var file = document.getElementById("fileItem").files[0];

                /* 3) Make a params object to pass to Creative Cloud */
                var params = {
                    data: file,
                    folder: "My CSDK App test", // defaults to root if not set
                    overwrite: false
                }

                /* 4) Upload, handling error and success in your callback */
                AdobeCreativeSDK.API.Files.upload(params, function(result) {
                    if (result.error) {
                        console.log(result.error);
                        return;
                    }

                    // Success
                    console.log(result.data); 
                });
            }
            else {
                console.log("Can't upload from this browser!");
            }
        } else if (!csdkAuth.isAuthorized) {
            // User is not logged in, trigger a login
            handleCsdkLogin();
        }
    });
}
```

With this code, a user who is logged in will be able to upload files to the Creative Cloud. Those files will be stored in a folder called "My CSDK App test", as set in our `params` object above.

A successful upload will, in this example, trigger the `console.log(result.data)` in the code above. The `.data` object you receive here will contain data about the file you have just successfully uploaded.


### Error response on upload

If you get a `409 (Conflict)` on upload, this means, as you might expect, that a file with the same name exists in the location you are attempting to upload to.

Be sure to handle this response in your application so users understand what is happening.

If you want to enable overwrites, you can do so in your `params` object for the `AdobeCreativeSDK.API.Files.upload()` call:

```
params.overwrite = true
```


<a name="assets"></a>
## Getting Creative Cloud assets

You can recieve data about the assets contained in a Creative Cloud Files folder via the API.

Assume you have the following element in your HTML:

```
<button id="get-cc-folder-assets">Get Creative Cloud Folder Assets</button>
```

In your JavaScript, add a click handler for the upload button:

```
document.getElementById("get-cc-folder-assets").addEventListener('click', getCCFolderAssets, false);
```

See comments **#1-2** in the example helper function below:

```
/* Make a helper function */
function getCCFolderAssets() {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        if (csdkAuth.isAuthorized) {

            /* 1) Make a params object to pass to Creative Cloud */
            var params = {
                path: "/files/My CSDK App test" // defaults to root if not set
            }

            /* 2) Request an array of assets from Creative Cloud */
            AdobeCreativeSDK.API.Files.getAssets(params, function(result) {
                if (result.error) {
                    console.log(result.error);
                    return;
                }

                // Success, an array of assets
                console.log(result.data);
            });
        }
        else if (!csdkAuth.isAuthorized) {
            // User is not logged in, trigger a login
            handleCsdkLogin();
        }
    });
}
```

When the call succeeds, the data you requested will reside in `result.data` as an array of objects containing data about each of the assets in a particular folder, including `name`, `path`, `type`, `creationDate`, `fileSize`, and more.


<a name="download"></a>
## Downloading an asset rendition

When you have the path of the Creative Cloud File asset that your user wants to download, you can request a rendition of that asset via the API.

As a very simple example, let's alter the text in our `#get-cc-folder-assets` button:

```
<button id="get-cc-folder-assets">Download rendition from Creative Cloud</button>
```

Now, assume you have the following element in your HTML:

```
<img id="downloaded-cc-rendition">
```

See comments **#1-2** in the example helper function below:

```
/* Make a helper function */
function downloadCCAssetRendition(filePath) {

    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        if (csdkAuth.isAuthorized) {

            /* 1) Make a params object to pass to Creative Cloud */
            var params = {
                path: filePath,
                type: AdobeCreativeSDK.Constants.Asset.RenditionType.JPEG
            }

            /* 2) Request an asset rendition from Creative Cloud */
            AdobeCreativeSDK.API.Files.getRendition(params, function(result) {
                if (result.error) {
                    console.log(result.error);
                    return;
                }

                // Success, attach the downloaded image to the DOM element
                var imageElement = document.getElementById("downloaded-cc-rendition");
                imageElement.src = result.data;
            });

        }
        else if (!csdkAuth.isAuthorized) {
            // User is not logged in, trigger a login
            handleCsdkLogin();
        }
    });
}
```

The rendition of the file you requested in `params.path` will come back to you as `result.data`. In the example above, the rendition is then set as `imageElement.src`, displaying the image in the DOM.

To tie this all together, we will revisit the `getCCFolderAssets()` function that we made earlier. In the success handling for our `AdobeCreativeSDK.API.Files.getAssets()` call, let's call our `downloadCCAssetRendition()` function (see comment **#1** in the code below):

```
// Success, an array of assets
console.log(result.data);

/* 1) Download the first asset in the folder */
downloadCCAssetRendition(result.path);
```

Here, `result.path` is the path of the first asset in the folder.

If you have followed along with the code, and you have uploaded an asset already, you should be able to click the `#get-cc-folder-assets` button to download and display the first asset in the `/files/My CSDK App test` folder in Creative Cloud.

While this is a very simple and contrived example for the sake of demonstration, you can find a more robust example in our [GitHub repo](https://github.com/CreativeSDK/web-getting-started-samples).

### Requesting a specific rendition type

The renditions you can request from the Creative Cloud are available in this enum:

```
AdobeCreativeSDK.Constants.Asset.RenditionType
```

Currently, these enum members are supported:

- PNG
- JPEG

See the `params.type` value in the `downloadCCAssetRendition()` code above for example usage.


<a name="references"></a>
## References
### Namespace

#### `AdobeCreativeSDK.API.Files`

### Static Methods

#### `.getFolder([params], callback)`

Gets the folder in the path of the logged in user. If path is empty, root folder is returned.

- `params` 
    + `path [string]`: path of the folder. If path is not specified we return the root folder for the user.
- `callback [function(result)]`: a function that's called when the request is completed. It returns a `result` object with the following values:
    + `data [object]`: an AssetFolder object
    + `error [object]`: an object that contains any error information
    

#### `.getAssets([params], callback)`

Gets the list of assets in the path passed asynchronously. If path param is not passed, assets in the root are returned.

- `params` 
    + `path [string]`: path of the folder. If path is not specified we return the root folder for the user.
    + `numItems [int]`: The number of items to be fetched from the server. This is just an hint, actual number might be more or less than this.
    + `nextItem [string]`: The start asset from which we need to fetch the assets.
    + `orderBy [string]`: default is name.
    + `sortBy [string]`: default is ascending.
- `callback [function(result)]`: a function that's called when the request is completed. It returns a `result` object with the following values:
    + `data [array]`:  an array of Assets in the folder path specified
    + `error [object]`: an object that contains any error information
    + `nextItem [string]`: is set when you are making pagination and more items exists. This should be passed in for next call to getAssets()


#### `.getRendition(params, callback)`

Gets the rendition of the file in the path asynchronously.

- `params` 
    + `path [string]`: path of the file
    + `type [string]`: file type for the rendition
    + `size [int]`: max width or height of the rendition
    + `pageNum [int]` - pageNum is required only for multi page documents. If not set we get rendition for the first page of the document.
- `callback [function(result)]`: a function that's called when the request is completed. It returns a `result` object with the following values:
    + `data [string]`: a base 64 encoding of the requested file
    + `error [object]`: an object that contains any error information


#### `.upload(params, callback)`

Upload a file to the Creative Cloud. Supported in Firefox, Chrome, Safari, IE10+.

- `params`
    + `folder [string]`: the folder path to upload to.
    + `fileName [string]`: the file name. If a File object is passed to the `data` parameter, the original file name will be used by default.
    + `createFolder [bool]`: If true, will create any intermediate directories in the folder path. Defaults `true`.
    + `data`: file to be uploaded. Accepts `<input type="file">` tag or `Blob` object.
    + `overwrite [bool]`: if `true`, will overwrite an existing file in the Creative Cloud.
- `callback [function(result)]`: a function that's called when the request is completed. It returns a `result` object with the following values:
    + `data [AssetFile]`: an AssetFile object.
    + `error [object]`: an object that contains any error information.


### Object Type

#### `AssetFile`

AssetFile represents a file handler of a file in the Creative Cloud which can be used to get thumbnail rendition of the file. It allows reading details (type, size, etc) about the file and creating files in the Creative Cloud.

### Properties

- `creationDate [DateTime]`: The creation date of the item.
- `currentVersion [string]`: version number of the file on cloud
- `eTag [string]`: etag of the item.
- `fileSize [int]`: size of the file.
- `id [string]`: unique identifier for the item.
- `isCollection [bool]`: boolean to check whether item is file or folder.
- `md5Hash [string]`: md5 hash of the file.
- `modificationDate [DateTime]`: modification date of the item.
- `name [string]`: name of the item.
- `optionalMetadata [array]`: metadata of the file. If there's a height and width, this property will contain it.
- `parentPath [string]`: path of the parent Folder of the item.
- `path [string]`: path of the item.
- `type [string]`: mime type of the file.

### Methods

#### `.getRendition (params, callback)`

Returns a rendition of the given File.

- `params`
    + `type [string]`: (Optional) The file type of the rendition. Default value is CreativeSDK.Constants.Asset.RenditionType.PNG
    + `size [int]`: max width or height of the rendition.
    + `pageNum [int]`: (Optional) required only for multi page documents.If not set, will return a rendition of the first page of the document.
- `callback [function(result)]`: a function that's called when the request is completed. It returns a `result` object with the following values:
    + `data [string]`: a base 64 encoding of the requested File.
    + `error [object]`: an object that contains any error information

### Object Type

#### `AssetFolder`

AssetFolder represents a folder in the Creative Cloud and provides access to folder contents in pages of data as well as provisions for creating and deleting folders. Folder items are fetched from Creative Cloud in pages, so the field on which the items should be sorted as well as the sort direction must be specified when setting up this instance. If you need to change the sorting, you will need to create a new instance with the specified sort options. Once you have an AssetFolder instance set up, you can call hasNextPage and getNextPage to start loading folder items from the Creative Cloud as needed.

### Properties

- `creationDate [DateTime]`: The creation date of the item.
- `eTag [string]`: etag of the item.
- `firstPageLoaded [bool]`: indicates whether or not the first page of contents in the folder is loaded.
- `id [string]`: unique identifier for the item.
- `isCollection [bool]`: boolean to check whether item is file or folder.
- `modificationDate [DateTime]`: modification date of the item.
- `name [string]`: name of the item.
- `parentPath [string]`: path of the parent Folder of the item.
- `path [string]`: path of the item.
- `shared [bool]`: indicates whether or not the folder is shared.

### Methods

#### `.getNextPage (params, callback)`

Returns the next page of files from the given Creative Cloud Folder. Should only be called when `hasNextPage()` returns `true`.

- `params`
    - `numItems [int]`: The number of items to be fetched. This is just a hint. The actual number fetched may be more or less than this amount. To get all items in the folder pass 0.
- `callback [function(result)]`: a function that's called when the request is completed. It returns a `result` object with the following values:
    + `data [array]`: an array of AssetFile objects.
    + `error [object]`: an object that contains any error information


#### `.hasNextPage()`

Indecates whether or not there's more content to load. Returns `true` if the another page of items can be loaded; `false` otherwise.


#### `.resetPaging()`

Resets the page iterator so that any subsequent call to hasNextPage will return true, and getNextPage will return the first page of Creative Cloud Assets. Keeps the current sorting options in effect.


<a name="troubleshooting"></a>
## Troubleshooting and Known Issues
Articles about common issues are at [help.creativesdk.com](http://help.creativesdk.com/), along with a place to submit tickets for bugs, feature requests, and general feedback.
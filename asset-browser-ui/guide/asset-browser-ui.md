# Asset Browser Integration Guide

The Creative SDK provides a convenient UI for accessing all of a user’s creative assets stored in the Creative Cloud, including files, photos, libraries, and mobile creations. 

This guide will demonstrate how to use the Asset Browser UI component to enable your users to access their files stored in the Creative Cloud.

## Contents

- [Prerequisites](#prerequisites)
- [Update Init](#init)
- [Launching the Asset Browser](#launch)
- [Handling the "Choose File" Callback](#callback)
- [Complete Example](#completeexample)

<a name="prerequisites"></a>
## Prerequisites

- Browsers Supported: Firefox, Chrome, Opera, IE10+
- Your site must support SSL on any page that integrates the Creative SDK.
- This guide assumes that you've already followed the Getting Started and User Auth Guides.

<a name="init"></a>
## Update Init

In your `AdobeCreativeSDK.init()` call, add an `API` property to your configuration object, setting the value to `["Asset"]`:

    AdobeCreativeSDK.init({
        clientID: '<YOUR_CLIENT_ID_HERE>',
        /* Add the Asset API */
        API: ["Asset"],
        onError: function(error) {
            ...
        }
    });


This will load the dependencies required to access the Creative Cloud Files, Libraries, Photos, and Mobile Creations API.

<a name="launch"></a>
## Instantiating and Launching the Asset Browser

Once you have a logged In user who's given you permission to access their content, you can launch the Asset Browser UI.

### Example

    var assetBrowser = new AdobeCreativeSDK.UI.AssetBrowser({
        // openType: 'embed', // options include: embed, lightbox and window. Default is lightbox
        // element: 'domid', // use the element parameter parameter when specifying the "embed" openType
        onOpen: function() {
            // asset browser launched
        },
        onClose: function() {
            // asset browser closed
        },
        onError: function() {
            // a launch error occured
        }
    });

    assetBrowser.open({        
        multiSelect: true, // allow the user to select multiple assets
    }, function(response) {
        if (response.error) {
            console.log('Something went wrong...')
        } else {
            // response.data is an array of Creative Cloud Assets
            console.log(response.data);
        }
    });

<a name="callback"></a>
## Handling the "Open" Callback

Once the end user chooses their asset(s) and dismisses the Asset Browser, you'll get back an array of Asset objects. Each asset contains a `type` property that can be used to determine which getRendition() call to make to get the actual image data back from the Creative Cloud.

### Example
    
    // ...
    , function(response) {
        if (response.error) {
            console.log('Something went wrong...')
        } else {
            // response.data is an array of Creative Cloud Assets
            getRendition(response.data[0], function(res) {
                if (res.error) {
                    console.log('Something went wrong...')
                } else {
                    // data contains a base64 encoded string representing the image
                    console.log(res.data)
                }
            });
        }
    });

    function getRendition(asset, callback) {
        var assetType = AdobeCreativeSDK.Constants.Asset.RenditionType.PNG;
        var assetSize = 300;
        var photoSize = AdobeCreativeSDK.Constants.Photo.RenditionSize.THUMBNAIL_2X;

        // Use the assetType parameter to determine which getRendition() method to use
        if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.FILES) {
            AdobeCreativeSDK.API.Files.getRendition({
                path: asset.path, 
                type: assetType,
                size: assetSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.LIBRARY_ASSETS) {
            AdobeCreativeSDK.API.Libraries.getRendition({
                itemId: asset.id, 
                libraryId:asset.libraryId, 
                type: assetType,
                size: assetSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOS) {
            AdobeCreativeSDK.API.Photos.getRendition({
                catalogId: asset.catalogId, 
                collectionId: asset.collectionId, 
                photoId: asset.id, 
                size: photoSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_DRAW) {
            AdobeCreativeSDK.API.Draw.getRendition({
                fileId: asset.fileId, 
                pageId: asset.id, 
                type: assetType, 
                size: assetSize
            }, callback);
        }
        else if( asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_SKETCH) {
            AdobeCreativeSDK.API.Sketch.getRendition({
                fileId: asset.fileId, 
                pageId: asset.id, 
                type: assetType, 
                size: assetSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_MIX) {
            AdobeCreativeSDK.API.PSMix.getRendition({
                fileId: asset.fileId, 
                pageId: asset.id, 
                type: assetType, 
                size: assetSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.COMP_CC) {
            AdobeCreativeSDK.API.Comp.getRendition({
                fileId: asset.fileId, 
                pageId: asset.id, 
                type: assetType, 
                size: assetSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_LINE) {
            AdobeCreativeSDK.API.Line.getRendition({
                fileId: asset.fileId, 
                pageId: asset.id, 
                type: assetType, 
                size: assetSize
            }, callback);
        }
        else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PREMIERE_CLIP) {
            AdobeCreativeSDK.API.Clip.getRendition({
                fileId: asset.fileId, 
                pageId: asset.id, 
                type: assetType, 
                size: assetSize
            }, callback);
        }
    }

<a name="completeexample"></a>
## Complete Example

    <body>
        <script type="text/javascript" src="https://cdn-creativesdk.adobe.io/v1/csdk.js"></script>
        <script type="text/javascript">
            // Initialize the AdobeCreativeSDK object
            AdobeCreativeSDK.init({
                clientID: 'your_client_id',
                API: ["Asset"],
                onError: function(error) {
                    // Handle any global or config errors here
                    if (error.type === AdobeCreativeSDK.ErrorTypes.AUTHENTICATION) { 
                        // Note: this error will occur when you try and launch the asset browser without checking if the user has authorized your app. From here, you can trigger AdobeCreativeSDK.loginWithRedirect().
                        console.log('You must be logged in to use the Creative SDK');
                    } else if (error.type === AdobeCreativeSDK.ErrorTypes.GLOBAL_CONFIGURATION) { 
                        console.log('Please check your configuration');
                    } else if (error.type === AdobeCreativeSDK.ErrorTypes.COMPONENT_CONFIGURATION) { 
                        console.log('Please check your component configuration'); 
                    } else if (error.type === AdobeCreativeSDK.ErrorTypes.SERVER_ERROR) { 
                        console.log('Oops, something went wrong');
                    }
                }
            });

            function handleAuth(auth) {
                if (auth.isAuthorized) {
                    // The user is logged in and has authorized your site. You may launch the Asset Browser now.
                    launchAssetBrowser();
                    console.log('Logged In!');
                } else {
                    // Else, trigger a login
                    AdobeCreativeSDK.login(handleAuth);
                }
            }

            AdobeCreativeSDK.getAuthStatus(handleAuth);

            function launchAssetBrowser() {
                var assetBrowser = new AdobeCreativeSDK.UI.AssetBrowser({
                    // openType: 'embed', // options include: embed, lightbox and window. Default is lightbox
                    // element: 'domid', // use the element parameter parameter when specifying the "embed" openType
                    onOpen: function() {
                        // asset browser launched
                    },
                    onClose: function() {
                        // asset browser closed
                    },
                    onError: function() {
                        // a launch error occured
                    }
                });

                assetBrowser.open({        
                    multiSelect: true, // allow the user to select multiple assets
                }, function(response) {
                    if (response.error) {
                        console.log('Something went wrong...')
                    } else {
                        // response.data is an array of Creative Cloud Assets
                        getRendition(response.data[0], function(res) {
                            if (res.error) {
                                console.log('Something went wrong...')
                            } else {
                                // data contains a base64 encoded string representing the image
                                console.log(res.data)
                            }
                        });
                    }
                });
            }
           
            function getRendition(asset, callback) {
                var assetType = AdobeCreativeSDK.Constants.Asset.RenditionType.PNG;
                var assetSize = 300;
                var photoSize = AdobeCreativeSDK.Constants.Photo.RenditionSize.THUMBNAIL_2X;

                // Use the assetType parameter to determine which getRendition() method to use
                if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.FILES) {
                    AdobeCreativeSDK.API.Files.getRendition({
                        path: asset.path, 
                        type: assetType,
                        size: assetSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.LIBRARY_ASSETS) {
                    AdobeCreativeSDK.API.Libraries.getRendition({
                        itemId: asset.id, 
                        libraryId:asset.libraryId, 
                        type: assetType,
                        size: assetSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOS) {
                    AdobeCreativeSDK.API.Photos.getRendition({
                        catalogId: asset.catalogId, 
                        collectionId: asset.collectionId, 
                        photoId: asset.id, 
                        size: photoSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_DRAW) {
                    AdobeCreativeSDK.API.Draw.getRendition({
                        fileId: asset.fileId, 
                        pageId: asset.id, 
                        type: assetType, 
                        size: assetSize
                    }, callback);
                }
                else if( asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_SKETCH) {
                    AdobeCreativeSDK.API.Sketch.getRendition({
                        fileId: asset.fileId, 
                        pageId: asset.id, 
                        type: assetType, 
                        size: assetSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_MIX) {
                    AdobeCreativeSDK.API.PSMix.getRendition({
                        fileId: asset.fileId, 
                        pageId: asset.id, 
                        type: assetType, 
                        size: assetSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.COMP_CC) {
                    AdobeCreativeSDK.API.Comp.getRendition({
                        fileId: asset.fileId, 
                        pageId: asset.id, 
                        type: assetType, 
                        size: assetSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_LINE) {
                    AdobeCreativeSDK.API.Line.getRendition({
                        fileId: asset.fileId, 
                        pageId: asset.id, 
                        type: assetType, 
                        size: assetSize
                    }, callback);
                }
                else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PREMIERE_CLIP) {
                    AdobeCreativeSDK.API.Clip.getRendition({
                        fileId: asset.fileId, 
                        pageId: asset.id, 
                        type: assetType, 
                        size: assetSize
                    }, callback);
                }
            }
        </script>
    </body>

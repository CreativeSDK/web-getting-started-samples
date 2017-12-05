# Changelog

## Creative SDK v1.0.1
November 27, 2017

The Image Editor component is deprecated and no longer supported. [See the Creative SDK blog for more details](https://blog.creativesdk.com/2017/09/important-update-to-the-creative-sdk-end-of-support-for-the-image-editor-ui-color-ui-market-browser-and-labs-components/).


## Creative SDK v1.0.0
November 2, 2016

### General

This is big release for Web! We have a number of components coming out of beta and ready for you to use.

See our Getting Started guide to learn more about SDK Initialization and other basic setup requirements for using the Creative SDK.

### User Auth UI

Most Creative SDK components require an authenticated user. Before launching the components, you’ll need to ask your user for permission to access their Creative Cloud content. You do this by ensuring that the user is logged in with their Adobe ID and has granted you access.

The User Auth UI component provides the user with a familiar Adobe ID login screen. Your user can enter their Adobe ID username and password, then verify the app name they are granting access to, and the scope of its access.

See our User Auth UI guide to learn more.

### Creative Cloud Files API

In addition to the Asset Browser UI component, which provides a rich Creative Cloud UI for your users, the Creative SDK also provides headless APIs for accessing Creative Cloud Files directly.

See our Creative Cloud Files API guide to learn more.

### Asset Browser UI

With the Asset Browser UI component, your users will see a familiar interface for the Creative Cloud that lets them view and select their Creative Cloud Files, Lightroom Photos, Photoshop Mixes, Sketches, and more.

See our Asset Browser UI guide to learn more.

### Creative Cloud Libraries API

In addition to the Asset Browser UI component, which provides a rich Creative Cloud UI for your users, the Creative SDK also provides headless APIs for accessing Creative Cloud Libraries directly.

A guide for the Creative Cloud Libraries API is coming soon. This component is available as `AdobeCreativeSDK.API.Libraries`.

### Creative Cloud Photos API

In addition to the Asset Browser UI component, which provides a rich Creative Cloud UI for your users, the Creative SDK also provides headless APIs for accessing Creative Cloud Photos (that is, photos managed with Lightroom and synced to the Creative Cloud) directly.

A guide for the Creative Cloud Photos API is coming soon. This component is available as `AdobeCreativeSDK.API.Photos`.



## Creative SDK v4.3.2
June 6, 2016

- Deprecates non-https endpoints.
- Fixes MSEdge detection bug.
- Fixes relaunch bug.
- Fixes `onClose(status)` so that status accurately reflects edit state.


## Creative SDK v4.3.1
April 12, 2016

- Fixes issue related to unsaved changes modal.
- Fixes “apply" error.


## Creative SDK v4.3.0
January 25, 2016

**Important:** If you're updating from v2, you'll need to point your integration at [http://feather.aviary.com/imaging/v3/editor.js](http://feather.aviary.com/imaging/v3/editor.js).

- Updates imaging library to improve performance and output quality.
- Translations have been updated for all supported languages.
- New service endpoints for image laundering and asset uploading.
- Improvements for initTool loading.
- Miscellaneous bug fixes.


## Creative SDK v4.2.0
June 10, 2015

**Important:** Prior to July 24th, you can use access this new SDK version by pointing your integration at [http://feather.aviary.com/imaging/v2/editor.js](http://feather.aviary.com/imaging/v2/editor.js). After that date, all v1 integrations will automatically redirect to this new version. If you need to remain on an earlier version of the SDK for any reason, please [let us know](https://creativesdk.zendesk.com/hc/en-us/requests/new) and we can discuss your options.

- New tools: Overlays, Vignette, Lighting, Color, Meme and new Enhance effects.
- Major improvements to the Draw tool.
- Deprecates individual Brightess, Contrast, Warmth & Saturation tools. They are now included in the Lighting and Color tools.
- Full WebGL support for IE11.
- Much faster low-resolution saving for PNG file format.
- Reduced resource size, which significantly reduces Editor launch time.
- Disables Orientation tool in IE9.
- Miscellaneous bug fixes.


## Creative SDK v4.1.1
March 23, 2015

- Enhancement to speed up Brightness, Contrast & Saturation for WebGL.
- Fix for forceCrop bug for multiple launch() calls when using url parameters.
- Translations update.
- Miscellaneous bug fixes.


## Creative SDK v4.1.0
February 9, 2015

- Huge update to enable WebGL image processing! (Currently only enabled for Chrome & Firefox)
- Many improvements and updates to our underlying imaging library.
- Miscellaneous bug fixes.


## Creative SDK v4.0.1
January 8, 2015

- Fixes Mixed Content error when saving low resolution images over HTTPS.
- The url parameter for the onSave and onSaveHiRes callbacks is now prefixed with https:// when the calling page is SSL enabled.
- Upgraded to use Google Analytics Universal tracking (analytics.js) instead of classic.
- More descriptive onError message when the url parameter is passed to the configuration without a protocol.


## Creative SDK v4.0.0
December 15, 2014

- First release on creativesdk.com
- Brand new effects, frames and stickers.
- postUrl and postData parameters are officially deprecated. Saving should be handled using the onSave callback.

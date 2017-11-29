# App Submission Guidelines
In addition to these guidelines, please make sure that your app is in accordance with the [Adobe General Terms of Use](http://www.adobe.com/legal/terms.html), the [Creative SDK Terms of Use](http://wwwimages.adobe.com/content/dam/Adobe/en/legal/servicetou/Creative_SDK-en_US.pdf), and satisfies all requirements for a [Production Mode Client ID](https://creativesdk.zendesk.com/hc/en-us/articles/204601215-How-to-complete-the-Production-Client-ID-Request).
## Requirements for App Approval
### Quality Product
1.  Create an application that is intuitive for users and functions properly. Your app should not have broken links, or misleading elements.
2.  Ensure that in-app content (user generated or in-app graphics, icons, etc) is not obscene or related to illegal activities. You can find more information on this in the [Adobe General Terms of Use](http://www.adobe.com/legal/terms.html).
3.  Create stable Creative SDK Integrations in your app by following the Creative SDK Instructions found in the provided documentation. If you have any questions about specific tool guidelines, please go to the Tool Functionality (link) section of the guidelines.
4.  Open Source content. You must not incorporate or integrate the SDK with any components that require you to disclose or distribute the SDK in source code form, license the SDK for making derivative works, or allow redistribution of the SDK at no charge. Some examples of the prohibited open source licenses include, without limitation, GNU General Public License and GNU Affero General Public License.
### User Protection
1.  Sign-Out: You must give users the ability to Sign out from their Adobe Creative Cloud Profile within your application. Some of the Creative SDK Components, such as the Asset Browser and Creative Cloud Market, include a Profile settings option within the account. Even if you do not include these two components, you must still use the authentication documentation to build a Sign-In/out option elsewhere in your product. In other words, if you provide the user an ability to sign in, then you must provide the user an ability to sign out.
2.  Inform users before your application launches or involves a tool provided by the Creative SDK. You can see our [Branding Guidelines](/brandguidelines/index.html) for policy and suggestions on launching Creative SDK tools.
    a. Example - a general "Save" function should not automatically go to the Creative Cloud unless you tell users that the file is being stored in the Creative Cloud.
3.  Inform users about your data privacy practices. Having an accurate privacy policy that describes how you collect and use the user data is not just good business practice, it's required by law in many jurisdictions, including California (where Apple, Google, and Adobe are located, and where the app stores are located).
### Following the Law
1.  Comply with all applicable law, including restricting access or filtering by location or age when required.
2.  Ensure that no content in your product infringes upon any third parties' rights. This includes copyright, trademark, patent, moral right, right of publicity, and right of privacy.
3.  Obtain all rights necessary to display or publish all content in your product.
4.  Obtain necessary consent or provide necessary disclosure as relates to using information collected from your users.
5.  Make all required payouts to third parties from in-product purchases or in-product revenue, and submit all necessary reporting.
6.  If your app contains content submitted or provided by third parties (or user-generated content):
    * In the United States, you must comply with Digital Millennium Copyright Act, including the following:
    	* Designate an agent to receive notices of infringement claims.
    	* Establish repeat infringer termination policy.
    	* Provide and uphold a take-down policy.
    	* Provide and uphold a process for counter claims.
    * Remain compliant with all necessary infringement and copyright laws of other countries.
    * We would also suggest that you create a community guideline to remind your users on being respectful of others.
7.  Don't share with us information collected from users under the age of 13.
8.  Don't share with us personal information collected from users of your app.
9.  Products marketed and meant for usage by those under the age of 13 must comply with the U.S. Children's Online Privacy Protection Act.
10.  Comply with Adobe's General Terms of Use and the Adobe Creative SDK Terms of Use.
### Creative Cloud Branding
Please follow the Branding Guidelines (link) for proper usage of Adobe related branding in your product, website, or any other marketing materials. The Branding Guidelines also provides branding assets that you can use in your product, website, and marketing materials.
## Creative SDK Implementation Guidelines
### Save To Creative Cloud
**Notification:** You can allow users to save an image to the Creative Cloud using the Creative SDK. This Save To function does not automatically prompt notification to users when the action is successfully or unsuccessfully completed. We suggest that you inform users when an image is successfully saved to their Creative Cloud Account.
**Adobe ID:** When triggering Save to Creative Cloud, make sure that users can Sign In with an Adobe ID if it is the first time they have reached the Authentication dialogue in your product.
**File Naming:** You control how user files are named when they are saved to the Creative Cloud. We suggest that you name files in a way that is consistent with your app, and easily located by users.
### Working with Photoshop, Illustrator, and InDesign File Types, and Send to Desktop Functionality
**Clear file creation:** the Creative SDK can allow you to build support for Photoshop, Illustrator, and InDesign file types. These file types are heavier, so you should let users know when they will be creating these file types in your product.
**Send to Desktop:** do not call SendtoDesktop every time a user creates a Photoshop, Illustrator, or InDesIgn specific file type. Send to Desktop functionality should be presented as option to users, and not a requirement in the user workflow.
### Icons
When launching any tool provided by the Creative SDK, we suggest using the appropriate icons found in the [Branding Guidelines](/brandguidelines/index.html). If no icon is provided by us in the Branding Guidelines, please use an asset that is intuitive for users. Icons that you create or source from a third party must be compliant with the Branding Guidelines.

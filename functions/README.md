# API

1. This directory is required if you use [this](https://developers.cloudflare.com/pages/platform/functions/).  
Otherwise remove it.
2. Set your headless CMS preview page URL to /redirectPreviewPage?secret={YOUR_SECRET_KEY}&contentId={contentId}.  
**Note that the secret parameter will be included in the URL.**
3. Compare the value of the secret parameter received in the query parameter and the value of the environment variable, and redirect to the URL of the preview screen if they are correct.
4. /api/preview?secret={YOUR_SECRET_KEY}&contentId={contentId} to get draft article data.  
Throw a GET request from your frontend to this endpoint.  
**Note that the secret parameter will be included in the URL.**

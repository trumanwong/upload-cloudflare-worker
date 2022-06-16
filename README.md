# Using AWS from Cloudflare Workers

This is a template for using Amazon S3 upload file from a Cloudflare Worker.

### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
git clone https://github.com/trumanwong/upload-cloudflare-worker
cd upload-cloudflare-worker
```

[`index.js`](https://github.com/cloudflare/workers-aws-template/blob/master/index.js) is the content of the Workers script. In handleRequest, uncomment the example for the service you want to try out.

You'll need to use wrangler secrets to add appropriate values for `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, plus any of the service specific secrets, e.g.

```
wrangler secret put Region
wrangler secret put Endpoint
wrangler secret put AccessKey
wrangler secret put SecretKey
wrangler secret put Bucket
```

After that you can use `wrangler publish` as normal. See the [wrangler documentation](https://developers.cloudflare.com/workers/cli-wrangler) for more information.

```sh
$ curl --location --request POST 'https://<worker>' \
--form 'image=@"/path/to/image.png"'
#=> {"message":"success"}
```

### AWS SDK for JavaScript

These examples use [v3 of the AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html), see that repository for more information.
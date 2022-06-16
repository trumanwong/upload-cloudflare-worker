/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"

const response = (params = {message: 'success'}, status = 200) => {
  return new Response(JSON.stringify(params), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    },
    status: status
  })
}

export default {
  async fetch(request, env) {
    const formData = await request.formData()
    const file = formData.get('image')
    const key = formData.get('key')

    if (key.length === 0 || !file) {
      return response({
        message: 'invalid params'
      }, 400)
    }
    const s3 = new S3Client({
      region: env.Region,
      endpoint: env.Endpoint,
      credentials: {
        accessKeyId: env.AccessKey,
        secretAccessKey: env.SecretKey,
      }
      // sslEnabled: true
    })

    try {
      const data = await s3.send(new PutObjectCommand({
        Bucket: env.Bucket,
        Key: key,
        Body: file.stream(),
        ContentType: file.type
      })).then(data => {
      }).catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
    return response()
  },
};

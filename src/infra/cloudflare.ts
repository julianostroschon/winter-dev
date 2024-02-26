import { S3Client } from '@aws-sdk/client-s3'
import { env } from '../env'

export const client = new S3Client({
  credentials: {
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
  },
  endpoint: env.CLOUDFLARE_ENDPOINT,
  forcePathStyle: true,
  region: 'auto',
})

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2 } from "../lib/cloudflare";


export async function signUrl (fileKey: string, contentType: string) {
  return await getSignedUrl(
  r2, 
  new PutObjectCommand({
    ContentType: contentType,
    Bucket: 'winter-dev',
    Key: fileKey,
  }),
  { expiresIn: 600 }
)
}
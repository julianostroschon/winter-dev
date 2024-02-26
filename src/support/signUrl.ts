
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { client } from "../infra/cloudflare";

export async function signUrl (fileKey: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    ContentType: contentType,
    Bucket: 'winter-dev',
    Key: fileKey,
  })
  const options = { expiresIn: 600 }

  return await getSignedUrl(client, command,options)
}
import fastify from "fastify";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

import { r2 } from "../lib/cloudflare";

const app = fastify();
const prisma = new PrismaClient();

app.post("/uploads", async (request, reply) => {
  const uploadBodySchema = z.object({
    name: z.string().min(1),
    contentType: z.string().regex(/\w+\/[-+.\w]+/),
  })

  const { name, contentType } = uploadBodySchema.parse(request.body)
  const fileKey = randomUUID().concat('-').concat(name)
  const signedUrl = await getSignedUrl(
    r2, 
    new PutObjectCommand({
      ContentType: contentType,
      Bucket: 'winter-dev',
      Key: fileKey,
    }),
    { expiresIn: 600 }
  )

  await prisma.file.create({
    data: {
      name,
      key: fileKey,
      contentType
    }
  })

  return signedUrl
});

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server listening on port ${3333}`);
});
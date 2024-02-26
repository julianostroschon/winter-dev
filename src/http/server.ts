import fastify from "fastify";

import { prisma } from '../infra/prisma'
import { signUrl } from "../support/signUrl";
import { getMetaInfo } from "../support/meta";
import { env } from "../env";

const app = fastify();

app.post("/uploads", async (request, reply) => {
  const { fileKey, contentType, name } = getMetaInfo(request)
  const signedUrl = await signUrl(fileKey, contentType)

  const file = await prisma.file.create({
    data: {
      name,
      key: fileKey,
      contentType
    }
  })

  return { signedUrl, fileId: file.id }
});

const port = Number(env.API_PORT)

app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server listening on port ${port}`);
});
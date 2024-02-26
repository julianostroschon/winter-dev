import { FastifyRequest, RouteGenericInterface } from "fastify"

import { prisma } from "../../../infra/prisma"
import { getMetaInfo } from "../../../support/meta"
import { signUrl } from "../../../support/signUrl"

interface FileUploadedInfo {
  signedUrl: string
  fileId: string
}

async function handler (request: FastifyRequest<RouteGenericInterface>): Promise<FileUploadedInfo> {
  const { fileKey, contentType, name } = getMetaInfo(request)
  const signedUrl = await signUrl(fileKey, contentType)

  const file = await prisma.file.create({
    data: {
      key: fileKey,
      contentType,
      name,
    }
  })

  return { signedUrl, fileId: file.id }
}

export const uploads = {
  path: '/uploads',
  method: 'post',
  handler
}
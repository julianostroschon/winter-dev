import { randomUUID } from 'crypto'
import type { FastifyRequest, RouteGenericInterface } from 'fastify'
import { z } from 'zod'

export function getMetaInfo(request: FastifyRequest<RouteGenericInterface>): { fileKey: string, contentType: string, name: string } {
  const uploadBodySchema = z.object({
    name: z.string().min(1),
    contentType: z.string().regex(/\w+\/[-+.\w]+/),
  })
  const { name, contentType } = uploadBodySchema.parse(request.body)
  const fileKey = randomUUID().concat('-').concat(name)

  return { fileKey, contentType, name }
}
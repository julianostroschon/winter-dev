import { randomUUID } from 'crypto'
import type { FastifyRequest, RouteGenericInterface } from 'fastify'
import { z } from 'zod'

const REGEX = /\w+\/[-+.\w]+/

export function getMetaInfo(request: Partial<FastifyRequest<RouteGenericInterface>>): { fileKey: string, contentType: string, name: string } {
  if (!request.body) {
    throw new Error(`Missing body in request`)
  }
  const uploadBodySchema = z.object({
    contentType: z.string().regex(REGEX),
    name: z.string().min(1),
  })
  const { name, contentType } = uploadBodySchema.parse(request.body)
  const fileKey = randomUUID().concat('-').concat(name)

  return { fileKey, contentType, name }
}
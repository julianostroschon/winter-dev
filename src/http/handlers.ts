import { z } from 'zod'

import { handlersGet } from "./get";
import { handlersPost } from "./post";

const avaliableRoutes = [...handlersGet, ...handlersPost]

export enum ValidMethods {
  POST = 'post',
  GET = 'get',
}

const shape = {
  path: z.string().min(1).startsWith('/'),
  method: z.nativeEnum(ValidMethods),
  handler: z.function(),
}

const validate = z.object(shape)

export const constructRoutes = (app) => avaliableRoutes.forEach(route => {
  const { method, path, handler } = validate.parse(route)

  app[method](path, handler)
})
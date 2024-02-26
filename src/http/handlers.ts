import { z } from 'zod'

import { handlersGet } from "./get";
import { handlersPost } from "./post";

enum ValidMethods {
  POST = 'post',
  GET = 'get',
}

const shape = {
  route: z.string().min(1).startsWith('/'),
  method: z.nativeEnum(ValidMethods),
  handler: z.function(),
}

const routes = z.array(z.object(shape))

export const handlers = routes.parse([...handlersGet, ...handlersPost])
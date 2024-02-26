import fastify from "fastify";

import { env } from "../env";

import { handlers } from "./handlers";

const app = fastify();

handlers.forEach(({ route, handler, method }) => {
  const newMethod = method.toLocaleLowerCase()
  app[newMethod](route, handler)
});

const port = Number(env.API_PORT)

app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server listening on port ${port}`);
});
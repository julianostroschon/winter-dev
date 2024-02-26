import fastify from "fastify";

import { env } from "../env";

import { handlers } from "./handlers";

const app = fastify();

handlers.forEach(({ route, handler, method }) => {
  app[method](route, handler)
});

const port = Number(env.API_PORT)

app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server listening on port ${port}`);
});
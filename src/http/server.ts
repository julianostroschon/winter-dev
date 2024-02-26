import fastify from "fastify";

import { env } from "../env";

import { constructRoutes } from "./handlers";

const app = fastify();
constructRoutes(app);

const port = Number(env.API_PORT)

app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server listening on port ${port}`);
});
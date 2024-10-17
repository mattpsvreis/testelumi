import Fastify from "fastify";
import { faturasRoutes } from "./routes/faturasRoutes";
import multipart from "@fastify/multipart";

const server = Fastify({ logger: true });

server.register(multipart);

server.register(faturasRoutes);

server.get("/ping", async (request, reply) => {
  reply.status(200).send("pong");
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exitCode = 1;
  }
};

start();

export { server, start };

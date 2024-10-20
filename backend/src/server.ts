import Fastify from "fastify";
import { faturasRoutes } from "./routes/faturasRoutes";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastifyCors from "@fastify/cors";
import path from "path";
import fs from "fs";

const server = Fastify({ logger: true });

const UPLOAD_DIR = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

server.register(fastifyMultipart);

server.register(fastifyStatic, {
  root: UPLOAD_DIR,

  prefix: "/uploads/",
});

server.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

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

export { server, start, UPLOAD_DIR };

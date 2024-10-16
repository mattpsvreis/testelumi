import Fastify from "fastify";
import { faturasRoutes } from "./routes/faturasRoutes";
import prisma from "./database/prismaClient";

const fastify = Fastify({ logger: true });

fastify.register(faturasRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

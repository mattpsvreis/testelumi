import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.get("/faturas", async (request, reply) => {
  try {
    const faturas = await prisma.fatura.findMany();
    reply.send(faturas);
  } catch (error) {
    reply.status(500).send(error);
  }
});

fastify.post("/faturas", async (request, reply) => {
  const {
    numero_cliente,
    mes_referencia,
    energia_eletrica_kwh,
    energia_eletrica_valor,
    energia_sceee_kwh,
    energia_sceee_valor,
    energia_compensada_kwh,
    energia_compensada_valor,
    contribu_ilum_publica_valor,
  } = request.body as {
    numero_cliente: string;
    mes_referencia: string;
    energia_eletrica_kwh: number;
    energia_eletrica_valor: number;
    energia_sceee_kwh: number;
    energia_sceee_valor: number;
    energia_compensada_kwh: number;
    energia_compensada_valor: number;
    contribu_ilum_publica_valor: number;
  };

  try {
    const novaFatura = await prisma.fatura.create({
      data: {
        numero_cliente,
        mes_referencia: new Date(mes_referencia),
        energia_eletrica_kwh,
        energia_eletrica_valor,
        energia_sceee_kwh,
        energia_sceee_valor,
        energia_compensada_kwh,
        energia_compensada_valor,
        contribu_ilum_publica_valor,
      },
    });
    reply.status(201).send(novaFatura);
  } catch (error) {
    reply.status(500).send(error);
  }
});

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

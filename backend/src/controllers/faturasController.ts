import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../database/prismaClient";
import { Fatura } from "../types/faturasTypes";

export const getFaturas = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const faturas = await prisma.fatura.findMany();
    reply.status(200).send(faturas);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const postFatura = async (
  request: FastifyRequest<{ Body: Fatura }>,
  reply: FastifyReply
) => {
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
  } = request.body;

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
};

export const patchFatura = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<Fatura> }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
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
  } = request.body;

  try {
    const existingFatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingFatura) {
      return reply.status(404).send({ error: "Fatura not found" });
    }

    const updatedFatura = await prisma.fatura.update({
      where: { id: parseInt(id) },
      data: {
        ...(numero_cliente !== undefined && { numero_cliente }),
        ...(mes_referencia !== undefined && {
          mes_referencia: new Date(mes_referencia),
        }),
        ...(energia_eletrica_kwh !== undefined && { energia_eletrica_kwh }),
        ...(energia_eletrica_valor !== undefined && { energia_eletrica_valor }),
        ...(energia_sceee_kwh !== undefined && { energia_sceee_kwh }),
        ...(energia_sceee_valor !== undefined && { energia_sceee_valor }),
        ...(energia_compensada_kwh !== undefined && { energia_compensada_kwh }),
        ...(energia_compensada_valor !== undefined && {
          energia_compensada_valor,
        }),
        ...(contribu_ilum_publica_valor !== undefined && {
          contribu_ilum_publica_valor,
        }),
      },
    });

    reply.status(200).send(updatedFatura);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const putFatura = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<Fatura> }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
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
  } = request.body;

  try {
    const existingFatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (existingFatura) {
      const updatedFatura = await prisma.fatura.update({
        where: { id: parseInt(id) },
        data: {
          ...(numero_cliente !== undefined && { numero_cliente }),
          ...(mes_referencia !== undefined && {
            mes_referencia: new Date(mes_referencia),
          }),
          ...(energia_eletrica_kwh !== undefined && { energia_eletrica_kwh }),
          ...(energia_eletrica_valor !== undefined && {
            energia_eletrica_valor,
          }),
          ...(energia_sceee_kwh !== undefined && { energia_sceee_kwh }),
          ...(energia_sceee_valor !== undefined && { energia_sceee_valor }),
          ...(energia_compensada_kwh !== undefined && {
            energia_compensada_kwh,
          }),
          ...(energia_compensada_valor !== undefined && {
            energia_compensada_valor,
          }),
          ...(contribu_ilum_publica_valor !== undefined && {
            contribu_ilum_publica_valor,
          }),
        },
      });

      reply.status(200).send(updatedFatura);
    } else {
      if (
        numero_cliente !== undefined &&
        mes_referencia !== undefined &&
        energia_eletrica_kwh !== undefined &&
        energia_eletrica_valor !== undefined &&
        energia_sceee_kwh !== undefined &&
        energia_sceee_valor !== undefined &&
        energia_compensada_kwh !== undefined &&
        energia_compensada_valor !== undefined &&
        contribu_ilum_publica_valor !== undefined
      ) {
        const newFatura = await prisma.fatura.create({
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

        reply.status(201).send(newFatura);
      } else {
        reply.status(400).send({
          error: `No existing Fatura with id ${id} was found. All fields must be provided to create a new Fatura, or use the POST functionality instead.`,
        });
      }
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getNumeroCliente = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ numero_cliente: fatura.numero_cliente });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getMesReferencia = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ mes_referencia: fatura.mes_referencia });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getEnergiaEletricaKwh = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ energia_eletrica_kwh: fatura.energia_eletrica_kwh });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getEnergiaEletricaValor = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ energia_eletrica_valor: fatura.energia_eletrica_valor });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getEnergiaSceeeKwh = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ energia_sceee_kwh: fatura.energia_sceee_kwh });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getEnergiaSceeeValor = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ energia_sceee_valor: fatura.energia_sceee_valor });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getEnergiaCompensadaKwh = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ energia_compensada_kwh: fatura.energia_compensada_kwh });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getEnergiaCompensadaValor = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({ energia_compensada_valor: fatura.energia_compensada_valor });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getContribuIlumPublicaValor = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.send({
        contribu_ilum_publica_valor: fatura.contribu_ilum_publica_valor,
      });
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

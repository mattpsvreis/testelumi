import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../database/prismaClient";
import { Fatura } from "../types/faturasTypes";
import { processPDF } from "../services/dataExtractor";
import { UPLOAD_DIR } from "../server";
import path from "path";
import fs from "fs";

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

export const processFatura = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const file = await request.file();

    if (!file) {
      reply.status(400).send({ error: "No file uploaded" });
      return;
    }

    const fileBuffer = await file.toBuffer();

    const faturaProcessada = await processPDF(fileBuffer);

    const filePath = path.join(UPLOAD_DIR, file.filename);
    const writeStream = fs.createWriteStream(filePath);
    file.file.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("File successfully written to:", filePath);
    });

    writeStream.on("error", (err) => {
      console.error("Error writing file:", err);
      reply.status(500).send(err);
      return;
    });

    const fileUrl = `${request.protocol}://${request.hostname}:${request.port}/uploads/${file.filename}`;

    console.log("fileUrl:", fileUrl);

    const fatura = await prisma.fatura.create({
      data: { ...faturaProcessada, fileUrl: fileUrl },
    });

    reply.status(201).send(fatura);
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

export const getFaturaById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const fatura = await prisma.fatura.findUnique({
      where: { id: parseInt(id) },
    });

    if (fatura) {
      reply.status(200).send(fatura);
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getFaturasByNumeroCliente = async (
  request: FastifyRequest<{ Params: { numero_cliente: string } }>,
  reply: FastifyReply
) => {
  try {
    const { numero_cliente } = request.params;

    const faturas = await prisma.fatura.findMany({
      where: { numero_cliente: numero_cliente },
    });

    if (faturas) {
      reply.status(200).send(faturas);
    } else {
      reply.status(404).send({ error: "Fatura not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getFaturaPdf = async (
  request: FastifyRequest<{ Params: { pdfName: string } }>,
  reply: FastifyReply
) => {
  try {
    const { pdfName } = request.params;

    const filePath = path.join(UPLOAD_DIR, pdfName);

    if (fs.existsSync(filePath)) {
      reply.sendFile(filePath);
    } else {
      reply.status(404).send({ error: "File not found" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

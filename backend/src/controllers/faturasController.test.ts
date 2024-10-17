import { FastifyRequest, FastifyReply } from "fastify";
import {
  getContribuIlumPublicaValor,
  getEnergiaCompensadaKwh,
  getEnergiaCompensadaValor,
  getEnergiaEletricaKwh,
  getEnergiaEletricaValor,
  getEnergiaSceeeKwh,
  getEnergiaSceeeValor,
  getFaturas,
  getMesReferencia,
  getNumeroCliente,
  patchFatura,
  postFatura,
  putFatura,
} from "./faturasController";
import { Fatura } from "../types/faturasTypes";
import prisma from "../database/prismaClient";

jest.mock("../database/prismaClient", () => ({
  fatura: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

describe("faturasController", () => {
  let mockRequest: Partial<
    FastifyRequest<{ Params: { id: string }; Body: Partial<Fatura> }>
  >;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {};
    mockReply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getFaturas", () => {
    it("should return a list of faturas", async () => {
      const faturas = [{ id: 1, numero_cliente: "12345" }];
      (prisma.fatura.findMany as jest.Mock).mockResolvedValue(faturas);

      await getFaturas(
        mockRequest as FastifyRequest,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findMany).toHaveBeenCalled();
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(faturas);
    });

    it("should handle errors", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findMany as jest.Mock).mockRejectedValue(error);

      await getFaturas(
        mockRequest as FastifyRequest,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findMany).toHaveBeenCalled();
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("postFatura", () => {
    let mockRequest: Partial<FastifyRequest<{ Body: Fatura }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        body: {
          numero_cliente: "12345",
          mes_referencia: new Date(),
          energia_eletrica_kwh: 100,
          energia_eletrica_valor: 200,
          energia_sceee_kwh: 50,
          energia_sceee_valor: 100,
          energia_compensada_kwh: 30,
          energia_compensada_valor: 60,
          contribu_ilum_publica_valor: 10,
        },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new fatura and return it with status 201", async () => {
      const novaFatura = {
        id: 1,
        ...mockRequest.body,
      };
      (prisma.fatura.create as jest.Mock).mockResolvedValue(novaFatura);

      await postFatura(
        mockRequest as FastifyRequest<{ Body: Fatura }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.create).toHaveBeenCalledWith({
        data: {
          numero_cliente: mockRequest.body!.numero_cliente,
          mes_referencia: new Date(mockRequest.body!.mes_referencia),
          energia_eletrica_kwh: mockRequest.body!.energia_eletrica_kwh,
          energia_eletrica_valor: mockRequest.body!.energia_eletrica_valor,
          energia_sceee_kwh: mockRequest.body!.energia_sceee_kwh,
          energia_sceee_valor: mockRequest.body!.energia_sceee_valor,
          energia_compensada_kwh: mockRequest.body!.energia_compensada_kwh,
          energia_compensada_valor: mockRequest.body!.energia_compensada_valor,
          contribu_ilum_publica_valor:
            mockRequest.body!.contribu_ilum_publica_valor,
        },
      });
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(novaFatura);
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.create as jest.Mock).mockRejectedValue(error);

      await postFatura(
        mockRequest as FastifyRequest<{ Body: Fatura }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.create).toHaveBeenCalled();
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("patchFatura", () => {
    let mockRequest: Partial<
      FastifyRequest<{ Params: { id: string }; Body: Partial<Fatura> }>
    >;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
        body: {
          numero_cliente: "12345",
          mes_referencia: new Date(),
          energia_eletrica_kwh: 100,
          energia_eletrica_valor: 200,
          energia_sceee_kwh: 50,
          energia_sceee_valor: 100,
          energia_compensada_kwh: 30,
          energia_compensada_valor: 60,
          contribu_ilum_publica_valor: 10,
        },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update an existing fatura and return it with status 200", async () => {
      const existingFatura = { id: 1, numero_cliente: "12345" };
      const updatedFatura = { ...existingFatura, ...mockRequest.body };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(existingFatura);
      (prisma.fatura.update as jest.Mock).mockResolvedValue(updatedFatura);

      await patchFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(prisma.fatura.update).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
        data: {
          numero_cliente: mockRequest.body!.numero_cliente,
          mes_referencia: new Date(mockRequest.body!.mes_referencia!),
          energia_eletrica_kwh: mockRequest.body!.energia_eletrica_kwh,
          energia_eletrica_valor: mockRequest.body!.energia_eletrica_valor,
          energia_sceee_kwh: mockRequest.body!.energia_sceee_kwh,
          energia_sceee_valor: mockRequest.body!.energia_sceee_valor,
          energia_compensada_kwh: mockRequest.body!.energia_compensada_kwh,
          energia_compensada_valor: mockRequest.body!.energia_compensada_valor,
          contribu_ilum_publica_valor:
            mockRequest.body!.contribu_ilum_publica_valor,
        },
      });
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(updatedFatura);
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await patchFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await patchFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("putFatura", () => {
    let mockRequest: Partial<
      FastifyRequest<{ Params: { id: string }; Body: Partial<Fatura> }>
    >;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
        body: {
          numero_cliente: "12345",
          mes_referencia: new Date(),
          energia_eletrica_kwh: 100,
          energia_eletrica_valor: 200,
          energia_sceee_kwh: 50,
          energia_sceee_valor: 100,
          energia_compensada_kwh: 30,
          energia_compensada_valor: 60,
          contribu_ilum_publica_valor: 10,
        },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update an existing fatura and return it with status 200", async () => {
      const existingFatura = { id: 1, numero_cliente: "12345" };
      const updatedFatura = { ...existingFatura, ...mockRequest.body };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(existingFatura);
      (prisma.fatura.update as jest.Mock).mockResolvedValue(updatedFatura);

      await putFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(prisma.fatura.update).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
        data: {
          numero_cliente: mockRequest.body!.numero_cliente,
          mes_referencia: new Date(mockRequest.body!.mes_referencia!),
          energia_eletrica_kwh: mockRequest.body!.energia_eletrica_kwh,
          energia_eletrica_valor: mockRequest.body!.energia_eletrica_valor,
          energia_sceee_kwh: mockRequest.body!.energia_sceee_kwh,
          energia_sceee_valor: mockRequest.body!.energia_sceee_valor,
          energia_compensada_kwh: mockRequest.body!.energia_compensada_kwh,
          energia_compensada_valor: mockRequest.body!.energia_compensada_valor,
          contribu_ilum_publica_valor:
            mockRequest.body!.contribu_ilum_publica_valor,
        },
      });
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(updatedFatura);
    });

    it("should create a new fatura and return it with status 201 if no existing fatura is found and all fields are provided", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);
      const newFatura = { id: 1, ...mockRequest.body };

      (prisma.fatura.create as jest.Mock).mockResolvedValue(newFatura);

      await putFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(prisma.fatura.create).toHaveBeenCalledWith({
        data: {
          numero_cliente: mockRequest.body!.numero_cliente,
          mes_referencia: new Date(mockRequest.body!.mes_referencia!),
          energia_eletrica_kwh: mockRequest.body!.energia_eletrica_kwh,
          energia_eletrica_valor: mockRequest.body!.energia_eletrica_valor,
          energia_sceee_kwh: mockRequest.body!.energia_sceee_kwh,
          energia_sceee_valor: mockRequest.body!.energia_sceee_valor,
          energia_compensada_kwh: mockRequest.body!.energia_compensada_kwh,
          energia_compensada_valor: mockRequest.body!.energia_compensada_valor,
          contribu_ilum_publica_valor:
            mockRequest.body!.contribu_ilum_publica_valor,
        },
      });
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(newFatura);
    });

    it("should return 400 if no existing fatura is found and not all fields are provided", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);
      mockRequest.body = {
        numero_cliente: "12345",
        mes_referencia: new Date(),
      };

      await putFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: `No existing Fatura with id ${
          mockRequest.params!.id
        } was found. All fields must be provided to create a new Fatura, or use the POST functionality instead.`,
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await putFatura(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Body: Partial<Fatura>;
        }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getNumeroCliente", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the numero_cliente if fatura is found", async () => {
      const fatura = { id: 1, numero_cliente: "12345" };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getNumeroCliente(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        numero_cliente: fatura.numero_cliente,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getNumeroCliente(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getNumeroCliente(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getMesReferencia", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the mes_referencia if fatura is found", async () => {
      const fatura = { id: 1, mes_referencia: new Date() };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getMesReferencia(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        mes_referencia: fatura.mes_referencia,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getMesReferencia(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getMesReferencia(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getEnergiaEletricaKwh", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the energia_eletrica_kwh if fatura is found", async () => {
      const fatura = { id: 1, energia_eletrica_kwh: 100 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getEnergiaEletricaKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        energia_eletrica_kwh: fatura.energia_eletrica_kwh,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getEnergiaEletricaKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getEnergiaEletricaKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getEnergiaEletricaValor", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the energia_eletrica_valor if fatura is found", async () => {
      const fatura = { id: 1, energia_eletrica_valor: 200 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getEnergiaEletricaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        energia_eletrica_valor: fatura.energia_eletrica_valor,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getEnergiaEletricaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getEnergiaEletricaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getEnergiaSceeeKwh", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the energia_sceee_kwh if fatura is found", async () => {
      const fatura = { id: 1, energia_sceee_kwh: 50 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getEnergiaSceeeKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        energia_sceee_kwh: fatura.energia_sceee_kwh,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getEnergiaSceeeKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getEnergiaSceeeKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getEnergiaSceeeValor", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the energia_sceee_valor if fatura is found", async () => {
      const fatura = { id: 1, energia_sceee_valor: 100 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getEnergiaSceeeValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        energia_sceee_valor: fatura.energia_sceee_valor,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getEnergiaSceeeValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getEnergiaSceeeValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getEnergiaCompensadaKwh", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the energia_compensada_kwh if fatura is found", async () => {
      const fatura = { id: 1, energia_compensada_kwh: 50 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getEnergiaCompensadaKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        energia_compensada_kwh: fatura.energia_compensada_kwh,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getEnergiaCompensadaKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getEnergiaCompensadaKwh(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getEnergiaCompensadaValor", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the energia_compensada_valor if fatura is found", async () => {
      const fatura = { id: 1, energia_compensada_valor: 60 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getEnergiaCompensadaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        energia_compensada_valor: fatura.energia_compensada_valor,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getEnergiaCompensadaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getEnergiaCompensadaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getContribuIlumPublicaValor", () => {
    let mockRequest: Partial<FastifyRequest<{ Params: { id: string } }>>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
      mockRequest = {
        params: { id: "1" },
      };
      mockReply = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return the contribu_ilum_publica_valor if fatura is found", async () => {
      const fatura = { id: 1, contribu_ilum_publica_valor: 10 };

      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(fatura);

      await getContribuIlumPublicaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.send).toHaveBeenCalledWith({
        contribu_ilum_publica_valor: fatura.contribu_ilum_publica_valor,
      });
    });

    it("should return 404 if fatura is not found", async () => {
      (prisma.fatura.findUnique as jest.Mock).mockResolvedValue(null);

      await getContribuIlumPublicaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Fatura not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      const error = new Error("Something went wrong");
      (prisma.fatura.findUnique as jest.Mock).mockRejectedValue(error);

      await getContribuIlumPublicaValor(
        mockRequest as FastifyRequest<{ Params: { id: string } }>,
        mockReply as FastifyReply
      );

      expect(prisma.fatura.findUnique).toHaveBeenCalledWith({
        where: { id: parseInt(mockRequest.params!.id) },
      });
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(error);
    });
  });
});

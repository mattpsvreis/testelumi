import Fastify, { FastifyInstance } from "fastify";
import { faturasRoutes } from "./faturasRoutes";
import * as faturasController from "../controllers/faturasController";

jest.mock("../controllers/faturasController");

describe("faturasRoutes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    await faturasRoutes(app);
  });

  afterAll(() => {
    app.close();
  });

  it("should register the GET /faturas route", async () => {
    const getFaturasSpy = jest.spyOn(faturasController, "getFaturas");
    (faturasController.getFaturas as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send([]);
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas",
    });
    expect(response.statusCode).toBe(200);
    expect(getFaturasSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/numero_cliente route", async () => {
    const getNumeroClienteSpy = jest.spyOn(
      faturasController,
      "getNumeroCliente"
    );
    (faturasController.getNumeroCliente as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ numero_cliente: "12345" });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/numero_cliente",
    });
    expect(response.statusCode).toBe(200);
    expect(getNumeroClienteSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/mes_referencia route", async () => {
    const getMesReferenciaSpy = jest.spyOn(
      faturasController,
      "getMesReferencia"
    );
    (faturasController.getMesReferencia as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ mes_referencia: "2023-01-01" });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/mes_referencia",
    });
    expect(response.statusCode).toBe(200);
    expect(getMesReferenciaSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/energia_eletrica_kwh route", async () => {
    const getEnergiaEletricaKwhSpy = jest.spyOn(
      faturasController,
      "getEnergiaEletricaKwh"
    );
    (faturasController.getEnergiaEletricaKwh as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ energia_eletrica_kwh: 100 });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/energia_eletrica_kwh",
    });
    expect(response.statusCode).toBe(200);
    expect(getEnergiaEletricaKwhSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/energia_eletrica_valor route", async () => {
    const getEnergiaEletricaValorSpy = jest.spyOn(
      faturasController,
      "getEnergiaEletricaValor"
    );
    (faturasController.getEnergiaEletricaValor as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ energia_eletrica_valor: 200 });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/energia_eletrica_valor",
    });
    expect(response.statusCode).toBe(200);
    expect(getEnergiaEletricaValorSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/energia_sceee_kwh route", async () => {
    const getEnergiaSceeeKwhSpy = jest.spyOn(
      faturasController,
      "getEnergiaSceeeKwh"
    );
    (faturasController.getEnergiaSceeeKwh as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ energia_sceee_kwh: 50 });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/energia_sceee_kwh",
    });
    expect(response.statusCode).toBe(200);
    expect(getEnergiaSceeeKwhSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/energia_sceee_valor route", async () => {
    const getEnergiaSceeeValorSpy = jest.spyOn(
      faturasController,
      "getEnergiaSceeeValor"
    );
    (faturasController.getEnergiaSceeeValor as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ energia_sceee_valor: 100 });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/energia_sceee_valor",
    });
    expect(response.statusCode).toBe(200);
    expect(getEnergiaSceeeValorSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/energia_compensada_kwh route", async () => {
    const getEnergiaCompensadaKwhSpy = jest.spyOn(
      faturasController,
      "getEnergiaCompensadaKwh"
    );
    (faturasController.getEnergiaCompensadaKwh as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({ energia_compensada_kwh: 30 });
      }
    );
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/energia_compensada_kwh",
    });
    expect(response.statusCode).toBe(200);
    expect(getEnergiaCompensadaKwhSpy).toHaveBeenCalled();
  });

  it("should register the GET /faturas/:id/energia_compensada_valor route", async () => {
    const getEnergiaCompensadaValorSpy = jest.spyOn(
      faturasController,
      "getEnergiaCompensadaValor"
    );
    (
      faturasController.getEnergiaCompensadaValor as jest.Mock
    ).mockImplementation((req, reply) => {
      reply.send({ energia_compensada_valor: 60 });
    });
    const response = await app.inject({
      method: "GET",
      url: "/faturas/1/energia_compensada_valor",
    });
    expect(response.statusCode).toBe(200);
    expect(getEnergiaCompensadaValorSpy).toHaveBeenCalled();
  });

  it("should register the GET /fatura/:id/contribu_ilum_publica_valor route", async () => {
    const getContribuIlumPublicaValorSpy = jest.spyOn(
      faturasController,
      "getContribuIlumPublicaValor"
    );
    (
      faturasController.getContribuIlumPublicaValor as jest.Mock
    ).mockImplementation((req, reply) => {
      reply.send({ contribu_ilum_publica_valor: 10 });
    });
    const response = await app.inject({
      method: "GET",
      url: "/fatura/1/contribu_ilum_publica_valor",
    });
    expect(response.statusCode).toBe(200);
    expect(getContribuIlumPublicaValorSpy).toHaveBeenCalled();
  });

  it("should register the POST /faturas route", async () => {
    const postFaturaSpy = jest.spyOn(faturasController, "postFatura");
    (faturasController.postFatura as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.status(201).send({});
      }
    );
    const response = await app.inject({
      method: "POST",
      url: "/faturas",
      payload: {
        numero_cliente: "12345",
        mes_referencia: "2023-01-01",
        energia_eletrica_kwh: 100,
        energia_eletrica_valor: 200,
        energia_sceee_kwh: 50,
        energia_sceee_valor: 100,
        energia_compensada_kwh: 30,
        energia_compensada_valor: 60,
        contribu_ilum_publica_valor: 10,
      },
    });
    expect(response.statusCode).toBe(201);
    expect(postFaturaSpy).toHaveBeenCalled();
  });

  it("should register the PATCH /faturas/:id route", async () => {
    const patchFaturaSpy = jest.spyOn(faturasController, "patchFatura");
    (faturasController.patchFatura as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({});
      }
    );
    const response = await app.inject({
      method: "PATCH",
      url: "/faturas/1",
      payload: {
        numero_cliente: "54321",
      },
    });
    expect(response.statusCode).toBe(200);
    expect(patchFaturaSpy).toHaveBeenCalled();
  });

  it("should register the PUT /faturas/:id route", async () => {
    const putFaturaSpy = jest.spyOn(faturasController, "putFatura");
    (faturasController.putFatura as jest.Mock).mockImplementation(
      (req, reply) => {
        reply.send({});
      }
    );
    const response = await app.inject({
      method: "PUT",
      url: "/faturas/1",
      payload: {
        numero_cliente: "54321",
        mes_referencia: "2023-01-01",
        energia_eletrica_kwh: 100,
        energia_eletrica_valor: 200,
        energia_sceee_kwh: 50,
        energia_sceee_valor: 100,
        energia_compensada_kwh: 30,
        energia_compensada_valor: 60,
        contribu_ilum_publica_valor: 10,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(putFaturaSpy).toHaveBeenCalled();
  });
});

import { FastifyInstance } from "fastify";
import {
  getFaturas,
  getNumeroCliente,
  getMesReferencia,
  getEnergiaEletricaKwh,
  getEnergiaEletricaValor,
  getEnergiaSceeeKwh,
  getEnergiaSceeeValor,
  getEnergiaCompensadaKwh,
  getEnergiaCompensadaValor,
  getContribuIlumPublicaValor,
  patchFatura,
  postFatura,
  putFatura,
} from "../controllers/faturasController";

export const faturasRoutes = async (app: FastifyInstance) => {
  app.get("/faturas", getFaturas);
  app.get("/faturas/:id/numero_cliente", getNumeroCliente);
  app.get("/faturas/:id/mes_referencia", getMesReferencia);
  app.get("/faturas/:id/energia_eletrica_kwh", getEnergiaEletricaKwh);
  app.get("/faturas/:id/energia_eletrica_valor", getEnergiaEletricaValor);
  app.get("/faturas/:id/energia_sceee_kwh", getEnergiaSceeeKwh);
  app.get("/faturas/:id/energia_sceee_valor", getEnergiaSceeeValor);
  app.get("/faturas/:id/energia_compensada_kwh", getEnergiaCompensadaKwh);
  app.get("/faturas/:id/energia_compensada_valor", getEnergiaCompensadaValor);
  app.get(
    "/fatura/:id/contribu_ilum_publica_valor",
    getContribuIlumPublicaValor
  );
  app.post("/faturas", postFatura);
  app.patch("/faturas/:id", patchFatura);
  app.put("/faturas/:id", putFatura);
};

import { FastifyInstance } from "fastify";
import {
  getFaturas,
  getFaturaById,
  getFaturasByNumeroCliente,
  getFaturaPdf,
  patchFatura,
  postFatura,
  putFatura,
  processFatura,
} from "../controllers/faturasController";

export const faturasRoutes = async (app: FastifyInstance) => {
  app.get("/faturas", getFaturas);
  app.get("/faturas/id/:id", getFaturaById);
  app.get("/faturas/numero_cliente/:numero_cliente", getFaturasByNumeroCliente);
  app.get("/faturas/download_pdf/:pdfName", getFaturaPdf);
  app.post("/faturas", postFatura);
  app.post("/faturas/upload-pdf", processFatura);
  app.patch("/faturas/:id", patchFatura);
  app.put("/faturas/:id", putFatura);
};

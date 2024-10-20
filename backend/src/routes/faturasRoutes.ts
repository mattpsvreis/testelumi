import { FastifyInstance } from "fastify";
import {
  getFaturas,
  getFatura,
  patchFatura,
  postFatura,
  putFatura,
  processFatura,
} from "../controllers/faturasController";

export const faturasRoutes = async (app: FastifyInstance) => {
  app.get("/faturas", getFaturas);
  app.get("/faturas/:id", getFatura);
  app.post("/faturas", postFatura);
  app.post("/faturas/upload-pdf", processFatura);
  app.patch("/faturas/:id", patchFatura);
  app.put("/faturas/:id", putFatura);
};

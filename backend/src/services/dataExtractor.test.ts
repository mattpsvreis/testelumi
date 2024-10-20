import fs from "fs";
import path from "path";
import { processPDF } from "./dataExtractor";

const mockPDF = fs.readFileSync(
  path.resolve(__dirname, "../../mocks/3001422762-01-2024.pdf")
);

describe("process PDF file", () => {
  it("should extract data correctly from a valid PDF buffer", async () => {
    const result = await processPDF(mockPDF);

    expect(result).toEqual({
      numero_cliente: "7202210726",
      mes_referencia: new Date("2024-01-01T03:00:00.000Z"),
      energia_eletrica_kwh: 100,
      energia_eletrica_valor: 95.52,
      energia_sceee_kwh: 2300,
      energia_sceee_valor: 1172.31,
      energia_compensada_kwh: 2300,
      energia_compensada_valor: -1120.85,
      contribu_ilum_publica_valor: 40.45,
    });
  });
});

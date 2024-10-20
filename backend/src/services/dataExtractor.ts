import pdfParse from "pdf-parse";
import { Fatura } from "../types/faturasTypes";

interface FaturaData {
  numero_cliente: string;
  mes_referencia: Date;
  energia_eletrica_kwh: number;
  energia_eletrica_valor: number;
  energia_sceee_kwh: number;
  energia_sceee_valor: number;
  energia_compensada_kwh: number;
  energia_compensada_valor: number;
  contribu_ilum_publica_valor: number;
}

function createDateFromString(dateString: string): Date | null {
  const monthMap: { [key: string]: number } = {
    JAN: 0,
    FEV: 1,
    MAR: 2,
    ABR: 3,
    MAI: 4,
    JUN: 5,
    JUL: 6,
    AGO: 7,
    SET: 8,
    OUT: 9,
    NOV: 10,
    DEZ: 11,
  };

  const [monthAbbr, year] = dateString.split("/");
  const month = monthMap[monthAbbr.toUpperCase()];

  if (month === undefined || isNaN(Number(year))) {
    return null;
  }

  return new Date(Number(year), month);
}

async function extractDataFromPDF(fileBuffer: Buffer): Promise<FaturaData> {
  const data = await pdfParse(fileBuffer);

  const text = data.text;

  const lines = text.split("\n");

  let i = 0;

  lines.forEach((line) => {
    console.log(i, ":", line);
    i++;
  });

  /* Número do Cliente */

  const line_with_numero_cliente = lines.findIndex((line) =>
    line.includes("Nº DO CLIENTE")
  );

  const numero_cliente = lines[line_with_numero_cliente + 1]
    .replace(/\s+/g, "")
    .slice(0, 10);

  console.log("numero_cliente:", numero_cliente);

  /* Mês de Referência */

  const line_with_mes_referencia = lines.findIndex((line) =>
    line.includes("Referente a")
  );

  const mes_referencia = createDateFromString(
    lines[line_with_mes_referencia + 1].replace(/\s+/g, "").slice(0, 8)
  );

  console.log("mes_referencia:", mes_referencia);

  /* Energia Elétrica */

  const line_with_energia_eletrica = lines.findIndex((line) =>
    line.includes("Energia ElétricakWh")
  );

  const energia_eletrica_kwh_match = lines[line_with_energia_eletrica].match(
    /Energia ElétricakWh\s+([\d.]+)/
  );
  const energia_eletrica_kwh = energia_eletrica_kwh_match
    ? energia_eletrica_kwh_match[1]
    : null;

  console.log(`energia_eletrica_kwh: ${energia_eletrica_kwh}`);

  const energia_eletrica_valor_match = lines[line_with_energia_eletrica].match(
    /Energia ElétricakWh\s+[\d.]+\s+[\d,]+\s+([\d,]+)/
  );
  const energia_eletrica_valor = energia_eletrica_valor_match
    ? energia_eletrica_valor_match[1]
    : null;

  console.log(`energia_eletrica_valor: ${energia_eletrica_valor}`);

  /* Energia SCEE s/ICMS */

  const line_with_energia_scee = lines.findIndex((line) =>
    line.includes("Energia SCEE s/ ICMSkWh")
  );

  const energia_scee_kwh_match = lines[line_with_energia_scee].match(
    /Energia SCEE s\/ ICMSkWh\s+([\d.]+)/
  );
  const energia_scee_kwh = energia_scee_kwh_match
    ? energia_scee_kwh_match[1]
    : null;

  console.log(`energia_scee_kwh: ${energia_scee_kwh}`);

  const energia_scee_valor_match = lines[line_with_energia_scee].match(
    /Energia SCEE s\/ ICMSkWh\s+[\d.]+\s+[\d,]+\s+([\d.,]+)/
  );
  const energia_scee_valor = energia_scee_valor_match
    ? energia_scee_valor_match[1]
    : null;

  console.log(`energia_scee_valor: ${energia_scee_valor}`);

  /* Energia Compensada */

  const line_with_energia_compensada = lines.findIndex((line) =>
    line.includes("Energia compensada GD IkWh")
  );

  const energia_compensada_kwh_match = lines[
    line_with_energia_compensada
  ].match(/Energia compensada GD IkWh\s+([\d.]+)/);
  const energia_compensada_kwh = energia_compensada_kwh_match
    ? energia_compensada_kwh_match[1]
    : null;

  console.log(`energia_compensada_kwh: ${energia_compensada_kwh}`);

  const energia_compensada_valor_match = lines[
    line_with_energia_compensada
  ].match(/Energia compensada GD IkWh\s+[\d.]+\s+[\d.,]+\s+(-?[\d.,]+)/);

  const energia_compensada_valor = energia_compensada_valor_match
    ? energia_compensada_valor_match[1]
    : null;

  console.log(`energia_compensada_valor: ${energia_compensada_valor}`);

  /* Contribuição Iluminação Pública */

  const line_with_contribu_ilum_publica = lines.findIndex((line) =>
    line.includes("Contrib Ilum Publica Municipal")
  );

  const contribu_ilum_publica_valor_match = lines[
    line_with_contribu_ilum_publica
  ].match(/Contrib Ilum Publica Municipal\s+([\d,]+)/);

  const contribu_ilum_publica_valor = contribu_ilum_publica_valor_match
    ? contribu_ilum_publica_valor_match[1]
    : null;

  console.log(`contribu_ilum_publica_valor: ${contribu_ilum_publica_valor}`);

  /* Checando se todos os dados foram resgatados */

  if (!numero_cliente) {
    throw new Error("Número do cliente não encontrado");
  }

  if (!mes_referencia) {
    throw new Error("Mês de referência não encontrado");
  }

  if (!energia_eletrica_kwh) {
    throw new Error("Energia elétrica (kWh) não encontrada");
  }

  if (!energia_eletrica_valor) {
    throw new Error("Energia elétrica (R$) não encontrada");
  }

  if (!energia_scee_kwh) {
    throw new Error("Energia SCEE (kWh) não encontrada");
  }

  if (!energia_scee_valor) {
    throw new Error("Energia SCEE (R$) não encontrada");
  }

  if (!energia_compensada_kwh) {
    throw new Error("Energia compensada (kWh) não encontrada");
  }

  if (!energia_compensada_valor) {
    throw new Error("Energia compensada (R$) não encontrada");
  }

  if (!contribu_ilum_publica_valor) {
    throw new Error("Contribuição iluminação pública não encontrada");
  }

  return {
    numero_cliente,
    mes_referencia: mes_referencia,
    energia_eletrica_kwh: parseFloat(energia_eletrica_kwh),
    energia_eletrica_valor: parseFloat(
      energia_eletrica_valor.replace(",", ".")
    ),
    energia_sceee_kwh: parseFloat(energia_scee_kwh.replace(",", ".")),
    energia_sceee_valor: parseFloat(energia_scee_valor.replace(",", ".")),
    energia_compensada_kwh: parseFloat(
      energia_compensada_kwh.replace(",", ".")
    ),
    energia_compensada_valor: parseFloat(
      energia_compensada_valor.replace(",", ".")
    ),
    contribu_ilum_publica_valor: parseFloat(
      contribu_ilum_publica_valor.replace(",", ".")
    ),
  };
}

export async function processPDF(fileBuffer: Buffer): Promise<Fatura> {
  return await extractDataFromPDF(fileBuffer);
}

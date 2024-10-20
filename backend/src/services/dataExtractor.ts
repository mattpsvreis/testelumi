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

async function extractDataFromPDF(fileBuffer: Buffer): Promise<FaturaData> {
  const data = await pdfParse(fileBuffer);

  const text = data.text;

  const lines = text.split("\n");

  let i = 0;

  lines.forEach((line) => {
    console.log(i, ":", line);
    i++;
  });

  let numero_cliente: string | null = null;
  let mes_referencia: string | null = null;
  let energia_eletrica_kwh: string | null = null;
  let energia_eletrica_valor: string | null = null;
  let energia_sceee_kwh: string | null = null;
  let energia_sceee_valor: string | null = null;
  let energia_compensada_kwh: string | null = null;
  let energia_compensada_valor: string | null = null;
  let contribu_ilum_publica_valor: string | null = null;

  for (const line of lines) {
    if (!numero_cliente) {
      const match = line.match(/Nº DO CLIENTE\s+(\d+)/);
      if (match) {
        numero_cliente = match[1];
      }
    }

    if (!mes_referencia) {
      const match = line.match(/Referente a\s+(\w+\/\d+)/);
      if (match) {
        mes_referencia = match[1];
      }
    }

    if (!energia_eletrica_kwh) {
      const match = line.match(/Energia ElétricakWh\s+(\d+)/);
      if (match) {
        energia_eletrica_kwh = match[1];
      }
    }

    if (!energia_eletrica_valor) {
      const match = line.match(/Energia ElétricakWh\s+\d+\s+[\d,]+\s+([\d,]+)/);
      if (match) {
        energia_eletrica_valor = match[1];
      }
    }

    if (!energia_sceee_kwh) {
      const match = line.match(/Energia SCEE s\/ ICMSkWh\s+([\d,.]+)/);
      if (match) {
        energia_sceee_kwh = match[1];
      }
    }

    if (!energia_sceee_valor) {
      const match = line.match(
        /Energia SCEE s\/ ICMSkWh\s+\d+\s+[\d,]+\s+([\d,]+)/
      );
      if (match) {
        energia_sceee_valor = match[1];
      }
    }

    if (!energia_compensada_kwh) {
      const match = line.match(/Energia compensada GD IkWh\s+([\d,.]+)/);
      if (match) {
        energia_compensada_kwh = match[1];
      }
    }

    if (!energia_compensada_valor) {
      const match = line.match(
        /Energia compensada GD IkWh\s+\d+\s+[\d,]+\s+([\d,]+)/
      );
      if (match) {
        energia_compensada_valor = match[1];
      }
    }

    if (!contribu_ilum_publica_valor) {
      const match = line.match(/Contrib Ilum Publica Municipal\s+([\d,]+)/);
      if (match) {
        contribu_ilum_publica_valor = match[1];
      }
    }
  }

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

  if (!energia_sceee_kwh) {
    throw new Error("Energia SCEE (kWh) não encontrada");
  }

  if (!energia_sceee_valor) {
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
    mes_referencia: new Date(mes_referencia),
    energia_eletrica_kwh: parseFloat(energia_eletrica_kwh),
    energia_eletrica_valor: parseFloat(
      energia_eletrica_valor.replace(",", ".")
    ),
    energia_sceee_kwh: parseFloat(energia_sceee_kwh.replace(",", ".")),
    energia_sceee_valor: parseFloat(energia_sceee_valor.replace(",", ".")),
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

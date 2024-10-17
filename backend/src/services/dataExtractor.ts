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

  const numero_cliente = text.match(/Nº DO CLIENTE\s+(\d+)/);

  const mes_referencia = text.match(/Referente a\s+(\w+\/\d+)/);

  const energia_eletrica_kwh = text.match(/Energia Elétrica\s+kWh\s+(\d+)/);

  const energia_eletrica_valor = text.match(
    /Energia Elétrica\s+R\$\s+([\d,]+)/
  );

  const energia_sceee_kwh = text.match(/Energia SCEE s\/ ICMS\s+kWh\s+(\d+)/);

  const energia_sceee_valor = text.match(
    /Energia SCEE s\/ ICMS\s+R\$\s+([\d,]+)/
  );

  const energia_compensada_kwh = text.match(
    /Energia compensada GD I\s+kWh\s+(\d+)/
  );

  const energia_compensada_valor = text.match(
    /Energia compensada GD I\s+R\$\s+([\d,]+)/
  );

  const contribu_ilum_publica_valor = text.match(
    /Contrib Ilum Publica Municipal\s+([\d,]+)/
  );

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
    numero_cliente: numero_cliente[1],
    mes_referencia: new Date(mes_referencia[1]),
    energia_eletrica_kwh: parseFloat(energia_eletrica_kwh[1]),
    energia_eletrica_valor: parseFloat(
      energia_eletrica_valor[1].replace(",", ".")
    ),
    energia_sceee_kwh: parseFloat(energia_sceee_kwh[1]),
    energia_sceee_valor: parseFloat(energia_sceee_valor[1].replace(",", ".")),
    energia_compensada_kwh: parseFloat(energia_compensada_kwh[1]),
    energia_compensada_valor: parseFloat(
      energia_compensada_valor[1].replace(",", ".")
    ),
    contribu_ilum_publica_valor: parseFloat(
      contribu_ilum_publica_valor[1].replace(",", ".")
    ),
  };
}

export async function processPDF(fileBuffer: Buffer): Promise<Fatura> {
  return await extractDataFromPDF(fileBuffer);
}

export interface Fatura {
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

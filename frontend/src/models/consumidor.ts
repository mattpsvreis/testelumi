import Fatura from './fatura';

export default interface Consumidor {
  nome_uc: string;
  numero_cliente: string;
  numero_uc: string;
  distribuidora: string;
  consumidor: string;
  faturas: Fatura[];
}

import { getFaturasByNumeroCliente } from '@services/FaturasService';

import Consumidor from '../models/consumidor';

const faturasJoseMesaly = await getFaturasByNumeroCliente('7204076116');

if (!faturasJoseMesaly) {
  throw new Error('Faturas do cliente 7204076116 não encontradas.');
}

export const consumidorMockJoseMesaly: Consumidor = {
  nome_uc: 'JOSE MESALY FONSECA DE CARVALHO 52024156',
  numero_cliente: '7204076116',
  numero_uc: '3001116735',
  distribuidora: 'CEMIG',
  consumidor: 'JOSE MESALY FONSECA DE CARVALHO 52024156',
  faturas: faturasJoseMesaly,
};

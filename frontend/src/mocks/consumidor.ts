import { getFaturasByNumeroCliente } from '@services/FaturasService';

import Consumidor from '../models/consumidor';

const faturasJoseMesaly = await getFaturasByNumeroCliente('7204076116');

if (!faturasJoseMesaly) {
  throw new Error('Faturas do cliente 7204076116 não encontradas.');
}

const faturasSelfWay = await getFaturasByNumeroCliente('7202210726');

if (!faturasSelfWay) {
  throw new Error('Faturas do cliente 7202210726 não encontradas.');
}

export const consumidorMockJoseMesaly: Consumidor = {
  nome_uc: 'JOSE MESALY FONSECA DE CARVALHO 52024156',
  numero_cliente: '7204076116',
  numero_uc: '3001116735',
  distribuidora: 'CEMIG',
  consumidor: 'JOSE MESALY FONSECA DE CARVALHO 52024156',
  faturas: faturasJoseMesaly,
};

export const consumidorMockSelfway: Consumidor = {
  nome_uc: 'SELFWAY TREINAMENTO PERSONALIZADO LTDA',
  numero_cliente: '7202210726',
  numero_uc: '3001422762',
  distribuidora: 'CEMIG',
  consumidor: 'SELFWAY TREINAMENTO PERSONALIZADO LTDA',
  faturas: faturasSelfWay,
};

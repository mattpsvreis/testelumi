import Consumidor from '../models/consumidor';
import { faturasMock } from './faturas';

export const consumidorMock: Consumidor = {
  nome_uc: 'Consumidor Mock LTDA.',
  numero_uc: '133769420',
  distribuidora: 'Distribuidora Mock',
  consumidor: 'Consumidor Mock',
  faturas: faturasMock,
};

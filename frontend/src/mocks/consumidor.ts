import Consumidor from '../models/consumidor';
import { faturasMock2024 } from './faturas';

export const consumidorMock2024: Consumidor = {
  nome_uc: 'Consumidor Mock LTDA.',
  numero_uc: '133769420',
  distribuidora: 'Distribuidora Mock',
  consumidor: 'Consumidor Mock',
  faturas: faturasMock2024,
};

import React from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { faturasMock2024 } from '../../mocks/faturas';

const Dashboard: React.FC = () => {
  const totals = faturasMock2024.reduce(
    (acc, fatura) => {
      acc.energia_eletrica_kwh += fatura.energia_eletrica_kwh;
      acc.energia_eletrica_valor += fatura.energia_eletrica_valor;
      acc.energia_sceee_kwh += fatura.energia_sceee_kwh;
      acc.energia_sceee_valor += fatura.energia_sceee_valor;
      acc.energia_compensada_kwh += fatura.energia_compensada_kwh;
      acc.energia_compensada_valor += fatura.energia_compensada_valor;
      acc.contribu_ilum_publica_valor += fatura.contribu_ilum_publica_valor;
      return acc;
    },
    {
      energia_eletrica_kwh: 0,
      energia_eletrica_valor: 0,
      energia_sceee_kwh: 0,
      energia_sceee_valor: 0,
      energia_compensada_kwh: 0,
      energia_compensada_valor: 0,
      contribu_ilum_publica_valor: 0,
    }
  );

  const chartData = faturasMock2024.map((fatura) => ({
    mes: fatura.mes_referencia.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    }),
    energia_eletrica_kwh: fatura.energia_eletrica_kwh,
    energia_eletrica_valor: fatura.energia_eletrica_valor,
    energia_sceee_kwh: fatura.energia_sceee_kwh,
    energia_sceee_valor: fatura.energia_sceee_valor,
    energia_compensada_kwh: fatura.energia_compensada_kwh,
    energia_compensada_valor: fatura.energia_compensada_valor,
    contribu_ilum_publica_valor: fatura.contribu_ilum_publica_valor,
  }));

  return (
    <div className='my-8 flex w-full flex-col gap-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='mb-4 text-xl font-semibold'>Energia Elétrica (kWh)</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='mes' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='energia_eletrica_kwh'
                fill='#8884d8'
                name={'Energia Elétrica (kWh)'}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='mb-4 text-xl font-semibold'>
            Energia Elétrica (Valor)
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='mes' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='energia_eletrica_valor'
                fill='#82ca9d'
                name={'Energia Elétrica (R$)'}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2'>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Total Energia Elétrica Consumida (kWh)
          </h2>
          <p>{totals.energia_eletrica_kwh} kWh</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Total Energia Elétrica Consumida (R$)
          </h2>
          <p>R${totals.energia_eletrica_valor.toFixed(2)}</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>Total Energia SCEEE (kWh)</h2>
          <p>{totals.energia_sceee_kwh} kWh</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>Total Energia SCEEE (R$)</h2>
          <p>R${totals.energia_sceee_valor.toFixed(2)}</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Total Energia Compensada (kWh)
          </h2>
          <p>{totals.energia_compensada_kwh} kWh</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Total Energia Compensada (R$)
          </h2>
          <p>-R${(totals.energia_compensada_valor * -1).toFixed(2)}</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Total Contribuição Iluminação Pública (R$)
          </h2>
          <p>R${totals.contribu_ilum_publica_valor.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

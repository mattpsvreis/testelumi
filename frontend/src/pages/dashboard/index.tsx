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

import Select from '@components/data-input/select';

import {
  consumidorMockJoseMesaly,
  consumidorMockSelfway,
} from '@mocks/consumidor';

import { useDashboardStore } from '@stores/DashboardStore';

const Dashboard: React.FC = () => {
  const consumidores = [consumidorMockJoseMesaly, consumidorMockSelfway];
  const {
    selectedConsumer,
    selectedYear,
    setSelectedConsumer,
    setSelectedYear,
  } = useDashboardStore();

  const filteredData =
    consumidores
      .find((c) => c.nome_uc === selectedConsumer)
      ?.faturas.filter(
        (fatura) =>
          new Date(fatura.mes_referencia).getFullYear().toString() ===
          selectedYear
      ) || [];

  const totals = filteredData.reduce(
    (acc, fatura) => {
      acc.consumo_energia_eletrica_kwh +=
        fatura.energia_eletrica_kwh + fatura.energia_sceee_kwh;
      acc.energia_compensada_kwh += fatura.energia_compensada_kwh;
      acc.valor_total_sem_gd +=
        fatura.energia_eletrica_valor +
        fatura.energia_sceee_valor +
        fatura.contribu_ilum_publica_valor;
      acc.economia_gd += fatura.energia_compensada_valor * -1;
      return acc;
    },
    {
      consumo_energia_eletrica_kwh: 0,
      energia_compensada_kwh: 0,
      valor_total_sem_gd: 0,
      economia_gd: 0,
    }
  );

  const chartData = filteredData.map((fatura) => ({
    mes: new Date(fatura.mes_referencia).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    }),
    consumo_energia_eletrica_kwh:
      fatura.energia_eletrica_kwh + fatura.energia_sceee_kwh,
    energia_compensada_kwh: fatura.energia_compensada_kwh,
    valor_total_sem_gd:
      fatura.energia_eletrica_valor +
      fatura.energia_sceee_valor +
      fatura.contribu_ilum_publica_valor,
    economia_gd: fatura.energia_compensada_valor * -1,
  }));

  return (
    <div className='my-8 flex w-full flex-col gap-8'>
      <div className='flex gap-4'>
        <Select
          value={selectedConsumer}
          placeholder='Filtrar por Consumidor'
          onChange={setSelectedConsumer}
          options={consumidores.map((consumidor) => consumidor.nome_uc)}
        />
        <Select
          value={selectedYear}
          placeholder='Filtrar por Ano'
          onChange={setSelectedYear}
          options={[
            ...new Set(
              consumidores.flatMap((c) =>
                c.faturas.map((f) =>
                  new Date(f.mes_referencia).getFullYear().toString()
                )
              )
            ),
          ]}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='mb-4 text-xl font-semibold'>
            Resultados de Energia (kWh)
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='mes' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='consumo_energia_eletrica_kwh'
                fill='#12b5e7'
                name={'Consumo de Energia Elétrica (kWh)'}
              />
              <Bar
                dataKey='energia_compensada_kwh'
                fill='#ff7300'
                name={'Energia Compensada (kWh)'}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='mb-4 text-xl font-semibold'>
            Resultados Financeiros (R$)
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='mes' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='valor_total_sem_gd'
                fill='#00d9ad'
                name={'Valor Total sem Economia GD (R$)'}
              />
              <Bar
                dataKey='economia_gd'
                fill='#ff7300'
                name={'Economia GD (R$)'}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2'>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Consumo de Energia Elétrica no Ano de {selectedYear} (kWh)
          </h2>
          <p>{totals.consumo_energia_eletrica_kwh} kWh</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Energia Compensada no Ano de {selectedYear} (kWh)
          </h2>
          <p>{totals.energia_compensada_kwh} kWh</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Valor Total sem GD no Ano de {selectedYear} (R$)
          </h2>
          <p>R${totals.valor_total_sem_gd.toFixed(2)}</p>
        </div>
        <div className='rounded bg-light-foreground/40 p-4 shadow-lg dark:bg-dark-foreground'>
          <h2 className='text-xl font-semibold'>
            Economia GD no Ano de {selectedYear} (R$)
          </h2>
          <p>R${totals.economia_gd.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

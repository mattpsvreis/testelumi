import { FilePdf } from 'phosphor-react';

import ToolTip from '@components/data-display/tooltip';

import Consumidor from '../../../../models/consumidor';
import Fatura from '../../../../models/fatura';

interface TableProps {
  data: Consumidor[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  function handleDownloadFatura(fatura: Fatura) {
    const url = fatura.downloadLink;
    window.open(url, '_blank');
  }

  return (
    <table className='flex w-full flex-col items-center text-light-text shadow-xl dark:text-dark-text'>
      <thead className='border-1 w-full rounded-t border border-dark-background/50 bg-light-primary px-4 text-lg dark:border-light-background dark:bg-dark-secondary'>
        <tr className='flex w-full flex-row'>
          <th className='flex w-[15%] justify-center p-4 font-semibold'>
            Nome da UC
          </th>
          <th className='flex w-[15%] justify-center p-4 font-semibold'>
            Número da UC
          </th>
          <th className='flex w-[15%] justify-center p-4 font-semibold'>
            Distribuidora
          </th>
          <th className='flex w-[15%] justify-center p-4 font-semibold'>
            Consumidor
          </th>
          {months.map((month) => (
            <th key={month} className='w-[3.3333%] p-4 font-semibold'>
              {month}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='border-1 w-full border border-t-0 border-dark-background/50 bg-light-foreground/40 px-4 text-sm dark:border-light-background dark:bg-dark-foreground'>
        {data.map((consumidor, key) => (
          <tr key={key} className='flex w-full flex-row'>
            <td className='flex w-[15%] justify-center p-4'>
              {consumidor.nome_uc}
            </td>
            <td className='flex w-[15%] justify-center p-4'>
              {consumidor.numero_uc}
            </td>
            <td className='flex w-[15%] justify-center p-4'>
              {consumidor.distribuidora}
            </td>
            <td className='flex w-[15%] justify-center p-4'>
              {consumidor.consumidor}
            </td>
            {consumidor.faturas.map((fatura, key) => (
              <td key={key} className='flex w-[3.33333334%] justify-center p-4'>
                <button
                  type='button'
                  onClick={() => handleDownloadFatura(fatura)}
                >
                  <FilePdf
                    id='download-button'
                    size={18}
                    className='no-outline-border text-light-text outline-none dark:text-dark-text'
                  />
                  <ToolTip anchorSelect='#download-button' placement='bottom'>
                    Baixar Fatura
                  </ToolTip>
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

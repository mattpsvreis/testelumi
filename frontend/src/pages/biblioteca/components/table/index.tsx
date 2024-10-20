import { FilePdf, Plus, Upload } from 'phosphor-react';

import ToolTip from '@components/data-display/tooltip';
import Input from '@components/data-input/input';
import Select from '@components/data-input/select';
import Button from '@components/interactive/button';
import Modal from '@components/interactive/modal';

import Consumidor from '@models/consumidor';
import Fatura from '@models/fatura';

import { uploadFaturaPDF } from '@services/FaturasService';

import useBibliotecaStore from '@stores/BibliotecaStore';

interface TableProps {
  data: Consumidor[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const {
    consumidor,
    distribuidora,
    numeroUc,
    isModalOpen,
    pdfFile,
    setConsumidor,
    setDistribuidora,
    setNumeroUc,
    setIsModalOpen,
    setPdfFile,
  } = useBibliotecaStore();

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
    const url = fatura.fileUrl;
    window.open(url, '_blank');
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setPdfFile(selectedFile);
    } else {
      alert('Escolha um arquivo PDF.');
    }
  }

  function handleUpload() {
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile);

      const fatura = uploadFaturaPDF(formData);

      console.log('fatura:', fatura);
    }
  }

  const filteredData = data.filter(
    (consumidor) =>
      consumidor.consumidor
        .toLowerCase()
        .includes(consumidor.consumidor.toLowerCase()) &&
      consumidor.distribuidora
        .toLowerCase()
        .includes(distribuidora.toLowerCase()) &&
      consumidor.numero_uc.toLowerCase().includes(numeroUc.toLowerCase())
  );

  const uniqueConsumidor = Array.from(
    new Set(data.map((consumidor) => consumidor.consumidor))
  );
  const uniqueDistribuidora = Array.from(
    new Set(data.map((consumidor) => consumidor.distribuidora))
  );

  return (
    <div className='w-full'>
      <Modal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        title='Fazer Upload de Fatura'
      >
        <div className='flex flex-col items-center gap-4'>
          <div className='flex flex-row gap-4'>
            <input
              type='file'
              accept='application/pdf'
              onChange={handleFileChange}
              id='file-input'
              className='hidden'
            />
            <label
              id='file-label'
              htmlFor='file-input'
              className='cursor-pointer rounded border border-dark-background/50 bg-light-secondary p-2 font-medium shadow-lg dark:border-light-background dark:bg-dark-secondary'
            >
              <FilePdf
                size={24}
                className='text-light-text dark:text-dark-text'
              />
              <ToolTip anchorSelect='#file-label' placement='bottom'>
                Escolher Arquivo
              </ToolTip>
            </label>
            <Button
              id='send-button'
              disabled={!Boolean(pdfFile)}
              onClick={handleUpload}
            >
              <Upload
                size={24}
                className={`${Boolean(pdfFile) ? 'text-light-text dark:text-dark-text' : 'text-light-placeholder dark:text-dark-placeholder'}`}
              />
              <ToolTip anchorSelect='#send-button' placement='bottom'>
                Enviar Fatura
              </ToolTip>
            </Button>
          </div>
          {pdfFile && (
            <p className='text-light-text dark:text-dark-text'>
              <span className='font-medium'>Arquivo selecionado:</span>{' '}
              {pdfFile.name}
            </p>
          )}
        </div>
      </Modal>
      <div className='mb-4 flex w-full flex-row items-center justify-between'>
        <div className='flex flex-row gap-4'>
          <Select
            value={distribuidora}
            onChange={setDistribuidora}
            options={uniqueDistribuidora}
            placeholder='Filtrar por Distribuidora'
          />
          <Select
            value={consumidor}
            onChange={setConsumidor}
            options={uniqueConsumidor}
            placeholder='Filtrar por Consumidor'
          />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Button
            id='modal-button'
            type='button'
            onClick={() => setIsModalOpen(true)}
            className='rounded border border-dark-background/50 bg-light-primary p-2 shadow-lg dark:border-light-background'
          >
            <Plus size={24} className='text-light-text dark:text-dark-text' />
            <ToolTip anchorSelect='#modal-button' placement='bottom'>
              Fazer Upload de Fatura
            </ToolTip>
          </Button>
          <Input
            type='text'
            value={numeroUc}
            onChange={setNumeroUc}
            placeholder='Filtrar por Número da UC'
          />
        </div>
      </div>
      <table className='flex w-full flex-col items-center text-light-text shadow-xl dark:text-dark-text'>
        <thead className='border-1 w-full rounded-t border border-dark-background/50 bg-light-primary px-4 text-lg dark:border-light-background dark:bg-dark-primary'>
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
          {filteredData.map((consumidor, key) => (
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
                <td
                  key={key}
                  className='flex w-[3.33333334%] justify-center p-4'
                >
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
    </div>
  );
};

export default Table;

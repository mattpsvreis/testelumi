import React from 'react';

import { X } from 'phosphor-react';

interface ModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[600px] rounded bg-light-background shadow-lg dark:bg-dark-background'>
        <div className='flex flex-row items-center justify-between px-8 py-4'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button
            onClick={() => setOpen(false)}
            className='text-light-text dark:text-dark-text'
          >
            <X size={24} />
          </button>
        </div>
        <hr className='h-[1px] border-none bg-dark-background dark:bg-light-background' />
        <div className='p-8'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

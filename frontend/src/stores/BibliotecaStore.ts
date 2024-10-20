import { create } from 'zustand';

interface BibliotecaState {
  consumidor: string;
  distribuidora: string;
  numeroUc: string;
  isModalOpen: boolean;
  pdfFile?: File;
  setConsumidor: (consumidor: string) => void;
  setDistribuidora: (distribuidora: string) => void;
  setNumeroUc: (numeroUc: string) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setPdfFile: (pdfFile: File) => void;
}

const useBibliotecaStore = create<BibliotecaState>((set) => ({
  consumidor: '',
  distribuidora: '',
  numeroUc: '',
  isModalOpen: false,
  pdfFile: undefined,
  setConsumidor: (consumidor) => set({ consumidor: consumidor }),
  setDistribuidora: (distribuidora) => set({ distribuidora: distribuidora }),
  setNumeroUc: (numeroUc) => set({ numeroUc: numeroUc }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen: isModalOpen }),
  setPdfFile: (pdfFile) => set({ pdfFile: pdfFile }),
}));

export default useBibliotecaStore;

import { create } from 'zustand';

interface BibliotecaState {
  consumidor: string;
  distribuidora: string;
  numeroUc: string;
  setConsumidor: (consumidor: string) => void;
  setDistribuidora: (distribuidora: string) => void;
  setNumeroUc: (numeroUc: string) => void;
}

const useBibliotecaStore = create<BibliotecaState>((set) => ({
  consumidor: '',
  distribuidora: '',
  numeroUc: '',
  setConsumidor: (consumidor) => set({ consumidor: consumidor }),
  setDistribuidora: (distribuidora) => set({ distribuidora: distribuidora }),
  setNumeroUc: (numeroUc) => set({ numeroUc: numeroUc }),
}));

export default useBibliotecaStore;

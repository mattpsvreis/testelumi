import { create } from 'zustand';

interface BibliotecaState {
  consumidor: string;
  distribuidora: string;
  setConsumidor: (consumidor: string) => void;
  setDistribuidora: (distribuidora: string) => void;
}

const useBibliotecaStore = create<BibliotecaState>((set) => ({
  consumidor: '',
  distribuidora: '',
  setConsumidor: (consumidor) => set({ consumidor: consumidor }),
  setDistribuidora: (distribuidora) => set({ distribuidora: distribuidora }),
}));

export default useBibliotecaStore;

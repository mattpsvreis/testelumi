import { create } from 'zustand';

interface DashboardState {
  selectedConsumer: string;
  selectedYear: string;
  setSelectedConsumer: (consumer: string) => void;
  setSelectedYear: (year: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedConsumer: '',
  selectedYear: new Date().getFullYear().toString(),
  setSelectedConsumer: (consumer) => set({ selectedConsumer: consumer }),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));

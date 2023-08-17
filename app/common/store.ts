import { create } from 'zustand'

export interface DateState {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void
}

export const useDateStore = create<DateState>()((set) => ({
  startDate: undefined,
  setStartDate: (date) => set(() => ({ startDate: date })),
}))

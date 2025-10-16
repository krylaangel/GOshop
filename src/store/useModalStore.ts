import { create } from 'zustand'

type ModalType = 'basket' | 'order' | 'auth' | 'order-success' | null

interface ModalState {
  current: ModalType
  open: (modal: ModalType) => void
  close: () => void
}

export const useModalStore = create<ModalState>(set => ({
  current: null,
  open: modal => set({ current: modal }),
  close: () => set({ current: null }),
}))


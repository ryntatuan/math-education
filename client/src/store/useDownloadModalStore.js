import { create } from 'zustand'

export const useDownloadModalStore = create((set) => ({
  isOpen: false,
  openDownloadModal: () => set({ isOpen: true }),
  closeDownloadModal: () => set({ isOpen: false }),
  setOpen: (isOpen) => set({ isOpen }),
}))

export default useDownloadModalStore

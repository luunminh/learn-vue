import { reactive } from 'vue'
import { defineStore } from 'pinia'

type ModalState = {
  [key: string]: boolean
}

export const useModalStore = defineStore('modal', () => {
  const modalState = reactive<ModalState>({})

  const toggleModal = (key: string) => {
    modalState[key] = !modalState[key] || false
  }

  const openModal = (key: string) => {
    modalState[key] = true
  }

  const closeModal = (key: string) => {
    modalState[key] = false
  }

  const getModalState = (key: string): boolean => {
    return modalState[key] ?? false
  }

  return { modalState, toggleModal, openModal, closeModal, getModalState }
})

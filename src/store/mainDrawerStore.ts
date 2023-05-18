import { create } from 'zustand';


interface mainDrawerStoreInterface {
    isOpen: boolean,

    close: () => void,
    open: () => void
};

export const mainDrawerStore = create<mainDrawerStoreInterface>((set, get) => ({
    isOpen: false,

    close: () =>{
        set((state) => ({ ...state, isOpen: false }));
    },
    open: () =>{
        set((state) => ({ ...state, isOpen: true }));
    }
}));
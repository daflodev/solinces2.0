import { create } from 'zustand';

interface optionTableSelectedStoreInterface {
    optionSelectedName: string,
    setName: (newOptionSelectedName: string) => void
};

// @ts-ignore
export const optionTableSelectedStore = create<optionTableSelectedStoreInterface>((set, get) => ({
    optionSelectedName: '',

    setName: (newOptionSelectedName) =>{
        set((state) => ({ ...state, optionSelectedName: newOptionSelectedName }));
    }
}));
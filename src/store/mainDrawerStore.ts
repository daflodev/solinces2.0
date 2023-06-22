import { create } from 'zustand';

interface setRenderContentProp {
    contentName: 'userSettings',
    newWithDrawer?: number,
}

interface mainDrawerStoreInterface {
    isOpen: boolean,
    renderContent: string | null,
    withDrawer: number,

    close: () => void,
    open: () => void,
    setRenderContent: (newRenderContent: setRenderContentProp) => void
};
// @ts-ignore
export const mainDrawerStore = create<mainDrawerStoreInterface>((set, get) => ({
    isOpen: false,
    renderContent: null,
    withDrawer: 33,

    close: () => {
        set((state) => ({ ...state, isOpen: false }));
    },
    open: () => {
        set((state) => ({ ...state, isOpen: true }));
    },

    setRenderContent: (newRenderContent) => {

        const { contentName,  newWithDrawer} = newRenderContent;

        set((state) => ({ ...state, renderContent: contentName }));

        if(newWithDrawer && (newWithDrawer > 1 || newWithDrawer <= 100)){
            set((state) => ({ ...state, withDrawer: newWithDrawer }));
        }else{
            set((state) => ({ ...state, withDrawer: 33 }));

            console.warn("withDrawer value is invalid")
        }
    }

}));
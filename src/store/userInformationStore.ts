import { create } from 'zustand';

interface CompositeInformation {
    label: string,
    value: string
}

interface UpdateValueObject {
    element: "currentRol" | "currentCampus" | "currentInstitution" | "currentAcademicPeriod" | "currentAcademicYear",
    value: string | CompositeInformation
}

interface SessionInformationInterface {
    currentRol: string | null,
    currentCampus: CompositeInformation | null,
    currentInstitution: CompositeInformation | null,
    currentAcademicPeriod: string | null,
    currentAcademicYear: string | null,
    currentRoles: string[],

    updateValue: (newValue: UpdateValueObject | UpdateValueObject[]) => void;
    addToArray: (element: string) => void; 
    clearArray: () => void;
};

export const sessionInformationStore = create<SessionInformationInterface>((set, get) => ({
    currentRol: null,
    currentCampus: null,
    currentInstitution: null,
    currentAcademicPeriod: null,
    currentAcademicYear: null,
    currentRoles: [],

    updateValue: (newValue: UpdateValueObject | UpdateValueObject[]) =>{

        if(Array.isArray(newValue)){

            let preValue = { };

            newValue.map((item) => {

                const { element, value } = item;

                preValue = { ...preValue, [element]: value}
            });

            set((state) => ({ ...state, ...preValue}));

        }else{

            const { element, value } = newValue;

            set((state) => ({ ...state, [element]: value}));
        }
    },

    addToArray: (element: string) => {
        set((state) => ({ currentRoles: [...state.currentRoles, element] }));
    },

    clearArray: () => {
        set({ currentRoles: [] });
    },
    

}));
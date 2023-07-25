import { create } from 'zustand';

interface UpdateValueObject {
    element: "currentAsignature" | "currentGrade" | "currentGroup" | "currentEvaluationPeriod",
    // @ts-ignore
    value: string | number
}


interface CalificationInterface {
    currentAsignature: string | number |null,
    currentGrade: string | number |null,
    currentGroup: string | number |null,
    currentEvaluationPeriod: string | number |null,
    updateValueCalification: (newValue: UpdateValueObject ) => void;
};


export const calificationStore = create<CalificationInterface>((set) => ({
    currentAsignature: null,
    currentGrade: null,
    currentGroup: null,
    currentEvaluationPeriod: null,
    
    updateValueCalification: (newValue: UpdateValueObject) =>{
        const { element, value } = newValue
        set((state) => ({ ...state, [element]: value}));
    },
   

}));
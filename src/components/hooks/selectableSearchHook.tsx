import { useState } from "react";

export const SelectableSearchHook = () =>{

    // Estado que maneja la visibilidad de los filtro de cabecera
    const [mostrarInput, setMostrarInput] = useState(null);

    // Funcion que activa el input para filtros
    const handleMostrarInput = () => {
        setMostrarInput(true);
    };

    // Funcion que desactiva el input para filtros
    const handleOcultarInput = () => {
        setMostrarInput(null);
    };

    return {
        mostrarInput,
        setMostrarInput,
        handleMostrarInput,
        handleOcultarInput
    }

}
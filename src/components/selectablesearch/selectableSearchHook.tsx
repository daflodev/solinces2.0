import { useState } from "react";

export const SelectableSearchHook = () =>{

    // Estado que maneja la visibilidad de los filtro de cabecera
    const [mostrarInput, setMostrarInput] = useState(false);

    // Funcion que activa el input para filtros
    const handleMostrarInput = () => {
        setMostrarInput(true);
    };

    // Funcion que desactiva el input para filtros
    const handleOcultarInput = () => {
        setMostrarInput(false);
    };

    return {
        mostrarInput,
        setMostrarInput,
        handleMostrarInput,
        handleOcultarInput
    }

}
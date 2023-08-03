import { TransferDirection } from 'antd/es/transfer';
import { useEffect, useState } from 'react';

interface RecordType {
    key: string;
    title: string;
    description: string;
    chosen: boolean;
}

interface TransferData {
    dataSource: RecordType[];
    targetKeys: string[];
    handleChange: (newTargetKeys: string[], direction: TransferDirection) => void;
}

const useTransferData = (): TransferData => {
    const [mockData, setMockData] = useState<RecordType[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    useEffect(() => {
        // Aquí la lógica para obtener los datos (misma lógica que tenías en App.tsx)

        // Ejemplo de datos de las asignaturas disponibles
        const availableSubjects: RecordType[] = [
            {
                key: '1',
                title: 'Asignatura 1',
                description: 'Descripción de la asignatura 1',
                chosen: false,
            },
            {
                key: '2',
                title: 'Asignatura 2',
                description: 'Descripción de la asignatura 2',
                chosen: false,
            },
            // Agrega más asignaturas disponibles si es necesario
        ];

        // Ejemplo de datos de las asignaturas matriculadas
        const enrolledSubjects: RecordType[] = [
            {
                key: '3',
                title: 'Asignatura 3',
                description: 'Descripción de la asignatura 3',
                chosen: true,
            },
            {
                key: '4',
                title: 'Asignatura 4',
                description: 'Descripción de la asignatura 4',
                chosen: true,
            },
            // Agrega más asignaturas matriculadas si es necesario
        ];

        setMockData([...availableSubjects, ...enrolledSubjects]);
        setTargetKeys(enrolledSubjects.map((subject) => subject.key));
    }, []);


    const handleChange = (newTargetKeys: string[], direction: TransferDirection) => {
        setTargetKeys(newTargetKeys);

        // Actualizar el estado chosen en función de la dirección
        if (direction === 'right') {
            const updatedData = mockData.map((subject) =>
                newTargetKeys.includes(subject.key) ? { ...subject, chosen: true } : subject
            );
            setMockData(updatedData);
        } else {
            const updatedData = mockData.map((subject) =>
                newTargetKeys.includes(subject.key) ? { ...subject, chosen: false } : subject
            );
            setMockData(updatedData);
        }

        // Mostrar la data transferida en la consola
        if (direction === 'right') {
            //const dataToRight = mockData.filter((subject) => newTargetKeys.includes(subject.key));
            // console.log('Data Transferida hacia la derecha:', dataToRight);
        } else {
            //const dataToLeft = mockData.filter((subject) => !newTargetKeys.includes(subject.key));
            //console.log('Data Transferida hacia la izquierda:', dataToLeft);
        }
    };

    return { dataSource: mockData, targetKeys, handleChange };
};

export default useTransferData;
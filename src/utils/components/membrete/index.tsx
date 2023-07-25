import { Col, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { sessionInformationStore } from "../../../store/userInformationStore";
import { saveIcon } from "../../assets/icon/iconManager";
import { QueryBuilders } from "../../orm/queryBuilders";
import { ApiServicesMembrete } from "../../services/api/services";
import "./styles.css";



const MembreteComponent = () => {

    const [fileList, setFileList] = useState(null);
    const [descripcion, setDescripcion] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { currentCampus } = sessionInformationStore(
        (state) => ({
            currentCampus: state.currentCampus
        }),
        shallow
    );
    
    const handleButtonClick = () => {
        if (fileInputRef.current) {
        fileInputRef.current.click();
        }
    };
    
    const onChange = (event: any) => {
        const urlImage = URL.createObjectURL(event.target.files[0])
        setImageUrl(urlImage)
        setFileList(event.target.files[0]);
        
    };

    const textDescription = (event: any) => {
        setDescripcion(event.target.value)
    }

    const saveData = async () => {

        const data: object = {
            file: fileList,
            descripcion: descripcion,
            idsede: currentCampus?.value,
            etiqueta: 'membrete'
        }

        message.loading('cargando...')

        await ApiServicesMembrete(data)
            .then((response) => {
                message.destroy()
                message.success('enviado')
                setImageUrl(response.data.data.URLS3)
            })
            .catch(() => {
                message.success('error')
            });
  
    }

    // 

    const divRef = useRef<HTMLDivElement>(null);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
  
      // Agregar una clase para resaltar visualmente el div cuando se arrastra un elemento sobre él
      if (divRef.current) {
        divRef.current.classList.add('drag-over');
      }
    };
  
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
  
      // Remover la clase de resaltado cuando el elemento arrastrado sale del div
      if (divRef.current) {
        divRef.current.classList.remove('drag-over');
      }
    };
  
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
  
      // Indicar que el elemento se puede soltar aquí
      event.dataTransfer.dropEffect = 'copy';
    };
  
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
  
      // Remover la clase de resaltado cuando se suelta el elemento en el div
      if (divRef.current) {
        divRef.current.classList.remove('drag-over');
      }
  
      // Acceder al archivo arrastrado
      const file: any = event.dataTransfer.files[0];
      const urlImage = URL.createObjectURL(file)
      setImageUrl(urlImage)
      setFileList(file);
    };

    const getData = async () => {
        const query = new QueryBuilders('archivo');
        const results: any = await query
        .select('*')
        .where('"FK_TSEDE"', '=', currentCampus?.value)
        .join('configuracion_membrete', '"FK_TARCHIVO"', 'archivo."PK_TARCHIVO"')
        .schema('ACADEMICO_COL0')
        .get()
        if(results.length > 0){
            setImageUrl(results[0].URLS3)
            setDescripcion(results[0].TEXTO)
        }
    }

    useEffect(() => {
          // select
          getData()
    },[])
        
    return(
        <div>
            <Row>
                <Col style={{ marginTop: '10px' }} xs={24} md={6} lg={6} xl={6}>
                    <b>TCONFIGURACION_MEMBRETE</b>
                </Col>
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col span={12}>
                    <button onClick={() => saveData()} style={{ background: 'none', border: 'none', padding: '0', margin: '0' }}>
                          {saveIcon}
                    </button>
                </Col>
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col  span={6}>
                <input style={{ display: 'none' }} ref={fileInputRef} type="file" onChange={onChange} />
            { imageUrl  ? 
                <div
                onClick={handleButtonClick} 
                style={{ width:'250px', height:'250px', background: '#fff', cursor: 'pointer', borderRadius: '7px', border: '1px dashed #ccc', padding: '10px' }}
                >
                 <img style={{ width:'100%', height:'100%' }} src={imageUrl} />
             </div>
            :
            <div
                ref={divRef}
                className="drag-drop-div"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleButtonClick} 
                style={{ width:'250px', height:'250px', background: '#fff', cursor: 'pointer', borderRadius: '7px', border: '1px dashed #ccc', textAlign: 'center', paddingTop: '30%' }}
                >
                <b> Arrastra y suelta o haz click aqui</b>
            </div>
                
            }
                
                </Col>
                <Col span={7}>
                    <TextArea
                    value={descripcion}
                    onChange={textDescription}
                    placeholder="Detalles del membrete" rows={11} />
                </Col>
            </Row>
        </div>
    )
}

export default MembreteComponent;
import { Button, Col, Input, Row, Table, message } from "antd";
import { CloudUploadOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { calificationStore } from "@/store/calificationStore.ts";
import {shallow} from "zustand/shallow";
import { QueryBuilders } from "@/services/orm/queryBuilders.ts";
import { sessionInformationStore } from "@/store/userInformationStore.ts";
import { ApiServicesMembrete } from "@/services/api/services.ts";
import { deleteIcon, linkIcon, pdfIcon, uploadIcon } from "@/assets/icon/iconManager.tsx";

export const RecursosCompartidos = () => {

  const currentDate = new Date();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [input, setInput] = useState(true);


   // @ts-ignore
   const { currentAsignature,currentGrade,currentGroup, currentEvaluationPeriod } =
   calificationStore(
       (state) => ({
       currentAsignature: state.currentAsignature,
       currentGrade: state.currentGrade,
       currentGroup: state.currentGroup,
       currentEvaluationPeriod: state.currentEvaluationPeriod,
       }),
       shallow
   );

   const { currentCampus } = sessionInformationStore(
    (state) => ({
        currentCampus: state.currentCampus
    }),
    shallow
);

  const [data, setData] = useState<any[]>([])  
  let inputUrl: any
  let inputDescripcion = ''
      
  const columns = [
    {
      title: 'Nombre de recurso',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Fecha de publicacion',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const onChangeUrl = (e: any) => {
    inputUrl = e.target.value;
  }

  const onChangeDescription = (e: any) => {
    inputDescripcion = e.target.value;
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
    fileInputRef.current.click();
    }
  };

  const onChange = (event: any) => {
    console.log(event.target.files[0], 'archivo')
    inputUrl = event.target.files[0]
  };

  const saveData = async () => {

    const data: object = {
        file: inputUrl,
        descripcion: inputDescripcion,
        idsede: currentCampus?.value,
        etiqueta: 'recurso'
    }

    message.loading('cargando...')

    await ApiServicesMembrete(data)
        .then((response) => {
            saveArchive(response.data.response.nombre,'', response.data.response.id)
        })
        .catch(() => {
            message.success('error')
        });
  }

  const saveArchive = (name: string, url: any, id?: any) => {
    const querycolumn = new QueryBuilders('recurso_compartido');
    if(id){
      querycolumn
      .create({
        'fk_tasignatura': 3007,
        'fk_tgrupo': 3486,
        'fecha_creacion': formatearFecha(currentDate),
        'fecha_publicacion': formatearFecha(currentDate),
        'nombre': name,
        'descripcion': inputDescripcion,
        'fk_tarchivo': id
      })
      .schema('ACADEMICO_COL0')
      .save()
      getData()

    }else{
      querycolumn
      .create({
        'fk_tasignatura': 3007,
        'fk_tgrupo': 3486,
        'fecha_creacion': formatearFecha(currentDate),
        'fecha_publicacion': formatearFecha(currentDate),
        'nombre': name,
        'descripcion': inputDescripcion,
        'url_recurso_externo': url,
      })
      .schema('ACADEMICO_COL0')
      .save()
      getData()
    }
  }

  const formatearFecha = (fecha: Date): string =>{
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const getData = async () => {
    const querycolumn = new QueryBuilders('recurso_compartido');
    const getdata: any = await querycolumn
                    .select(['"PK_TRECURSO_COMPARTIDO" AS id' ,
                            '"NOMBRE" AS name',
                            '"DESCRIPCION" as description',
                            'CASE WHEN "URL_RECURSO_EXTERNO" IS NOT NULL THEN "URL_RECURSO_EXTERNO" ELSE (SELECT "URLS3" FROM "ACADEMICO_COL0"."TARCHIVO" WHERE "PK_TARCHIVO" = "FK_TARCHIVO") END AS url',
                            '"FECHA_CREACION" AS date'])
                    .schema('ACADEMICO_COL0')
                    .orderBy("id", "desc")
                    .get()
    const parseData = transformJsonArray(getdata)
    setData(parseData)
  }

  const createUrl = async () => {
    saveArchive(inputUrl, inputUrl)
  }

  const obtenerExtension = (url: any) => {
    if(!url){
      return 'url'
    }
    const partes = url.split('.');
    if (partes.length > 1) {
      console.log(partes[partes.length - 1])
      return partes[partes.length - 1];
    } else {
      return 'url';
    }
  }

  const select_type = (params: any) => {
    const type: any = {
      pdf: pdfIcon,
      url: linkIcon,
      defauld: linkIcon,
    };

    let extencion = obtenerExtension(params)
    let validate: any = type[extencion] ?? type["defauld"];
    return validate;
  };

  const  transformJsonArray = (inputArray) => {
  
    const transformedArray = inputArray.map((item) => {
      const currentDate = new Date(item.date);
      // 
      return {
        name: (
          <div style={{ display: 'flex' }}>
            <div style={{ width: '20px', marginRight: '15px' }}> {select_type(item.url)} </div> 
            <div>  {item.name} </div>
            {/* <Col span={20}>  {input ? <span style={{ marginLeft:'10px' }}>{...item.name} </span> : <Input {...item.name} />} </Col> */}
          </div>
        ),
        description: (
          <>
            <Input onChange={onChangeDescription} onPressEnter={createUrl} defaultValue={item.description} bordered={false} />
          </>
        ),
        date: currentDate.toLocaleDateString(),
      };
    });
  
    return transformedArray;
  }

  const addColum = () =>{

    const column : any = {
      name: (
        <Row justify="start">
         <Col span={3}> <div > {linkIcon} </div> </Col> 
         <Col span={18}> <Input onChange={onChangeUrl} placeholder="Ingresar URL" /> </Col> 
        </Row>
      ),
      description: (
        <>
          <Input onChange={onChangeDescription} onPressEnter={createUrl} placeholder="Descripcion" />
        </>
      ),
      date: currentDate.toLocaleDateString(),
    }
    setData([column, ...data]);
  }

  const addColumUpload = () =>{

    const column : any = {
      name: (
        <Row justify="center">
          <input style={{ display: 'none' }} ref={fileInputRef} type="file" onChange={onChange} />
          <Button onClick={handleButtonClick} type="primary" shape="round" icon={<CloudUploadOutlined />} size={'large'}/> 
        </Row>
      ),
      description: (
          <Input onChange={onChangeDescription} onPressEnter={saveData} placeholder="Descripcion" />
      ),
      date: (
        <Row >
          <Col className="gutter-row" span={12}>
              {currentDate.toLocaleDateString()}
          </Col>
          <Col className="gutter-row" span={4}>
          <span>{deleteIcon}</span>
          </Col>
                   
        </Row>
        ),
    }
    setData([column, ...data]);
  }
  

  useEffect(() => {
    getData()
  }, [])
      
    return (
        <div className='activity_container'>
        <span className='activity_container_title'>
            trecurso_compartido
        </span>
        <br/>
        {/* {currentAsignature} - {currentGrade} - {currentGroup} - {currentEvaluationPeriod} */}
        <br/>
        <Row gutter={2}>
          <Col span={1}>
            <div onClick={addColumUpload} style={{ cursor:'pointer', width: '20px' }} >{uploadIcon}</div>
          </Col>
          <Col span={1}>
            <div onClick={addColum} style={{ cursor:'pointer', width: '20px' }} >{linkIcon}</div> 
          </Col>
        </Row>
        <Table 
          dataSource={data}
          columns={columns}
          pagination={false}
         />
    </div>
    )
}
// 
import { Col, Input, Row, Table } from "antd";
import { LinkOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { calificationStore } from "@/store/calificationStore";
import {shallow} from "zustand/shallow";
import { QueryBuilders } from "@/utils/orm/queryBuilders";

export const RecursosCompartidos = () => {

  const currentDate = new Date();

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

  const [data, setData] = useState<any[]>([])  
  let inputUrl = ''
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

  const convertirFecha = (fechaHoraISO: string): string => {
    const fecha = new Date(fechaHoraISO);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    return fechaFormateada;
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
                    .select(['"PK_TRECURSO_COMPARTIDO" AS id' ,'"NOMBRE" AS name','"DESCRIPCION" as description','"URL_RECURSO_EXTERNO" AS url', '"FECHA_CREACION" AS date'])
                    .schema('ACADEMICO_COL0')
                    .orderBy("id", "desc")
                    .save()
    setData(getdata)
  }

  const createUrl = async () => {
    const querycolumn = new QueryBuilders('recurso_compartido');
    await querycolumn
                    .create({
                      'fk_tasignatura': 3007,
                      'fk_tgrupo': 3486,
                      'fecha_creacion': formatearFecha(currentDate),
                      'fecha_publicacion': formatearFecha(currentDate),
                      'nombre': inputUrl.replace('http://','').replace('https://',''),
                      'descripcion': inputDescripcion,
                      'url_recurso_externo': inputUrl
                    })
                    .schema('ACADEMICO_COL0')
                    .save()
    getData()
  }

  const addColum = () =>{

    const column = {
      name: (
        <Row justify="start">
         <Col span={3}> <LinkOutlined style={{ marginTop: '10px' }} /> </Col> 
         <Col span={20}> <Input onChange={onChangeUrl} placeholder="Ingresar URL" /> </Col> 
        </Row>
      ),
      description: (
        <>
          <Input onChange={onChangeDescription} onPressEnter={createUrl} placeholder="Descripcion" />
        </>
      ),
      date: currentDate.toLocaleDateString(),
      type: 'pdf'
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
         <div onClick={addColum} style={{ cursor:'pointer', width: '20px' }} ><LinkOutlined /></div>
        <Table 
          dataSource={data}
          columns={columns}
          pagination={false}
         />
    </div>
    )
}
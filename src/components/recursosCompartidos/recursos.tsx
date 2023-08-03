import { useState, useEffect, useRef } from 'react';
import { Button, Col, Form, Input, Popconfirm, Row, Table, Typography, message } from 'antd';
import { QueryBuilders } from '@/services/orm/queryBuilders';
import { deleteIcon, linkIcon, pdfIcon, uploadIcon } from '@/assets/icon/iconManager';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ApiServicesMembrete } from '@/services/api/services';
import { sessionInformationStore } from '@/store/userInformationStore';
import {shallow} from "zustand/shallow";
import { select_type } from '@/utils/utils';
import { EditOutlined } from '@ant-design/icons';



interface Item {
  key: string;
  name: string;
  description: number;
  date: string;
  url:string;
  nameFile: string;
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'file' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'file' ? <div style={{ display: 'flex' }}>
  <div style={{ width: '20px', marginRight: '15px' }}> <>{select_type(record.url)}</></div> 
  <Input defaultValue={record.nameFile} />
  {/* <Col span={20}>  {input ? <span style={{ marginLeft:'10px' }}>{...item.name} </span> : <Input {...item.name} />} </Col> */}
</div> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const RecursosCompartidoPage: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const currentDate = new Date();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  let inputUrl: any
  let inputDescripcion = ''
  //   

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const { currentCampus } = sessionInformationStore(
    (state) => ({
        currentCampus: state.currentCampus
    }),
    shallow
);

  const cancel = () => {
    setEditingKey('');
  };

  const onChangeDescription = (e: any) => {
    inputDescripcion = e.target.value;
  }

  const createUrl = async () => {
    saveArchive(inputUrl, inputUrl)
  }
  const onChangeUrl = (e: any) => {
    inputUrl = e.target.value;
  }

  const limitarTexto = (texto: string): string => {
    if (texto.length <= 30) {
      return texto;
    } else {
      return texto.slice(0, 30);
    }
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
        'nombre': limitarTexto(name),
        'descripcion': limitarTexto(inputDescripcion),
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
        'nombre': limitarTexto(name),
        'descripcion': limitarTexto(inputDescripcion),
        'url_recurso_externo': url,
      })
      .schema('ACADEMICO_COL0')
      .save()
      getData()

    }
    
  }

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
            // setImageUrl(response.data.data.URLS3)
            console.log(response.data.response.url, '---')
            saveArchive(response.data.response.nombre,'', response.data.response.id)
            // message.destroy()
            // saveArchive(response.data.data.nombre,response.data.data.URLS3)
            // message.success('enviado')
          
        })
        .catch(() => {
            message.success('error')
        });

  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
    fileInputRef.current.click();
    }
  };

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

  const  transformJsonArray = (inputArray) => {
  
    const transformedArray = inputArray.map((item) => {
      const currentDate = new Date(item.date);
      // 
      return {
        key: item.id,
        name: (
          <div style={{ display: 'flex' }}>
            <div style={{ width: '20px', marginRight: '15px' }}> {select_type(item.url)} </div> 
            <div>  {item.name} </div>
            {/* <Col span={20}>  {input ? <span style={{ marginLeft:'10px' }}>{...item.name} </span> : <Input {...item.name} />} </Col> */}
          </div>
        ),
        description: item.description,
        date: currentDate.toLocaleDateString(),
        url : item.url,
        nameFile: item.name
      };
    });
  
    return transformedArray;
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
                    .limit(20)
                    .get()
    const parseData = transformJsonArray(getdata)
    setData(parseData)
  }

  const formatearFecha = (fecha: Date): string =>{
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const querycolumn = new QueryBuilders('recurso_compartido');
     const result = await querycolumn
      .update({
        'nombre': row.name,
        'descripcion': row.description,
      })
      .where('"PK_TRECURSO_COMPARTIDO"' , '=', key.toString())
      .schema('ACADEMICO_COL0')
      .save()

      if(result){
        setEditingKey('');
        await getData()
      }
     
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteItemData = async (id: any) => {
    console.log(id)
    const querycolumn = new QueryBuilders('recurso_compartido');
     const result = await querycolumn
      .where('"PK_TRECURSO_COMPARTIDO"' , '=', id)
      .schema('ACADEMICO_COL0')
      .delete()
    
      if(result){
        await getData()
      }
  }

  const columns = [
    {
      title: 'Nombre de recurso',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      width: '30%',
      editable: true,
    },
    {
      title: 'Fecha de publicacion',
      dataIndex: 'date',
      width: '20%',
      editable: false,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return record.key == null ? (
           <Typography.Link disabled={editingKey !== ''}>
              <Popconfirm title="Eliminar dato ?" onConfirm={() => deleteItemData(record.key)}>
              <span>{deleteIcon}</span>
              </Popconfirm>
          </Typography.Link>
          ) : editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Cancelar?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Row>
            <Col span={6}>
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                <EditOutlined />
              </Typography.Link>
            </Col>
            <Col span={10}>
              <Typography.Link disabled={editingKey !== ''}>
                  <Popconfirm title="eliminar dato?" onConfirm={() => deleteItemData(record.key)}>
                  <span>{deleteIcon}</span>
                  </Popconfirm>
              </Typography.Link>
            </Col>
          </Row>
          
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'name' ? 'file' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
      operacion: (<>jjj</>)

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
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default RecursosCompartidoPage;
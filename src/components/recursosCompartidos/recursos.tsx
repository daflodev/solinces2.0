import { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { QueryBuilders } from '@/services/orm/queryBuilders';
import { linkIcon, pdfIcon } from '@/assets/icon/iconManager';

interface Item {
  key: string;
  name: string;
  description: number;
  date: string;
  nameFile: string;
}

const originData: Item[] = [];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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

  let inputUrl: any
  let inputDescripcion = ''

  //   

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const onChangeDescription = (e: any) => {
    inputDescripcion = e.target.value;
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

  const createUrl = async () => {
    // saveArchive(inputUrl, inputUrl)
  }


  const  transformJsonArray = (inputArray) => {
  
    const transformedArray = inputArray.map((item) => {
      const currentDate = new Date(item.date);
      // 
      return {
        key: item.id,
        name: item.name,
        description: item.description,
        date: currentDate.toLocaleDateString(),
        ico : ( <>{select_type(item.url)}</> ),
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
                    .get()
    const parseData = transformJsonArray(getdata)
    setData(parseData)
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: '',
        dataIndex: 'ico',
        width: '5%',
      },
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
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
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
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useState(() => {
    getData()
  },[])

  return (
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
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default RecursosCompartidoPage;
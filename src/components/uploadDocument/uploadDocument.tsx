import { Upload, Button, List } from 'antd';
import { UploadOutlined, FileImageOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { iconPdf } from '@/assets/icon/iconManager';

const acceptedFileTypes = [
  '.jpg', '.jpeg', '.png', '.gif', // Imágenes
  '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.txt', // Documentos
  // Agrega más extensiones de archivo aquí si lo deseas
];

const UploadDocument = () => {
  const [fileList, setFileList] = useState([]);

  const onChange = info => {
    setFileList(info.fileList);
  };

  const beforeUpload = file => {
    const isValidFileType = acceptedFileTypes.some(type => file.name.toLowerCase().endsWith(type));
    if (!isValidFileType) {
      console.log('Archivo no válido. Por favor, seleccione un archivo con una extensión permitida.');
    }
    return isValidFileType;
  };

  const getIcon = fileName => {
    const extension = fileName.split('.').pop().toLowerCase();
  
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImageOutlined />;
      case 'pdf':
        return iconPdf;
      case 'doc':
      case 'docx':   
      return <FileWordOutlined />;
      case 'ppt':
      case 'pptx':
        return <FilePdfOutlined />
    //   case 'xls':
    //   case 'xlsx':
    //  return <FileExcelOutlined/>
      case 'txt':
        return <FileTextOutlined />;
      default:
        return <FilePdfOutlined />; // Icono predeterminado para otros tipos de archivo
    }
  };

  return (
    <div>
      <Upload
        accept={acceptedFileTypes.join(',')}
        onChange={onChange}
        beforeUpload={beforeUpload}
        multiple
      >
        <Button icon={<UploadOutlined />}>Seleccionar archivos</Button>
      </Upload>
      <List
        style={{ marginTop: 16 }}
        bordered
        dataSource={fileList}
        renderItem={(item: any) => (
            <List.Item className="listDocument">
              {getIcon(item?.name)}
              <span className='nameDocument'>{item?.name}</span>
            </List.Item>
          )}
      />
    </div>
  );
};

export default UploadDocument;
import { useState } from 'react';
import { Input, Table, Tag, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { searchIcon, 
        alertExclamationIcon, 
        attachFileIcon, 
        deleteIcon, 
        duplicateIcon, 
        editIcon, 
        massiveScoreIcon, 
        PlusOutlined } from '@/assets/icon/iconManager';

import "./tActivityViewStyles.css";
const TActivityView: React.FC = () => {

  const toGenerateHeadIcons = (titleValue) =>{

    const [isOnMouseOverTitle, setIsOnMouseOverTitle] = useState(false);

    return(
      <div id='container_container'
          style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
          onMouseOut={()=> {
            setIsOnMouseOverTitle(false)
          }}
          onMouseOver={()=> {
            setIsOnMouseOverTitle(true)
          }}
      >
        {isOnMouseOverTitle ? 
            (<div className='activity_container_grade_column_icons_container'
            >
              <Row align='middle' justify='center'>
                <Col span={24}>
                  <div className='activity_container_grade_column_icons' style={{ marginBottom:'.5rem' }}>
                    {editIcon}
                    {massiveScoreIcon}
                    {attachFileIcon}
                  </div>
                </Col>
                <Col span={24}>
                  <div className='activity_container_grade_column_icons'>
                    {duplicateIcon}
                    {deleteIcon}
                  </div>
                </Col>
              </Row>
            </div>)
          :
          <div 
          className='activity_container_grade_column_title'
        >
          {titleValue}
        </div>
        }
      </div>
      )
    }

    //TODO: este campo debe generarse con la informacion proveniente de la base de datos
    //TODO: se debe ajustar que el className de title tenga en cuenta la categoria para dar un color de borde inferior
    const columns: ColumnsType<any> = [
      {
        title: <div className="menu_activity_view">
                  <Input size="large" placeholder="Apellidos y nombres" prefix={searchIcon} />
                </div>,
        dataIndex: 'name',
        key: 'name',
        width: '150',
        className:'activity_container_name_column_text',
        render: (text) => text,
      },{
            title: toGenerateHeadIcons('soy el titulo para test el cambio'),
            key: 'scoreInformation',
            dataIndex: 'scoreInformation',
            width: '150',
            className:'activity_container_grade_column',
            render: (_, { scoreInformation }) => {
              const {score, scoreKey} = scoreInformation;

              //TODO: Color manager for score
              let color = 'green';
              //TODO: agreagr condicion para el icono exclamacion con marca
                return(
                  <div className='score_container'>
                    <Tag color={color} key={scoreKey}>
                        {score}
                    </Tag>
                    {alertExclamationIcon}
                  </div>
                )
            },
          },{
            title: toGenerateHeadIcons('Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
            key: 'scoreInformationB',
            dataIndex: 'scoreInformationB',
            width: '150',
            className:'activity_container_grade_column',
            render: (_, { scoreInformationB }) => {
              const {score, scoreKey} = scoreInformationB;

              //TODO: Color manager for score
              let color = 'green';
              //TODO: agreagr condicion para el icono exclamacion con marca
                return(
                  <div className='score_container'>
                    <Tag color={color} key={scoreKey}>
                        {score}
                    </Tag>
                    {alertExclamationIcon}
                  </div>
                )
            },
          },{
            title: toGenerateHeadIcons('Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
            key: 'scoreInformationC',
            dataIndex: 'scoreInformationC',
            width: '150',
            className:'activity_container_grade_column',
            render: (_, { scoreInformationC }) => {
              const {score, scoreKey} = scoreInformationC;

              //TODO: Color manager for score
              let color = 'green';
              //TODO: agreagr condicion para el icono exclamacion con marca
                return(
                  <div className='score_container'>
                    <Tag color={color} key={scoreKey}>
                        {score}
                    </Tag>
                    {alertExclamationIcon}
                  </div>
                )
            },
          },{
            title: <div className='activity_container_final_grade_column_title'>DEFINITIVA PROYECTADA</div>,
            key: 'scoreDefinitiveInformation',
            dataIndex: 'scoreDefinitiveInformation',
            width: '150',
            className:'activity_container_final_grade_column',
            render: (_, { scoreDefinitiveInformation }) => {
              const {score, scoreKey} = scoreDefinitiveInformation;

              //TODO: Color manager for score
              let color = 'green';
                return(
                  <div className='score_final_container'>
                    <Tag color={color} key={scoreKey}>
                        {score}
                    </Tag>
                  </div>
                )
            },
          }
    ];

    //TODO: modelo de objeto recibido de la DB
    // const testObject ={
    //   matriculaID: 'key del usuario',
    //   userFullName: 'nombre del usuario',
    //   scoreInformation: [
    //     {
    //       activityKey: 'llave de la actividad',
    //       activityName: 'nombre de la actividad',
    //       activityCategory: 'categoria de la actividad',
    //       scoreBase: 'base de la nota',
    //       scoreValue: 'valor de la calificacion, si no tiene nota enviar null',
    //       isApproved: 'booleano para indicar si la nota esta aprovada',
    //       finalPercent: 'procentaje de valor en la nota final',
    //       pendingFileView: 'booleano o valor que indique si falta archivo por visualizar',
    //     }
    //   ]
    // }

    //TODO: se describen los elementos minimos a considerar, la estrutura debe replantearce al coonectar a al DB
    //TODO: sin embargo, lo mostrado aocntinuacion seria lo minimo de informacion reuerida para construir el componente
    const data: any[] = [
      {
        key: '1',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra v',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      },
      {
        key: '2',
        name: 'Jim Green',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      },
      {
        key: '3',
        name: 'Joe Black',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      },,
      {
        key: '4',
        name: 'Joe Black 2',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      },
      {
        key: '5',
        name: 'Joe Black 3',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      },
      {
        key: '6',
        name: 'Joe Black 4',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      },
      {
        key: '7',
        name: 'Joe Black 5',
        scoreInformation: {
          scoreKey: 4,
          score: '2,0'
        },
        scoreInformationB: {
          scoreKey: 4,
          score: '1,0'
        },
        scoreInformationC: {
          scoreKey: 4,
          score: '3,0'
        },
        scoreDefinitiveInformation: {
          scoreKey: 4,
          score: '4,0'
        },
      }
    ];

    return (
          <>
            <div className='activity_container'>
                <span className='activity_container_title'>
                    tactividad
                </span>
                <br/>
                <br/>
                {PlusOutlined}
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={false}
                />
            </div>
        </>
    )
};

export default TActivityView;
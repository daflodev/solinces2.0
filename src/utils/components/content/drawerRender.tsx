import { Button, Popover } from 'antd';
import React, { useEffect } from 'react';
import { sessionInformationStore } from '../../../store/userInformationStore';
import shallow from 'zustand/shallow';
import './drawerRender.css'
import { RetweetOutlined } from '@ant-design/icons';


const DrawerRender: React.FC = () => {
    
    const { currentRol, roles } = sessionInformationStore(
        (state) => ({
            currentRol: state.currentRol,
            roles: state.currentRoles,
        }),
        shallow
    );

    const { updateValue } = sessionInformationStore();
    
    const handleClick = (event) => {
        updateValue({element: 'currentRol',
                    value:event.target.textContent
                })
    }

   

    const ListaItems = () => {
        return (
          <ul>

            {roles.map((elemento, index) => (
              <li className='listRoles' onClick={handleClick} key={index}>{elemento}</li>
            ))}
          </ul>
        );
      }

    useEffect(() => {
      ListaItems()
    }, [roles, currentRol])

    return(
        <>
        <p>{currentRol}</p>
        <Popover content={ListaItems}>
            <Button style={{ color: 'White' }} type="primary" icon={<RetweetOutlined />} />
        </Popover>
        </>
    )
};

export{DrawerRender};
import { useState } from 'react';


import { downDirectionVector } from "./menu/menu-icons";

import "./header.css";
import { Dropdown, Space } from 'antd';

const DropdownHeaderFilter = (items: any)=>{
    const extractOptionLabel = (key: any) => {
  
      const optionSelected = items.filter((option: any) => {
        if(option.key == key){
          return option.label
        }
      })
  
        return optionSelected[0].label
  
    }
  
    const [currentKey, setCurrentKey] = useState(extractOptionLabel('2'))
  
    const onClick = (label: any)=>{
  
      setCurrentKey(label)
    }
    function listGenerator(items: any) {
  
      const listItems:any = items.map((item: any) =>
        <li
            className="header-filters-items"
            key={item.key} 
            onClick={() => onClick(item.label)}
        >
          {item.label}
        </li>
      );
    
      return (
          <ul className="dropdown-header-filters">
            {listItems}
          </ul>
      );
    }
  
    return(
        <Dropdown 
          menu={{ 
            items,
            }}
            
          overlayClassName = "dropdown-header-filters"
          dropdownRender = {()=>{
            return listGenerator(items)
          }}
          >
          <div className="btn3-j68">
            <div className="header-filter-option">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  { currentKey }
                  { downDirectionVector }
                </Space>
              </a>
            </div>
          </div>
        </Dropdown>
    )
  }

export {
  DropdownHeaderFilter
}
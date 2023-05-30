import { downDirectionVector } from "./menu/menu-icons";

import { Dropdown, Space } from 'antd';

import PerfectScrollbar from "react-perfect-scrollbar";

import "./header.css";

const DropdownHeaderFilterAcademic = (items: any, pointerValue: any, onClickMethod: any)=>{

  if(items == null){
    return <></>
  }

    const extractOptionLabel = (key: any) => {
  
      const optionSelected = items?.filter((option: any) => {
        if(option?.key == key){
          return option?.label;
        }
      })

      return optionSelected[0]?.label;
    }

    const extractOptionKey = (label: any) => {
  
      const optionSelected = items?.filter((option: any) => {
        if(option?.label == label){
          return option?.key;
        }
      })

      return optionSelected[0]?.key;
    }


    const onClick = (label)=>{

      const keySelected = extractOptionKey(label)

      onClickMethod(keySelected.toString());
    }
    function listGenerator(items: any) {

      const listItems:any = items?.map((item: any) =>
        <li
            className="header-filters-items"
            key={item?.key} 
            onClick={() => onClick(item?.label)}
        >
          {item?.label}
        </li>
      );

      return (
        <ul className="dropdown-header-filters">
            {listItems}
        </ul>
      );
    }
  
    return(
      <PerfectScrollbar>
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
                  { extractOptionLabel(pointerValue) }
                  { downDirectionVector }
                </Space>
              </a>
            </div>
          </div>
        </Dropdown>
      </PerfectScrollbar>
    )
  }

export {
    DropdownHeaderFilterAcademic
}
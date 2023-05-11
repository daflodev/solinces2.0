import { useEffect, useState } from "react";

// import { Link } from "@reach/router";
import { Link } from "react-router-dom";

import { 
  footerMenuImage,
  searchIcon,
  getIcon } from "./menu-icons";

import { GetMenu } from "./hooks/getMenu";

import "./styles/menu-items-styles.css";
import { Input, Menu, Spin } from "antd";


function getItem(label:any, key:any, icon:any, disabled = false) {
  return {
    key,
    icon,
    label,
    disabled
  };
}

function dataSourceDigestor(dataSource:any) {
    const items:any = [];

    dataSource.map((data:any) =>{

      const icon:any = getIcon(data.ICONO);
      
      if(data.VISIBLE && data.VISIBLE === "S"){

        if(data.ESTADO && data.ESTADO === "A"){
          const url = data?.URL ? `/layout/${data?.URL}` : '/miurl';
          const item = getItem(
            <Link key={data?.URL} to={url}>{data?.NOMBRE}</Link>, 
            data.CODIGO, 
            <Link key={data.URL} to={url}>{icon?.svg}</Link>)
  
          items.push(item);
        }else{
          const item = getItem(
            data?.NOMBRE, 
            data?.CODIGO, 
            icon?.svg,
            true
            )
  
          items.push(item);
        }
      }

    })

    return items;
}

const MenuItems = () => {

  const { dataSource } = GetMenu()

  const [menuItems, setMenuItems] = useState<any>(null)

  useEffect(() => {

    if(dataSource){
      const menuData = dataSourceDigestor(dataSource)

      setMenuItems(<Menu
              style={{
                  width: 256,
                  boxShadow: "0 0 0 0 white",
                  backgroundColor: "var(--bg-color)"
              }}
              items={menuData}
          />)
    }

  }, [dataSource])

  return(
    <>
      <div className="menu-search-bar">
        <Input size="large" placeholder="Buscar" prefix={searchIcon} />
      </div>

      <br/>

      <div className="menu-options">
      {
        dataSource && dataSource.length == 0 ?
          <div className="loading-menu-content">
            <Spin tip="Loading" size="large"/>
          </div>
          :
          menuItems
      }
        
      </div>

      <div className="footer-menu-image">
        <img src={footerMenuImage}/>
      </div>
    </>
  )
};

export default MenuItems;

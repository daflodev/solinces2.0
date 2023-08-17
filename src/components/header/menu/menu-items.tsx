import { useEffect, useState } from "react";

import { Link, redirect } from "react-router-dom";

import {
  footerMenuImage,
  searchIcon,
  getIcon
} from "./menu-icons.tsx";

import { GetMenu } from "./hooks/getMenu.tsx";

import "./styles/menu-items-styles.css";
import { Input, Menu, Spin } from "antd";
import Item from "antd/es/list/Item";
// import { Redirect } from "react-router-dom";


function getItem(label: any, key: any, icon: any, disabled = false) {
  return {
    key,
    icon,
    label,
    disabled
  };
}


function dataSourceDigestor(dataSource: any) {
  const items: any = [];
  const filteredData = dataSource.filter(data => data.NOMBRE !== "FORO" && data.NOMBRE !== "EOL");
  filteredData.map((data: any) => {




    const icon: any = getIcon(data.ICONO);

    if (data.VISIBLE && data.VISIBLE === "S") {

      if (data.ESTADO && data.ESTADO === "A") {
        if (data.NOMBRE === "FORO" && data.NOMBRE === "EOL") {
          return;
        }
        const url = data?.URL ? `/layout/${data?.URL}` : '/miurl';
        const item = getItem(
          <Link key={data?.URL} to={url}>{data?.NOMBRE}</Link>,
          data.CODIGO,
          <Link key={data.URL} to={url}>{icon?.svg}</Link>)

        items.push(item);


      } else {
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
  // Agregar los ITEM de solinces FASE 1
  const ItemsFase1 = [
    {
      label: "MONITOREO",
      url: "/MONITOREO",
    },
    {
      label: "GESTOR-ACTIVIDADES",
      url: "/GESTOR-ACTIVIDADES",
    },
    {
      label: "PLANILLA-ACTIVIDADES",
      url: "/PLANILLA-ACTIVIDADES",
    },
    {
      label: "AGENDA",
      url: "/AGENDA",
    },
  ];

  // const onClick= (nameViews)=>{
  //       // actualizar valor del zustand

  //     <Redirect to={}/>
  // }

  ItemsFase1.forEach(newItem => {
    const item = getItem(
      <Link key={newItem.url} to={newItem.url}>{newItem.label}</Link>,
      newItem.url,
      <Link key={newItem.url} to={newItem.url}>{''}</Link>
    );
    items.push(item);
  });

  return items;
}

const MenuItems = () => {

  const { dataSource } = GetMenu()

  const [menuItems, setMenuItems] = useState<any>(null)

  useEffect(() => {

    if (dataSource) {
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

  return (
    <>
      <div className="menu-search-bar">
        <Input size="large" placeholder="Buscar" prefix={searchIcon} />
      </div>

      <br />

      <div className="menu-options">
        {
          dataSource && dataSource.length == 0 ?
            <div className="loading-menu-content">
              <Spin tip="Loading" size="large" />
            </div>
            :
            menuItems
        }

      </div>

      <div className="footer-menu-image">
        <img src={footerMenuImage} />
      </div>
    </>
  )
};

export default MenuItems;

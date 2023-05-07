// @ts-ignore

import { Dropdown } from "antd";

import "./styles/menu-styles.css";
import MenuItems from "./menu-items";


const MainMenu = (componentInnerDropdown: any)=>{

    return(
        <Dropdown 
            overlayClassName = "main-menu"
            placement="bottom"
            dropdownRender = {() => <MenuItems/>}
        >
            {componentInnerDropdown}
        </Dropdown>
    )
}

export {
    MainMenu
}
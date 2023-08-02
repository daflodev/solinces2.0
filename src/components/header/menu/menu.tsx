import { Dropdown } from "antd";

import MenuItems from "./menu-items.tsx";
import "./styles/menu-styles.css";


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
};

import React from "react";
import { Drawer } from 'antd';
import HeaderComponent from "../../../config/shared/header";

import { DrawerRender } from "./drawerRender";

import shallow from "zustand/shallow";
import { mainDrawerStore } from "../../../store/mainDrawerStore";

import './drawerRender.css'

const ContentComponents = ({ children }: {children: any}) => {

    const { isOpen, withDrawer } = mainDrawerStore(
        (state) => ({
            isOpen: state.isOpen,
            withDrawer: state.withDrawer
        }),
        shallow
    );

    return (
        <>
            <nav>
                <HeaderComponent/>
            </nav>

            <main>
                <div className="drawer_render_main_container" >
                    {children}
                    <Drawer
                        placement="right"
                        open={isOpen}
                        getContainer={false}
                        width={`${withDrawer}%`}
                        destroyOnClose={true}
                        closable={false}
                    >
                         {/* @ts-ignore */}
                        {DrawerRender()}
                    </Drawer>
                </div>
            </main>
        </>
    );
};

export const withPrincipal = (component: any) => {
    const Component = component;

    return (): React.ReactElement => {
        return (
            <ContentComponents >
                <Component />
            </ContentComponents>
        );
    };
};

export default ContentComponents;

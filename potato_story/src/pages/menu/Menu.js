import React, { memo } from 'react'
import SideMenu from '../../components/sideMenu/SideMenu';
import { Outlet } from 'react-router-dom';

const Menu = () => {
    return (
        <SideMenu>
            <Outlet />
        </SideMenu>
    )
}

export default memo(Menu)
import React from 'react';
import {Container, Content } from './styles';
import {FaTimes, FaPercentage, FaProductHunt, FaRegFileAlt, FaChartBar, FaAcquisitionsIncorporated, FaExclamation } from 'react-icons/fa';
import SidebarItem from '../SidebarItem';

const Sidebar = ({active}) => {

    const closeSidebar = () => { active(false) }

    return (
        <Container sidebar={active} style={{zIndex:10}}>
            <FaTimes onClick={closeSidebar}/>
            <Content>
                <SidebarItem id="productType" Icon={FaRegFileAlt} Text="Tipos de produto" action = "/productType"/>
                <SidebarItem id="product" Icon={FaProductHunt} Text="Produtos" action = "/product"/>
                <SidebarItem id="tax" Icon={FaPercentage} Text="Taxas" action = "/Tax"/>
                <SidebarItem id="taxProductType" Icon={FaAcquisitionsIncorporated} Text="Associar taxa ao tipo de produto" action = "/taxProductType"/>
                <SidebarItem id= "sale" Icon={FaChartBar} Text="Vendas" action = "/saleSearch" />
                <SidebarItem id= "logout" Icon={FaExclamation} Text="Logout" action = "/" />
            </Content>
        </Container>
    )

}

export default Sidebar;
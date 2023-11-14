import React from 'react';
import {Container, Content } from './styles';
import {FaTimes, FaPercentage, FaProductHunt, FaRegFileAlt, FaChartBar } from 'react-icons/fa';
import SidebarItem from '../SidebarItem';

const Sidebar = ({active}) => {

    const closeSidebar = () => { active(false) }

    return (
        <Container sidebar={active} style={{zIndex:10}}>
            <FaTimes onClick={closeSidebar}/>
            <Content>
                <SidebarItem Icon={FaRegFileAlt} Text="Tipos de produto" action = "/productType"/>
                <SidebarItem Icon={FaProductHunt} Text="Produtos" action = "/product"/>
                <SidebarItem Icon={FaPercentage} Text="Taxas" action = "/Tax"/>
                <SidebarItem Icon={FaChartBar} Text="Vendas" action = "/saleSearch" />
            </Content>
        </Container>
    )

}

export default Sidebar;
import React from 'react';
import {Container } from './styles';

const SidebarItem = ({ Icon, Text, action}) => {
    return (
        <Container>
            <Icon/>
            <a href={action}>{Text} </a>
        </Container>
    )

}

export default SidebarItem;
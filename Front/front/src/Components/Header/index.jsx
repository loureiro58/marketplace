import React, {useState} from 'react';
import {Container, Titulo} from './styles';
import {FaBars} from 'react-icons/fa';
import Sidebar from '../Sidebar';

const Header = () => {

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <Container>
            <FaBars onClick={showSidebar}/>
            {sidebar && <Sidebar active={setSidebar}/> }
            <Titulo>Mercadex</Titulo>
        </Container>
    )

}

export default Header;
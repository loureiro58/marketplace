import styled from 'styled-components';

export const Container = styled.div`
    height: 50px;
    display: flex;
    
    background-color: black;
    box-shadow: 0 0 9px 3px;

    > svg {
        position: fixed;
        color: white;
        width: 30px;
        height: 30px;
        margin-top: 10px;
        margin-left: 33px;
        cursor: pointer;
    }

`;

export const Titulo = styled.div`
    height: 50px;
    display: flex;
    background-color: black;
    font-size: 30px;
    color: white;
    margin-left: 100px;

    > svg {
        position: fixed;
        color: white;
        width: 30px;
        height: 30px;
        margin-top: 10px;
        margin-left: 33px;
        cursor: pointer;
    }
`;
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    backgroud-color: black;    
    font-size: 20px;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    margin: 0 15px 20px;
    
    > svg {
        margin: 0 20px;
        margin-left: 33px;
        cursor: pointer;
    }

    > a{
        text-decoration: none;
        color: white;
    }

    &:hover {
        background-color: green;
        
    }
`;
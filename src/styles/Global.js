import styled from "styled-components";

import Colors from "./Colors";

const BackgroundContainter = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${Colors.background};
    overflow-y: hidden;
`

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 50px;

    position: absolute;
    padding: 50px 100px;
    top: 250px;
    left: 0px;
    right: 0px;
    bottom: 0px;

    overflow-y: scroll;
    overflow-x: hidden;

    background-color: whitesmoke;
`

export {
    BackgroundContainter,
    ItemsContainer
}
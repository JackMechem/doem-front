import styled from "styled-components";

import Colors from "./Colors";

const BackgroundContainter = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${Colors.background};
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
    overflow-y: scroll;

    background-color: whitesmoke;
`

export {
    BackgroundContainter,
    ItemsContainer
}
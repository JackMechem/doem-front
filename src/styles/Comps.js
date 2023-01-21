import styled from "styled-components";

import HeaderImage from "../assets/Header.jpg"
import Colors from "./Colors";


// ---- HEADER ---- //

const HeaderContainer = styled.div`

    position: absolute;
    width: 100%;
    height: 250px;
    text-align: center;


    // border: solid red 2px;

    // background-image: url(${HeaderImage});
    // background-size: cover;
`

const HeaderBackgroundImage = styled.img`

    width: 100%;
    height: 100%;
    object-fit: scale-down;
`

const HeaderText = styled.p`

    position: absolute;
    margin: auto;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    filter: invert(1);
    mix-blend-mode: difference;

    font-size: 50pt;
    font-weight: normal;
`

// ---- Item Card ---- //

const ItemCardContainer = styled.div`

    width: 600px;
    height: 300px;

    // border: solid red 2px;
`

const ItemCardButtonPill = styled.button`
    position: absolute;
    height: 50px;
    width: 300px;

////////////////
    text-align: center;
    vertical-align: middle;

    background-color: ${Colors.palate[0]};
    color: ${Colors.palate[1]};
    border-radius: 90px;
`

export {
    // Header
    HeaderContainer,
    HeaderBackgroundImage,
    HeaderText,

    // Item Card
    ItemCardContainer,
    ItemCardButtonPill
}
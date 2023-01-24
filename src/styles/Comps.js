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
    position: relative;
    display: flex;
    flex-shrink: 0;

    width: 650px;
    height: 250px;

    /* border: solid red 2px; */
`

const ItemCardPhoto = styled.img`
    position: absolute;
 
    height: 250px;
    width: 250px;

    /* border-radius: 10px; */

    background-color: black;
`

const ItemCardRightContainer = styled.div`
    position: absolute;

    right: 0px;
    left: 250px;
    bottom: 0px;
    top: 0px;

    height: 100%;

    /* border: solid blue 2px; */
`

const ItemCardName = styled.p`
    position: absolute;
    margin: auto;

    top: 40px;
    left: 80px;

    font-size: 30pt;
    font-weight: normal;

    color: ${Colors.foreground};
`

const ItemCardButtonPill = styled.button`
    position: absolute;
    height: 40px;
    width: 250px;

    bottom: 50px;
    /* right: 10px; */
    left: 80px;

    padding-left: 20px;

    background-color: ${Colors.palate[0]};
    color: ${Colors.palate[1]};

    font-size: 18pt;
    font-weight: 500;
    letter-spacing: 3px;
    text-align: left;

    border-radius: 90px;
    border: none;

    transition-duration: 50ms;

    :hover {
        filter: brightness(150%);
        -webkit-filter: brightness(150%);
        background-color: ${Colors.palate[2]};
    }

    :active {
        border: solid black 3px;
    }
`

export {
    // Header
    HeaderContainer,
    HeaderBackgroundImage,
    HeaderText,

    // Item Card
    ItemCardContainer,
    ItemCardPhoto,
    ItemCardRightContainer,
    ItemCardName,
    ItemCardButtonPill
}
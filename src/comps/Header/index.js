import React from "react";
import { HeaderBackgroundImage, HeaderContainer, HeaderText } from "../../styles/Comps";

import HeaderImg from "../../assets/Header.jpg"


const Header = () => {

    return (<HeaderContainer>
        <HeaderBackgroundImage src={HeaderImg} />
            <HeaderText>doem</HeaderText>
    </HeaderContainer>)
}

export default Header;
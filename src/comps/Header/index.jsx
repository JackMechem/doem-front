import React, { useState } from "react";
import { HeaderBackgroundImage, HeaderContainer, HeaderText } from "../../styles/Comps";

import { motion } from "framer-motion";

import HeaderImg from "../../assets/Header.jpg"

const Header = () => {

    return (<HeaderContainer>
        <HeaderBackgroundImage as={motion.img} src={HeaderImg}
            animate={{ x: "1920px" }}
            transition={{ ease: [0, 0, 0, 0], duration: 15, repeat: Infinity, repeatDelay: 0 }}
        />
        <HeaderBackgroundImage left as={motion.img} src={HeaderImg}
            animate={{ x: "1920px" }}
            transition={{ ease: [0, 0, 0, 0], duration: 15, repeat: Infinity, repeatDelay: 0 }}
        />
        <HeaderText>doem</HeaderText>
    </HeaderContainer>)
}

export default Header;

/*
This file will contain the api requests to the backend (snipcart) in order to get all the 
products.
*/

import React, { useEffect } from "react";
import { ItemsContainer } from "../../styles/Global";
import ItemCard from "../ItemCard";

import Candle1 from "../../assets/candle1.jpg"
import Candle2 from "../../assets/candle2.jpg"
import Candle3 from "../../assets/candle3.jpg"

const Items = () => {
    return (<ItemsContainer>
        <ItemCard name="Candle-1" image={Candle1} />
        <ItemCard name="Candle-2" image={Candle2} />
    </ItemsContainer>)
}

export default Items;

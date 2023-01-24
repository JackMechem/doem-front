/*
This file will contain the api requests to the backend (snipcart) in order to get all the 
products.
*/

import React, { useEffect } from "react";
import { ItemsContainer } from "../../styles/Global";
import ItemCard from "../ItemCard";



const Items = () => {



    return(<ItemsContainer>
        <ItemCard name="Candle-1"/>
        <ItemCard name="Candle-2"/>
    </ItemsContainer>)
}

export default Items;
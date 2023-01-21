/*
This file will contain the api requests to the backend (snipcart) in order to get all the 
products.
*/

import React from "react";
import { ItemsContainer } from "../../styles/Global";
import ItemCard from "../ItemCard";


const Items = () => {


    return(<ItemsContainer>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
    </ItemsContainer>)
}

export default Items;
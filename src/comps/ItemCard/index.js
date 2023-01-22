import React from "react";
import { ItemCardButtonPill, ItemCardContainer, ItemCardPhoto, ItemCardRightContainer } from "../../styles/Comps";

const ItemCard = () => {

    return (<ItemCardContainer>
        <ItemCardPhoto src="https://cdn.arhaus.com/product/StandardV2/650081C1002.jpg?preset=ProductLarge"/>
        <ItemCardRightContainer>
            <ItemCardButtonPill>Add to Cart</ItemCardButtonPill>
        </ItemCardRightContainer>
    </ItemCardContainer>)
}

export default ItemCard;
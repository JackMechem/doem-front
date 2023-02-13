import React from "react";
import { ItemCardButtonPill, ItemCardContainer, ItemCardName, ItemCardPhoto, ItemCardRightContainer } from "../../styles/Comps";

const ItemCard = (props) => {

    const itemName = props.name;
    const itemPhoto = props.image;

    return (<ItemCardContainer>
        <ItemCardPhoto src={itemPhoto}/>
        <ItemCardRightContainer>
            <ItemCardName>{itemName}</ItemCardName>
            <ItemCardButtonPill>Add to Cart</ItemCardButtonPill>
        </ItemCardRightContainer>
    </ItemCardContainer>)
}

export default ItemCard;
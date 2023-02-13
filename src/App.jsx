import React from "react";
import Header from "./comps/Header";
import Items from "./comps/Items";

import { BackgroundContainter } from "./styles/Global";

const App = () => {
    return (<BackgroundContainter>
        <Header />
        <Items />
    </BackgroundContainter>);
}

export default App;

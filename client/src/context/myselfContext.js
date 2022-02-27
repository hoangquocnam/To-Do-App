import React, { createContext, useState, useEffect } from "react";

const { Provider, Consumer } = createContext();


function MyselfContextProvider(props) {

    const [account, setAccount] = useState(undefined);


    return (
        <Provider value={{ account: account, setAccount: setAccount}}>
            {props.children}
        </Provider>
    )

}


export { MyselfContextProvider, Consumer as MyselfContextConsumer }
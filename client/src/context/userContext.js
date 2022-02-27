import React, { useState, createContext, useEffect } from 'react'
import { getMethod } from '../api';
const { Provider, Consumer } = createContext();


function UserContextProvider({ children }) {

    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getMethod('get-users')
            .then((response) => {
                setUserList(response.data);
            })
    }, [])


    return (
        <Provider value={{
            userList: userList,
            setUserList: setUserList
        }}>
            {children}
        </Provider>
    )

}


export { UserContextProvider, Consumer as UserContextConsumer }

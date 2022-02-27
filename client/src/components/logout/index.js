import React from 'react'
import { MyselfContextConsumer } from '../../context/myselfContext'
import { Link } from 'react-router-dom'

function LogOut() {
    return (
        <MyselfContextConsumer>
            {context => {
                return (
                    <Link to='/' onClick={e => {
                        context.setAccount(undefined);
                        window.sessionStorage.clear();
                    }}>Log Out</Link>
                )
            }}
        </MyselfContextConsumer>
    )
}

export default LogOut
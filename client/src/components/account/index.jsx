import React from "react";
import { MyselfContextConsumer } from "../../context/myselfContext";
import './account.css'

export default function Account() {
    return (
        <MyselfContextConsumer>
            {context => {
                const { username, age, gender, name } = context.account ? context.account : { username: '', age: '', gender: '', name: '' }
                return (
                    <div id = "account">
                        <p className="account__title">Account</p>

                        <div className="account_tab">
                            <p>Username:</p>
                            <input defaultValue={username}></input>

                        </div>

                        <div className="account_tab">
                            <p>Age: </p>
                            <input defaultValue={age}></input>
                        </div>

                        <div className="account_tab">
                            <p>Name: </p>
                            <input defaultValue={name}></input>
                        </div>

                        <div className="account_tab">
                            <p>Gender: </p>
                            <input defaultValue={gender}></input>
                        </div>
                    </div>
                )
            }}
        </MyselfContextConsumer>
    )
}
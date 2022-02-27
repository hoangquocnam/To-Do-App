import React, { useState, useEffect } from "react";
import Button from "./button";
import { Link } from "react-router-dom"
import { MyselfContextConsumer } from '../../context/myselfContext'
import { postMethod } from '../../api'
import axios from "axios"
function LogInContent(props) {
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	return (
		<MyselfContextConsumer>
			{context => {
				function handleLogin() {
					if (usernameInput && passwordInput) {
						const checkingAccount = {
							username: usernameInput,
							password: passwordInput
						}
						postMethod('log-in', checkingAccount).then(response => {
							if (response.data.status === 'success') {
								window.sessionStorage.setItem('token', response.data.token);
								context.setAccount(response.data.account);
							}
							else {
								alert('Username or Password was not right!');
							}
						})
					}
					else {
						alert('Enter your username or password');
					}

				}

				return (
					<div id="login">
						<h1>Login</h1>
						<form id="login__form">

							<div>
								<p > Username: </p>
								<input
									type='text'
									className="loginInput"
									id='username'
									placeholder="Enter username..."
									onChange={e => setUsernameInput(e.target.value)}
									value={usernameInput}
								>
								</input>
							</div>



							<div>
								<span>  Password: </span>
								<input
									type='password'
									className="loginInput"
									placeholder="Enter password..."
									id="password"
									onChange={e => setPasswordInput(e.target.value)}
									onKeyPress={e => {
										if (e.key === 'Enter') {
											handleLogin();
										}
									}}
									value={passwordInput}
								>
								</input>
							</div>


						</form>


						<div className="login__submit">
							<Button
								titleValue="Submit"
								handleOnClick={handleLogin}
							/>
						</div>

						<div className="signup">
							<p style={{ marginBottom: '0px' }}>Don't have any account ?</p>
							<Link to="/signup">Sign up</Link>
						</div>
					</div>


				);
			}}
		</MyselfContextConsumer>
	)

}

export default LogInContent;

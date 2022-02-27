import React, { useEffect } from 'react'
import ProjectMananger from './components/projects'
import { ProjectContextProvider } from './context/projectContext'
import { BrowserRouter as Router, Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import UserManager from "./components/userManager"
import { UserContextProvider } from "./context/userContext.js";
import LogIn from './components/login'
import SignUp from './components/signup'
import { MyselfContextConsumer, MyselfContextProvider } from './context/myselfContext'
import LogOut from './components/logout'
import { getMethod } from './api'
import Account from './components/account'

function RouteProjects() {
    return (
        <ProjectContextProvider>
            <ProjectMananger />
        </ProjectContextProvider>
    )
}


function RouteHome() {
    return (
        <React.Fragment>
            <span style={{ fontSize: '100px' }}>
                TO DO APP
            </span>
            <span style={{ textDecoration: 'underline' }}>by: Nam & Tai</span>
        </React.Fragment>
    )
}

function RouteUsers() {
    return (
        <UserContextProvider>
            <UserManager />
        </UserContextProvider>
    )
}

function RouteAccount(){
    return (
        <MyselfContextProvider>
            <Account/>
        </MyselfContextProvider>
    )
}

function RouteLogIn() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Navigate to='/log-in'></Navigate>}></Route>
                <Route path="/log-in" element={<LogIn />}></Route>
                <Route path='/signup' element={<SignUp />}></Route>
            </Routes>
        </React.Fragment>
    )
}


function RoutersApp() {
    return (

        <React.Fragment>
            <div id="router">
                <ul id='containerTool' style={{ height: "100%" }}>
                    <li className='navTool' onClick={e => (e.currentTarget.firstChild.click())}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='navTool' onClick={e => (e.currentTarget.firstChild.click())}>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li className='navTool' onClick={e => (e.currentTarget.firstChild.click())}>
                        <Link to='/users' >Users</Link>
                    </li>
                    <li className='navTool' onClick={e => (e.currentTarget.firstChild.click())}>
                        <Link to='/account' >Account</Link>
                    </li>
                    <li className='navTool logout' onClick={e => (e.currentTarget.firstChild.click())}>
                        <LogOut />
                    </li>

                </ul>
            </div>

            <div id="app">
                <Routes>
                    <Route path="/" element={<RouteHome />}></Route>
                    <Route path="/log-in" element={<Navigate to='/' />}></Route>
                    <Route path='/projects' element={<RouteProjects />}></Route>
                    <Route path="/users" element={<RouteUsers />}></Route>
                    <Route path="/account" element={<Account />}></Route>
                </Routes>


            </div>
        </React.Fragment>

    )
}


export default function App() {
    return (
        <Router>
            <MyselfContextProvider>
                <MyselfContextConsumer>
                    {context => {
                        if (window.sessionStorage.getItem('token')) {
                            if (!context.account) {
                                const config = {
                                    headers: {
                                        authorization: window.sessionStorage.getItem('token')
                                    }
                                };
                                getMethod('authentication', config).then(response => {
                                    if (response.data.status === 'success') {
                                        context.setAccount(response.data.account)
                                    }
                                    else {
                                        window.sessionStorage.removeItem('token')
                                        context.setAccount(undefined)
                                    }
                                })
                            }

                            return (
                                <RoutersApp />
                            )
                        }
                        else {
                            return (
                                <RouteLogIn />
                            )
                        }
                    }}
                </MyselfContextConsumer>
            </MyselfContextProvider>
        </Router>



    )
}


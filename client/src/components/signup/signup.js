import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./button/index";
import { postMethod } from "../../api";
function SignUpContent(props) {
    const [nameInput, setNameInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [ageInput, setAgeInput] = useState('')
    const [genderInput, setGenderInput] = useState('Male')
    const [isAdmin, setAdmin] = useState(false)
    const [isSuccess, setSuccess] = useState('none');

    const { prevPage, setCreating, setUserListContext } = props

    function handleSignUp() {
        if (nameInput && usernameInput && passwordInput && confirmPasswordInput && ageInput && genderInput) {
            const signingUpAccount = {
                name: nameInput,
                username: usernameInput,
                password: passwordInput,
                age: ageInput,
                taskList: [],
                isAdmin: isAdmin,
                gender: genderInput,
                isDeleted: false,
                isOnline: false,
            }
            postMethod('sign-up', signingUpAccount).then(response => {
                debugger
                if (response.data.status === 'success') {
                    signingUpAccount._id = response.data._id
                    setSuccess('');
                    if (setUserListContext) setUserListContext(prev => [...prev, signingUpAccount]);
                } else {
                    setSuccess('block')
                }
            })
        } else {
            setSuccess('block')
        }
    }

    function checkGender() {
        if (genderInput == "Male") {
            setGenderInput('Female')
        } else {
            setGenderInput('Male')
        }
    }

    function cancelInput() {
        setNameInput('')
        setUsernameInput('');
        setPasswordInput('')
        setConfirmPasswordInput('')
        setAgeInput('')
    }

    const history = useNavigate()

    function handleReturnClick() {
        history(prevPage);
        if (setCreating) setCreating('none')
    }


    useEffect(() => {
        if (isSuccess == '') {
            handleReturnClick();
        }
    }, [isSuccess])

    return (
        (
            <div id="signup">
                <button
                    id="return__button"
                    onClick={handleReturnClick}

                >x
                </button>
                <h1>Sign Up</h1>
                {/* <!--Form--> */}
                <form id="signup__form">

                    {/* <!--Name--> */}
                    <div id="signup__nameField">
                        Name:
                        <input
                            type='text'
                            placeholder="Enter your name."
                            id="name__field"
                            onChange={e => setNameInput(e.target.value)}
                            value={nameInput}
                        >
                        </input>
                        <br />
                        <span className="name__announce"></span>
                    </div>

                    {/* <!--User Name--> */}
                    <div id="signup__usernameField">

                        Username:
                        <input
                            type='text'
                            placeholder="Enter username..."
                            id="username__field"
                            onChange={e => setUsernameInput(e.target.value)}
                            value={usernameInput}
                        >
                        </input>
                        <br />
                        <span className="username__announce"></span>
                    </div>

                    {/* <!--Password--> */}
                    <div id="signup__passwordField">
                        Password:
                        <input
                            type='password'
                            placeholder="Enter password..."
                            id="password__field"
                            onChange={e => setPasswordInput(e.target.value)}
                            value={passwordInput}
                        >
                        </input>
                        <br />
                        <span className="password__announce"></span>
                    </div>

                    {/* <!--Confirm Password--> */}
                    <div id="signup__confirmField">
                        Confirm:
                        <input
                            type='password'
                            placeholder="Confirm password"
                            id="confirm__field"
                            onChange={e => setConfirmPasswordInput(e.target.value)}
                            value={confirmPasswordInput}
                        >
                        </input>
                        <br />
                        <span className="confirm__announce"></span>
                    </div>

                    {/* <!--Age--> */}
                    <div id="signup__ageField">
                        Age:
                        <input
                            type='text'
                            placeholder=""
                            id="age__field"
                            onChange={e => setAgeInput(e.target.value)}
                            value={ageInput}
                        >
                        </input>
                        <br />
                        <span className="age__announce"></span>
                    </div>

                    {/* <!--Gender--> */}
                    <div id="signup__genderField">
                        Gender:
                        <div className="radio-group">

                            <input style={{ width: '30px', height: '30px', marginRight: '20px' }} type="radio" name="gender" defaultChecked onClick={e =>
                                checkGender()
                            }
                            />
                            <label htmlFor="gender">{genderInput}</label>

                        </div>
                        <br />
                        <span className="gender__announce"></span>
                    </div>

                    {/* // admin */}
                    <div id="signup__roleField">
                        Admin:
                        <input
                            type="checkbox"
                            id="role__field"
                            style={{ width: '30px', height: '30px', marginLeft: '10px' }}
                            onChange={e => {
                                setAdmin(e.target.checked)
                            }}
                        />

                    </div>
                    <div className="signup__submit">
                        <Button
                            id="signup__button"
                            titleValue="Sign up"
                            handleOnClick={() => {
                                handleSignUp()
                                cancelInput()
                            }}
                        />
                    </div>
                    {/* <!--Result--> */}
                    <div style={{ display: isSuccess }} id="signup__result">
                        {(isSuccess == '') && (
                            <h3 style={{ color: "green" }}>Successful</h3>
                        )
                        }
                        {(isSuccess == 'block') && (
                            <h3 style={{ color: "red" }}>Fail</h3>
                        )
                        }
                    </div>
                </form>


            </div>
        ))
}

export default SignUpContent;
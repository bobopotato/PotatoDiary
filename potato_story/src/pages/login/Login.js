import React, { useState, useRef } from 'react';
import UserApi from '../../api/UserApi';
// import Button from 'react-bootstrap/Button'
// import BaseTextField from '../../components/BaseTextField';
// import BaseTextFieldType from '../../constants/Constants';
// import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row';
import './Login.css'
import imgWelcome from '../../images/welcome.svg'
import imgRegister from '../../images/register.svg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
// import AuthRoute from '../../api/routes/AuthRoute';
// import usePostApi from '../../hooks/usePostApi';
import AuthController from '../../api/controller/AuthController';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const signinUsername = useRef();
    const signinPassword = useRef();

    const signupUsername = useRef();
    const signupFullname = useRef();
    const signupEmail = useRef();
    const signupPassword = useRef();
    const signupConfirmPassword = useRef();

    // const [error, setError] = useState('');

    // const [validated, setValidate] = useState(false);

    const { callAPI: UserLogin } = AuthController.UserLogin();
    const { callAPI: RegisteUser } = AuthController.RegisterUser();

    const onClickGetUser = () => {
        UserApi.getAllUsers().then((res) => {
            // console.log(JSON.stringify(data.data));
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const onClickLogin = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const username = signinUsername.current.value;
            const password = signinPassword.current.value;
            let userData = await UserLogin({ username: username, password: password });
            localStorage.setItem('userInfo', JSON.stringify(userData.userInfo));
            setAuth(userData);
            return navigate("/Home", { replace: true });
        }
        catch (err) {
            console.log(err);
            return alert(err);
        }
    }

    const onClickRegister = async (event) => {
        event.preventDefault();
        event.stopPropagation();
         // tmr continue here need change useState to useRef
        //call API 
        try {
            const username = signupUsername.current.value;
            const fullname = signupFullname.current.value;
            const email = signupEmail.current.value;
            const password = signupPassword.current.value;
            const confirmPassword = signupConfirmPassword.current.value;

            let userData = await RegisteUser({ username, fullname, email, password, confirmPassword });
            onClickSignInMode();
            return alert("Your account is registered successfully. You may sign in now.");
        }
        catch (err) {
            console.log(err);
            return alert(err);
        }
    }

    //ANIMATION
    const onClickSignInMode = () => {
        const container = document.querySelector(".forms-wrapper");
        container.classList.remove("sign-up-mode");
    }

    const onClickSignUpMode = () => {
        const container = document.querySelector(".forms-wrapper");
        container.classList.add("sign-up-mode");
    }


    return (
        <div className='forms-wrapper'>
            <div className='forms-container'>
                <div className='signin-signup'>
                    <form className='sign-in-form' autoComplete='off'>
                        <h2 className='title'>Sign in</h2>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faUser} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='text' placeholder='Username' name='gg' autoComplete={'new-username'} ref={signinUsername} />
                        </div>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faLock} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='password' placeholder='Password' ref={signinPassword} />
                        </div>
                        {/* <input type='submit' value='Login' className='btn-submit solid'  /> */}
                        <button className='btn-submit solid' onClick={onClickLogin}>Login</button>
                        <p className='social-text'>Or Sign in with social platforms</p>
                        <div className='social-media'>
                            <a href='#' className='social-icon'>
                                <FontAwesomeIcon icon={faFacebook} className='fa-icon'></FontAwesomeIcon>
                            </a>
                            <a href='#' className='social-icon'>
                                <FontAwesomeIcon icon={faInstagram} className='fa-icon'></FontAwesomeIcon>
                            </a>
                            <a href='#' className='social-icon'>
                                <FontAwesomeIcon icon={faGoogle} className='fa-icon'></FontAwesomeIcon>
                            </a>
                        </div>
                    </form>
                    {/* <form action='' className='sign-up-form'> */}
                    <form className='sign-up-form'>
                        <h2 className='title'>Sign Up</h2>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faUser} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='text' placeholder='Username' ref={signupUsername} />
                        </div>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faUser} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='text' placeholder='Full Name' ref={signupFullname}  />
                        </div>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faMailBulk} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='text' placeholder='Email Address' ref={signupEmail}  />
                        </div>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faLock} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='password' placeholder='Password' ref={signupPassword}  />
                        </div>
                        <div className='input-field'>
                            <div className='icon-center'>
                                <FontAwesomeIcon icon={faLock} className='fa-icon'></FontAwesomeIcon>
                            </div>
                            <input type='password' placeholder='Confirm Password' ref={signupConfirmPassword}  />
                        </div>
                        <input type='submit' value='Register' className='btn-submit solid' onClick={onClickRegister} />
                        {/* <p className='social-text'>Or Sign in with social platforms</p> */}
                        <div className='social-media'>
                            <a href='#' className='social-icon'>
                                <FontAwesomeIcon icon={faFacebook} className='fa-icon'></FontAwesomeIcon>
                            </a>
                            <a href='#' className='social-icon'>
                                <FontAwesomeIcon icon={faInstagram} className='fa-icon'></FontAwesomeIcon>
                            </a>
                            <a href='#' className='social-icon'>
                                <FontAwesomeIcon icon={faGoogle} className='fa-icon'></FontAwesomeIcon>
                            </a>
                        </div>
                    </form>
                </div>

            </div>
            <div className='panels-container'>
                <div className='panel left-panel'>
                    <div className='content'>
                        <h3>New here ?</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t</p>
                        <button className='btn-submit transparent' id='sign-up-btn' onClick={onClickSignUpMode}>Sign up</button>
                    </div>
                    <img src={imgWelcome} className='login-image' alt='welcome-image' />
                </div>
                <div className='panel right-panel'>
                    <div className='content'>
                        <h3>One of us ?</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. An unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <button className='btn-submit transparent' id='sign-in-btn' onClick={onClickSignInMode}>Sign up</button>
                    </div>
                    <img src={imgRegister} className='login-image' alt='register-image' />
                </div>
            </div>
        </div>
    )
}

export default Login
import React , {useState} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber:'',
    avatarURL:'',
}

const Auth = () => {

    const [form , setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
        console.log(form)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {username,password,phoneNumber,avatarURL}=form;

        const URL='http://localhost:5000/auth';

        const {data:{token,userId,hashedPassword,fullName}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username,password,fullName:form.fullName,phoneNumber,avatarURL,
        });

        cookies.set('token',token);
        cookies.set('username',username);
        cookies.set('fullName',fullName);
        cookies.set('userId',userId);

        if(isSignup){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);
        }
        window.location.reload();
    }

    const switchMode = () =>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className ="auth__form-container_fields-content">
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="fullName">Full Name</label>
                            <input name="fullName"
                                   type="text"
                                   placeholder="Full Name"
                                   onChange={handleChange}
                                   required/>
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="username">UserName</label>
                            <input name="username"
                                   type="text"
                                   placeholder="User Name"
                                   onChange={handleChange}
                                   required/>
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="avatarURL">Avatar URL</label>
                            <input name="avatarURL"
                                   type="text"
                                   placeholder="Avatar URL"
                                   onChange={handleChange}
                                   required/>
                        </div>
                    )}
                     <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="password">Password</label>
                            <input name="password"
                                   type="password"
                                   placeholder="Password"
                                   onChange={handleChange}
                                   required/>
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input name="confirmPassword"
                                   type="text"
                                   placeholder="Confirm Password"
                                   onChange={handleChange}
                                   required/>
                        </div>
                    )}
                    <div className ="auth__form-container_fields-content_button">
                        <button>{isSignup ? "Sing Up" : "Sign In"} </button>
                    </div>
                </form>
                <div>
                    <div className ="auth_form-container_fields-account">
                        <p>
                            {isSignup 
                            ? "Aleady have an account?"
                            : "Don't have an account"
                         }
                         <span onClick={switchMode}>
                         {isSignup ? "Sign In" : "Sign Up"}
                         </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                         <img src={signinImage} alt="sign in"/>
            </div>
        </div>
    )
}


export default Auth

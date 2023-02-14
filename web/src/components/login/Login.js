import React, { useState } from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";
import { api } from '../../BabysFoodPlaceAPI';
import {useForm} from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm();
    const handleOnSubmitLoginForm = (data) => {
        api.loginUser(data).then(response => {
            localStorage.setItem("jwt", response.token);
            navigate("/recipes");
        });
    };
    return (<div className="login-content">
        <div className="title">
            <span className="title-text">Log In</span>
        </div>
        <div className="login">
            <div className="login-text">
                <h1><span className="orange">Welcome to</span> <span className="darkgrey">Baby's</span></h1>
                <p className="midgrey">
                    All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                    making
                    this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
                    combined
                    with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The
                    generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                    non-characteristic
                    words etc.
                </p>
            </div>
            <div className="login-form">
                <form onSubmit={handleSubmit(handleOnSubmitLoginForm)}>
                    <label htmlFor="email">
                        E-mail&nbsp;
                        {errors.email && <span className="error">
                                    {errors.email.type === "required" && "(required)"}
                            {errors.email.type === "pattern" && "(invalid e-mail address)"}
                                </span>}
                    </label>
                    <input {...register("email", {required: true, pattern: /.+@.+\..+/})}/>
                    <label htmlFor="password">
                        Password&nbsp;
                        {errors.password?.type === "required" && <span className="error">(required)</span>}
                    </label>
                    <input type="password" {...register("password", {required: true})}/>
                    <button className="green" type="submit">log in</button>
                </form>
            </div>
        </div>
    </div>);
}

export default Login;
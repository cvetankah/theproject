import React from "react";
import "./CreateAccount.css"
import {api} from "../../BabysFoodPlaceAPI";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

function CreateAccount() {
    const {register, formState: {errors}, handleSubmit, getValues} = useForm(); // ovoj hook mi ovozmozuva lesna validacija na podatocite sto mi se staveni vo nekoja forma;
    // register go koristam za da go vrzam input poleto so nekoe ime, za dadena vrednost;
    // errors mi dava lista na error-i (error-i od validacijata);
    // handleSubmit e funkcija sto ja povikuvam koga sakam da go submit-nam request-ot (handler za submit-ot)
    const navigate = useNavigate();
    const handleOnCreateAccountFormSubmit = (user) => {
        api.createUser(user).then(createUserResponse => {
            if (createUserResponse.ok) {
                api.loginUser(user).then(loginUserResponse => {
                    localStorage.setItem("jwt", loginUserResponse.token);
                    navigate("/user/profile");
                });
            }
        });
    };
    const validateRepeatPassword = (repeatPassword) => {
        return getValues().password === repeatPassword;
    };
    return (
        <div className="create-account-content">
            <div className="title">
                <span className="title-text">Create account</span>
            </div>
            <div className="create-account">
                <div className="create-account-text">
                    <h1><span className="orange">Create your</span> <span className="darkgrey"><br/>account</span></h1>
                    <p className="midgrey">
                        All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                        making
                        this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
                        combined
                        with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
                    </p>
                </div>
                <div className="create-account-form">
                    <form onSubmit={handleSubmit(handleOnCreateAccountFormSubmit)}>
                        <div>
                            <label htmlFor="first_name">
                                First Name&nbsp;
                                {errors.first_name && <span className="error">
                                    {errors.first_name.type === "required" && "(required)"}
                                    {errors.first_name.type === "pattern" && "(should not be empty)"}
                                </span>}

                            </label>
                            <input {...register("first_name", {required: true, pattern: /\S+/})}/>
                        </div>
                        <div>
                            <label htmlFor="last_name">
                                Last Name&nbsp;
                                {errors.last_name && <span className="error">
                                    {errors.last_name.type === "required" && "(required)"}
                                    {errors.last_name.type === "pattern" && "(should not be empty)"}
                                </span>}
                            </label>
                            <input {...register("last_name", {required: true, pattern: /\S+/})}/>
                        </div>
                        <div>
                            <label htmlFor="email">
                                E-mail&nbsp;
                                {errors.email && <span className="error">
                                    {errors.email.type === "required" && "(required)"}
                                    {errors.email.type === "pattern" && "(invalid e-mail address)"}
                                </span>}
                            </label>
                            <input {...register("email", {required: true, pattern: /.+@.+\..+/})}/>
                        </div>
                        <div>
                            <label htmlFor="birthday">
                                Birthday&nbsp;
                                {errors.birthday?.type === "required" && <span className="error">(required)</span>}
                            </label>
                            <input type="date" {...register("birthday", {required: true})}/>
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password&nbsp;
                                {errors.password?.type === "required" && <span className="error">(required)</span>}
                            </label>
                            <input type="password" {...register("password", {required: true})}/>
                        </div>
                        <div>
                            <label htmlFor="repeat_password">
                                Repeat Password&nbsp;
                                {errors.repeat_password && <span className="error">
                                    {errors.repeat_password.type === "required" && "(required)"}
                                    {errors.repeat_password.type === "validate" && "(values do not match)"}</span>
                                }
                            </label>
                            <input type="password" {...register("repeat_password", {
                                required: true,
                                validate: validateRepeatPassword
                            })}/>
                        </div>
                        <button className="green" type="submit">create account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
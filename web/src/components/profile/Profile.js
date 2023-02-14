import React, {useEffect, useState} from "react";
import "./Profile.css"
import {api} from "../../BabysFoodPlaceAPI";
import {useForm} from "react-hook-form";

function date(date) {
    return date ? date.split("T")[0] : "";
}

function Profile() {
    const [user, setUser] = useState(null);
    const {register, handleSubmit, reset, formState: {errors}, getValues} = useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const getLoggedInUser = () => {
        api.getLoggedInUser().then(loggedInUser => {
            setUser(loggedInUser);
            setAvatarFile(null);
        });
    };
    const validateRepeatPassword = (repeatPassword) => {
        return getValues().password === repeatPassword;
    };
    const setFormData = () => {
        if (user) {
            reset({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                birthday: date(user.birthday),
                password: '',
                repeat_password: ''
            });
        }
    };
    useEffect(getLoggedInUser, []);
    useEffect(setFormData, [user, reset]);
    const handleUpdateUserFormSubmit = (user) => {
        api.updateUser(user, avatarFile).then(r => getLoggedInUser());
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setAvatarFile(files[0]);
        } else {
            setAvatarFile(null);
        }
    };
    return (

        <div className="content">
            <div className="title">
                <span className="title-text">My Profile</span>
            </div>
            {user ? <div className="profile">
                <div className="profile-photo">
                    {user.avatarFileBase64 ? <img src={user.avatarFileBase64} alt="User avatar"/> :
                        <img src={require('../../default-avatar.png')} alt="Default avatar"/>}
                    <label htmlFor="profile-photo-upload" className="transparent">change avatar</label>
                    <input id="profile-photo-upload" type="file" accept="image/*" onChange={handleFileChange}/>
                </div>
                <div className="profile-form">
                    <form onSubmit={handleSubmit(handleUpdateUserFormSubmit)}>
                        <div>
                            <label htmlFor="first_name">
                                First Name&nbsp;
                                {errors.first_name && <span className="error">
                                    {errors.first_name.type === "required" && "(required)"}
                                    {errors.first_name.type === "pattern" && "(should not be empty)"}
                                </span>}</label>
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
                                    {errors.email.type === "pattern" && "(invalid e-mail)"}
                                </span>}
                            </label>
                            <input disabled {...register("email", {required: true, pattern: /.+@.+\..+/})}/>
                        </div>
                        <div>
                            <label htmlFor="birthday">
                                Birthday&nbsp;
                                {errors.birthday?.type === "required" && <span className="error">(required)</span>}
                            </label>
                            <input type="date" {...register("birthday", {required: true})}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password")}/>
                        </div>
                        <div>
                            <label htmlFor="repeat_password">
                                Repeat Password&nbsp;
                                {errors.repeat_password?.type === "validate" && <span className="error">(values do not match)</span>}
                            </label>
                            <input type="password" {...register("repeat_password", {
                                validate: validateRepeatPassword
                            })}/>
                        </div>
                        <button className="green" type="submit">save</button>
                    </form>
                </div>
            </div> : <></>}
        </div>);
}

export default Profile;
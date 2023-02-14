import './App.css';
import React from 'react';
import Header from "./components/header/Header";
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import CreateAccount from "./components/create-account/CreateAccount";
import Category from "./components/category/Category";
import Profile from "./components/profile/Profile";
import UserRecipes from "./components/user_recipes/UserRecipes";
import Logout from "./components/logout/Logout";

const App = () => {
  return (
     <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/recipes" element={<Home />}/>
          <Route path="/recipes/:category" element={<Category />}/>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<CreateAccount />}/>
          <Route path="/user/profile" element={<Profile />}/>
          <Route path="/user/recipes" element={<UserRecipes />} />
          <Route path="/user/logout" element={<Logout />} />
          <Route path="*" element={< Navigate to={{pathname: "/recipes"}}/>} />
        </Routes>
        <Footer />
     </BrowserRouter>
  );
}

export default App;

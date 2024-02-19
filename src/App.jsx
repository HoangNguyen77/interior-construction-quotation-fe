import React, {useState} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./layouts/Header.jsx";
import Footer from "./layouts/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import HomeSlider from "./pages/home/components/HomeSlider.jsx";
import QuotationCategory from "./pages/quotation-category/QuotationCategory.jsx";
import Register from "./pages/register/Register.jsx";
import EnableAccount from "./pages/register/EnableAccount.jsx";
import Login from "./pages/login/Login.jsx";
import About from "./pages/about/About.jsx";
import Blog from "./pages/blog/Blog.jsx";
import QuotationCalculator from "./pages/quotation-calculator/QuotationCalculator.jsx";
import FinishedProject from "./pages/finished-project/FinishedProject.jsx";
import CheckPage from "./pages/CheckPage.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path='/home' element={<Home/>}></Route>
                    <Route path='/quotation-category' element={<QuotationCategory/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/enable/:email/:enableCode' element={<EnableAccount/>}/>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                    <Route path='/blog' element={<Blog/>}></Route>
                    <Route path='/quotation-calculator' element={<QuotationCalculator/>}></Route>
                    <Route path='/finished-project' element={<FinishedProject/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App

import React, {useState} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./layouts/Header.jsx";
import Footer from "./layouts/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import HomeSlider from "./pages/home/components/HomeSlider.jsx";
import QuotationCategory from "./pages/quotation-category/QuotationCategory.jsx";
import Register from "./pages/customer/register/Register.jsx";
import EnableAccount from "./pages/customer/register/EnableAccount.jsx";
import Login from "./pages/login/Login.jsx";
import About from "./pages/about/About.jsx";
import Blog from "./pages/blog/Blog.jsx";
import QuotationCalculator from "./pages/quotation-calculator/QuotationCalculator.jsx";
import Profile from "./pages/customer/Profile.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from "./pages/blog/BlogDetail.jsx";
import ForgetPassword from "./pages/customer/forget-password/ForgetPassword.jsx";
import BlogForm from "./pages/staff/BlogForm.jsx";
import Finished from "./pages/finished-project/Finished.jsx";
import Product from "./pages/showroom/Product.jsx";
import ProductDetail from "./pages/showroom/ProductDetail.jsx";
import MainAdmin from "./pages/admin/MainAdmin.jsx";
import "./tailwind.css"

function App() {
    return (
        <div>
            <ToastContainer />
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
                    <Route path='/blog/:blogId' element={<BlogDetail/>}></Route>
                    <Route path='/quotation-calculator' element={<QuotationCalculator/>}></Route>
                    <Route path='/product' element={<Product/>}></Route>
                    <Route path='/product/:productId' element={<ProductDetail/>}></Route>
                    <Route path='/info' element={<Profile/>}></Route>
                    <Route path='/admin' element={<MainAdmin/>}></Route>
                    <Route path='/forget-password' element={<ForgetPassword/>}></Route>
                    <Route path='/staff/blog-form' element={<BlogForm/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App

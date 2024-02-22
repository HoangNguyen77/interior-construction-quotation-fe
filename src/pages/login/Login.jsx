import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";
import {isToken, isTokenExpired} from "../../utils/JwtService.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        if (isToken() && isTokenExpired(localStorage.getItem('token'))) navigation("/");
    }, []);
    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password
        }
        fetch(
            'http://localhost:8080/user/login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            }
        ).then(
            response => {
                if (response.ok){
                    return response.json();
                }
            }
        ).then(
            data => {
                const { jwt } = data;
                console.log(jwt)
                const decodedToken = jwtDecode(jwt);
                console.log(decodedToken.enabled)
                // Kiểm tra xem tài khoản kích hoạt chưa
                if (decodedToken.enabled === false) {
                    toast.warning(
                        "Tài khoản của bạn chưa kích hoạt hoặc đã bị vô hiệu hoá"
                    );
                }else{
                    toast.success("Đăng nhâp thành công");
                    localStorage.setItem("token", jwt);
                    navigation("/")
                }
            }
        ).catch(
            error => {
                console.log(error)
                setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.");
                toast.warning("Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.")
            }
        )
    }
    return (
        <div className="container w-25">
            <h3 className="text-center mt-5">VivaDecor</h3>
            <h4>Đăng nhập</h4>
            <hr/>

            <div className="form-group">
                {error&&<div style={{color:"red"}}>{error}</div>}
                {/*Username input*/}
                <div className="form-outline mb-4">
                    <input type="text" id="form2Example1" className="form-control" value={username} onChange={e=> setUsername(e.target.value)}/>
                    <label className="form-label" htmlFor="form2Example1">Username</label>
                </div>

                {/*Password input*/}
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" value={password} onChange={e=> setPassword(e.target.value)}/>
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>

                {/*2 column grid layout for inline styling*/}
                <div className="row mb-4">
                    <div className="col-6 d-flex justify-content-center">
                        {/*Checkbox*/}
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                    </div>

                    <div className="col-6">
                        {/*Simple link*/}
                        <a href="#!">Quên mật khẩu?</a>
                    </div>
                </div>

                {/*Submit button*/}
                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleLogin}>Đăng nhập</button>

                {/*Register buttons */}
                <div className="text-center">
                    <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
                             <p>hoặc đăng nhập với:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="icon-facebook"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="icon-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="icon-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="icon-github"></i>
                    </button>
                </div>
            </div>
            <Link to="/" style={{color: "blue", display: "flex", justifyContent:"center", fontSize:"18px"}} className="">Quay trở lại trang chủ</Link>
        </div>
    )
}
export default Login
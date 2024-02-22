import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {getIdUserByToken, getUsernameByToken, isToken, isTokenExpired, logout} from "../../utils/JwtService.js";
import Footer from "../../layouts/Footer.jsx";
import {checkInput, checkPhonenumber} from "../../utils/Validation.js";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

function Profile() {

    const sectionRef = useRef(null);
    const userId = parseInt(getIdUserByToken());
    const navigation = useNavigate();

    console.log(userId);
    const [user, setUser] = useState({
        username: "",
        enableCode: "",
        enabled: false,
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: ""
    })

    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorPhonenumber, setErrorPhonenumber] = useState("");
    const [thongBao, setThongBao] = useState("");
    const [update, setUpdate] = useState(false)



    useEffect(() => {
        if (!isToken() || !isTokenExpired(localStorage.getItem('token'))) navigation("/login");
        // Cuộn xuống phần section khi trang được tải
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
        const username = getUsernameByToken();
        console.log(username)

        const url = `http://localhost:8080/users/${userId}`;

        async function fetchData() {
            const response = await fetch(url);
            return response.json();
        }

        fetchData()
            .then(data => {
                setUser({
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phonenumber: data.phonenumber,
                    enabled: data.enabled,
                    enableCode: data.enableCode,
                    password: data.password
                })

            })
            .catch(error => {
                console.error('Fetch data error:', error);
            });
    }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render

    const handleFirstNameChange = (e) => {
        // Thay đổi giá trị
        setUser({...user, firstName: e.target.value});
        // Kiểm tra
        setErrorFirstName('');
        // Kiểm tra sự tồn tại
        return checkInput(setErrorFirstName, e.target.value);
    }
    const handleLastNameChange = (e) => {
        // Thay đổi giá trị
        setUser({...user, lastName: e.target.value});
        // Kiểm tra
        setErrorLastName('');
        // Kiểm tra sự tồn tại
        return checkInput(setErrorLastName, e.target.value);
    }
    const handlePhonenumberChange = (e) => {
        // Thay đổi giá trị
        setUser({...user, phonenumber: e.target.value});
        // Kiểm tra
        setErrorPhonenumber('');
        // Kiểm tra sự tồn tại
        return checkPhonenumber(setErrorPhonenumber, e.target.value);
    }
    const handleUpdateProfile = () => {

        fetch(
            `http://localhost:8080/users/${userId}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(user)
            }
        ).then(
            response => {

                if (response.ok){
                    toast.success("Cập nhập thành công");
                    setUpdate(!update);
                    return response.json();
                }
            }
        ).catch(
            error => {
                console.log(error)
                toast.warning("Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.");
            }
        )
    }

    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(images/hero_1.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Thông tin của bạn</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section" ref={sectionRef}>
                <div className="container">
                    <h2>Thông tin của bạn</h2>
                    <hr/>
                    <h5>Tên đăng nhập</h5>
                    <p>{user.username}</p>
                    <h5>Email</h5>
                    <p>{user.email}</p>
                    <h5>Họ đệm</h5>
                    {
                        update ?
                            (
                                <div>
                                    <input type="text" value={user.firstName} className="form-control mb-2"
                                           onChange={handleFirstNameChange}/>
                                    <div style={{color: "red"}}>{errorFirstName}</div>
                                </div>

                            )
                            :
                            (
                                <p>{user.firstName}</p>
                            )
                    }
                    <h5>Tên</h5>
                    {
                        update ?
                            (
                                <div>
                                    <input type="text" value={user.lastName} className="form-control mb-2"
                                           onChange={handleLastNameChange}/>
                                    <div style={{color: "red"}}>{errorLastName}</div>
                                </div>

                            )
                            :
                            (
                                <p>{user.lastName}</p>
                            )
                    }
                    <h5>Số điện thoại</h5>
                    {
                        update ?
                            (
                                <div>
                                    <input type="text" value={user.phonenumber} className="form-control mb-2"
                                           onChange={handlePhonenumberChange}/>
                                    <div style={{color: "red"}}>{errorPhonenumber}</div>
                                </div>

                            )
                            :
                            (
                                <p>{user.phonenumber}</p>
                            )
                    }
                    <hr/>
                    <div style={{color: "green"}}>{thongBao}</div>
                    {
                        update ?
                            (
                                <div>
                                    <button type="button" className="btn btn-danger mb-3 mr-3"
                                            onClick={() => setUpdate(!update)}>Hủy cập nhập
                                    </button>
                                    <button type="button" className="btn btn-success mb-3 mr-3"
                                            onClick={handleUpdateProfile}
                                    >Lưu
                                    </button>
                                </div>

                            )
                            :
                            (
                                <button type="button" className="btn btn-success mb-3"
                                        onClick={() => setUpdate(!update)}>Cập nhập
                                    thông tin
                                </button>
                            )
                    }
                    <br/>
                    {
                        !update && <button type="button" className="btn btn-danger">Đổi mật khẩu</button>
                    }

                </div>
            </div>
            <Footer/>

        </div>

    )
}

export default Profile
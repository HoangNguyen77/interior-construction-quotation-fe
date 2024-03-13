import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {
    getIdUserByToken,
    getRoleByToken,
    getUsernameByToken,
    isToken,
    isTokenExpired,
    logout
} from "../../utils/JwtService.js";
import Footer from "../../layouts/Footer.jsx";
import {checkInput, checkPassword, checkPasswordAgain, checkPhonenumber} from "../../utils/Validation.js";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

function Profile() {

    const sectionRef = useRef(null);
    const sectionRef2 = useRef(null);
    const userId = parseInt(getIdUserByToken());
    const navigation = useNavigate();

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
    const [initialUserData, setInitialUserData] = useState(null);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");

    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorPhonenumber, setErrorPhonenumber] = useState("");
    const [errorOldPassword, setErrorOldPassword] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorNewPasswordAgain, setErrorNewPasswordAgain] = useState("");

    const [thongBao, setThongBao] = useState("");
    const [update, setUpdate] = useState(false);
    const [changPassword, setChangePassword] = useState(false);


    useEffect(() => {
        if (!isToken() || !isTokenExpired(localStorage.getItem('token'))) navigation("/login");
        // Cuộn xuống phần section khi trang được tải
        sectionRef.current.scrollIntoView({behavior: 'smooth'});

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
                // Lưu trữ thông tin ban đầu của user
                setInitialUserData({
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phonenumber: data.phonenumber,
                    enabled: data.enabled,
                    enableCode: data.enableCode,
                    password: data.password
                });
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
    const handleOldPasswordChange = (e) => {
        // Thay đổi giá trị
        setOldPassword(e.target.value)
        // Kiểm tra
        setErrorOldPassword('');
        // Kiểm tra sự tồn tại
        return checkInput(setErrorOldPassword, e.target.value);
    }
    const handleNewPasswordChange = e => {
        // Thay đổi giá trị
        setNewPassword(e.target.value)
        // Kiểm tra
        setErrorNewPassword('');
        // Kiểm tra sự tồn tại
        return checkPassword(setErrorNewPassword, e.target.value);
    }
    const handleNewPasswordAgainChange = e => {
        // Thay đổi giá trị
        setNewPasswordAgain(e.target.value);
        // Kiểm tra
        setErrorNewPasswordAgain('');
        // Kiểm tra sự tồn tại
        return checkPasswordAgain(setErrorNewPasswordAgain, e.target.value, newPassword);
    }
    const handleUpdateProfile = () => {
        fetch(
            `http://localhost:8080/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(user)
            }
        ).then(
            response => {

                if (response.ok) {
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
    const handleChangePassword = () => {
        if (!checkInput(setErrorOldPassword, oldPassword) && !checkPassword(setErrorNewPassword, newPassword) && !checkPasswordAgain(setErrorNewPasswordAgain, newPasswordAgain, newPassword)) {
            fetch(
                `http://localhost:8080/user/change-password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Authorization':`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: user.username,
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    })
                }
            ).then(
                response => {

                    if (response.ok) {
                        toast.success("Đổi mật khẩu thành công!");
                        setChangePassword(!changPassword);
                        return response.json();
                    } else {
                        toast.warning("Đổi mật khẩu không thành công. Vui lòng kiểm tra lại mật khẩu hiện tại");
                    }
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        } else {
            toast.warning("Vui lòng kiểm tra lại các trường thông tin!");
        }
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
                    <div className="h2">Thông tin của bạn</div>
                    <hr/>




                    <div className="mt-3 ml-3">
                        <div className="flex items-center">
                            <div className="h5 mr-3 ml-3">Tên đăng nhập:</div>
                            <div className="h6 mr-3 font-medium">{user.username}</div>
                        </div>

                        <div className="flex items-center">
                            <div className="h5 mr-3 ml-3">Email:</div>
                            <div className="h6 mr-3 font-medium">{user.email}</div>
                        </div>

                        <div className="flex items-center">
                            <div className="h5 mr-3 ml-3">Họ đệm:</div>
                            {update ? (
                                <div className="flex items-center">
                                    <input type="text" value={user.firstName} className="form-control mb-2 mr-3"
                                           onChange={handleFirstNameChange}/>
                                    <div style={{color: "red"}}>{errorFirstName}</div>
                                </div>
                            ) : (
                                <div className="h6 mr-3 font-medium">{user.firstName}</div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <div className="h5 mr-3 ml-3">Tên:</div>
                            {update ? (
                                <div className="flex items-center">
                                    <input type="text" value={user.lastName} className="form-control mb-2 mr-3"
                                           onChange={handleLastNameChange}/>
                                    <div style={{color: "red"}}>{errorLastName}</div>
                                </div>
                            ) : (
                                <div className="h6 mr-3 font-medium">{user.lastName}</div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <div className="h5 mr-3 ml-3">Số điện thoại:</div>
                            {update ? (
                                <div className="flex items-center">
                                    <input type="text" value={user.phonenumber} className="form-control mb-2 mr-3"
                                           onChange={handlePhonenumberChange}/>
                                    <div style={{color: "red"}}>{errorPhonenumber}</div>
                                </div>
                            ) : (
                                <div className="h6 mr-3 font-medium">{user.phonenumber}</div>
                            )}
                        </div>
                    </div>


                    <div style={{color: "green"}}>{thongBao}</div>
                    {
                        update ?
                            (
                                <div>
                                    <div className="btn btn-danger mb-3 mr-3"
                                         onClick={() => {
                                             setErrorFirstName("");
                                             setErrorLastName("");
                                             setErrorPhonenumber("");
                                             setUser(initialUserData);
                                             setUpdate(!update)
                                         }
                                         }>Hủy cập nhập
                                    </div>
                                    <div className="btn btn-success mb-3 mr-3"
                                         onClick={handleUpdateProfile}
                                    >Lưu
                                    </div>
                                </div>

                            )
                            :
                            (
                                <div className="btn btn-success mb-3 mt-2"
                                     onClick={
                                         () => {
                                             setUpdate(!update)
                                         }
                                     }>Cập nhập thông tin
                                </div>
                            )
                    }
                    <hr ref={sectionRef2}></hr>
                    <div className="btn btn-danger mt-3" onClick={() => {
                        setOldPassword("")
                        setNewPassword("")
                        setNewPasswordAgain("");
                        setErrorOldPassword("");
                        setErrorNewPassword("");
                        setNewPasswordAgain("");
                        setChangePassword(!changPassword);
                        sectionRef2.current.scrollIntoView({behavior: 'smooth'});
                    }
                    }>{changPassword ? "Hủy" : "Đổi mật khẩu"}</div>
                    {
                        changPassword && (
                            <div className="form-group w-25 mt-3">

                                <div className="form-outline mb-4">
                                    <input type="password" id="form2Example1" className="form-control"
                                           value={oldPassword} onChange={handleOldPasswordChange}
                                    />
                                    <label className="form-label" htmlFor="form2Example1">Mật khẩu cũ</label>
                                    <div style={{color: "red"}}>{errorOldPassword}</div>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="form2Example1" className="form-control"
                                           value={newPassword} onChange={handleNewPasswordChange}
                                    />
                                    <label className="form-label" htmlFor="form2Example1">Mật khẩu mới</label>
                                    <div style={{color: "red"}}>{errorNewPassword}</div>
                                </div>
                                <div className="form-outline">
                                    <input type="password" id="form2Example2" className="form-control"
                                           value={newPasswordAgain} onChange={handleNewPasswordAgainChange}
                                    />
                                    <label className="form-label" htmlFor="form2Example2">Nhập lại mật khẩu mới</label>
                                    <div style={{color: "red"}}>{errorNewPasswordAgain}</div>
                                </div>
                                <div className="btn btn-success mb-3 mr-3"
                                     onClick={handleChangePassword}
                                >Lưu
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
            <Footer/>

        </div>

    )
}

export default Profile
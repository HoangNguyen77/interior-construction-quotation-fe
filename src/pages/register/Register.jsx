import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    checkEmail,
    checkInput,
    checkPassword,
    checkPasswordAgain,
    checkPhonenumber,
    checkUsername
} from "../../utils/Validation.js";
import {toast} from "react-toastify";
function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordAgain, setErrorPasswordAgain] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorPhonenumber, setErrorPhonenumber] = useState("");
    const [thongBao, setThongBao] = useState("");

    const handleSubmit = async (e) => {
        // Clear any previous error messages
        setErrorUsername('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorPasswordAgain('');
        setErrorFirstName('');
        setErrorLastName('');
        setErrorPhonenumber('');

        // Tránh click liên tục
        e.preventDefault();

        // Kiểm tra các điều kiện và gán kết quả vào biến
        const isUsernameValid = !await checkUsername(setErrorUsername, username);
        const isEmailValid = !await checkEmail(setErrorEmail, email);
        const isPasswordValid = !checkPassword(setErrorPassword, password);
        const isPasswordAgainValid = !checkPasswordAgain(setErrorPasswordAgain, passwordAgain, password);
        const isFirstNameValid = !checkInput(setErrorFirstName, firstName);
        const isLastNameValid = !checkInput(setErrorLastName, lastName);
        const isPhonenumberValid = !checkPhonenumber(setErrorPhonenumber, phonenumber);
        console.log(isPasswordAgainValid);
        // Kiểm tra tất cả các điều kiện
        if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordAgainValid && isFirstNameValid && isLastNameValid && isPhonenumberValid) {
            try {
                const loadingToastId = toast.loading("Đang xử lý...");
                const url = 'http://localhost:8080/user/register';
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            email: email,
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            phonenumber: phonenumber,
                            enabled: 0,
                            enableCode: ""
                        })
                    }
                )
                if(response.ok){
                    toast.dismiss(loadingToastId);
                    toast.success("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt.\nNếu không có xin hãy kiểm tra lại email đăng ký!");
                }else{
                    toast.warning("Đã xảy ra lỗi trong quá trình đăng ký tài khoản!");
                }
            } catch (error) {
                toast.warning("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }else{
            console.log("???")
        }
    }
    // KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////

    const handleUsernameChange = (e) => {
        // Thay đổi giá trị
        setUsername(e.target.value);
        // Kiểm tra
        setErrorUsername('');
        // Kiểm tra sự tồn tại
        return checkUsername(setErrorUsername, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////


    // KIỂM TRA EMAIL ////////////////////////////////////////////////
    const handleEmailChange = (e) => {

        // Thay đổi giá trị
        setEmail(e.target.value);
        // Kiểm tra
        setErrorEmail('');
        // Kiểm tra sự tồn tại
        return checkEmail(setErrorEmail, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA MẬT KHẨU ///////////////////////////////////////////////
    const handlePasswordChange = (e) => {
        // Thay đổi giá trị
        setPassword(e.target.value);
        // Kiểm tra
        setErrorPassword('');
        // Kiểm tra sự tồn tại
        return checkPassword(setErrorPassword, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA MẬT KHẨU LẶP LẠI ////////////////////////////////////////////////
    const handlePasswordAgainChange = (e) => {
        // Thay đổi giá trị
        setPasswordAgain(e.target.value);
        // Kiểm tra
        setErrorPasswordAgain('');
        // Kiểm tra sự tồn tại
        return checkPasswordAgain(setErrorPasswordAgain, e.target.value, password);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA HỌ ĐỆM ////////////////////////////////////////////////
    const handleFirstNameChange = (e) => {
        // Thay đổi giá trị
        setFirstName(e.target.value);
        // Kiểm tra
        setErrorFirstName('');
        // Kiểm tra sự tồn tại
        return checkInput(setErrorFirstName, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA TÊN ////////////////////////////////////////////////
    const handleLastNameChange = (e) => {
        // Thay đổi giá trị
        setLastName(e.target.value);
        // Kiểm tra
        setErrorLastName('');
        // Kiểm tra sự tồn tại
        return checkInput(setErrorLastName, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA SỐ ĐIỆN THOẠI ////////////////////////////////////////////////
    const handlePhonenumberChange = (e) => {
        // Thay đổi giá trị
        setPhonenumber(e.target.value);
        // Kiểm tra
        setErrorPhonenumber('');
        // Kiểm tra sự tồn tại
        return checkPhonenumber(setErrorPhonenumber, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    return(
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="w-50 mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <div style={{color: "red"}}>{errorUsername}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div style={{color: "red"}}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div style={{color: "red"}}>{errorPassword}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordAgain" className="form-label">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="passwordAgain"
                            className="form-control"
                            value={passwordAgain}
                            onChange={handlePasswordAgainChange}
                        />
                        <div style={{color: "red"}}>{errorPasswordAgain}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            id="hoDem"
                            className="form-control"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <div style={{color: "red"}}>{errorFirstName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Tên</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                        <div style={{color: "red"}}>{errorLastName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phonenumber" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            id="phonenumber"
                            className="form-control"
                            value={phonenumber}
                            onChange={handlePhonenumberChange}
                        />
                        <div style={{color: "red"}}>{errorPhonenumber}</div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                    </div>
                </form>
                <Link to="/login" style={{color: "blue"}}>Trở lại trang đăng nhập</Link>
            </div>
        </div>
    )
}

export default Register
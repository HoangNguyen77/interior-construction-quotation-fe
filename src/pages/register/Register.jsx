import React, {useState} from "react";
import {Link} from "react-router-dom";
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
        const isUsernameValid = !await checkUsername(username);
        const isEmailValid = !await checkEmail(email);
        const isPasswordValid = !checkPassword(password);
        const isPasswordAgainValid = !checkPasswordAgain(passwordAgain);
        const isFirstNameValid = !checkFirstName(firstName);
        const isLastNameValid = !checkLastName(lastName);
        const isPhonenumberValid = !checkPhonenumber(phonenumber);

        // Kiểm tra tất cả các điều kiện
        if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordAgainValid && isFirstNameValid && isLastNameValid && isPhonenumberValid) {
            try {
                setThongBao("Đang xử lý...")
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
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt.\nNếu không có xin hãy kiểm tra lại email đăng ký!");
                }else{
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản!");
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    }
    // KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////
    const checkUsername = async (username) => {
        if(username.trim()===""){
            setErrorUsername("Thông tin bắt buộc");
            return true;
        }

        // end-point
        const url = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
        console.log(url);
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorUsername("Tên đăng nhập đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
            return false; // Xảy ra lỗi
        }
    }

    const handleUsernameChange = (e) => {
        // Thay đổi giá trị
        setUsername(e.target.value);
        // Kiểm tra
        setErrorUsername('');
        // Kiểm tra sự tồn tại
        return checkUsername(e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////


    // KIỂM TRA EMAIL ////////////////////////////////////////////////
    const checkEmail = async (email) => {
        if(email.trim()===""){
            setErrorUsername("Thông tin bắt buộc!");
            return true;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setErrorEmail("Email phải đúng định dạng!");
            return true;
        }
        // end-point
        const url = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
        console.log(url);
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra email:", error);
            return false; // Xảy ra lỗi
        }
    }

    const handleEmailChange = (e) => {

        // Thay đổi giá trị
        setEmail(e.target.value);
        // Kiểm tra
        setErrorEmail('');
        // Kiểm tra sự tồn tại
        return checkEmail(e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA MẬT KHẨU ////////////////////////////////////////////////
    const checkPassword = (password) => {
        if(password.trim()===""){
            setErrorUsername("Thông tin bắt buộc!");
            return true;
        }
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)!");
            return true;
        } else {
            setErrorPassword(""); // Mật khẩu hợp lệ
            return false;
        }
    }

    const handlePasswordChange = (e) => {
        // Thay đổi giá trị
        setPassword(e.target.value);
        // Kiểm tra
        setErrorPassword('');
        // Kiểm tra sự tồn tại
        return checkPassword(e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA MẬT KHẨU LẶP LẠI ////////////////////////////////////////////////
    const checkPasswordAgain = (passwordAgain) => {
        if (passwordAgain !== password) {
            setErrorPasswordAgain("Mật khẩu không trùng khớp!");
            return true;
        } else {
            setErrorPasswordAgain(""); // Mật khẩu trùng khớp
            return false;
        }
    }

    const handlePasswordAgainChange = (e) => {
        // Thay đổi giá trị
        setPasswordAgain(e.target.value);
        // Kiểm tra
        setErrorPasswordAgain('');
        // Kiểm tra sự tồn tại
        return checkPasswordAgain(e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA HỌ ĐỆM ////////////////////////////////////////////////
    const checkFirstName = (firstName) => {
        if (firstName.trim() === "") {
            setErrorFirstName("Thông tin bắt buộc!");
            return true;
        } else {
            setErrorFirstName("");
            return false;
        }
    }

    const handleFirstNameChange = (e) => {
        // Thay đổi giá trị
        setFirstName(e.target.value);
        // Kiểm tra
        setErrorFirstName('');
        // Kiểm tra sự tồn tại
        return checkFirstName(e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA TÊN ////////////////////////////////////////////////
    const checkLastName = (lastName) => {
        if (lastName.trim() === "") {
            setErrorLastName("Thông tin bắt buộc!");
            return true;
        } else {
            setErrorLastName("");
            return false;
        }
    }

    const handleLastNameChange = (e) => {
        // Thay đổi giá trị
        setLastName(e.target.value);
        // Kiểm tra
        setErrorLastName('');
        // Kiểm tra sự tồn tại
        return checkLastName(e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA SỐ ĐIỆN THOẠI ////////////////////////////////////////////////
    const checkPhonenumber = (phonenumber) => {
        if (phonenumber.trim() === "") {
            setErrorPhonenumber("Thông tin bắt buộc!");
            return true;
        }
        const phonenumberRegex = /^0\d{9}$/;
        if (!phonenumberRegex.test(phonenumber)) {
            setErrorPhonenumber("Số điện thoại không hợp lệ!");
            return true;
        } else {
            setErrorPhonenumber("");
            return false;
        }
    }

    const handlePhonenumberChange = (e) => {
        // Thay đổi giá trị
        setPhonenumber(e.target.value);
        // Kiểm tra
        setErrorPhonenumber('');
        // Kiểm tra sự tồn tại
        return checkPhonenumber(e.target.value);
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
                        <div style={{color: "green"}}>{thongBao}</div>
                    </div>
                </form>
                <Link to="/login" style={{color: "blue"}}>Trở lại trang đăng nhập</Link>
            </div>
        </div>
    )
}

export default Register
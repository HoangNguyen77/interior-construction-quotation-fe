// KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////
export const checkUsername = async (setErrorUsername, username) => {
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
///////////////////////////////////////////////////////////////////////////////

// KIỂM TRA EMAIL ////////////////////////////////////////////////
export const checkEmail = async (setErrorEmail, email) => {
    if(email.trim()===""){
        setErrorEmail("Thông tin bắt buộc!");
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
///////////////////////////////////////////////////////////////////////////////

// KIỂM TRA USERNAME AND EMAIL FOR FORGET ////////////////////////////////////////////////
export const checkUsernameExist = async (setErrorUsername, username) => {
    let flag;
    if(username.trim()===""){
        setErrorUsername("Thông tin bắt buộc");
        flag = true;
    }

    // end-point
    const url = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
    console.log(url);
    // call api
    try {
        const response = await fetch(url);
        const data = await response.text();
        if (data === "false") {
            setErrorUsername("Tên đăng nhập không tồn tại!");
            flag = true
        }else{
            flag = false;
        }

    } catch (error) {
        console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
        flag = false; // Xảy ra lỗi
    }

    return flag;
}

export const checkEmailWithUsername = async (setErrorEmail, email, username) => {
    if(email.trim()===""){
        setErrorEmail("Thông tin bắt buộc!");
        return true;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        setErrorEmail("Email phải đúng định dạng!");
        return true;
    }
    // end-point
    const url = `http://localhost:8080/users/search/existsByUsernameAndEmail?username=${username}&email=${email}`;
    console.log(url);
    // call api
    try {
        const response = await fetch(url);
        const data = await response.text();
        if (data === "false") {
            setErrorEmail("Email không trùng khớp!");
            return true;
        }
        return false;
    } catch (error) {
        console.error("Lỗi khi kiểm tra email:", error);
        return false; // Xảy ra lỗi
    }
}
export const checkEmailValid = (setErrorEmail, email) => {
    if(email.trim()===""){
        setErrorEmail("Thông tin bắt buộc!");
        return true;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        setErrorEmail("Email phải đúng định dạng!");
        return true;
    }
    return false;
}
///////////////////////////////////////////////////////////////////////////////

// KIỂM TRA MẬT KHẨU ////////////////////////////////////////////////
export const checkPassword = (setErrorPassword, password) => {
    if(password.trim()===""){
        setErrorPassword("Thông tin bắt buộc!");
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
///////////////////////////////////////////////////////////////////////////////

// KIỂM TRA MẬT KHẨU LẶP LẠI ////////////////////////////////////////////////
export const checkPasswordAgain = (setErrorPasswordAgain, passwordAgain, password) => {
    if (passwordAgain !== password) {
        setErrorPasswordAgain("Mật khẩu không trùng khớp!");
        return true;
    } else {
        setErrorPasswordAgain(""); // Mật khẩu trùng khớp
        return false;
    }
}
///////////////////////////////////////////////////////////////////////////////

// KIỂM TRA SỐ ĐIỆN THOẠI ////////////////////////////////////////////////
export const checkPhonenumber = (setErrorPhonenumber, phonenumber) => {
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
///////////////////////////////////////////////////////////////////////////////

// KIỂM TRA DỮ LIỆU NHẬP VÀO KHÔNG ĐƯỢC RỖNG ////////////////////////////////////////////////
export const checkInput = (setErrorInput, input) => {
    if (input.trim() === "") {
        setErrorInput("Thông tin bắt buộc!");
        return true;
    } else {
        setErrorInput("");
        return false;
    }
}
///////////////////////////////////////////////////////////////////////////////
export const checkInputDouble = (setErrorInput, input) => {
    if (typeof input !== 'string') {
        // Handle non-string inputs
        setErrorInput("Vui lòng nhập thông tin!");
        return true;
    }

    // Now it's safe to call trim() on input
    if (input.trim() === "") {
        setErrorInput("Thông tin bắt buộc!");
        return true;
    } else if (isNaN(parseFloat(input))) {
        setErrorInput("Vui lòng nhập số!");
        return true;
    } else {
        setErrorInput("");
        return false;
    }
}
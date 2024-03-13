import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    checkEmail, checkEmailValid,
    checkEmailWithUsername,
    checkInput,
    checkUsername,
    checkUsernameExist
} from "../../../utils/Validation.js";
import {toast} from "react-toastify";
function ForgetPassword(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errorUsername, setErrorUsername] = useState("")
    const [errorEmail, setErrorEmail] = useState("");

    // KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////

    const handleUsernameChange = (e) => {
        // Thay đổi giá trị
        setUsername(e.target.value);
        // Kiểm tra
        setErrorUsername('');
        // Kiểm tra sự tồn tại
        return checkInput(setErrorUsername, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////


    // KIỂM TRA EMAIL ////////////////////////////////////////////////
    const handleEmailChange = (e) => {

        // Thay đổi giá trị
        setEmail(e.target.value);
        // Kiểm tra
        setErrorEmail('');
        // Kiểm tra sự tồn tại
        return checkEmailValid(setErrorEmail, e.target.value);
    }
    ///////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return;
        const isInputUsernameValid = !checkInput(setErrorUsername, username)
        const isInputEmailValid = !checkEmailValid(setErrorEmail, email)
        const isUsernameValid = !await checkUsernameExist(setErrorUsername, username)
        const isEmailValid = !await checkEmailWithUsername(setErrorEmail, email, username)
        if (isInputUsernameValid && isInputEmailValid && isUsernameValid && isEmailValid){
            setIsSubmitting(true);
            const loadingToastId = toast.loading("Đang xử lý...");
            try {
                const url = 'http://localhost:8080/user/forget-password';
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            email: email
                        })
                    }
                )
                if(response.ok){
                    toast.dismiss(loadingToastId);
                    toast.success("Vui lòng kiểm tra gmail đã đăng ký để tiếp tục!");
                }else{
                    toast.dismiss(loadingToastId);
                    toast.warning("Đã xảy ra lỗi trong quá trình xử lý!");
                }
            } catch (error) {
                toast.dismiss(loadingToastId);
                toast.warning("Đã xảy ra lỗi trong quá trình xử lý!")
            }
        }
    }
    return (
        <div>
            <div className="bg-blur"></div>
            <div className="centered-form">
                <div className="container w-25 p-2" style={{borderRadius: '20px', zIndex:'3', backgroundColor:'#ffffff'}}>
                    <div className="h2 text-center mt-5">VivaDecor</div>
                    <div className="h4">Quên mật khẩu</div>
                    <hr/>

                    <form className="form mt-2" onSubmit={handleSubmit}>
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
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{backgroundColor:"red"}}>
                                Gửi
                            </button>
                        </div>
                    </form>
                    <Link to="/login" style={{color: "blue", display: "flex", justifyContent: "center", fontSize: "18px"}}
                          className="">Quay trở lại trang đăng nhập</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
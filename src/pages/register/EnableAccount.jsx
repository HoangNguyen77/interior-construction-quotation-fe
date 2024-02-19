import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function EnableAccount(){
    const { email } = useParams();
    const { enableCode } = useParams();
    const [enable, setEnable] = useState(false);
    const [announcement, setAnnouncement] = useState("");

    useEffect(()=>{

        if(email && enableCode){
            activate();
        }
    }, []);

    const activate = async() =>{
        try {
            const url = `http://localhost:8080/user/enable?email=${email}&enableCode=${enableCode}`;
            const response = await fetch(url,  {method: "GET"} );

            if(response.ok){
                setEnable(true);
            }else{
                const data = await response.json();
                console.log(data)
                setAnnouncement(data.content);
            }
        } catch (error) {
        }
    }
    return (
        <div className="container text-center">
            <h1>Kích hoạt tài khoản</h1>
            {
                enable ? (<p> Tài khoản đã kích hoạt thành công, bạn hãy <Link to="/login" style={{color: "red"}}>đăng nhập</Link> để tiếp tục sử dụng dịch vụ!</p>) :
                    (
                        <p>{announcement}</p>
                    )
            }
            {
                !enable && <div className="btn btn-success"><Link to="/" style={{color: "white"}}>Trang chủ</Link></div>
            }
        </div>
    )
}

export default EnableAccount
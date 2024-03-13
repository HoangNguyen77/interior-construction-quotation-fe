// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {getRoleByToken} from "../../utils/JwtService.js";
//
// const RequireAdmin = (WrappedComponent) => {
//     const WithAdminCheck = (props) => {
//         const navigate = useNavigate();
//         useEffect(() => {
//             const token = localStorage.getItem('token');
//             console.log("Token: " + token);
//             if (!token) {
//                 navigate("/login");
//                 return;
//             } else {
//                 const role = getRoleByToken() ;
//                 if (!(role === "ADMIN")) {
//                     navigate("/403");
//                     return;
//                 }
//             }
//         }, [navigate]);
//         return <WrappedComponent {...props} />;
//     };
//     return WithAdminCheck;
// }
//
// export default RequireAdmin;

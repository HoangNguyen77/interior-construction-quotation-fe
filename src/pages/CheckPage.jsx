import React from "react";
import {useNavigate, useParams} from "react-router-dom";
function CheckPage(){
    const navigation = useNavigate();
    const page = useParams();
    if (page === "") navigation("/home");
}
export default CheckPage
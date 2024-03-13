import React, {useEffect, useRef, useState} from 'react';
import ManageBlog from './ManageBlog';
import ManageUser from './ManageUser';
import TypeRoom from './ManageShowroom/Typeroom&Product';
import Description from './ManageShowroom/Description';
import ManageFinished from './ManageFinished';
import ManageQuotation from "./ManageQuotation.jsx";
// import RequireAdmin from "./RequireAdmin.jsx";
import {toast} from "react-toastify";
import {
  getIdUserByToken, isToken, isTokenExpired,
} from "../../utils/JwtService.js";
import {Link} from "react-router-dom";

const MainAdmin = () => {
  const [selectedTab, setSelectedTab] = useState(-1);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const userId = parseInt(getIdUserByToken());
  const [user, setUser] = useState({
    firstName: "",
    lastName: ""
  })

  useEffect(() => {
    const url = `http://localhost:8080/users/${userId}`;

    async function fetchData() {
      const response = await fetch(url);
      return response.json();
    }

    fetchData().then(data =>{
      setUser({
        firstName: data.firstName,
        lastName: data.lastName
      })
    })

  }, []);

  const tabMenu = [
    'Loại phòng và sản phẩm',
    'Mô tả sản phẩm',
    'Quản lý người dùng',
    'Dự án đã thi công',
    'Quản lý Blog',
    'Quản lý báo giá'
  ];


  return (
      <div className='bg-main-admin grid grid-cols-7 p-3'>
        <div
            className='bg-menu col-span-1 h-[96vh] w-full bg-[#202022] rounded-[0.75rem] text-white p-3 flex flex-col justify-between'>
          <div>
            <div className='tag-name'>
              <div className='pb-2 text-[14px]'>Tài khoản</div>
              <div
                  className='name-user text-[24px] border-b-[0.5px] pb-2 border-[#5a5a5a]'>{user.firstName} {user.lastName}</div>
            </div>


            <div className='tab-menu mt-3'>
              {tabMenu.map((tab, index) => (
                  <div
                      key={index}
                      className={`${index === selectedTab ? 'bg-[#348EED] pl-4' : ''}`}
                      onClick={() => {
                        handleTabClick(index);
                        toast.dismiss();
                      }
                      }
                  >
                    {tab}
                  </div>
              ))}
            </div>
          </div>


          <div className="flex justify-center mt-8">
            <Link to="/home"
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Home Page
            </Link>
          </div>


        </div>
        <div className='col-span-6 '>
          {selectedTab === 0 ? (
              <TypeRoom/>
          ) : selectedTab === 1 ? (
              <Description/>
          ) : selectedTab === 2 ? (
              <ManageUser/>
          ) : selectedTab === 3 ? (
              <ManageFinished />
          ) : selectedTab === 4 ? (
              <ManageBlog />
          ) : selectedTab === 5 ?(
              <ManageQuotation/>
          ) : (
              ""
          )}

        </div>
      </div>
  );
};
export default MainAdmin;
import React, { useState } from 'react';
import ManageBlog from './ManageBlog';
import ManageUser from './ManageUser';


const MainAdmin = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    console.log(index);
  };

  const tabMenu = [
    'Quản lý Showroom',
    'Quản lý người dùng',
    'Dự án đã thi công',
    'Các loại thi công nội thất',
    'Quản lý Blog',
  ];

  return (
    <div className='bg-main-admin grid grid-cols-7 p-3'>
      <div className='bg-menu col-span-1 h-[96vh] w-full bg-[#202022] rounded-[0.75rem] text-white p-3 flex flex-col justify-between'>
        <div>
          <div className='tag-name'>
            <div className='pb-2 text-[14px]'>Tài khoản</div>
            <div className='name-user text-[24px] border-b-[0.5px] pb-2 border-[#5a5a5a]'>Nguyễn Công Chiến</div>
          </div>

          <div className='tab-menu mt-3'>
            {tabMenu.map((tab, index) => (
              <div
                key={index}
                className={`${index === selectedTab ? 'bg-[#348EED] pl-4' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>


        <div className=''>
          <div className='logout text-center bg-[#348EED]'>Đăng xuất</div>
        </div>


      </div>
      <div className='col-span-6 '>
        {selectedTab === 1 ? (
          <ManageUser />
        ) : selectedTab === 2 ? (
          <ManageUser />
        ) : selectedTab === 3 ? (
          <ManageUser />
        ) : selectedTab === 4 ? (
          <ManageBlog />
        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export default MainAdmin;
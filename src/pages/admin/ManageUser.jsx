import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faTrashCan,
  faPencil,
  faUser,
  faRepeat
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ classIcon, color, size }) => {
  const iconSize = {
    width: size,
    height: size,
    color: color,
    cursor: "pointer"
  };

  return (
    <span>
      <FontAwesomeIcon icon={classIcon} style={iconSize} />
    </span>

  );
};

const ManageUser = () => {
  const [isModeShow, setModeShow] = useState(false);

  const handleModeShowToggle = () => {
    setModeShow(!isModeShow);
  };

  return (
    <div className='h-[96vh] pl-3'>
      <div className='w-full h-[150px] relative'>
        <div className='title-admin absolute top-0 left-0'>QUẢN LÝ NGƯỜI DÙNG</div>
        <div className='absolute bottom-0 left-0'>
          <input
            className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
            placeholder='Nhập tên, email, số điện thoại...'
          />
        </div>
        <div className='absolute bottom-1 left-[365px]'><Icon classIcon={faSearch} color={"black"} size={"24px"} /></div>
        <div className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
          <Icon classIcon={faUser} color={"white"} size={"32px"} />
        </div>
        <div className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
          <div>
            <div className='text-[24px] text-black'>56</div>
            <div className='text-[24px] text-black'>Nhân viên</div>
          </div>
        </div>

        <div className='absolute z-10 top-0 right-[540px] w-[80px] h-[80px] bg-[#348EED] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
          <Icon classIcon={faUser} color={"white"} size={"32px"} />
        </div>
        <div className='absolute top-[40px] right-[350px] w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
          <div>
            <div className='text-[24px] text-black'>1254</div>
            <div className='text-[24px] text-black'>Khách hàng</div>
          </div>
        </div>
      </div>


      <div className='table-all-posts h-auto mt-[50px]'>
        <div className={`w-4/5 h-[60px] relative top-7 ${isModeShow ? 'bg-[#60B664]' : 'bg-[#348EED]'} text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white`}>KHÁCH HÀNG
          <div className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer' onClick={handleModeShowToggle}>
            <Icon classIcon={faRepeat} color={"white"} size={"24px"} />
          </div>
          <div className='absolute right-[60px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer'>
            <Icon classIcon={faPlus} color={"white"} size={"24px"} />
          </div>
        </div>

        <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
          <div className='grid grid-cols-10 py-3 gap-2'>
            <div className='col-span-1 text-[#348EED]'>ID</div>
            <div className='col-span-2 text-[#348EED]'>Họ và tên</div>
            <div className='col-span-3 text-[#348EED]'>Địa chỉ</div>
            <div className='col-span-2 text-[#348EED]'>Email</div>
            <div className='col-span-1 text-[#348EED]'>Số điện thoại</div>
            <div className='col-span-1 text-[#348EED]'></div>
          </div>

          <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
            <div className='col-span-3 text-black flex flex-col justify-center'>Hồ Chí Minh</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>ncc@gmail.com</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>01273687123</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>2</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
            <div className='col-span-3 text-black flex flex-col justify-center'>Hồ Chí Minh</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>ncc@gmail.com</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>01273687123</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>3</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
            <div className='col-span-3 text-black flex flex-col justify-center'>Hồ Chí Minh</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>ncc@gmail.com</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>01273687123</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>4</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
            <div className='col-span-3 text-black flex flex-col justify-center'>Hồ Chí Minh</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>ncc@gmail.com</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>01273687123</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ManageUser
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
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

const Typeroom = () => {
  return (
    <div className='h-auto pl-3'>
      <div className='w-full h-[150px]'>
        <div className='title-admin'>QUẢN LÝ LOẠI PHÒNG VÀ SẢN PHẨM</div>
        <div className='grid grid-cols-10 gap-[100px] pt-5'>
          <div className="col-span-4 flex flex-col justify-between">

            <div>
              <div className='flex justify-between text-black text-[24px]'>
                <div className='w-2/5 h-[50px] flex flex-col justify-center'>Tên loại phòng</div>
                <input className='w-3/5 h-[50px] shadow1 border-2 border-[#858585] rounded-[5px] px-2 bg-[#EAEDF2]' />
              </div>
              <div className='w-full flex justify-end mt-3'>
                <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'>Thêm</button>
              </div>
            </div>

            <div>
              <div className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#348EED] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>LOẠI PHÒNG</div>
              <div className='h-[59vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                <div className='grid grid-cols-4 py-3 gap-2'>
                  <div className='col-span-1 text-[#348EED]'>ID</div>
                  <div className='col-span-2 text-[#348EED]'>Tên loại phòng</div>
                  <div className='col-span-1 text-[#60B664]'></div>
                </div>

                <div className='grid grid-cols-4 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-4 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>2</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-4 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>3</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-4 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>4</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
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
          <div className="col-span-6 flex flex-col justify-between">

            <div>
              <div className='flex justify-between text-black text-[24px]'>
                <div className='w-2/5 h-[50px] flex flex-col justify-center'>Chọn loại phòng</div>
                <select className='w-3/5 h-[50px] shadow1 border-2 border-[#858585] rounded-[5px] px-2 bg-[#EAEDF2]'>
                  <option value="">Phòng khách</option>
                  <option value="">Phòng bếp</option>
                  <option value="">Phòng ngủ</option>
                </select>
              </div>

              <div className='flex justify-between text-black text-[24px] mt-3'>
                <div className='w-2/5 h-[50px] flex flex-col justify-center'>Tên sản phẩm</div>
                <input className='w-3/5 h-[50px] shadow1 border-2 border-[#858585] rounded-[5px] px-2 bg-[#EAEDF2]' />
              </div>

              <div className='w-full flex justify-end mt-3'>
                <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'>Thêm</button>
              </div>
            </div>

            <div>
              <div className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#348EED] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>SẢN PHẨM</div>
              <div className='h-[59vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                <div className='grid grid-cols-6 py-3 gap-2'>
                  <div className='col-span-1 text-[#348EED]'>ID</div>
                  <div className='col-span-2 text-[#348EED]'>Tên loại phòng</div>
                  <div className='col-span-2 text-[#348EED]'>Tên sản phẩm</div>
                  <div className='col-span-1 text-[#60B664]'></div>
                </div>

                <div className='grid grid-cols-6 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Bàn ghế</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-6 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>2</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng bếp</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Tủ</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-6 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>3</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng ngủ</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Giường</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-6 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>4</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Bàn ghế</div>
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
        </div>
      </div>
    </div>
  )
}

export default Typeroom
import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {getAllBlogWithUsername, getBlogById} from "../../../api/blog/BlogAPI.js";
import {getAllCategory, getAllRoomTypes, getRoomTypeById} from "../../../api/product/ProductAPI.jsx";
import ProductProps from "../../showroom/components/ProductProps.jsx";
import {checkInput} from "../../../utils/Validation.js";
import {getIdUserByToken} from "../../../utils/JwtService.js";
import {toast} from "react-toastify";
import {getAllBlogImageData} from "../../../api/blog/BlogImageAPI.js";

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
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRoomType, setTotalRoomType] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [errorRoomName, setErrorRoomName] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [update, setUpdate] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [errorCategoryName, setErrorCategoryName] = useState("");

  useEffect(() => {
    getAllRoomTypes(currentPage - 1).then(
        result => {
          setRoomTypeList(result.roomTypeList);
          setTotalPage(result.totalPages);
          setTotalRoomType(result.totalRoomTypes);
        }
    ).catch(error => {
          console.log(error)
        }
    )
  }, [currentPage]);
  useEffect(() => {
    getAllCategory(currentPage - 1).then(
        result => {
          setCategoryList(result.categoryList);
          setTotalPage(result.totalPages);
          setTotalCategories(result.totalCategories);
        }
    ).catch(error => {
          console.log(error)
        }
    )
  }, [currentPage]);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
    setErrorRoomName("");
    return checkInput(setErrorRoomName, e.target.value);
  }
  const handleCreateRoomType = async () => {
    const isRoomName = !checkInput(setErrorRoomName, roomName);
    if (isRoomName) {
      try {
        const url = 'http://localhost:8080/type-room';
        const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                blogId: 0,
                roomName: roomName
              })
            }
        )
        if (response.ok) {
          setIsChanged(!isChanged);
          setCurrentPage(1);
          setRoomName("");
          toast.success("Thêm loại phòng thành công");
        } else {
          toast.warning("Đã xảy ra lỗi trong quá trình thêm loại phòng!");
        }
      } catch (error) {
        toast.warning("Đã xảy ra lỗi trong quá trình thêm loại phòng!")
      }
    }
  }
  const handleUpdateRoomType = async () => {
    const isRoomName = !checkInput(setErrorRoomName, roomName);
    if (isRoomName) {
      try {
        const url = `http://localhost:8080/type-room/${roomId}`;
        const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                blogId: 0,
                roomName: roomName
              })
            }
        )
        if (response.ok) {
          setIsChanged(!isChanged);
          setCurrentPage(1);
          setRoomName("");
          toast.success("Chỉnh sửa loại phòng thành công");
        } else {
          toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa loại phòng!");
        }
      } catch (error) {
        toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa loại phòng!")
      }
    }
  }
  const handleButtonUpdateRoom = async (roomId) => {
    setUpdate(true);
    setRoomId(roomId);
    try {
      const roomTypeResult = await getRoomTypeById(roomId);
      console.log('Room type data:', roomTypeResult); // Check the structure
      if (roomTypeResult) {
        setRoomName(roomTypeResult.roomName);
      } else {
        console.log('No blog data returned');
      }
    } catch (error) {
      console.error('Failed to fetch room type by ID:', error);
    }
  }
  const handleDeleteRoomType = async (id) => {
    // Display toast confirmation
    toast.warn(({closeToast}) => (
        <div>
          <div className="h5">Bạn có chắc chắn muốn xóa blog này?</div>
          <div className="row justify-content-between">
            <div className="col-2 btn btn-danger" onClick={() => {
              deleteRoomType(id);
              closeToast(); // Close the toast after deletion
            }}>Xóa
            </div>
            <div className="col-2 btn btn-secondary" onClick={closeToast}>Hủy</div>
          </div>
        </div>
    ), {
      position: "top-center",
      autoClose: false,
      closeButton: false,
      style: {
        width: "400px", // Điều chỉnh chiều rộng của khung toast
        padding: "20px", // Thêm padding nếu cần
        backgroundColor: "#fff", // Màu nền của khung toast
        color: "white", // Màu chữ của nội dung toast
        borderRadius: "8px" // Bo tròn các góc của khung toast
      }
    });
  };
  const deleteRoomType = async (id) => {
    try {
      const url = `http://localhost:8080/type-room/${id}`;
      const response = await fetch(url, {
            method: 'DELETE'
          }
      )
      if (response.ok) {
        setIsChanged(!isChanged);
        setCurrentPage(1);
        toast.success("Xóa loại phòng thành công");
      } else {
        toast.warning("Đã xảy ra lỗi trong quá trình xóa loại phòng!");
      }
    }catch (error){
      {
        toast.error("Đã xảy ra lỗi trong quá trình xóa loại phòng!");
      }
    }
  }
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
    setErrorCategoryName("");
    return checkInput(setErrorCategoryName, e.target.value);
  }
  const handleCreateCategory = async () => {
    const isCategorryName = !checkInput(setCategoryName, categoryName);
    if (isCategorryName) {
      try {
        const url = 'http://localhost:8080/category-product';
        const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                categoryId: 0,
                categoryName: categoryName
              })
            }
        )
        if (response.ok) {
          setIsChanged(!isChanged);
          setCurrentPage(1);
          setCategoryName("");
          toast.success("Thêm sản phẩm thành công");
        } else {
          toast.warning("Đã xảy ra lỗi trong quá trình thêm sản phẩm phòng!");
        }
      } catch (error) {
        toast.warning("Đã xảy ra lỗi trong quá trình thêm sản phẩm phòng!")
      }
    }
  }
  return (
    <div className='h-auto pl-3'>
      <div className='w-full h-[150px]'>
        <div className='title-admin'>QUẢN LÝ LOẠI PHÒNG VÀ SẢN PHẨM</div>
        <div className='grid grid-cols-10 gap-[100px] pt-5'>
          <div className="col-span-4 flex flex-col justify-between">

            <div>
              <div className='flex justify-between text-black text-[24px]'>
                <div className='w-2/5 h-[50px] flex flex-col justify-center'>Tên loại phòng</div>
                <input className='w-3/5 h-[50px] shadow1 border-2 border-[#858585] rounded-[5px] px-2 bg-[#EAEDF2]'
                       value={roomName}
                       onChange={handleRoomNameChange}
                />

              </div>
              <div className='w-full flex justify-end mt-3'>
                <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'
                onClick={update? handleUpdateRoomType : handleCreateRoomType}
                >Lưu</button>
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
                <div className='overflow-y-auto h-[44vh] pr-3'>
                {roomTypeList.map(roomType => (
                    <div key={roomType.roomId} className='grid grid-cols-4 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>{roomType.roomId}</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>{roomType.roomName}</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                          <div className='flex justify-end gap-2'>
                            <div onClick={() => handleDeleteRoomType(roomType.roomId)}>
                            <Icon classIcon={faTrashCan} color={"black"} size={"20px"}/>
                            </div>
                            <div onClick={() => handleButtonUpdateRoom(roomType.roomId)}>
                            <Icon classIcon={faPencil} color={"black"} size={"20px"}/>
                            </div>
                          </div>
                        </div>
                    </div>
                ))}
                </div>
              </div>
            </div>

          </div>
          <div className="col-span-6 flex flex-col justify-between">

            <div>
              <div className='flex justify-between text-black text-[24px]'>
                <div className='w-2/5 h-[50px] flex flex-col justify-center'>Chọn loại phòng</div>
                <select className='w-3/5 h-[50px] shadow1 border-2 border-[#858585] rounded-[5px] px-2 bg-[#EAEDF2]'>
                  {roomTypeList.map(roomType => (
                      <option key={roomType.roomId} value="">{roomType.roomName}</option>
                  ))}
                </select>
              </div>

              <div className='flex justify-between text-black text-[24px] mt-3'>
                <div className='w-2/5 h-[50px] flex flex-col justify-center'>Tên sản phẩm</div>
                <input className='w-3/5 h-[50px] shadow1 border-2 border-[#858585] rounded-[5px] px-2 bg-[#EAEDF2]' />
              </div>

              <div className='w-full flex justify-end mt-3'>
                <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'>Lưu</button>
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
                <div className='overflow-y-auto h-[44vh] pr-3'>
                {categoryList.map(category => (
                <div key={category.categoryId} className='grid grid-cols-6 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                  <div className='col-span-1 text-black flex flex-col justify-center'>{category.categoryId}</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>Phòng khách</div>
                  <div className='col-span-2 text-black flex flex-col justify-center'>{category.categoryName}</div>
                  <div className='col-span-1 text-black flex flex-col justify-center'>
                    <div className='flex justify-end gap-2'>
                      <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                      <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                    </div>
                  </div>
                </div>
                    ))}
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
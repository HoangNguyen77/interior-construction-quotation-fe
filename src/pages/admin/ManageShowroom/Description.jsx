import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faTrashCan,
  faPencil
} from "@fortawesome/free-solid-svg-icons";
import {getAllCategory, getAllCategoryByRoomId, getAllRoomTypes} from "../../../api/product/ProductAPI.jsx";

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

const Description = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);

  const [roomTypeList, setRoomTypeList] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    // Thêm ảnh vào danh sách
    setImages([...images, selectedImage]);
  };

  const handleDelete = () => {
    setImages([]);
  }
  useEffect(() => {
    getAllRoomTypes(0)
        .then(result => {
          setRoomTypeList(result.roomTypeList);
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  useEffect(() => {
    if (roomId !== 0) {
      getAllCategoryByRoomId(roomId)
          .then(result => {
            setCategoryList(result.categoryList);
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      setCategoryList([]); // Đặt lại danh sách loại sản phẩm khi roomId = 0
    }
  }, [roomId]);

  const handleTypeRoomChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setRoomId(id);
    setSelectedCategoryId(0); // Đặt lại loại sản phẩm khi chọn loại phòng mới
  };

  const handleCategoryChange = (e) => {
    const id = parseInt(e.target.value, 10); // Chuyển đổi giá trị selectedCategoryId thành number
    setSelectedCategoryId(id);
  };

  return (
    <div className='h-auto pl-3'>
      <div className='w-full h-[90px] relative'>
        <div className='title-admin absolute top-0 left-0'>MÔ TẢ SẢN PHẨM</div>
      </div>

      {isModalOpen && (
        <div className={`relative w-full`}>
          <div className='w-full flex justify-between'>
            <div className='text-black text-[20px]'>Thêm mô tả</div>
            <div className='cursor-pointer hover:text-[#ff0000]' onClick={handleModalToggle}>{`[Đóng]`}</div>
          </div>
          <div className='flex mb-3 gap-[10px]'>
            <div className='flex flex-col'>
              <select
                  className='bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                  defaultValue="default"
                  onChange={handleTypeRoomChange}
              >
                <option disabled={true} value="default">----Chọn loại phòng----</option>
                {roomTypeList.map(room => (
                    <option key={room.roomId} value={room.roomId}>{room.roomName}</option>
                ))}
              </select>

              <select
                  className='bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                  value={selectedCategoryId}
                  onChange={handleCategoryChange}
                  disabled={roomId === 0}
              >
                <option disabled={selectedCategoryId !== 0} value="default">----Chọn loại sản phẩm----</option>
                {categoryList.map(category => (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                ))}
              </select>


              <textarea
                  className='text-black bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] h-[100px] rounded-[5px] w-[400px] p-2'
                  placeholder='Nhập mô tả...'
              />
            </div>

            <div className='flex flex-col w-full'>
              <div className='flex h-[50px] gap-3'>
                <input
                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'
                    placeholder='Chiều dài...'
                />
                <input
                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'
                    placeholder='Chiều rộng...'
                />
                <input
                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'
                    placeholder='Chiều cao...'
                />
                <input
                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[180px] h-[40px] px-2 text-black'
                    placeholder='Đơn giá...'
                />
                {/*<input*/}
                {/*  className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'*/}
                {/*  placeholder='Đơn vị...'*/}
                {/*/>*/}
                <select
                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[200px] h-[40px] px-2'
                    defaultValue="default"
                >
                  <option disabled={true} value="default">----Chọn loại đơn vị----</option>
                  <option>Cái</option>
                  <option>m2</option>
                  <option>m3</option>
                </select>
              </div>
              <div
                  className='h-[150px] w-full bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] p-[10px] flex gap-[10px]'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className='h-[126px] w-[126px] object-cover rounded-[5px]'
                  />
                ))}
                <label htmlFor='image-upload' className='cursor-pointer'>
                  <div className='h-[126px] w-[126px] border-2 outline-dashed rounded-[3px] flex flex-col justify-center text-center'>
                    <input
                      id='image-upload'
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <div className='w-[40px] h-[40px] rounded-[5px] flex flex-col justify-center mx-auto'>
                      <Icon classIcon={faPlus} color={"black"} size={"40px"} />
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/*<button className='bg-[#ff2e2e] px-3 py-2 rounded-[5px] text-white mr-3' onClick={handleDelete}>Hủy</button>*/}
          <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'>Thêm</button>
        </div>
      )}

      <div className='table-all-posts h-auto mt-[50px]'>
        <div className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#348EED] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>MÔ TẢ SẢN PHẨM
          <div className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer' onClick={handleModalToggle}>
            <Icon classIcon={faPlus} color={"white"} size={"24px"} />
          </div>
        </div>

        <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
          <div className='grid grid-cols-12 py-3 gap-2'>
            <div className='col-span-1 text-[#348EED]'>ID</div>
            <div className='col-span-2 text-[#348EED]'>Hình ảnh</div>
            <div className='col-span-2 text-[#348EED]'>Sản phẩm</div>
            <div className='col-span-2 text-[#348EED]'>Chất liệu</div>
            <div className='col-span-2 text-[#348EED]'>Dài - Rộng - Cao</div>
            <div className='col-span-1 text-[#348EED]'>Giá thành</div>
            <div className='col-span-1 text-[#348EED]'>Đơn vị</div>
            <div className='col-span-1 text-[#348EED]'></div>
          </div>

          <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>
              <img className='w-3/5' src='../../public/images/image 2.png' />
            </div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Bàn</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Gỗ liêm</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>12 - 15 - 10</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>100000</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>1m vuong</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>
              <img className='w-3/5' src='../../public/images/image 2.png' />
            </div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Bàn</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Gỗ liêm</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>12 - 15 - 10</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>100000</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>1m vuong</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>
              <img className='w-3/5' src='../../public/images/image 2.png' />
            </div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Bàn</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Gỗ liêm</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>12 - 15 - 10</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>100000</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>1m vuong</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>
              <div className='flex justify-end gap-2'>
                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
            <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>
              <img className='w-3/5' src='../../public/images/image 2.png' />
            </div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Bàn</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>Gỗ liêm</div>
            <div className='col-span-2 text-black flex flex-col justify-center'>12 - 15 - 10</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>100000</div>
            <div className='col-span-1 text-black flex flex-col justify-center'>1m vuong</div>
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

export default Description
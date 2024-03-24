import { Input, Modal, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getValidCurrency} from "../../utils/Validation.js";

const QuoteTableConfirm = ({ selectedQuotationItem }) => {
  const [dataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [headerId, setHeaderId] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!selectedQuotationItem) {
  //       return;
  //     }
  //
  //     try {
  //       const response = await axios.get(`http://localhost:8080/quotation-list/${selectedQuotationItem}/quotationDetailList`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${localStorage.getItem("token")}`,
  //         }
  //       });
  //       const headerResponse = await axios.get(`http://localhost:8080/quotation-list/${selectedQuotationItem}/quotationHeader`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${localStorage.getItem("token")}`,
  //         }
  //       });
  //       setHeaderId(headerResponse.data.headerId);
  //       if (response.status === 200) {
  //         setDataSource(response.data._embedded.quotationDetails);
  //         calculateTotalPrice(response.data._embedded.quotationDetails);
  //       } else {
  //         throw new Error('Network response was not ok');
  //       }
  //     } catch (error) {
  //       console.error('There was a problem with the request:', error);
  //     }
  //   };
  //
  //   fetchData();
  // }, [selectedQuotationItem]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedQuotationItem) {
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/quotation-list/${selectedQuotationItem}/quotationDetailList`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const headerResponse = await axios.get(`http://localhost:8080/quotation-list/${selectedQuotationItem}/quotationHeader`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setHeaderId(headerResponse.data.headerId);
        if (response.status === 200) {
          const quotationDetails = response.data._embedded.quotationDetails;
          // Fetch and set image data for each quotation detail
          const updatedDataSource = await Promise.all(quotationDetails.map(async (detail) => {
            const productDetailLink = detail._links.product.href;
            const productResponse = await axios.get(productDetailLink, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
              }
            });

            if (productResponse.status === 200) {
              const productImagesLink = productResponse.data._links.productImageList.href;
              const productImagesResponse = await axios.get(productImagesLink, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
              });

              if (productImagesResponse.status === 200 && productImagesResponse.data._embedded.productImages.length > 0) {
                const firstImage = productImagesResponse.data._embedded.productImages[0].imageData;
                // Set image data for the current quotation detail
                return { ...detail, imageData: firstImage };
              }
            }
            return detail; // Return the detail as is if there is no image data
          }));

          setDataSource(updatedDataSource);
          calculateTotalPrice(updatedDataSource);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };

    fetchData();
  }, [selectedQuotationItem]);

  const handleAgree = () => {
    props.onAgree();
  };
  const calculateTotalPrice = (data) => {
    const totalPrice = data.reduce((acc, cur) => acc + parseFloat(cur.realTotalPrice), 0);
    setTotalPrice(totalPrice);
  };

  const handleNoteChange = (value, key) => {
    const newData = dataSource.map((item) => {
      if (item.detailId === key) {
        return { ...item, note: value }; // Update the 'note' property
      }
      return item;
    });
    setDataSource(newData); // Update the dataSource state with the new data
  };

  const handleOk = () => {
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    const dataToSend = dataSource.map(item => ({
      detailId: item.detailId,
      realPrice: item.realTotalPrice,
      note: item.note
    }));

    try {
      const response = await axios.post(`http://localhost:8080/quotation/add-quotation-detail-customer?totalPrice=${totalPrice}&headerId=${headerId}`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });

      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }

    setModalVisible(false);
  };

  const columns = [
    {
      title: 'Loại phòng',
      dataIndex: 'typeRoom',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageData',
      render: (imageData) => <img src={imageData} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px' }} />,
    },
    {
      title: 'Dài',
      dataIndex: 'length',
    },
    {
      title: 'Rộng',
      dataIndex: 'width',
    },
    {
      title: 'Cao',
      dataIndex: 'height',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'estimateTotalPrice',
      render: (estimateTotalPrice) => getValidCurrency(estimateTotalPrice),
    },
    {
      title: 'Giá thực tế',
      dataIndex: 'realTotalPrice',
      render: (realTotalPrice) => getValidCurrency(realTotalPrice),
      width: 120
      // width: '25%',
      // render: (_, record) => (
      //   <Input
      //     value={record.realTotalPrice}
      //     onChange={(e) => handlePriceChange(e.target.value, record.detailId)}
      //   />
      // ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      width: 300,
      render: (_, record) => (
        <Input
          value={record.note}
          onChange={(e) => handleNoteChange(e.target.value, record.detailId)} // Call handleNoteChange on change
        />
      ),
    },
  ];

  return (
      <div className='table-container'>
        <div className='quotetable-title'>
          <Title level={2}>Bảng Tạm Tính Giá Phần Vật Liệu</Title>
        </div>
        <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowKey="detailId"
            footer={() => (
                <div>
                  <span style={{fontWeight: 'bold'}}>Tổng Tiền: </span>
                  <span>{getValidCurrency(totalPrice)}</span>
                  {/* <span>{totalPrice}</span> */}
                </div>
            )}
        />

        <Modal
            visible={modalVisible}
            onOk={handleConfirm}
            onCancel={() => setModalVisible(false)}
            footer={null}
        >
          <p>Gửi yêu cầu sửa đơn báo giá?</p>
          <div style={{textAlign: 'right'}}>
            <button onClick={() => setModalVisible(false)} className="border-green-500 text-black-">Hủy</button>
            <button onClick={handleConfirm} className="border-green-500 text-green-500">Đồng ý</button>
          </div>
        </Modal>



        <button onClick={handleOk} className="btn btn-primary btn-block mb-4 mt-4">
          Gửi yêu cầu chỉnh sửa báo giá
        </button>
      </div>
  );
};

export default QuoteTableConfirm;

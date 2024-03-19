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
          setDataSource(response.data._embedded.quotationDetails);
          calculateTotalPrice(response.data._embedded.quotationDetails);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };

    fetchData();
  }, [selectedQuotationItem]);

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
      // width: '10%',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      // width: '10%'
    },
    {
      title: 'Dài',
      dataIndex: 'length',
      // width: '10%',
    },
    {
      title: 'Rộng',
      dataIndex: 'width',
      // width: '10%',
    },
    {
      title: 'Cao',
      dataIndex: 'height',
      // width: '10%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      // width: '10%',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'estimateTotalPrice',
      render: (estimateTotalPrice) => getValidCurrency(estimateTotalPrice),
      // width: '20%',
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
          <p>Xác nhận đơn báo giá?</p>
          <div style={{textAlign: 'right'}}>
            <button onClick={() => setModalVisible(false)} className="border-green-500 text-black-">Hủy</button>
            <button onClick={handleConfirm} className="border-green-500 text-green-500">Đồng ý</button>
          </div>
        </Modal>


        <button onClick={handleOk} className="btn btn-primary btn-block mb-4 mt-4">
          Xác nhận
        </button>
      </div>
  );
};

export default QuoteTableConfirm;

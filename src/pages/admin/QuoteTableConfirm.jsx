import { Input, Modal, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuoteTableConfirm = ({ selectedQuotationItem }) => {
  const [dataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedQuotationItem) {
        // console.log("selectedQuotationItem is null or undefined");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/quotation-list/${selectedQuotationItem}/quotationDetailList`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });

        if (response.status === 200) {
          setDataSource(response.data._embedded.quotationDetails);
          calculateTotalPrice(response.data._embedded.quotationDetails); // Calculate initial total price
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

  const handlePriceChange = (value, key) => {
    const newData = dataSource.map((item) => {
      if (item.detailId === key) {
        return { ...item, realTotalPrice: value };
      }
      return item;
    });
    setDataSource(newData);
    calculateTotalPrice(newData);
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
    // Show confirmation modal
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    // Prepare data to send
    const dataToSend = dataSource.map(item => ({
      detailId: item.detailId,
      realPrice: item.realTotalPrice,
      note: item.note
    }));

    try {
      const response = await axios.put(`http://localhost:8080/quotation/update-quotation-detail?totalPrice=${totalPrice}`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });

      // Handle success response
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }

    // Close modal after sending data
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
      // width: '20%',
    },
    {
      title: 'Giá thực tế',
      dataIndex: 'realTotalPrice',
      width: 120,
      render: (_, record) => (
          <Input
              value={record.realTotalPrice}
              onChange={(e) => handlePriceChange(e.target.value, record.detailId)}
          />
      ),
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
      <div className='table-container' >
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
                  <span style={{ fontWeight: 'bold' }}>Tổng Tiền: </span>
                  <span>{totalPrice}</span>
                  {/* <span>{totalPrice}</span> */}
                </div>
            )}
        />

        <Modal
            title="Confirmation"
            visible={modalVisible}
            onOk={handleConfirm}
            onCancel={() => setModalVisible(false)}
            footer={null}
        >
          <p>Are you sure you want to confirm?</p>
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
          </div>
        </Modal>

        <button onClick={handleOk}>OK</button>
      </div>
  );
};

export default QuoteTableConfirm;

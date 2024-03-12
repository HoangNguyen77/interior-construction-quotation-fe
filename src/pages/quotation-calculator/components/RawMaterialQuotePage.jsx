import { Button, Input, InputNumber, Modal, Popconfirm, Select, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const RawMaterialQuotePage = () => {
  const [rawMaterial, setRawMaterial] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      RoomType:
        [
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ],
      Product: [
        { value: 'product1', label: 'Product 1' },
        { value: 'product2', label: 'Product 2' },
        { value: 'product3', label: 'Product 3' },
        { value: 'product4', label: 'Product 4' }
      ],
      Furniture: 'Bàn',
      Length: '0',
      Width: '0',
      Height: '0',
      Quantity: 1, // Default quantity set to 1
      TotalCost: 0,
      Note: 'Ban khong gi',
    }
  ]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/rawMaterial/getAllRawMaterial?page=0&size=23&sort=id', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setRawMaterial(response.data.data.content);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count + 1,
      Furniture: 'Bàn',
      RoomType: 'Phòng Khách',
      Length: '12',
      Width: '32',
      Height: '43',
      Unit: 'M2',
      Quantity: 2, // Default quantity set to 1
      UnitPrice: 2300,
      TotalCost: 46000,
      Note: 'Ban khong gi',
    };
    setDataSource([...dataSource, newData]);
    console.log([...dataSource, newData])
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = dataSource.map((item) => {
      if (item.key === row.key) {
        const totalCost = (row.Quantity || 0) * (row.UnitPrice || 0);
        return { ...item, ...row, TotalCost: totalCost };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleRawMaterialChange = (value, key) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        const selectedRawMaterial = rawMaterial.find(f => f.name === value);
        const totalCost = (item.M2 || 0) * (selectedRawMaterial?.pricePerM2 || 0);
        return {
          ...item,
          RawMaterial: value,
          pricePerM2: selectedRawMaterial?.pricePerM2 || '',
          TotalCost: totalCost
        };
      }
      return item;
    });
    setDataSource(newData);
    console.log(newData)
  };

  const columns = [
    {
      title: 'Loại phòng',
      dataIndex: 'RoomType',
      width: '10%',
      render: (_, record) => (
        <Select
          showSearch
          placeholder="Select a RawMaterial"
          optionFilterProp="children"
          onChange={(value) => handleRawMaterialChange(value, record.key)}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          // options={rawMaterial.map(option => ({ value: option.name, label: option.name }))}
          options={dataSource[0].RoomType.map(option => ({ value: option.label, label: option.label }))}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: 'Sản phẩm', dataIndex: 'pricePerM2', width: '10%'
      , render: (text, record) => (
        <Select
          showSearch
          placeholder="Select a RawMaterial"
          optionFilterProp="children"
          onChange={(value) => handleRawMaterialChange(value, record.key)}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          // options={rawMaterial.map(option => ({ value: option.name, label: option.name }))}
          options={dataSource[0].Product.map(option => ({ value: option.label, label: option.label }))}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: 'Dài', dataIndex: 'Length', width: '10%',
      render: (__, record) => (
        <Input
          placeholder="1"
          type="number"
          value={record.Length}
          onChange={(e) => handleSave({ ...record, Length: e.target.value })}
        />
      ),
    },
    {
      title: 'Rộng', dataIndex: 'Width', width: '10%',
      render: (__, record) => (

        <Input
          placeholder="1"
          type="number"
          value={record.Width}
          onChange={(e) => handleSave({ ...record, Width: e.target.value })}
        />
      )

    },
    {
      title: 'Cao', dataIndex: 'Height', width: '10%',
      render: (__, record) => (
        <Input
          placeholder="1"
          type="number"
          value={record.Height}
          onChange={(e) => handleSave({ ...record, Height: e.target.value })}
        />
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) => (
        <Input
          placeholder="1"
          type="number"
          value={record.Quantity}
          onChange={(e) => handleSave({ ...record, Quantity: e.target.value })}
        />
      ),
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'TotalCost',
      width: '10%',
      render: (_, record) => (
        <span>{parseInt(
          (record.Quantity || 0) * (record.UnitPrice || 0)
        ).toLocaleString('vi-VN')} VND</span>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'Note',
      width: '20%',
      render: (_, record) => (
        <Input
          placeholder="Ghi Chú"
          value={record?.Note}
          onChange={(e) => handleSave({ ...record, Note: e.target.value })}
        />

      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      render: (_, record) => (
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className='bg-red-500 text-white p-2 rounded-sm'>
            Delete
          </Popconfirm>
        ) : null
      ),
    },
  ];

  const handleClose = () => {
    setIsPopconfirmVisible(false);
  }

  const handleShow = () => {
    setIsPopconfirmVisible(true);
  }

  const handleOk = () => {
    // do something ( AXIOS CRUD )
    setIsPopconfirmVisible(false);
    navigate("/admin", { replace: true });
  }
  return (
    <div className='table-container'>
      <div>
        <Modal title="Thông báo" open={isPopconfirmVisible} onOk={handleOk} onCancel={handleClose}>
          <p>Gửi đơn giá thành công</p>
        </Modal>
      </div>
      <div className='quotetable-title'>
        <Title level={2}>Bảng Tạm Tính Giá Phần Vật Liệu</Title>
        <button type="button" className="btn btn-primary" onClick={handleAdd}
          style={{
            backgroundColor: 'blue',
            color: 'black',
          }}
        >Add</button>
      </div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
      <div className=''
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 20,
        }}
      >
        <button type="button" className="btn btn-primary" onClick={handleShow}
          style={{
            backgroundColor: 'green',
            color: 'white',
          }}
        >Send</button>
      </div>
    </div>

  );
};

export default RawMaterialQuotePage;

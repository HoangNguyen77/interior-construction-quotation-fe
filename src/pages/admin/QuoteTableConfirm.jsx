import { Button, Input, InputNumber, Popconfirm, Select, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QuoteTableConfirm = () => {
  const [rawMaterial, setRawMaterial] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
        key: '0',
        Furniture: 'Bàn',
        Length: '12',
        Width: '32',
        Height: '43',
        Quantity: 2, // Default quantity set to 1
        TotalCost: 46000,
        Note:'Ban khong gi',
      }
  ]);
  const [count, setCount] = useState(0);

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
        Length: '12',
        Width: '32',
        Height: '43',
        Unit: 'M2',
        Quantity: 2, // Default quantity set to 1
        UnitPrice: 2300,
        TotalCost: 46000,
        Note:'Ban khong gi',
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
        <span>{record.RoomType}</span>
      ),
    },
    {
      title: 'Sản phẩm', dataIndex: 'Product', width: '10%'
      , render: (text) => (
        <span>{text}</span>
      ),
    },
    { title: 'Dài', dataIndex: 'Length', width: '10%', 
    render: (__, record) => (
        <span>
            {record.Length}
        </span>
    ),
  },
    { title: 'Rộng', dataIndex: 'Width', width: '10%',
    render: (__, record) => (

        <span>
            {record.Width}
        </span>
    )

  },
    { title: 'Cao', dataIndex: 'Height', width: '10%',
    render: (__, record) => (
        <span>
            {record.Height}
        </span>
    )
  },
    {
      title: 'Số lượng',
      dataIndex: 'operation',
        width: '10%',
      render: (_, record) => (
        <span>
            {
                record.Quantity
            }
        </span>
      ),
    },
    { 
        title: 'Tổng Tiền', 
        dataIndex: 'TotalCost', 
        width: '20%',
        render: (_, record) => (
          <Input
            placeholder="1"
            type="number"
            value={record.TotalCost}
            onChange={(e) => handleSave({ ...record, TotalCost: e.target.value })}
            className='w-[100px]'
            />
        ),
      },
    {
        title: 'Ghi chú',
        dataIndex: 'Note',
        width: '20%',
        render: (_, record) => (
            <span>
                {record.Note}
            </span>

        ),
    },
    {
        title: 'Thao tác',
        dataIndex: 'operation',
        render: (_, record) => (
            dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className='bg-blue-500 text-white p-2 rounded-sm'>
                Accept
            </Popconfirm>
            ) : null
        ),
    },
  ];

  return (
    <div className='table-container'>
      <div className='quotetable-title'>
        <Title level={2}>Bảng Tạm Tính Giá Phần Vật Liệu</Title>
        {/* <button type="button" class="btn btn-primar" onClick={handleAdd}
            style={{
                backgroundColor: 'blue',
                color: 'white',
            }}
        >Add</button> */}
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
      {/* <button type="button" class="btn btn-primar" onClick={handleAdd}
            style={{
                backgroundColor: 'green',
                color: 'white',
            }}
        >Send</button>   */}
      </div>
    </div>
  );
};

export default QuoteTableConfirm;

import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Popconfirm, Select, Table, message } from 'antd';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addQuotation } from "../../../api/product/ProductAPI";
import {
  getIdUserByToken
} from "../../../utils/JwtService.js";
const RawMaterialQuotePage = () => {
  const [rawMaterial, setRawMaterial] = useState([]);
  const [type, setType] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      RoomType: '', // Initialize RoomType as an empty string
      Product: [],
      Furniture: 'Bàn',
      Length: '0',
      Width: '0',
      Height: '0',
      Quantity: 1, // Default quantity set to 1
      Unit: [], // Default quantity set to 1
      TotalCost: 0, 
      UnitPrice: 0, // Initialize UnitPrice
      Note: 'Ban khong gi',
    }
  ]);
  const userId = parseInt(getIdUserByToken());
  const handleAddQuotationDetail = async () => {

    const quotationDetails = dataSource.map(item => ({
        customerID: userId,
        productID: item.Product[0].value,
        estimateTotalPrice: item.UnitPrice, // Assuming UnitPrice is the estimate total price
        quantity: item.Quantity
    }));

   

    // Call the addQuotation function and pass the quotationDetails
    const result = await addQuotation(quotationDetails);
    if (result) {
      message.success("Quotation details added successfully.");
  } else {
      // Show error message
      message.error("Failed to add quotation details.");
  }
};

  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/type-product', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          console.log(response.data._embedded.typeProducts);
          setType(response.data._embedded.typeProducts);
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
      Furniture: '',
      RoomType: '',
      Length: ' ',
      Width: ' ',
      Height: ' ',
      Unit: '',
      Quantity: 1, // Default quantity set to 1
      UnitPrice: 0,
      TotalCost: 0,
      Note: 'Ban khong gi',
      Product: [
        {
          value: '', // Set the default value to an empty string or null
          label: '', // Set the default label to an empty string or null
          height: '0', // Set default height
          length: '0', // Set default length
          width: '0', // Set default width
          unit: '', // Set default width
          unitPrice: 0,
        }
      ],
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const totalCost = calculateTotalCost(row); // Recalculate total cost based on updated quantity
    const newData = dataSource.map((item) => {
      if (item.key === row.key) {
        return { ...item, ...row, TotalCost: totalCost }; // Update total cost with the recalculated value
      }
      return item;
    });
    setDataSource(newData); // Update dataSource with the new data
  };
  
  
  const calculateTotalCost = (row) => {
    let totalCost = 0;
    // Convert Quantity to a number before performing calculations
    const quantity = parseInt(row.Quantity || 0);
    // Calculate total cost based on the selected unit
    switch (row.Unit) {
      case 'cái':
        totalCost = quantity * parseFloat(row.UnitPrice || 0);
        break;
      case 'md':
        totalCost = parseInt(row.Length || 0) * parseFloat(row.UnitPrice || 0) * quantity;
        break;
      case 'm2':
        totalCost = parseInt(row.Length || 0) * parseInt(row.Width || 0) * parseFloat(row.UnitPrice || 0) * quantity;
        break;
      default:
        totalCost = 0;
    }
    console.log("Calculated Total Cost:", totalCost); // Log để kiểm tra giá trị mới của TotalCost
    return totalCost;
  };
  
  
  
  


  const handleRoomTypeChange = async (value, key) => {
    try {
      // Fetch products based on the selected room type
      const response = await axios.get(`http://localhost:8080/detail-product/search/findByTypeProduct_TypeId?typeId=${value}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const products = response.data._embedded.products;

      // Fetch unit information for each product
      const productWithUnitPromises = products.map(async (product) => {
        const unitResponse = await axios.get(product._links.unit.href, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const unit = unitResponse.data;
        return { ...product, unit };
      });

      // Resolve all promises
      const productsWithUnit = await Promise.all(productWithUnitPromises);

      // Update dataSource with products including unit information
      const newData = dataSource.map((item) => {
        if (item.key === key) {
          const selectedProduct = productsWithUnit.find(product => product.productId === value);
          return {
            ...item,
            RoomType: value,
            Product: [
              {
                value: selectedProduct.productId,
                label: selectedProduct.name,
                height: selectedProduct.height,
                length: selectedProduct.length,
                width: selectedProduct.width,
                unitPrice: selectedProduct.unitPrice,
                unit: selectedProduct.unit.unitName,
              }
            ],
            Furniture: selectedProduct.name,
            Length: selectedProduct.length.toString(),
            Width: selectedProduct.width.toString(),
            Height: selectedProduct.height.toString(),
            unitPrice: selectedProduct.unitPrice,
            Unit: selectedProduct.unit.unitName, 
            TotalCost: 0,
          };
        }
        return item;
      });
      setDataSource(newData); // Update data source
      handleSave(newData.find(item => item.key === key));
    } catch (error) {
      console.error('There was a problem fetching products:', error);
    }
  };
  const handleRawMaterialChange = (value, key) => {
    const selectedProduct = dataSource.find(item => item.key === key);
    console.log(selectedProduct)

    const newData = dataSource.map((item) => {
      if (item.key === key) {
        const selectedRawMaterial = rawMaterial.find(f => f.typeName === value);
        return {
          ...item,
          RawMaterial: value,
          pricePerM2: selectedRawMaterial?.pricePerM2 || '',
          Furniture: selectedProduct.Furniture,
          length: selectedProduct.Length,
          width: selectedProduct.Width,
          unit: selectedProduct.Unit.unitName,
          height: selectedProduct.Height,
          unitPrice: selectedProduct.UnitPrice

          // TotalCost: calculateTotalCost(item.Quantity, selectedRawMaterial?.pricePerM2 || 0),
        };

      }
      return item;
    });
    setDataSource(newData); // Update data source
    handleSave(newData.find(item => item.key === key));
  };

  
  
  const columns = [

    {
      title: 'Loại phòng',
      dataIndex: 'RoomType',
      width: '10%',
      render: (_, record) => (
        <Select
          showSearch
          placeholder="Select a Room Type"
          optionFilterProp="children"
          onChange={(value) => handleRoomTypeChange(value, record.key)}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={type.map(option => ({ value: option.typeId, label: option.typeName }))} // Change value to option.typeId
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'pricePerM2',
      width: '10%',
      render: (text, record) => (
        <Select
          showSearch
          placeholder="Select a RawMaterial"
          optionFilterProp="children"
          onChange={(value) => handleRawMaterialChange(value, record.key)}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={record.Product.map(option => ({ value: option.value, label: option.label }))}
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
      title: 'Đơn Vị',
      dataIndex: 'Unit',
      width: '10%',
      render: (_, record) => {
        const unit = record.Unit;

        return <span>{unit}</span>;
      }
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
          onChange={(e) => handleSave({ ...record, Quantity: parseInt(e.target.value) || 0 })}
        />
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'UnitPrice',
      width: '10%',
      render: (_, record) => {
        const unitPrice = record.Product[0]?.unitPrice || 0; // Access unitPrice from the Product object

        return <span>{unitPrice} VND</span>;
      }
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
    // setIsPopconfirmVisible(true);
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
        <button type="button" className="btn btn-primary" onClick={handleAddQuotationDetail}
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

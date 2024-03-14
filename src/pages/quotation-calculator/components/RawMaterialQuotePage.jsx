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
  // const handleAddQuotationDetail = async () => {
  //   const quotationDetails = dataSource.map(item => {
  //     const totalCost = calculateTotalCost(item); // Calculate the total cost for the current item
  //     return {
  //       customerID: userId,
  //       productID: productId,
  //       estimateTotalPrice: totalCost, // Use the calculated total cost as the estimateTotalPrice
  //       quantity: item.Quantity
  //     };
  //   });
  //
  //   console.log("Quotation Details:", quotationDetails); // Log the quotationDetails array
  //
  //   // Call the addQuotation function and pass the quotationDetails
  //   const result = await addQuotation(quotationDetails);
  //   if (result) {
  //     message.success("Quotation details added successfully.");
  //   } else {
  //     // Show error message
  //     message.error("Failed to add quotation details.");
  //   }
  // };
  const handleAddQuotationDetail = async () => {
    const quotationDetails = dataSource.map(item => {
      const totalCost = calculateTotalCost(item); // Calculate the total cost for the current item

      // Check if a product is selected
      if (item.Product.length > 0 && item.RoomType) {
        const selectedProduct = item.Product.find(product => product.value === item.RoomType);
        const productId = selectedProduct ? selectedProduct.value : '';

        return {
          customerID: userId,
          productID: productId,
          estimateTotalPrice: totalCost, // Use the calculated total cost as the estimateTotalPrice
          quantity: item.Quantity
        };
      } else {
        // Handle case where no product is selected
        console.error("No product selected for item:", item);
        return null; // Return null if no product is selected
      }
    }).filter(Boolean); // Filter out null values

    console.log("Quotation Details:", quotationDetails); // Log the quotationDetails array

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
        const response = await axios.get('http://localhost:8080/type-room', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          console.log(response.data._embedded.typeRooms);
          setType(response.data._embedded.typeRooms);
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
    // Ensure that the Product array is not empty
    if (row.Product.length > 0) {
      // Find the selected product information based on the RoomType
      const selectedProductInfo = row.Product.find(product => product.value === row.RoomType);
      // If selectedProductInfo is not null, set the Unit property from the product information
      if (selectedProductInfo) {
        row.Unit = selectedProductInfo.unit;
      }
    }

    // Recalculate total cost based on updated quantity and dimensions
    const totalCost = calculateTotalCost(row);

    // Update the TotalCost property in the row object
    row.TotalCost = totalCost;

    // Update the dataSource with the modified row object
    const newData = dataSource.map((item) => {
      if (item.key === row.key) {
        return { ...item, ...row };
      }
      return item;
    });

    // Update the state with the new dataSource
    setDataSource(newData);
  };




  const handleRoomTypeChange = async (value, key) => {
    try {
      const response = await axios.get(`http://localhost:8080/detail-product/search/findProductByTypeProduct_CategoryProduct_TypeRoom_RoomId?roomId=${value}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const products = response.data._embedded.products;

      // Fetch unit information for each product asynchronously
      const productPromises = products.map(async product => {
        const unitResponse = await axios.get(product._links.unit.href, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        console.log("ok"+unitResponse)

        const unit = unitResponse.data.unitName;
        return {
          value: product.productId,
          label: product.name,
          height: product.height,
          length: product.length,
          width: product.width,
          unitPrice: product.unitPrice,
          unit: unit
        };
      });

      // Wait for all productPromises to resolve
      const updatedProducts = await Promise.all(productPromises);

      // Update dataSource with products
      const newData = dataSource.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            RoomType: value,
            Product: updatedProducts,
            TotalCost: 0,
          };
        }
        return item;
      });

      setDataSource(newData);
      handleSave(newData.find(item => item.key === key));
    } catch (error) {
      console.error('There was a problem fetching products:', error);
    }
  };



  const handleRawMaterialChange = (value, key) => {
    const selectedProduct = dataSource.find(item => item.key === key);
    const selectedProductInfo = selectedProduct.Product.find(product => product.value === value);

    const newData = dataSource.map(item => {
      if (item.key === key) {
        return {
          ...item,
          RoomType: value,
          Furniture: selectedProduct.Furniture,
          Length: selectedProductInfo.length,
          Width: selectedProductInfo.width,
          Height: selectedProductInfo.height,
          UnitPrice: selectedProductInfo.unitPrice,
          productID: value // Assign the selected product's value as productID
        };
      }
      return item;
    });

    setDataSource(newData);
    handleSave(newData.find(item => item.key === key));
  };

  const calculateTotalCost = (row) => {
    let totalCost = 0;
    // Convert Quantity to a number before performing calculations
    const quantity = parseInt(row.Quantity || 0);
    // Calculate total cost based on the selected unit
    switch (row.Unit) {
      case 'cái':
        totalCost = quantity * parseFloat(row.UnitPrice || 11);
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
    console.log(row.height)
    console.log("Calculated Total Cost:", totalCost); // Log để kiểm tra giá trị mới của TotalCost
    return totalCost;
  };

  const columns = [

    {
      title: 'Loại phòng',
      dataIndex: 'RoomType',
      width: '10%',
      render: (_, record) => (
          <Select
              showSearch
              placeholder="Chọn phòng"
              optionFilterProp="children"
              onChange={(value) => handleRoomTypeChange(value, record.key)}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={type.map(option => ({ value: option.roomId, label: option.roomName }))} // Change value to option.typeId
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
              placeholder="Chọn sản phẩm"
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
    // {
    //   title: 'Dài',
    //   dataIndex: 'Length',
    //   width: '10%',
    //   render: (_, record) => {
    //     const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
    //     const length = selectedProductInfo ? selectedProductInfo.length : '';
    //
    //     return <span>{length}</span>;
    //   },
    // },
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
    // {
    //   title: 'Rộng',
    //   dataIndex: 'Width',
    //   width: '10%',
    //   render: (_, record) => {
    //     const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
    //     const width = selectedProductInfo ? selectedProductInfo.width : '';
    //
    //     return <span>{width}</span>;
    //   },
    // },
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
    // {
    //   title: 'Cao',
    //   dataIndex: 'Height',
    //   width: '10%',
    //   render: (_, record) => {
    //     const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
    //     const height = selectedProductInfo ? selectedProductInfo.height : '';
    //
    //     return <span>{height}</span>;
    //   },
    // },
    {
      title: 'Đơn Vị',
      dataIndex: 'Unit',
      width: '10%',
      render: (_, record) => {
        const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
        const unit = selectedProductInfo ? selectedProductInfo.unit : '';

        return <span>{unit}</span>;
      },
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
      dataIndex: 'TotalCost', // Change to TotalCost to display the calculated price
      width: '10%',
      render: (totalCost, record) => {
        return <span>{totalCost} VND</span>;
      },
    },
    // {
    //   title: 'Giá tiền',
    //   dataIndex: 'UnitPrice',
    //   width: '10%',
    //   render: (_, record) => {
    //     const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
    //     const unitPrice = selectedProductInfo ? selectedProductInfo.unitPrice : '';
    //
    //     return <span>{unitPrice} VND</span>;
    //   },
    // },


    {
      title: 'Thao tác',
      dataIndex: 'operation',
      render: (_, record) => (
          dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className='bg-red-500 text-white p-2 rounded-sm'>
                Xóa
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
          <Title level={2}>Bảng Tạm Tính Giá Thi Công Nội Thất</Title>
          <button type="button" className="btn btn-primary" onClick={handleAdd}
                  style={{
                    backgroundColor: 'blue',
                    color: 'White',
                  }}
          >Thêm</button>
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
          >Gửi</button>
        </div>
      </div>

  );
};

export default RawMaterialQuotePage;

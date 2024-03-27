import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Modal, Popconfirm, Select, Table, message} from 'antd';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {addQuotation} from "../../../api/product/ProductAPI";
import {
    getIdUserByToken
} from "../../../utils/JwtService.js";
import {
    getValidCurrency
} from "../../../utils/Validation.js";


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
            error: {},
        }
    ]);
    const userId = parseInt(getIdUserByToken());

    // const handleAddQuotationDetail = async () => {
    //     const quotationDetails = dataSource.map(item => {
    //         let isValid = true;
    //         const updatedDataSource = dataSource.map(item => {
    //             const errors = {};
    //             // Add validation checks here and update errors object accordingly
    //             if (!item.RoomType) {
    //                 errors.RoomType = "Vui lòng chọn loại phòng";
    //                 isValid = false;
    //             }
    //             const isProductSelected = item.Product && item.Product.some(product => product.value);
    //             if (!isProductSelected) {
    //                 errors.Product = "Vui lòng chọn sản phẩm";
    //                 isValid = false;
    //             }

    //
    //             // Validation for Width
    //             // Assuming Width is required only if the selected product's unit requires dimensions

    //
    //             // Validation for Height
    //             // Assuming Height is not required for all products (adjust logic if this assumption is incorrect)

    //
    //             // Validation for Quantity

    //
    //             return { ...item, error: errors };
    //         });
    //
    //         setDataSource(updatedDataSource);
    //
    //         if (!isValid) {
    //             return; // Stop execution if there's any validation error
    //         }
    //         const totalCost = calculateTotalCost(item); // Calculate the total cost for the current item
    //
    //         // Check if a product is selected
    //         if (item.Product.length > 0 && item.RoomType) {
    //             const selectedProduct = item.Product.find(product => product.value === item.RoomType);
    //             const productId = selectedProduct ? selectedProduct.value : '';
    //
    //             return {
    //                 customerID: userId,
    //                 productID: productId,
    //                 estimateTotalPrice: totalCost, // Use the calculated total cost as the estimateTotalPrice
    //                 quantity: item.Quantity
    //             };
    //         } else {
    //             // Handle case where no product is selected
    //             console.error("No product selected for item:", item);
    //             return null; // Return null if no product is selected
    //         }
    //     }).filter(Boolean); // Filter out null values
    //     if (quotationDetails.length === 0) {
    //         message.error("Không có dữ liệu để thêm");
    //         return; // Exit the function if there is no data
    //     }
    //
    //
    //     // Call the addQuotation function and pass the quotationDetails
    //     const result = await addQuotation(quotationDetails);
    //     if (result=== "Create quotation successfully") {
    //         message.success("Thêm đơn báo giá thành công")
    //     } else {
    //         // Show error message
    //         message.error("Thêm đơn báo giá thất bại");
    //     }
    // };
    const handleAddQuotationDetail = async () => {
        const quotationDetails = dataSource.map(item => {
            let isValid = true;
            const updatedDataSource = dataSource.map(item => {
                const errors = {};
                if (!item.RoomType) {
                    errors.RoomType = "Vui lòng chọn loại phòng";
                    isValid = false;
                }
                if (item.Product.length === 0) {
                    errors.Product = "Vui lòng chọn sản phẩm";
                    isValid = false;
                }
                if (!item.Length && item.Unit !== 'cái') {
                    errors.Length = "Vui lòng nhập chiều dài";
                    isValid = false;
                }

                if (!item.Width && item.Unit !== 'cái') {
                    errors.Width = "Vui lòng nhập chiều rộng";
                    isValid = false;
                }

                if (!item.Height && item.Unit !== 'cái') {
                    errors.Height = "Vui lòng nhập chiều cao";
                    isValid = false;
                }

                if (!item.Quantity || item.Quantity < 1) {
                    errors.Quantity = "Số lượng phải lớn hơn 0";
                    isValid = false;
                }

                return { ...item, error: errors };
            });

            setDataSource(updatedDataSource);

            if (!isValid) {
                message.error("Thêm đơn báo giá thất bại");
                return; // Stop execution if there's any validation error
            }
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


        // Call the addQuotation function and pass the quotationDetails
        const result = await addQuotation(quotationDetails);
        if (result=== "Create quotation successfully") {
            message.success("Thêm đơn báo giá thành công")
        } else {
            // Show error message
            message.error("Thêm đơn báo giá thất bại");
        }
        //handleReload();
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
            error: {},
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
                return {...item, ...row};
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
            const updatedProducts = await Promise.all(products.map(async product => {
                const unitResponse = await axios.get(product._links.unit.href, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                // Extract the unit data
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
            }));

            // Update the dataSource with the new products
            const newData = dataSource.map((item) => {
                if (item.key === key) {
                    // Check if the currently selected product is in the new list
                    let existingSelection = item.Product.find(p => updatedProducts.some(up => up.value === p.value));
                    return {
                        ...item,
                        RoomType: value,
                        Product: updatedProducts, // Set to the updated products
                        // If there is no existing selection in the new list, reset these fields
                        Length: existingSelection ? item.Length : '', // Reset if selection not valid
                        Width: existingSelection ? item.Width : '', // Reset if selection not valid
                        Height: existingSelection ? item.Height : '', // Reset if selection not valid
                        Unit: existingSelection ? item.Unit : '', // Reset if selection not valid
                        UnitPrice: existingSelection ? item.UnitPrice : 0, // Reset if selection not valid
                        TotalCost: existingSelection ? item.TotalCost : 0, // Reset or recalculate if needed
                        error: existingSelection ? item.error : {}, // Clear any validation errors if selection not valid
                    };
                }
                return item;
            });

            setDataSource(newData); // Update the state with the new dataSource
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
                    productID: value, // Assign the selected product's value as productID
                    error: {...item.error, Product: undefined}
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
            width: '20%',
            render: (_, record) => (
                <>
                    <Select
                        showSearch
                        placeholder="Chọn phòng"
                        optionFilterProp="children"
                        onChange={(value) => handleRoomTypeChange(value, record.key)}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={type.map(option => ({
                            value: option.roomId,
                            label: option.roomName
                        }))} // Change value to option.typeId
                        style={{ width: "100%" }}
                    />
                    {record.error.RoomType && (
                        <div style={{ color: 'red' }}>{record.error.RoomType}</div>
                    )}
                </>

            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'pricePerM2',
            width: '30%',
            render: (text, record) => (
                <>
                    <Select
                        showSearch
                        placeholder="Chọn sản phẩm"
                        optionFilterProp="children"
                        onChange={(value) => handleRawMaterialChange(value, record.key)}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={record.Product.map(option => ({ value: option.value, label: option.label }))}
                        style={{ width: "100%" }}
                    />
                    {record.error?.Product && (
                        <div style={{ color: 'red', marginTop: 4 }}>{record.error.Product}</div>
                    )}
                </>
            ),
        },
        {
            title: 'Dài',
            dataIndex: 'Length',
            width: '7%',
            render: (_, record) => {
                const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
                const unit = selectedProductInfo ? selectedProductInfo.unit : '';
                return (
                    <>
                        {unit === 'cái' ? <span>{selectedProductInfo.length}</span> :
                            <Input
                                placeholder="Dài"
                                type="number"
                                value={record.Length}
                                onChange={(e) => handleSave({ ...record, Length: e.target.value })}
                            />
                        }
                        {record.error?.Length && (
                            <div style={{ color: 'red', marginTop: 4 }}>{record.error.Length}</div>
                        )}
                    </>
                );
            },
        },

        {
            title: 'Rộng', dataIndex: 'Width', width: '7%',
            render: (__, record) => {
                const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
                const unit = selectedProductInfo ? selectedProductInfo.unit : '';

                return (
                    <>
                        {unit === 'cái' || unit === "md" ? <span>{selectedProductInfo.width}</span> :
                            <Input
                                placeholder="1"
                                type="number"
                                value={record.Width}
                                onChange={(e) => handleSave({ ...record, Width: e.target.value })}
                            />
                        }
                        {record.error?.Width && (
                            <div style={{ color: 'red', marginTop: 4 }}>{record.error.Width}</div>
                        )}
                    </>
                );
            },
        },
        {
            title: 'Cao', dataIndex: 'Height', width: '7%',
            render: (__, record) => {
                const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
                const unit = selectedProductInfo ? selectedProductInfo.unit : '';

                return (
                    <>
                        {unit === 'cái' || unit === "md" || unit ==="m2"? <span>{selectedProductInfo.height}</span> :
                            <Input
                                placeholder="1"
                                type="number"
                                value={record.Height}
                                onChange={(e) => handleSave({ ...record, Height: e.target.value })}
                            />}
                        {
                            record.error?.Height && (
                                <div style={{ color: 'red', marginTop: 4 }}>{record.error.Height}</div>
                            )
                        }
                    </>
                );
            },
        },
        {
            title: 'Đơn Vị',
            dataIndex: 'Unit',
            width: '7%',
            render: (_, record) => {
                const selectedProductInfo = record.Product.find(product => product.value === record.RoomType);
                const unit = selectedProductInfo ? selectedProductInfo.unit : '';

                return <span>{unit}</span>;
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'operation',
            width: '7%',
            render: (_, record) => (
                <>
                    <Input
                        placeholder="1"
                        type="number"
                        value={record.Quantity}
                        onChange={(e) => handleSave({ ...record, Quantity: parseInt(e.target.value) || 0 })}
                    />
                    {record.error?.Quantity && (
                        <div style={{ color: 'red', marginTop: 4 }}>{record.error.Quantity}</div> // Display error message below the input
                    )}
                </>
            ),
        },
        {
            title: 'Giá tiền',
            dataIndex: 'TotalCost', // Change to TotalCost to display the calculated price
            width: '10%',
            render: (totalCost, record) => {
                return <span>{getValidCurrency(totalCost)}</span>;
            },
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            render: (_, record) => (
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        okButtonProps={{className: 'bg-red-500 text-black  rounded-sm'}}
                        cancelButtonProps={{className: 'bg-gray-500 text-black  rounded-sm'}}
                    >
                        <Button type="primary"
                                danger> {/* Sử dụng Button từ Ant Design, với type="primary" và danger */}
                            Xoá
                        </Button>
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
        navigate("/admin", {replace: true});
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
                >Thêm
                </button>
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
                >Gửi
                </button>
            </div>
        </div>

    );
};

export default RawMaterialQuotePage;

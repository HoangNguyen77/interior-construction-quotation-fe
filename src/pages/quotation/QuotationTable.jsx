import React, {useState, useEffect, useRef} from 'react';
import '/public/css/style.css'
import {useParams} from "react-router-dom";
function QuotationTable() {
    const [quotationDetails, setQuotationDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [createdDate, setCreatedDate] = useState('');
    const { listId } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8080/quotation-list/${listId}/quotationDetailList`);
            const data = await response.json();
            const details = data._embedded.quotationDetails;
            // Fetch unit price, unit, and first image for each product
            const updatedDetails = await Promise.all(details.map(async (detail) => {
                const productResponse = await fetch(detail._links.product.href);
                const productData = await productResponse.json();
                const unitResponse = await fetch(productData._links.unit.href);
                const unitData = await unitResponse.json();
                const imageResponse = await fetch(productData._links.productImageList.href);
                const imageData = await imageResponse.json();

                // Get the URL of the first image
                const firstImage = imageData._embedded.productImages[0]?.imageData || '';

                return {
                    ...detail,
                    unitPrice: productData.unitPrice,
                    unit: unitData.unitName,
                    productImage: firstImage
                };
            }));

            setQuotationDetails(updatedDetails);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchCustomerInfo() {
            const response = await fetch(`http://localhost:8080/quotation-list/${listId}/quotationHeader`);
            const data = await response.json();
            const customerResponse = await fetch(data._links.customer.href);
            const customerData = await customerResponse.json();
            setCustomerInfo(customerData);
        }

        fetchCustomerInfo();
    }, []);
    useEffect(() => {
        async function fetchCreatedDate() {
            const response = await fetch(`http://localhost:8080/quotation-list/${listId}`);
            const data = await response.json();
            setCreatedDate(data.createdDate);
        }

        fetchCreatedDate();
    }, []);

    useEffect(() => {
        let totalPrice = 0;
        quotationDetails.forEach(item => {
            totalPrice += item.realTotalPrice;
        });
        setTotalPrice(totalPrice);
    }, [quotationDetails]);


    return (
        <div className="m-5">
            <header className="py-3">
                <p className="mb-0 h2">VivaDecor</p>
                <div className="row mb-2">
                    <div className="col-8">
                        <p className="mb-0 h6">Email: info@vivadecor.vn</p>
                        <p className="mb-0 h6">Số điện thoại: 0703 937 521</p>
                        <p className="mb-0 h6">Showroom: Bau Chinh, Châu Đức, An Giang, Vietnam</p>
                    </div>
                    <div className="col-4">
                        {customerInfo && (
                            <>
                                <p className="mb-0 h6">Khách
                                    hàng: {customerInfo.lastName + " " + customerInfo.firstName}</p>
                                <p className="mb-0 h6">Số điện thoại: {customerInfo.phonenumber}</p>
                                <p className="mb-0 h6">Email: {customerInfo.email}</p>
                            </>
                        )}
                        {createdDate && (
                            <p className="mb-0 h6">Ngày soạn báo giá: {createdDate}</p>
                        )}
                    </div>
                </div>
            </header>

            <main>
                <table className="table table-bordered">
                    <thead className="bg-primary-1 text-light">
                    <tr>
                        <th className="col-1 align-middle text-center">STT</th>
                        <th className="col-1 align-middle text-center">Hình ảnh tham khảo</th>
                        <th className="col-3 align-middle text-center">Sản phẩm</th>
                        <th className="col-1 align-middle text-center">Cao</th>
                        <th className="col-1 align-middle text-center">Dài</th>
                        <th className="col-1 align-middle text-center">Rộng</th>
                        <th className="col-1 align-middle text-center">Số lượng</th>
                        <th className="col-1 align-middle text-center">Đơn vị</th>
                        <th className="col-1 align-middle text-center">Đơn giá</th>
                        <th className="col-1 align-middle text-center">Thành tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quotationDetails.map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle text-center">{index + 1}</td>
                            <td className="align-middle text-center"><img src={item.productImage} alt={item.productName}
                                                                          style={{maxWidth: '100px'}}/></td>
                            <td className="align-middle">{item.productName}</td>
                            <td className="align-middle text-center">{item.height}</td>
                            <td className="align-middle text-center">{item.length}</td>
                            <td className="align-middle text-center">{item.width}</td>
                            <td className="align-middle text-center">{item.quantity}</td>
                            <td className="align-middle text-center">{item.unit}</td>
                            <td className="align-middle text-center">{item.unitPrice}</td>
                            <td className="align-middle text-center">{item.realTotalPrice}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="9" className="text-md-center text-dark">Tổng cộng:</td>
                        <td className="align-middle text-center">{totalPrice}</td>
                    </tr>
                    </tfoot>
                </table>
                <button className="btn btn-primary export-btn-1" onClick={exportPDF}>Xuất PDF</button>
            </main>
        </div>
    );
}
function exportPDF() {
    window.print();
}

export default QuotationTable;

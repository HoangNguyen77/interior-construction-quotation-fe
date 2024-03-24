import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChair,
    faNewspaper,
    faUser,
    faHome, faBan, faSpinner, faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const AdminChart = () => {
    // State variables to store data fetched from the API
    const [totalBlog, setTotalBlog] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalFinishedProjects, setTotalFinishedProjects] = useState(0);
    const [totalQuotations, setTotalQuotations] = useState(0);
    const [cancelledQuotation, setCancelledQuotation] = useState(0);
    const [confirmedQuotation, setConfirmedQuotation] = useState(0);
    const [inProgressQuotation, setInProgressQuotation] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch product count
                const productResponse = await fetch('http://localhost:8080/detail-product');
                const productData = await productResponse.json();
                setTotalProduct(productData.page.totalElements);

                // Fetch blog count
                const blogResponse = await fetch('http://localhost:8080/blog');
                const blogData = await blogResponse.json();
                setTotalBlog(blogData.page.totalElements);

                // Fetch project count
                const projectResponse = await fetch('http://localhost:8080/finished');
                const projectData = await projectResponse.json();
                setTotalFinishedProjects(projectData.page.totalElements);

                // Fetch user count
                const userResponse = await fetch('http://localhost:8080/users');
                const userData = await userResponse.json();
                setTotalCustomer(userData.page.totalElements);

                // Fetch cancelled quotation
                const cancelledResponse = await fetch('http://localhost:8080/quotation/count-quotation-header?status-id=5');
                const cancelledData = await cancelledResponse.json();
                setCancelledQuotation(cancelledData);

                // Fetch confirmed quotation count
                const confirmedResponse = await fetch('http://localhost:8080/quotation/count-quotation-header?status-id=4');
                const confirmedData = await confirmedResponse.json();
                setConfirmedQuotation(confirmedData);

                // Fetch in progress quotation
                const inProgressResponse = await fetch('http://localhost:8080/quotation/count-in-progress-quotation-header');
                const inProgressData = await inProgressResponse.json();
                setInProgressQuotation(inProgressData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        if (!isLoading) {
            renderChart();
        }
    }, [isLoading]);


    // Function to render the Chart.js chart
    const renderChart = () => {
        const ctx = document.getElementById('quotationsChart');

        // Destroy existing chart if it exists
        if (window.quotationsChartInstance) {
            window.quotationsChartInstance.destroy();
        }

        window.quotationsChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Đã hủy', 'Đang xử lý', 'Đã chấp nhận'],
                datasets: [{
                    label: 'Thống kê báo giá',
                    data: [cancelledQuotation, inProgressQuotation, confirmedQuotation], // Set the data for cancelled and confirmed quotations
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)', // Red
                        'rgba(54, 162, 235, 0.6)', // Blue
                        'rgba(75, 192, 192, 0.6)', // Green
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3 position-relative">
                    <div className="card bg-white shadow p-3">
                        <div className=" justify-content-between align-items-center">
                            <div className="text-right">
                                <div className="text-2xl">Sản phẩm</div>
                                <div className="text-3xl text-black">{totalProduct}</div>
                            </div>
                            <div
                                className="w-20 h-20 bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1 position-absolute top-0 start-100 translate-middle"
                                style={{transform: 'translateY(-50%)'}}>
                                <FontAwesomeIcon icon={faChair} size="2x"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 position-relative">
                    <div className="card bg-white shadow p-3">
                        <div className=" justify-content-between align-items-center">
                            <div className="text-right">
                                <div className="text-2xl">Bài viết</div>
                                <div className="text-3xl text-black">{totalBlog}</div>
                            </div>
                            <div
                                className="w-20 h-20 bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1 position-absolute top-0 start-100 translate-middle"
                                style={{transform: 'translateY(-50%)'}}>
                                <FontAwesomeIcon icon={faNewspaper} size="2x"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 position-relative">
                    <div className="card bg-white shadow p-3">
                        <div className=" justify-content-between align-items-center">
                            <div className="text-right">
                                <div className="text-2xl ">Dự án đã thi công</div>
                                <div className="text-3xl text-black">{totalFinishedProjects}</div>
                            </div>
                            <div
                                className="w-20 h-20 bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1 position-absolute top-0 start-100 translate-middle"
                                style={{transform: 'translateY(-50%)'}}>
                                <FontAwesomeIcon icon={faHome} size="2x"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 position-relative">
                    <div className="card bg-white shadow p-3">
                        <div className=" justify-content-between align-items-center">
                            <div className="text-right">
                                <div className="text-2xl ">Người dùng</div>
                                <div className="text-3xl text-black">{totalCustomer}</div>
                            </div>
                            <div
                                className="w-20 h-20 bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1 position-absolute top-0 start-100 translate-middle"
                                style={{transform: 'translateY(-50%)'}}>
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">

                <div className="col-md-8">
                    <div className="card bg-white shadow p-3">
                        <div className="card-body">
                            <canvas id="quotationsChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    <div className="card bg-white shadow p-3 w-100 h-100">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <div className="card bg-white shadow p-3 text-right m-3">
                                    <div className="row">
                                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faBan} size="2x"/>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="text-2xl ">Báo giá đã hủy</div>
                                            <div className="text-3xl text-black">{cancelledQuotation}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-white shadow p-3 text-right m-3">
                                    <div className="row">
                                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faSpinner} size="2x"/>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="text-2xl ">Báo giá đang xử lý</div>
                                            <div className="text-3xl text-black">{inProgressQuotation}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-white shadow p-3 text-right m-3">
                                    <div className="row">
                                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faCheckCircle} size="2x"/>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="text-2xl ">Báo giá đã chấp nhận</div>
                                            <div className="text-3xl text-black">{confirmedQuotation}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChart;

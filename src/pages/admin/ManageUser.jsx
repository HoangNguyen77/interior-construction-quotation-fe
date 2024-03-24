import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSort, faCheck, faBan, faTrashAlt, faUser, faTrashCan} from "@fortawesome/free-solid-svg-icons"; // Import faSearch icon
import axios from 'axios';
import {toast} from "react-toastify";
import Pagination from "../../utils/Pagination.jsx";

const Icon = ({classIcon, color, size}) => {
    const iconSize = {
        width: size,
        height: size,
        color: color,
        cursor: "pointer"
    };

    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize}/>
        </span>

    );
};

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalPage: 0,
            totalElement: 0,
            currentPage: 1,
            searchValue: '', // Add searchValue state
            sortBy: '', // Add sortBy state
            filterBy: 'all', // Add filterBy state with default value 'all'
            ísDeleting: false
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const {currentPage, searchValue, filterBy} = this.state;
            const response = await axios.get(`http://localhost:8080/users/search/searchUsers`, {
                params: {
                    keyword: searchValue,
                    filterBy: filterBy, // Truyền filterBy như một query parameter
                    page: currentPage - 1,
                    size: 8,
                    sort: 'userId,desc'
                }
            });
            const users = response.data._embedded.users;
            this.setState({
                totalPage: response.data.page.totalPages,
                totalElement: response.data.page.totalElements,
                users
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    // fetchUsers = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/users/search/findByRoleNameIsCustomer?page=${this.state.currentPage - 1}&size=5&sort=userId,desc`);
    //         const users = response.data._embedded.users;
    //         this.setState({totalPage: response.data.page.totalPages})
    //         this.setState({totalElement: response.data.page.totalElements})
    //         this.setState({users});
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //     }
    // };

    handleSearchAndFilter = () => {
        // Reset currentPage to 1 when performing a new search or filter
        this.setState({currentPage: 1}, () => {
            // Call fetchUsers to update the user list with the new search and filter
            this.fetchUsers();
        });
    };

    // Update searchValue state when input changes
    handleSearchChange = (e) => {
        this.setState({searchValue: e.target.value}, () => {
            // Call handleSearchAndFilter after updating searchValue
            this.handleSearchAndFilter();
        });
    };


    handleToggleUserStatus = async (userId, currentStatus) => {
        try {
            if (currentStatus === 'enabled') {
                await axios.put(`http://localhost:8080/user/${userId}/disable`);
            } else {
                await axios.put(`http://localhost:8080/user/${userId}/enable`);
            }
            // After successfully toggling status, fetch users again to update the user list
            await this.fetchUsers();
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    handleDeleteUser = async (userId) => {
        try {
            const url = `http://localhost:8080/users/${userId}`;
            const response = await fetch(url, {
                    method: 'DELETE'
                }
            )
            if (response.ok) {
                // setIsChanged(!isChanged);
                // setCurrentPage(1);
                await this.fetchUsers();
                toast.success("Xóa người dùng thành công");
            } else {
                toast.warning("Đã xảy ra lỗi trong quá trình xóa người dùng!");
            }
        } catch (error) {
            {
                toast.error("Đã xảy ra lỗi trong quá trình xóa người dùng!");
            }
        }
    };

    handleDeleteUserConfirmation = async (userId) => {
        // if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        //     this.handleDeleteUser(userId);
        // }
        this.setState({isDeleting: true})
        toast.warn(({closeToast}) => (
            <div>
                <div className="h5">Bạn có chắc chắn muốn xóa người dùng này?</div>
                <div className="row justify-content-between">
                    <div className="col-2 btn btn-danger" onClick={() => {
                        this.setState({isDeleting: false})
                        this.handleDeleteUser(userId);
                        closeToast(); // Close the toast after deletion
                    }}>Xóa
                    </div>
                    <div className="col-2 btn btn-secondary" onClick={()=>{
                        this.setState({isDeleting: false})
                        closeToast();
                    }
                    }>Hủy</div>
                </div>
            </div>
        ), {
            position: "top-center",
            autoClose: false,
            closeButton: false,
            style: {
                width: "450px", // Điều chỉnh chiều rộng của khung toast
                padding: "20px", // Thêm padding nếu cần
                backgroundColor: "#fff", // Màu nền của khung toast
                color: "white", // Màu chữ của nội dung toast
                borderRadius: "8px" // Bo tròn các góc của khung toast
            }
        });
    };

    handleSortChange = (sortBy) => {
        this.setState({sortBy});
    };

    handleFilterChange = (filterBy) => {
        this.setState({filterBy}, () => {
            // Call handleSearchAndFilter after updating filterBy
            this.handleSearchAndFilter();
        });
    };

    handlePageChange = (page) => {
        console.log("page: " + page);
        this.setState({currentPage: page}, () => {
            console.log("current page: " + this.state.currentPage);
            this.fetchUsers();
        });
    }

    render() {
        const {users, searchValue, filterBy, totalPage, totalElement, currentPage} = this.state;

        // Filter users based on searchValue
        let filteredUsers = users.filter(user =>
            user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.username.toLowerCase().includes((searchValue.toLowerCase())) ||
            user.phonenumber.includes(searchValue)
        );

        // Apply filter based on filterBy state
        if (filterBy === 'active') {
            filteredUsers = filteredUsers.filter(user => user.enabled);
        } else if (filterBy === 'disabled') {
            filteredUsers = filteredUsers.filter(user => !user.enabled);
        }

        return (
            <div className='h-auto pl-3'>
                <div className='w-full h-[150px] relative'>
                    <div className='title-admin absolute top-0 left-0'>QUẢN LÝ NGƯỜI DÙNG</div>


                    <div className='absolute bottom-0 left-0'>
                        <input
                            className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                            placeholder='Nhập họ, tên, username hoặc số điện thoạt....'
                            value={searchValue} // Bind input value to searchValue state
                            onChange={this.handleSearchChange} // Add onChange event handler
                        />
                    </div>

                    <div
                        className='absolute top-40 left-0'> {/* Thay đổi bottom thành bottom-10 để dịch thanh filter lên */}
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-lg font-bold"
                                value={filterBy} onChange={(e) => this.handleFilterChange(e.target.value)}>
                                <option value="all" className="text-black font-bold">Tất cả</option>
                                <option value="active" className="text-green-500 font-bold">Hoạt động</option>
                                <option value="disabled" className="text-red-500 font-bold">Vô hiệu hoá</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FontAwesomeIcon icon={faSort} color={"black"} size={"14px"}/>
                            </div>
                        </div>
                    </div>


                    <div
                        className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                        <Icon classIcon={faUser} color={"white"} size={"32px"}/>
                    </div>
                    <div
                        className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                        <div>
                            <div className='text-[24px] text-black'>{totalElement}</div>
                            <div className='text-[24px] text-black'>Người dùng</div>
                        </div>
                    </div>
                </div>
                <div className='table-all-posts h-auto mt-[50px]'>
                    <div
                        className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#348EED] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>
                        NGƯỜI DÙNG
                    </div>
                </div>

                <div className='table-all-posts h-auto mt-[2px]'>
                    <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                        <div className='grid grid-cols-10 py-3 gap-2'>
                            <div className='col-span-1 text-[#348EED]'>ID người dùng</div>
                            <div className='col-span-1 text-[#348EED]'>Tên người dùng</div>
                            <div className='col-span-2 text-[#348EED]'>Họ và tên</div>
                            <div className='col-span-2 text-[#348EED]'>Email</div>
                            <div className='col-span-2 text-[#348EED]'>Số điện thoại</div>
                            <div className='col-span-1 text-[#348EED]'>Trạng thái</div>
                            <div className='col-span-1 text-[#348EED]'></div>
                        </div>
                        <div className='overflow-y-auto h-[49vh] pr-3'>
                        {filteredUsers.map(user => (
                            <div key={user.userId} className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                                <div className='col-span-1 text-black flex flex-col justify-center'>{user.userId}</div>
                                <div
                                    className='col-span-1 text-black flex flex-col justify-center'>{user.username}</div>

                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{`${user.firstName} ${user.lastName}`}</div>
                                <div className='col-span-2 text-black flex flex-col justify-center'>{user.email}</div>
                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{user.phonenumber}</div>
                                <div className='col-span-1 text-black flex flex-col justify-center'>
                                    {user.enabled ?
                                        <div style={{color: 'green'}}>Còn hoạt động</div> :
                                        <div style={{color: 'red'}}>Đã vô hiệu hoá</div>
                                    }
                                </div>

                                <div className='col-span-1 flex justify-end items-center'>
                                    {/*abc*/}
                                    {
                                        !this.state.isDeleting && (
                                            <div className="flex justify-end items-center">
                                                <div
                                                    onClick={() => this.handleToggleUserStatus(user.userId, user.enabled ? 'enabled' : 'disabled')}
                                                    style={{
                                                        color: user.enabled ? 'red' : 'green',
                                                        cursor: 'pointer',
                                                        borderRadius: '5px',
                                                        padding : '0px 3px',
                                                        marginRight: '10px',
                                                        border: user.enabled ? '1px solid red' : "1px solid green"

                                                    }}
                                                >
                                                    {user.enabled ? 'Disable' : 'Enable '}
                                                </div>
                                                <div onClick={() => this.handleDeleteUserConfirmation(user.userId)}>
                                                    <Icon classIcon={faTrashCan} color={"black"} size={"20px"}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>



                            </div>
                        ))}
                        </div>
                        <Pagination currentPage={currentPage} totalPage={totalPage}
                                    handlePageChange={this.handlePageChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageUser;



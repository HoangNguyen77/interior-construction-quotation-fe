import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSort, faCheck, faBan, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import faSearch icon
import axios from 'axios';
import {toast} from "react-toastify";

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchValue: '', // Add searchValue state
      sortBy: '', // Add sortBy state
      filterBy: 'all', // Add filterBy state with default value 'all'
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      const users = response.data._embedded.users;
      this.setState({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value }); // Update searchValue state when input changes
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
    }catch (error){
      {
        toast.error("Đã xảy ra lỗi trong quá trình xóa người dùng!");
      }
    }
  };

  handleDeleteUserConfirmation = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.handleDeleteUser(userId);
    }
  };

  handleSortChange = (sortBy) => {
    this.setState({ sortBy });
  };

  handleFilterChange = (filterBy) => {
    this.setState({ filterBy });
  };

  render() {
    const { users, searchValue, filterBy } = this.state;

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

            <div>
              <div className='absolute bottom-1 left-[365px]'>
                <FontAwesomeIcon icon={faSearch} color={"black"} size={"24px"} />
              </div>
              <div className='absolute bottom-1 right-[20vw] '>
                <select value={filterBy} onChange={(e) => this.handleFilterChange(e.target.value)}>
                  <option value="all">Tất cả</option>
                  <option value="active">Hoạt động</option>
                  <option value="disabled">Vô hiệu hoá</option>
                </select>
              </div>
            </div>

          </div>


          <div className='table-all-posts h-auto mt-[50px]'>
            <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
              <div className='grid grid-cols-10 py-3 gap-2'>
                <div className='col-span-1 text-[#348EED]'>ID</div>
                <div className='col-span-1 text-[#348EED]'>Tên người dùng</div>
                <div className='col-span-1 text-[#348EED]'>Họ và tên</div>
                <div className='col-span-2 text-[#348EED]'>Email</div>
                <div className='col-span-1 text-[#348EED]'>Số điện thoại</div>
                <div className='col-span-1 text-[#348EED]'>Trạng thái</div>
                <div className='col-span-1 text-[#348EED]'>Hành động</div>
              </div>

              {filteredUsers.map(user => (
                  <div key={user.userId} className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                    <div className='col-span-1 text-black flex flex-col justify-center'>{user.userId}</div>
                    <div className='col-span-1 text-black flex flex-col justify-center'>{user.username}</div>

                    <div
                        className='col-span-1 text-black flex flex-col justify-center'>{`${user.firstName} ${user.lastName}`}</div>
                    <div className='col-span-2 text-black flex flex-col justify-center'>{user.email}</div>
                    <div className='col-span-1 text-black flex flex-col justify-center'>{user.phonenumber}</div>
                    <div className='col-span-1 text-black flex flex-col justify-center'>
                      {user.enabled ? "Còn hoạt động" : "Đã vô hiệu hoá"}
                    </div>

                    <div className='col-span-1 flex justify-end items-center'>
                      <button
                          onClick={() => this.handleToggleUserStatus(user.userId, user.enabled ? 'enabled' : 'disabled')}
                          style={{ backgroundColor: user.enabled ? 'green' : 'red', color: 'white', marginRight: '10px' }}
                      >
                        <FontAwesomeIcon icon={user.enabled ? faCheck : faBan} color={"white"} size={"20px"} />
                      </button>
                      <button
                          onClick={() => this.handleDeleteUserConfirmation(user.userId)}
                          style={{ backgroundColor: 'red', color: 'white' }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} color={"white"} size={"20px"} />
                      </button>
                    </div>

                  </div>
              ))}
            </div>
          </div>
        </div>
    );
  }
}

export default ManageUser;

import React, { useEffect, useState } from 'react';
import '../../css/admin/Customer.css';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import instanceAdmin from '../../shared/axiosAdmin';

const Customer = () => {
    useEffect(() => {
        instanceAdmin.get(`http://${window.location.hostname}:3000/`);
      }, []);
    const [customers, setCustomers] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null); // 현재 수정 중인 고객의 인덱스
    const [editedCustomer, setEditedCustomer] = useState({}); // 수정 중인 고객 데이터
    const [error, setError] = useState('');

    const loadCustomers = async () => {
        try {
            const response = await axios.get(`http://${window.location.hostname}:7777/api/admin/customers`);
            setCustomers(response.data);
        } catch (err) {
            console.error('고객 데이터를 불러오는 데 실패했습니다:', err);
            setError('고객 데이터를 불러오는 데 실패했습니다.');
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleDelete = async (memberId) => {
        if (window.confirm('정말로 이 회원을 비활성화하시겠습니까?')) {
            try {
                const response = await axios.patch(`http://${window.location.hostname}:7777/api/admin/customers/${memberId}/deactivate`);
                alert(response.data);
                loadCustomers();
            } catch (err) {
                console.error('회원 삭제 실패:', err);
                alert('회원 삭제에 실패했습니다.');
            }
        }
    };

    const handleEdit = (index, customer) => {
        setEditingIndex(index); // 현재 수정 중인 고객의 인덱스 설정
        setEditedCustomer({ ...customer }); // 수정 중인 데이터를 초기화
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (memberId) => {
        try {
            const response = await axios.put(`http://${window.location.hostname}:7777/api/admin/customers/${memberId}`, editedCustomer);
            alert(response.data);
            setEditingIndex(null); // 수정 상태 해제
            loadCustomers();
        } catch (err) {
            console.error('회원 수정 실패:', err);
            alert('회원 수정에 실패했습니다.');
        }
    };

    const handleCancel = () => {
        setEditingIndex(null); // 수정 상태 해제
    };

    return (
        <div className="Customer-main">
            <AdminSideBar />
            <div className="main-content">
                <h1>Customer</h1>
                <hr />
                {error && <p className="error">{error}</p>}
                <section className="customer">
                    <div className="customer-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>상태</th>
                                    <th>이메일</th>
                                    <th>전화번호</th>
                                    <th>주소</th>
                                    <th>생년월일</th>
                                    <th>수정</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, index) => (
                                    <tr key={index}>
                                        {editingIndex === index ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="memberName"
                                                        value={editedCustomer.memberName}
                                                        onChange={handleInputChange}
                                                        className="small-input"
                                                    />
                                                </td>
                                                <td>{['Y', 'A'].includes(customer.status) ? '활성' : '비활성'}</td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editedCustomer.email}
                                                        onChange={handleInputChange}
                                                        className="small-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={editedCustomer.phone}
                                                        onChange={handleInputChange}
                                                        className="small-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={editedCustomer.address}
                                                        onChange={handleInputChange}
                                                        className="small-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="birth"
                                                        value={editedCustomer.birth}
                                                        onChange={handleInputChange}
                                                        className="small-input"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => handleSave(customer.memberId)}
                                                        className="button save-button"
                                                    >
                                                        저장
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="button cancel-button"
                                                    >
                                                        취소
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDelete(customer.memberId)}
                                                        className="button delete-button"
                                                    >
                                                        삭제
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{customer.memberName}</td>
                                                <td>{['Y', 'A'].includes(customer.status) ? '활성' : '비활성'}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phone}</td>
                                                <td>{customer.address}</td>
                                                <td>{new Date(customer.birth).toISOString().split('T')[0]}</td>
                                                <td>
                                                    <button onClick={() => handleEdit(index, customer)} >수정</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDelete(customer.memberId)}className="button delete-button">삭제</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Customer;

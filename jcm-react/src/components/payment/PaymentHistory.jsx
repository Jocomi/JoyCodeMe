import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import '../../css/payment/PaymentHistory.css';
import axios from 'axios'; 
import { LoginUser } from '../../App';
import EmptyUser from '../common/EmptyUser';

const PaymentHistory = () => {
    const { data: loginUser } = useContext(LoginUser)
    const [paymentList, setPaymentList] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (!loginUser || !loginUser.memberId) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://${window.location.hostname}:7777/api/payment/history`, {
                    params: { memberId: loginUser.memberId } 
                });
                setPaymentList(response.data);
            } catch (error) {
                console.error("Error fetching payment history:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPayments();
    }, [loginUser]);
    

    if (loading) {
        return (
            <div className="loading">
                <p>로딩 중...</p>
            </div>
        );
    }

    if (!loginUser) {
        return (
                <EmptyUser/>
        );
    }

    return (
        <>
            <div className="payment-banner">
                <img src="/img/paymentBanner.png" alt="paymentBanner" />
                <h1>결제 내역</h1>
            </div>
            <div className="payment-history">
                <div className="nav-header">
                    <Link to="/paymenthistory" className="header-link active">결제 내역</Link>
                </div>

                <div className="payment-section">
                    <div className="payment-list">
                        <h2>결제 내역</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>결제번호</th>
                                    <th>결제수단</th>
                                    <th>결제일</th>
                                    <th>항목명</th>
                                    <th>결제금액</th>
                                    <th>결제상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList.length > 0 ? (
                                    paymentList.map((payment, index) => (
                                        <tr key={index}>
                                            <td>{payment.payId}</td>
                                            <td>{payment.payMethod}</td>
                                            <td>{new Date(payment.payTime).toLocaleDateString()}</td>
                                            <td>{payment.payProduct}</td>
                                            <td>{payment.payPrice}</td>
                                            <td>{payment.payStatus}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="no-data">결제 내역이 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;

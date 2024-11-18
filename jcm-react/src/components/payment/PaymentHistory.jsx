import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../css/payment/PaymentHistory.css';
import axios from 'axios'; 

const PaymentHistory = () => {
    const [paymentList, setPaymentList] = useState([]); 

    // API 호출
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get("http://localhost:7777/api/payment/history");
                setPaymentList(response.data); 
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        };

        fetchPayments(); 
    }, []);

    if(paymentList != null) {
        console.log(paymentList)
    }

    return (
        <>
            <div className="payment-banner">
                <img src="/img/paymentBanner.png" alt="paymentBanner" />
                <h1>결제 관리</h1>
            </div>
            <div className="payment-history">
                <div className="nav-header">
                    <Link to="/paymentmethod" className="header-link">결제 관리</Link>
                    <Link to="/paymenthistory" className="header-link active">결제 내역</Link>
                </div>

                <div className="payment-section">
                    <div className="payment-list">
                        <h2>결제 내역</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>납부번호</th>
                                    <th>납부일</th>
                                    <th>항목명</th>
                                    <th>결제금액</th>
                                    <th>결제상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList.length > 0 ? (
                                    paymentList.map((payment, index) => (
                                        <tr key={index}>
                                            <td>{payment.memberId}</td>
                                            <td>{new Date(payment.payTime).toLocaleDateString()}</td>
                                            <td>{payment.payProduct}</td>
                                            <td>{payment.payPrice}</td>
                                            <td>{payment.payStatus}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">결제 내역이 없습니다.</td>
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

import React from 'react';
import { Link } from "react-router-dom";
import '../../css/payment/PaymentHistory.css';

const PaymentHistory = () => {
    return (
        <>
            <div className="payment-banner">
                <img src="/img/paymentBaner.png" alt="paymentbanner" />
            </div>
            <div className="payment-history">
                <div className="nav-header">
                    <Link to="/paymentmethod" className="header-link">결제 관리</Link>
                    <Link to="/paymenthistory" className="header-link active">결제 내역</Link>
                </div>

                <h3>결제 관리</h3>
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
                                <tr>
                                    <td>2103141231541314</td>
                                    <td>2024-10-30</td>
                                    <td>고급</td>
                                    <td>58000</td>
                                    <td>결재 대기</td>
                                </tr>
                                <tr>
                                    <td>43246543532434</td>
                                    <td>2024-10-21</td>
                                    <td>고급</td>
                                    <td>58000</td>
                                    <td>결재 완료</td>
                                </tr>
                                <tr>
                                    <td>2041231412341311</td>
                                    <td>2024-10-15</td>
                                    <td>고급</td>
                                    <td>58000</td>
                                    <td>결재 완료</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;

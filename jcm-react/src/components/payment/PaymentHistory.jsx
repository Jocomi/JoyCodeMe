import { NavLink } from "react-router-dom";
import '../../css/payment/PaymentHistory.css';

const PaymentHistory = () =>{
    return(
        <>
             <div class="payment-history">
                <ul>
                    <li><NavLink to="/paymentmethod"> <h3>결제 수단 관리</h3></NavLink></li>
                    <li><NavLink to="/paymenthistory"> <h3>결제 기록</h3></NavLink></li>
                </ul>

                <div class="payment-section">
                    <div class="payment-list">
                        <h2>결제 내역</h2>
                        <table>
                        <tr>
                            <th>납부번호</th>
                            <th>납부일</th>
                            <th>항목명</th>
                            <th>결제금액</th>
                            <th>결제상태</th>
                        </tr>
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
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentHistory;
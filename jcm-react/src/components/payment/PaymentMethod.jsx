import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../css/payment/PaymentMethod.css';

const PaymentTable = ({ cards, handleDeleteCard }) => (
    <table>
        <thead>
            <tr>
                <th>카드 명칭</th>
                <th>카드 번호</th>
                <th>이름</th>
                <th>카드사</th>
                <th>유효기간</th>
                <th>관리</th>
            </tr>
        </thead>
        <tbody>
            {cards.map((card, index) => (
                <tr key={index}>
                    <td>{card.name}</td>
                    <td>{card.number}</td>
                    <td>{card.owner}</td>
                    <td>{card.company}</td>
                    <td>{card.expiry}</td>
                    <td>
                        <button className="edit-btn">수정</button>
                        <button className="delete-btn" onClick={() => handleDeleteCard(index)}>삭제</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const AddCardForm = ({ newCard, handleInputChange, handleAddCard }) => (
    <tr>
        <td><input type="text" name="name" placeholder="카드 명칭" value={newCard.name} onChange={handleInputChange} /></td>
        <td><input type="text" name="number" placeholder="카드 번호" value={newCard.number} onChange={handleInputChange} /></td>
        <td><input type="text" name="owner" placeholder="이름" value={newCard.owner} onChange={handleInputChange} /></td>
        <td><input type="text" name="company" placeholder="카드사" value={newCard.company} onChange={handleInputChange} /></td>
        <td><input type="text" name="expiry" placeholder="유효기간 (MM/YY)" value={newCard.expiry} onChange={handleInputChange} /></td>
        <td><button className="add-btn" onClick={handleAddCard}>추가</button></td>
    </tr>
);

const AccountTable = ({ accounts, handleDeleteAccount }) => (
    <table>
        <thead>
            <tr>
                <th>이름</th>
                <th>계좌번호</th>
                <th>은행</th>
                <th>관리</th>
            </tr>
        </thead>
        <tbody>
            {accounts.map((account, index) => (
                <tr key={index}>
                    <td>{account.name}</td>
                    <td>{account.accountNumber}</td>
                    <td>{account.bank}</td>
                    <td>
                        <button className="delete-btn" onClick={() => handleDeleteAccount(index)}>삭제</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const AddAccountForm = ({ newAccount, handleAccountChange, handleAddAccount }) => (
    <tr>
        <td><input type="text" name="name" placeholder="이름" value={newAccount.name} onChange={handleAccountChange} /></td>
        <td><input type="text" name="accountNumber" placeholder="계좌번호" value={newAccount.accountNumber} onChange={handleAccountChange} /></td>
        <td><input type="text" name="bank" placeholder="은행" value={newAccount.bank} onChange={handleAccountChange} /></td>
        <td><button className="add-btn" onClick={handleAddAccount}>추가</button></td>
    </tr>
);

const PaymentMethod = () => {
    const [activeTab, setActiveTab] = useState('card'); // 기본 탭 설정

    const [cards, setCards] = useState([
        { name: '내 카드', number: '5594 1000 2293 9044', owner: '홍길동', company: '신한카드', expiry: '29/06' },
        { name: '회사 카드', number: '2131 2341 2112 7895', owner: '고길동', company: '비씨카드', expiry: '27/01' },
    ]);

    const [newCard, setNewCard] = useState({ name: '', number: '', owner: '', company: '', expiry: '' });

    const [accounts, setAccounts] = useState([
        { name: '홍길동', accountNumber: '123-456-789', bank: '신한은행' },
        { name: '고길동', accountNumber: '987-654-321', bank: '우리은행' }
    ]);

    const [newAccount, setNewAccount] = useState({ name: '', accountNumber: '', bank: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value });
    };

    const handleAddCard = () => {
        setCards([...cards, newCard]);
        setNewCard({ name: '', number: '', owner: '', company: '', expiry: '' });
    };

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleAddAccount = () => {
        setAccounts([...accounts, newAccount]);
        setNewAccount({ name: '', accountNumber: '', bank: '' });
    };

    const handleDeleteCard = (index) => {
        setCards(cards.filter((_, i) => i !== index));
    };

    const handleDeleteAccount = (index) => {
        setAccounts(accounts.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="payment-banner">
                <img src="/img/paymentBaner.png" alt="paymentbanner" />
            </div>
            <div className="payment-method">
                <div className="nav-header">
                    <Link to="/paymentmethod" className="header-link active">결제 관리</Link>
                    <Link to="/paymenthistory" className="header-link">결제 내역</Link>
                </div>

                <h3>결제 관리</h3>
                <ul>
                    <li>
                        <button onClick={() => setActiveTab('card')} className={`method-menu ${activeTab === 'card' ? 'active' : ''}`}>
                            카드결제
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab('account')} className={`method-menu ${activeTab === 'account' ? 'active' : ''}`}>
                            계좌이체
                        </button>
                    </li>
                </ul>

                <div className="payment-section">
                    {activeTab === 'card' && (
                        <>
                            <h2>카드 결제 정보</h2>
                            <PaymentTable cards={cards} handleDeleteCard={handleDeleteCard} />
                            <table><tbody><AddCardForm newCard={newCard} handleInputChange={handleInputChange} handleAddCard={handleAddCard} /></tbody></table>
                        </>
                    )}

                    {activeTab === 'account' && (
                        <>
                            <h2>계좌 이체 정보</h2>
                            <AccountTable accounts={accounts} handleDeleteAccount={handleDeleteAccount} />
                            <table><tbody><AddAccountForm newAccount={newAccount} handleAccountChange={handleAccountChange} handleAddAccount={handleAddAccount} /></tbody></table>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentMethod;

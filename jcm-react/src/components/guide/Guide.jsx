import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LoginUser } from '../../App'; // 로그인 상태 확인용 컨텍스트
import '../../css/guide/Guide.css';

const Guide = () => {
  const { data: loginUser } = useContext(LoginUser);
  const [isBootpayLoaded, setBootpayLoaded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSuccessModal = () => {
    setSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  // Bootpay 결제 요청 함수
  const requestPayment = async (price, productName, productId) => {
    if (!loginUser) {
      openModal("로그인 후 결제가 가능합니다.");
      return;
    }

    if (!isBootpayLoaded) {
      console.error("Bootpay script not loaded yet.");
      return;
    }

    try {
      const response = await window.Bootpay.requestPayment({
        application_id: process.env.REACT_APP_GUIDE_APPLICATION_ID,
        price: price,
        order_name: productName,
        order_id: productId,
        pg: '케이씨피',
        method: '카드',
        tax_free: 0,
        user: {
          id: loginUser.memberId,
          username: loginUser.memberName,
          phone: loginUser.phone,
          email: loginUser.email
        },
        items: [
          {
            id: productId,
            name: productName,
            qty: 1,
            price: price
          }
        ],
        extra: {
          open_type: 'iframe',
          card_quota: '0,2,3',
          escrow: false
        }
      });
      openSuccessModal();

      const paymentData = {
        payId: null,
        memberId: loginUser.memberId,
        payMethod: 'CARD',
        payProduct: productId,
        payPrice: price,
        payTime: new Date().toISOString(),
        payStatus: 'Y',
      };

      await sendPaymentToServer(paymentData);

    } catch (error) {
      console.error('결제 실패:', error);

      if (error.event === 'cancel' && error.error_code === 'RC_PROCESS_CANCELLED') {
        setModalMessage('결제를 취소하셨습니다.');
        setModalOpen(true);
      }
    }
  };

  const sendPaymentToServer = async (paymentData) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:7777/api/payment/success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to save payment info to the server");
      }

    } catch (error) {
      console.error("Error saving payment information:", error);
    }
  };

  // Bootpay 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.bootpay.co.kr/bootpay-5.0.1.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setBootpayLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='guide-container'>
      <div className="row">
        <div className="col-md-12 mb-5">
          <h2 className="main-head">Joy Code Me Pricing</h2>
          <p className="sub-head">Joy Code Me Product</p>
        </div>

        {/* 각 요금제 카드 */}
        {['VIP1 2024', 'VIP2 2024', 'VIP3 2024'].map((plan, index) => (
          <motion.div
            key={index}
            className="col-md-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <div className={`pricing-table ${index === 0 ? 'purple' : index === 1 ? 'turquoise' : 'red'}`}>
              <div className="pricing-label">Fixed Price</div>
              <h2>{plan}</h2>
              <h5>{index === 0 ? '초보자를 위해 만들어졌습니다.' : index === 1 ? '숙련된 사용자를 위해 만들어졌습니다.' : '전문가/기관 사용자를 위해 제작됨'}</h5>
              <div className="pricing-features">
                <div className="feature">대역폭<span>{index === 0 ? '50 GB' : index === 1 ? '150 GB' : '250 GB'}</span></div>
                <div className="feature">추가 도메인<span>{index === 0 ? '10' : index === 1 ? '25' : '50'}</span></div>
                <div className="feature">저장 스토리지<span>{index === 0 ? '250 GB' : index === 1 ? '500 GB' : '1 TB'}</span></div>
                <div className="feature">메일 주소<span>{index === 0 ? '25' : index === 1 ? '50' : '75'}</span></div>
              </div>
              <div className="price-tag">
                <span className="symbol">₩</span>
                <span className="amount">{index === 0 ? '49,900' : index === 1 ? '99,900' : '199,900'}</span>
                <span className="after">/영구</span>
              </div>
              <button className="price-button" onClick={() => requestPayment(index === 0 ? 49900 : index === 1 ? 99900 : 199900, plan, `VIP${index + 1}`)}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-message">{modalMessage}</p>
              <button className="modal-close-button" onClick={closeModal}>닫기</button>
            </div>
          </div>
        )}

        {isSuccessModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-message">결제가 완료되었습니다! 감사합니다!</p>
              <button className="modal-close-button" onClick={closeSuccessModal}>닫기</button>
            </div>
          </div>
        )}


        {/* All plans Include section */}
        <div className="col-md-12 mt-5">
          <h3 className="section-head">All plans include</h3>
          <div className="all-plans-features">
            <div className="feature">
              <h4>Free domain hosting</h4>
              <p>Host your project for free on a subdomain. You can always move to domains.</p>
            </div>
            <div className="feature">
              <h4>Google Fonts</h4>
              <p>Access a wide selection of Google Web Fonts without needing to install anything.</p>
            </div>
            <div className="feature">
              <h4>Interactions and states</h4>
              <p>Visual indicators for component states and interactive elements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;

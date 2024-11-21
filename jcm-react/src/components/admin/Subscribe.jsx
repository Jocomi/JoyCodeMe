import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';
import '../../css/admin/Subscribe.css';
import AdminSideBar from './AdminSideBar';
import { useEffect, useRef, useState } from 'react';
import instanceAdmin from '../../shared/axiosAdmin';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const Subscribe = () => {
    useEffect(() => {
        instanceAdmin.get(`http://${window.location.hostname}:3000/`);
      }, []);
      const chartRef = useRef(null);
      const chartInstance = useRef(null);
  
      const [totalUsers, setTotalUsers] = useState(0);
      const [generalUsers, setGeneralUsers] = useState(0);
      const [subscribedUsers, setSubscribedUsers] = useState(0);

    useEffect(() => {
        const getSubscribeData = async () => {
            try {
                const response = await fetch(`http://${window.location.hostname}:7777/api/admin/subscribe-distribution`);
                if (response.ok) {
                    const data = await response.json();
                    setTotalUsers(data.TOTAL_USERS);
                    setGeneralUsers(data.GENERAL_USERS);
                    setSubscribedUsers(data.SUBSCRIBED_USERS);

                    updateChart([data.TOTAL_USERS, data.GENERAL_USERS, data.SUBSCRIBED_USERS]);
                } else {
                    console.error('구독 데이터 요청 실패');
                }
            } catch (error) {
                console.error('구독 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        getSubscribeData();
    }, []);

    const updateChart = (data) => {
        const ctx = chartRef.current.getContext('2d');

        // 기존의 차트를 제거
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['총 회원', '일반 회원', '구독 회원'],
                datasets: [
                    {
                        label: '회원 분포',
                        data: data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
            },
        });
    };
    return(
        <>
        <div className="subscribe-main">
        
        <AdminSideBar/>

        
        <div className="main-content">
        
        <h1>Subscribe</h1>
        <hr />
            <section className="subscribe">
                
            
                <div className="dashboard-cards">
                    <div className="card">
                        <h3>총 회원</h3>
                        <p>{totalUsers}</p>
                    </div>
                    <div className="card">
                        <h3>일반 회원</h3>
                        <p>{generalUsers}</p>
                    </div>
                    <div className="card">
                        <h3>구독 회원</h3>
                        <p>{subscribedUsers}</p>
                    </div>
                </div>
                <div className="chart-container">
                   {/* 도넛 차트 */}
                   <div className="chart-container" style={{ width: '30%', margin: 'auto', paddingTop: '20px' }}>
                            <canvas ref={chartRef} width="300" height="300"></canvas>
                        </div>
                        </div>
            </section>
        </div>
    </div>
        </>
    )
}

export default Subscribe;
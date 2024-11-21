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

    // 상태 선언
    const [totalUsers, setTotalUsers] = useState(0); // 총 회원
    const [generalUsers, setGeneralUsers] = useState(0); // 일반 회원
    const [totalConsumers, setTotalConsumers] = useState(0); // 구독 회원

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            await getTotalUsers(); // 총 회원 데이터
            await getGeneralUsers(); // 일반 회원 데이터
            await getTotalConsumers(); // 구독 회원 데이터
    
            // 차트를 일반회원과 구독회원 데이터로 업데이트
            updateChart([generalUsers, totalConsumers]);
        };
        fetchData();
    }, [generalUsers, totalConsumers]); // 상태가 업데이트될 때 차트 업데이트

    // 총 회원 데이터 가져오기
    const getTotalUsers = async () => {
        const url = `http://${window.location.hostname}:7777/api/admin/total-users`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTotalUsers(data); // 상태 업데이트
            } else {
                console.error('총 회원 데이터를 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('총 회원 데이터를 가져오는 중 오류:', error);
        }
    };

    // 일반 회원 데이터 가져오기
    const getGeneralUsers = async () => {
        const url = `http://${window.location.hostname}:7777/api/admin/general-users`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setGeneralUsers(data); // 상태 업데이트
            } else {
                console.error('일반 회원 데이터를 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('일반 회원 데이터를 가져오는 중 오류:', error);
        }
    };

    // 구독 회원 데이터 가져오기
    const getTotalConsumers = async () => {
        const url = `http://${window.location.hostname}:7777/api/admin/total-consumers`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTotalConsumers(data); // 상태 업데이트
            } else {
                console.error('구독 회원 데이터를 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('구독 회원 데이터를 가져오는 중 오류:', error);
        }
    };

    // 차트 업데이트
    const updateChart = (data) => {
        const ctx = chartRef.current.getContext('2d');

        // 기존 차트를 제거
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['일반 회원', '구독 회원'], // 라벨
                datasets: [
                    {
                        label: '회원 분포',
                        data: data, // 일반 회원과 구독 회원 데이터를 사용
                        backgroundColor: ['#36A2EB', '#FFCE56'], // 일반 회원: 파랑, 구독 회원: 노랑
                        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
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

    return (
        <div className="subscribe-main">
            <AdminSideBar />
            <div className="main-content">
                <h1>Subscribe</h1>
                <hr />
                <section className="subscribe">
                    <div className="dashboard-cards">
                        <div className="card">
                            <h3>총 회원</h3>
                            <p>{totalUsers}</p> {/* 총 회원 */}
                        </div>
                        <div className="card">
                            <h3>일반 회원</h3>
                            <p>{generalUsers}</p> {/* 일반 회원 */}
                        </div>
                        <div className="card">
                            <h3>구독 회원</h3>
                            <p>{totalConsumers}</p> {/* 구독 회원 */}
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="chart-container" style={{ width: '30%', margin: 'auto', paddingTop: '20px' }}>
                            <canvas ref={chartRef} width="300" height="300"></canvas>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Subscribe;

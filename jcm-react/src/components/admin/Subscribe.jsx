import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';
import '../../css/admin/Subscribe.css';
import AdminSideBar from './AdminSideBar';
import { useEffect, useRef } from 'react';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const Subscribe = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Chart 인스턴스를 저장할 ref

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // 기존의 차트 인스턴스가 존재하면 제거
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // 새 차트 인스턴스를 생성하고 chartInstance에 저장
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['총 회원', '일반 회원', '구독 회원'],
                datasets: [
                    {
                        label: '회원 분포',
                        data: [120, 70, 50],
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

        // 컴포넌트 언마운트 시 차트 인스턴스 제거
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []); // 빈 의존성 배열을 넣어 차트가 한 번만 생성되도록 함
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
                        <p>120</p>
                    </div>
                    <div className="card">
                        <h3>일반 회원</h3>
                        <p>70</p>
                    </div>
                    <div className="card">
                        <h3>구독 회원</h3>
                        <p>50</p>
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
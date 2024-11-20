import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import '../../css/admin/Admin.css';
import AdminSideBar from './AdminSideBar';
import instanceAdmin from '../../shared/axiosAdmin';

const AdminDashboard = () => {
  useEffect(() => {
    instanceAdmin.get(`http://${window.location.hostname}:3000/`);
  }, []);

  const earningsChartRef = useRef(null);
  const consumerChartRef = useRef(null);
  const userChartRef = useRef(null);

  // Total Earnings 상태 관리
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalConsumers, setTotalConsumers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0); // Total Users 상태 추가

  useEffect(() => {
    // Total Earnings 데이터를 불러오는 API 호출
    const getTotalEarnings = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:7777/api/admin/total-earnings`);
        if (response.ok) {
          const data = await response.json();
          setTotalEarnings(data); // 상태에 데이터 저장
        } else {
          console.error('Failed to fetch total earnings');
        }
      } catch (error) {
        console.error('Error fetching total earnings:', error);
      }
    };

    const getTotalConsumers = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:7777/api/admin/total-consumers`);
        if (response.ok) {
          const data = await response.json();
          setTotalConsumers(data); // 상태에 데이터 저장
        } else {
          console.error('Failed to fetch total consumers');
        }
      } catch (error) {
        console.error('Error fetching total consumers:', error);
      }
    };

    const getTotalUsers = async () => {
      const url = `http://${window.location.hostname}:7777/api/admin/total-users`;
    
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTotalUsers(data);
        } else {
          console.error('Failed to fetch total users');
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

     // 월별 수익 데이터를 불러오는 API 호출
     const getMonthlyEarnings = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:7777/api/admin/monthly-earnings`);
        if (response.ok) {
          const data = await response.json();
    
          console.log('API 응답 데이터:', data); // 응답 데이터를 콘솔에 출력
    
          // 데이터 확인 및 변환
          if (Array.isArray(data) && data.length > 0) {
            const labels = data.map(item => item.MONTH); // 대소문자를 정확히 맞춤
            const earnings = data.map(item => item.EARNINGS); // 대소문자를 정확히 맞춤
    
            console.log('차트 라벨:', labels);
            console.log('차트 수익 데이터:', earnings);
    
            updateEarningsChart(labels, earnings);
          } else {
            console.error('Invalid data format received from API');
          }
        } else {
          console.error('Failed to fetch monthly earnings');
        }
      } catch (error) {
        console.error('Error fetching monthly earnings:', error);
      }
    };
    
    

    getTotalEarnings();
    getTotalConsumers();
    getTotalUsers();
    getMonthlyEarnings();
  }, []);

  const updateEarningsChart = (labels, data) => {
    const canvas = document.getElementById('earningsChart');
    if (!canvas) {
      console.error('earningsChart element is not found.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
  
    // 기존 차트를 제거
    if (earningsChartRef.current) {
      earningsChartRef.current.destroy();
    }
  
    earningsChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // 월별 라벨
        datasets: [
          {
            label: 'Monthly Earnings',
            data: data, // 월별 수익 데이터
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // 차트 크기 유지
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  
  

  useEffect(() => {
    // 기존 차트가 있다면 먼저 destroy() 호출
    if (consumerChartRef.current) consumerChartRef.current.destroy();
    if (userChartRef.current) userChartRef.current.destroy();


    // 차트 2 - Doughnut Chart
    const ctxTwo = document.getElementById('consumerChart').getContext('2d');
    consumerChartRef.current = new Chart(ctxTwo, {
      type: 'doughnut',
      data: {
        labels: ['일반회원', 'VIP1', 'VIP2', 'VIP3'],
        datasets: [
          {
            label: 'User',
            data: [70, 50, 25, 12],
            backgroundColor: [
              '#ff6384',
              '#36a2eb',
              '#cc65fe',
              '#ffce56'
            ],
          },
        ],
      },
    });

    // 차트 3 - Line Chart
    const ctx3 = document.getElementById('userChart').getContext('2d');
    userChartRef.current = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['회원 1', '회원 2', '회원 3', '회원 4'],
        datasets: [
          {
            label: '회원관리',
            data: [10, 15, 20, 25],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });

    // 컴포넌트 언마운트 시 차트 인스턴스 삭제
    return () => {
      if (earningsChartRef.current) earningsChartRef.current.destroy();
      if (consumerChartRef.current) consumerChartRef.current.destroy();
      if (userChartRef.current) userChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="admin-main">
      <AdminSideBar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <hr />

        <section className="dashboard">
          <div className="dashboard-cards">

            {/* Total Earnings */}
            <div className="card">
              <h3>Total Earnings</h3>
              <p>₩{totalEarnings.toLocaleString()}</p>
            </div>

            {/* Total Consumer */}
            <div className="card">
              <h3>Total Consumer</h3>
              <p>{totalConsumers}</p>
            </div>

            {/* Total User */}
            <div className="card">
              <h3>Total User</h3>
              <p>{totalUsers}</p>
            </div>

            {/* Total Tasks */}
            <div className="card">
              <h3>Total Tasks</h3>
              <p>25</p>
            </div>
          </div>

          <div className="charts-projects">
            {/* 차트 1 */}
            <div className="chart">
              <canvas id="earningsChart"></canvas>
            </div>

            {/* 차트 2 */}
            <div className="chartTwo">
              <canvas id="consumerChart"></canvas>
            </div>

            {/* 차트 3 */}
            <div className="chart3">
              <canvas id="userChart"></canvas>
            </div>

            {/* 프로젝트 리스트 */}
            <div className="projects">
              <h3>Latest Function</h3>
              <ul>
                <li>
                  Open AI - Status:{' '}
                  <span style={{ color: 'rgb(0, 175, 0)' }}>Work</span>
                </li>
                <li>
                  Open API - Status:{' '}
                  <span style={{ color: 'rgb(0, 175, 0)' }}>Work</span>
                </li>
                <li>
                  Web Server - Status:{' '}
                  <span style={{ color: 'rgb(0, 175, 0)' }}>Work</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

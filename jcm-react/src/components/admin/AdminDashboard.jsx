import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../../css/admin/Admin.css';
import AdminSideBar from './AdminSideBar';
import AdminTopBar from './AdminTopBar';

const AdminDashboard= ()=> {
  const salesChartRef = useRef(null);
  const testChartRef = useRef(null);
  const testChart2Ref = useRef(null);

  useEffect(() => {
    // 기존 차트가 있다면 먼저 destroy() 호출
    if (salesChartRef.current) salesChartRef.current.destroy();
    if (testChartRef.current) testChartRef.current.destroy();
    if (testChart2Ref.current) testChart2Ref.current.destroy();

    // 차트 1 - Bar Chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: '접속자',
          data: [300, 500, 400, 600, 700, 800],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // 차트 2 - Doughnut Chart
    const ctxTwo = document.getElementById('testChart').getContext('2d');
    testChartRef.current = new Chart(ctxTwo, {
      type: 'doughnut',
      data: {
        labels: ['일반회원', 'Level1', 'Level2', 'Level3', 'Level4', 'Level5'],
        datasets: [{
          label: 'User',
          data: [70, 50, 25, 12, 10, 20],
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#32a852', '#f77825']
        }]
      }
    });

    // 차트 3 - Line Chart
    const ctx3 = document.getElementById('testChart2').getContext('2d');
    testChart2Ref.current = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['회원 1', '회원 2', '회원 3', '회원 4'],
        datasets: [{
          label: '회원관리',
          data: [10, 15, 20, 25],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });

    // 컴포넌트 언마운트 시 차트 인스턴스 삭제
    return () => {
      if (salesChartRef.current) salesChartRef.current.destroy();
      if (testChartRef.current) testChartRef.current.destroy();
      if (testChart2Ref.current) testChart2Ref.current.destroy();
    };
  }, []);

  return (
    <div className="admin-main">
      <AdminSideBar/>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
      <AdminTopBar/>

        {/* 대시보드 섹션 */}
        <section className="dashboard">
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Earnings</h3>
              <p>$12,500</p>
            </div>
            <div className="card">
              <h3>Total Users</h3>
              <p>70</p>
            </div>
            <div className="card">
              <h3>Total Visitor</h3>
              <p>255</p>
            </div>
            <div className="card">
              <h3>Total Tasks</h3>
              <p>25</p>
            </div>
          </div>
          
          {/* 그래프 및 프로젝트 리스트 */}
          <div className="charts-projects">
            <div className="chart">
              <canvas id="salesChart"></canvas>
            </div>
            <div className="chartTwo">
              <canvas id="testChart"></canvas>
            </div>
            <div className="chart3">
              <canvas id="testChart2"></canvas>
            </div>
            <div className="projects">
              <h3>Latest Function</h3>
              <ul>
                <li>Open AI - Status: <span style={{color: "rgb(0, 175, 0)"}}>Work</span></li>
                <li>Open API - Status: <span style={{color: "rgb(0, 175, 0)"}}>Work</span></li>
                <li>Web Server - Status: <span style={{color: "rgb(0, 175, 0)"}}>Work</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;

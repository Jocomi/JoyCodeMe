import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const BoardTable = ({ className }) => {
  const [tableData] = useState([
    { id: 1, type: '작업', title: '네이버톡스 경영자원 API 출시 안내', date: '2024.09.24' },
    { id: 2, type: '업데이트', title: 'Windows PC인증서 변경에 따른 v4.0 미만 앱 재설치 필요', date: '2024.09.20' },
    { id: 3, type: '업데이트', title: '네이버톡스 코어 비정기 업데이트 소식', date: '2024.09.09' },
    { id: 4, type: '작업', title: '네이버톡스 경영자원 API 출시 안내', date: '2024.09.07' },
    { id: 5, type: '업데이트', title: 'Windows PC인증서 변경에 따른 v4.0 미만 앱 재설치 필요', date: '2024.09.01' },
  ]);

  const navigate = useNavigate();

  return (
    <div className={className}>
      <Table hover responsive borderless>
        <tbody>
          {tableData.map((post) => (
            <tr
              key={post.id}
              onClick={() => {
                console.log("Navigating to detail page"); // 디버깅 로그
                navigate('/detailpost'); // 상세 페이지로 이동
              }}
            >
              <td>{post.type}</td>
              <td>{post.title}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardTable;

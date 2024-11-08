import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

// 게시판 유형을 파라미터로 받아서 해당 게시판 데이터를 불러오는 컴포넌트
const BoardTable = ({ className, boardType }) => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  // 게시판 유형에 따라 데이터 가져오기
  useEffect(() => {
    const fetchData = () => {
      let data = [];
      switch (boardType) {
        case 'announcement':
          data = [
            { id: 1, type: '작업', title: '네이버톡스 경영자원 API 출시 안내', date: '2024.09.24', status: 'Y' },
          ];
          break;
        case 'free':
          data = [
            { id: 2, type: '업데이트', title: 'Windows PC인증서 변경에 따른 v4.0 미만 앱 재설치 필요', date: '2024.09.20', status: 'Y' },
          ];
          break;
        case 'enquiry':
          data = [
            { id: 3, type: '질문', title: '네이버톡스 코어 비정기 업데이트 소식', date: '2024.09.09', status: 'Y' },
          ];
          break;
        case 'project':
          data = [
            { id: 4, type: '작업', title: '네이버톡스 경영자원 API 출시 안내', date: '2024.09.07', status: 'Y' },
          ];
          break;
        default:
          data = [];
      }
      setTableData(data); // 상태 설정
      console.log("Fetched data:", data); // 데이터 출력하여 디버깅
    };

    fetchData();
  }, [boardType]);

  return (
    <div className={className}>
      <Table hover responsive borderless>
        <tbody>
          {tableData.length > 0 ? ( // 데이터가 존재할 경우에만 렌더링
            tableData
              .filter(post => post.status === 'Y') // 'STATUS'가 'Y'인 항목만 표시
              .map(post => (
                <tr
                  key={post.id}
                  onClick={() => {
                    console.log("상세 페이지로 이동"); // 디버깅 로그
                    navigate('/detailpost'); // 상세 페이지로 이동
                  }}
                >
                  <td>{post.type}</td>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3">데이터가 없습니다.</td> {/* 데이터가 없을 때 메시지 표시 */}
            </tr>
          )}
        </tbody>
      </Table>
      <a href="/enrollPost">
        <button type="button" className="btn btn-primary">작성 하기</button>
      </a>
      <div className="pagination-container">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item disabled>{5}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
};

export default BoardTable;

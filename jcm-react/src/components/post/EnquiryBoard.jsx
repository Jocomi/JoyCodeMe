import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const EnquiryBoard = ({ className }) => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/selectEB'); // 문의사항 API 엔드포인트
        setTableData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={className}>
      <Table hover responsive borderless>
        <thead>
          <tr>
            <th>번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {tableData
            .filter(post => post.status === 'Y') // 'STATUS'가 'Y'인 항목만 표시
            .map((post) => (
              <tr
                key={post.postNo}
                onClick={() => navigate(`/detailpost/enquiry/${post.postNo}`)}// 상세보기 페이지로 이동
              >
                <td>{post.postNo}</td>
                <td>{post.memberId}</td>
                <td>{post.postTitle}</td>
                <td>{post.postTime}</td>
                <td>{post.countView}</td>
              </tr>
          ))}
        </tbody>
      </Table>
      <a href="/enrollPost">
        <button type="button" className="btn btn-primary">작성 하기</button>
      </a>
      <PaginationComponent />
    </div>
  );
};

const PaginationComponent = () => (
  <div className="pagination-container">
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  </div>
);

export default EnquiryBoard;

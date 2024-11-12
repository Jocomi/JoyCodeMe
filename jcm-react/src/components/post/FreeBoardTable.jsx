import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const FreeBoardTable = ({ className }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const navigate = useNavigate();

  const postsPerPage = 5; // 페이지당 게시물 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/selectFB'); // 자유게시판 API 엔드포인트
        const sortedData = response.data.sort((a, b) => a.postNo - b.postNo);
        setTableData(sortedData);
        
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchData();
  }, []);

  // 현재 페이지의 게시물 계산
  const filteredPosts = tableData.filter(post => post.status === 'Y');
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentPosts.map((post) => (
            <tr
              key={post.postNo}
              onClick={() => navigate(`/detailpost/free/${post.postNo}`)} // 상세보기 페이지로 이동
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
      <PaginationComponent
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

const PaginationComponent = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {pageNumbers.map(number => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
        <Pagination.Last onClick={() => paginate(pageNumbers.length)} disabled={currentPage === pageNumbers.length} />
      </Pagination>
    </div>
  );
};

export default FreeBoardTable;

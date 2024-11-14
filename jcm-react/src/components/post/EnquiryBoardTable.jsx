import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const EnquiryBoard = ({ className }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(null); // 로그인된 사용자 정보
  const postsPerPage = 5; // 페이지당 게시물 수

  
  // 로그인 사용자 정보 가져오기
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('loginUser'));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:7777/selectEB`); // 문의사항 API 엔드포인트
        // postNo를 기준으로 오름차순 정렬
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
 // 비공개 게시물 접근 제한
 const handlePostClick = (post) => {
  if (post.privateEnquiry === 'N') {
    // 비공개 게시물 접근 제한 조건
    if (loginUser && (loginUser.status === 'A' || loginUser.memberId === post.memberId)) {
      navigate(`/detailpost/enquiry/${post.postNo}`);
    } else {
      alert("비공개 게시물입니다.");
    }
  } else {
    // 공개 게시물은 누구나 접근 가능
    navigate(`/detailpost/project/${post.postNo}`);
  }
};
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
              onClick={() => handlePostClick(post)} // 클릭 핸들러 적용
            >
              <td>{post.postNo}</td>
              <td>{post.memberId}</td>
              <td>{post.privateEnquiry === 'N' && post.memberId !== loginUser.memberId  ? '비공개 게시물입니다.' : post.postTitle}</td>
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

export default EnquiryBoard;

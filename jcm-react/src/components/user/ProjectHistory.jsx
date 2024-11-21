import { useEffect, useState } from 'react';
import '../../css/user/ProjectHistory.css';
import instance from '../../shared/axios';
import { Pagination } from 'react-bootstrap';

const ProjectHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 

  const postsPerPage = 5; // 페이지당 게시물 수

  // 현재 페이지의 게시물 계산
  const filteredPosts = tableData.filter(post => post.status === 'Y');
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    instance.get(`http://${window.location.hostname}:3000/`);

    const fetchData = async () => {
      try {
        const loginUser = sessionStorage.getItem('loginUser');  
        const memberId = JSON.parse(loginUser).memberId;
  
        const response = await fetch(`http://${window.location.hostname}:7777/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memberId }),
        });
  
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
  
        const result = await response.json();
        
        const sortedData = result.sort((a, b) => b.historyNo - a.historyNo); // postNo를 기준으로 오름차순 정렬
        setTableData(sortedData);

      } catch (e) {
        alert("기록 로딩 중 오류가 발생했습니다.");
        console.error(e);
      }
    };
  
    fetchData();
  }, []);
  
    return(
        <>
          <div className="history-main">
            <h1>사용기록 관리</h1>
            <hr />
              <div className="history-list">
                <table>
                  <thead>
                    <tr>
                      <th>의뢰 내용</th>
                      <th>의뢰 날짜</th>
                      <th>의뢰 기능</th>
                      <th>정상 처리 여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((history) => (
                        <tr
                          key={history.historyNo}
                        >
                          <td>{history.request}</td>
                          <td>{history.historyTime}</td>
                          <td>{history.usedFunction}</td>
                          <td>{history.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
                <br/>
              <PaginationComponent 
              postsPerPage={postsPerPage}
              totalPosts={filteredPosts.length}
              currentPage={currentPage}
              paginate={paginate}/>
              </div>
          </div>
        </>
    )
}

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


export default ProjectHistory;
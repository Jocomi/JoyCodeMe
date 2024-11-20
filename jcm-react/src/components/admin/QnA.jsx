import AdminSideBar from "./AdminSideBar";

import '../../css/admin/QnA.css';
import { useEffect, useState } from "react";
import instanceAdmin from "../../shared/axiosAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QnA = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [boardType, setBoardType] = useState("enquiry");
    const [selectedDate, setSelectedDate] = useState(""); // 날짜 선택
    const [selectedMonth, setSelectedMonth] = useState(""); // 월 선택
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:7777/select${boardType}`);
        const sortedData = response.data.sort((a, b) => a.postNo - b.postNo);
        setTableData(sortedData);
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };
  
    const deactivatePost = async (postNo) => {
      try {
        const response = await axios.put(`http://${window.location.hostname}:7777/${boardType}/${postNo}/deactivate`);
        alert(response.data);
      } catch (error) {
        console.error('게시글 비활성화 실패:', error);
        alert('비활성화 중 오류가 발생했습니다.');
      }
    };
  
    useEffect(() => {
      fetchData(boardType);
    }, [boardType]);
  
    // 날짜와 월을 필터링하는 로직
    const filteredData = tableData.filter((post) => {
      const postDate = new Date(post.postTime);
      const postDateString = postDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  
      const postMonth = postDateString.substring(0, 7); // YYYY-MM 형식
  
  
      // 월 필터링
      if (selectedMonth && postMonth !== selectedMonth) return false;
  
      return true;
    });
    useEffect(() => {
        instanceAdmin.get(`http://${window.location.hostname}:3000/`);
      }, []);
    return(
        <>
        <div className="QnA-main">
        
        <AdminSideBar/>

        
        <div className="main-content">
        <h1>Q & A</h1>
        <hr />
        <section className="qna">
            <div className="month-filter">
              <label htmlFor="month">월 별 게시물 보기: </label>
              <input
                type="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)} // 월 변경 시 상태 업데이트
              />
            </div>
            <div className="qna-table">
              <table>
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>수정</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.filter((post) => post.status !== 'N').map((post) => (
                      <tr
                        key={post.postNo}
                        onClick={() => navigate(`/detailpost/${boardType}/${post.postNo}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{post.postNo}</td>
                        <td>{post.memberId}</td>
                        <td>{post.postTitle}</td>
                        <td>{new Date(post.postTime).toISOString().split("T")[0]}</td>
                        <td>
                          <button
                            onClick={(event) => {
                              event.stopPropagation(); // 이벤트 전파 중단
                              deactivatePost(post.postNo);
                            }}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">게시글이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
    </div>
        </>
    )
}

export default QnA;
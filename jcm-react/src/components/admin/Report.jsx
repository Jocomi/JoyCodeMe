import AdminSideBar from "./AdminSideBar";
import '../../css/admin/QnA.css';
import { useEffect, useState } from "react";
import instanceAdmin from "../../shared/axiosAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { data } from "jquery";

const Report = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [boardType, setBoardType] = useState("");
    const [selectedDate, setSelectedDate] = useState(""); // 날짜 선택
    const [selectedMonth, setSelectedMonth] = useState(""); // 월 선택
  
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://${window.location.hostname}:7777/select/report`);
            console.log(response.data);
            const sortedData = response.data.sort((a, b) => b.reportNo - a.reportNo); // reportNo로 정렬
            setTableData(sortedData);
        } catch (error) {
            console.error("데이터를 가져오는 데 실패했습니다:", error);
        }
    };

    const deactivateReport = async (postNo, reportId, boardType) => {
      const data = {
        postNo,
        reportId,
        boardType
      }
      try {
          const response = await axios.put(`http://${window.location.hostname}:7777/${boardType}/${postNo}/deactivate/report` , data);
          alert(response.data);
          fetchData();
      } catch (error) {
          console.error('신고처리 실패:', error);
          alert('신고처리  중 오류가 발생했습니다.');
      }
  };

    useEffect(() => {
        fetchData(); // boardType에 상관없이 데이터 가져옴
    }, []);

    // 날짜와 월을 필터링하는 로직
    const filteredData = tableData.filter((post) => {
        const postDate = new Date(post.reportTime); // reportTime을 기준으로 필터링
        const postDateString = postDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  
        const postMonth = postDateString.substring(0, 7); // YYYY-MM 형식
  
        // 월 필터링
        if (selectedMonth && postMonth !== selectedMonth) return false;
  
        return true;
    });

    useEffect(() => {
        instanceAdmin.get(`http://${window.location.hostname}:3000/`);
    }, []);

    return (
        <>
            <div className="QnA-main">
                <AdminSideBar />
                <div className="main-content">
                    <h1>신고 게시물 관리</h1>
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
                                        <th>게시물 번호</th>
                                        <th>신고자</th>
                                        <th>게시판 유형</th>
                                        <th>신고 내용</th>
                                        <th>신고 날짜</th>
                                        <th>신고처리 상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(filteredData) && filteredData.length > 0 ? (
                                        filteredData.map((post) => (
                                            <tr
                                                key={post.reportNo}
                                                onClick={() => navigate(`/detailpost/${post.boardType.toLowerCase()}/${post.postNo}`)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <td>{post.postNo}</td>
                                                <td>{post.reportId}</td>
                                                <td>{post.boardType.toLowerCase()}</td> {/* boardType을 표시 */}
                                                <td>{post.reportText}</td>
                                                <td>{new Date(post.reportTime).toISOString().split("T")[0]}</td>
                                                <td>
                                                    <button
                                                        disabled ={post.status === 'N'}
                                                        style={{ backgroundColor: post.status === 'N' ? '#4CAF50' : '#FF9800'}}
                                                        onClick={(event) => {
                                                            event.stopPropagation(); // 이벤트 전파 중단
                                                            deactivateReport(post.postNo, post.reportId, post.boardType.toLowerCase());
                                                        }}
                                                    >
                                                        {post.status === 'N' ? '처리 완료' : '처리 중'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">게시글이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Report;

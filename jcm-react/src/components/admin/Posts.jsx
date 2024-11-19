import AdminSideBar from "./AdminSideBar";
import '../../css/admin/Posts.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";



const Posts = () => {
    const navigate = useNavigate(); // useNavigate 훅으로 네비게이션 기능 추가
    const [tableData , setTableData] = useState('');
    const [ boardType , setBoardType] = useState("project"); // state에서 boardType 추출
    const fetchData = async () => {
        console.log(boardType);
        try {
          const response = await axios.get(`http://${window.location.hostname}:7777/select${boardType}`); // 공지사항 API 엔드포인트
          console.log(response);
          const sortedData = response.data.sort((a, b) => a.postNo - b.postNo); // postNo를 기준으로 오름차순 정렬
          setTableData(sortedData);
       
        } catch (error) {
          console.error("데이터를 가져오는 데 실패했습니다:", error);
        }
      };
    useEffect(() => {
   
      fetchData(boardType);
    }, [boardType]);
    return(
        <>
        <div className="posts-main">
  
       <AdminSideBar/>

   
        <div className="main-content">
     
        <h1>Posts</h1>
        <ul className="post-ul">
        <li onClick={()=>setBoardType("project")}>Project</li>
        <li onClick={()=>setBoardType("free")}>Free</li>
        </ul>
        <hr/>
            <section className="posts">
             
                
                <div className="post-list">
                    <table>
                        <thead>
                            <tr>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>날짜</th>
                                <th>수정</th>
                            </tr>
                        </thead>
                        <thead>
                            {tableData.length > 0 ? (
                                tableData.map((post) => (
                                    <tr key={post.postNo} onClick={() => navigate(`/detailpost/${boardType}/${post.postNo}`)} style={{ cursor: "pointer" }}>
                                        <td>{post.postNo}</td>
                                        <td>{post.memberId}</td>
                                        <td>{post.postTitle}</td>
                                        <td>{post.postContent}</td>
                                        <td>{new Date(post.postTime).toISOString().split('T')[0]}</td>
                                        <td>
                                            <button>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                 <td colSpan="6">게시글이 없습니다.</td>
                                </tr>
                            )}
                        </thead> 
                    </table>
                </div>
            </section>
        </div>
    </div>
        </>
    )
}

export default Posts;
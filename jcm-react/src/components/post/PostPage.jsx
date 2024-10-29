import '../../css/PostPage.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';

const PostPage = () => {
    return (
        <div className="post-container">
            <div className="post-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>고객지원</h1>
            </div>
            <div className="post-header">
 <ul>
                    <li>전체</li>
                    <li>작업</li>
                    <li>업데이트</li>
                </ul>
            </div>
            <div className="menubar-div">
                    <ul>
                        <li><h2>고객 지원</h2></li>
                        <li><NavLink to="/Support/Notice">공지사항</NavLink></li>
                        <li><NavLink to="/Support/FreeBoard">자유 게시판</NavLink></li>
                        <li><NavLink to="/Support/ProjectBoard">프로젝트 게시판</NavLink></li>
                        <li><NavLink to="/Support/Questions">문의사항</NavLink></li>
                    </ul>
                </div>
            <div className="post-table">
                <Table hover responsive borderless>
                    <tbody>

                        <tr>
                            <td>작업</td>
                            <td>네이버톡스 경영자원 API 출시 안내</td>
                            <td>2024.09.24</td>
                        </tr>
                        <tr>
                            <td>업데이트</td>
                            <td>Windows PC인증서 변경에 따른 v4.0 미만 앱 재설치 필요</td>
                            <td>2024.09.20</td>
                        </tr>
                        <tr>
                            <td>업데이트</td>
                            <td>네이버톡스 코어 비정기 업데이트 소식</td>
                            <td>2024.09.09</td>
                        </tr>
                        <tr>
                            <td>작업</td>
                            <td>네이버톡스 경영자원 API 출시 안내</td>
                            <td>2024.09.07</td>
                        </tr>
                        <tr>
                            <td>업데이트</td>
                            <td>Windows PC인증서 변경에 따른 v4.0 미만 앱 재설치 필요</td>
                            <td>2024.09.01</td>
                        </tr>
                    </tbody>
                </Table>

            </div>
                <button type="button" className="btn btn-primary">작성 하기</button>
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


        <div class="questions-div">
            <h2 class="questions-left">자주 묻는 질문을 확인하세요!</h2>
            <div class="questions-right">
                <ol>
                <li className="question-item">LEVEL마다 제공되는게 뭐가 다른지 정확히 알고 싶어요.
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                <li className="question-item">미리보기 부분이 나오지 않아요.
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                <li className="question-item">게시판에 글이 올라가지 않는데 왜그런가요?
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                <li className="question-item">사용법을 잘 모르겠어요.
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                <li className="question-item">기능사용 횟수에 제한이 있나요?
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                <li className="question-item">결제를 했는데 기능 사용이 안돼요.
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                <li className="question-item">환불을 하고 싶은데 환불은 어떻게 하나요?
                    <div className="answer">
                    각 LEVEL에 따라 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요.
                    </div>
                </li>
                </ol>
            </div>
        </div>
    </div>
    );
}
export default PostPage;
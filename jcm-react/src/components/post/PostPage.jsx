import '../../css/PostPage.css';
import Pagination from 'react-bootstrap/Pagination'

const PostPage = () => {
    return (
        <div className="post-page">
        <div className="main">
            <div className="mainTop-img">
                <img src="/img/후보 3.jpg" alt="logoImg" />
            </div>

            <div className="menubar-div">
                <ul>
                <li><h2>고객 지원</h2></li>
                <li><a href="">공지사항</a></li>
                <li><a href="">자유 게시판</a></li>
                <li><a href="">프로젝트 게시판</a></li>
                <li><a href="">문의사항</a></li>
                </ul>
            </div>

            <div className="main-div">
                {/* <!-- 추후에 리엑트를 사용하면 menubar로 바뀔 수 있음--> */}
                <br/><br/>
                <div className="post-content-div">
                    <table className="post-content-table">
                    <thead>
                        <tr>
                            <td>작성자</td>
                            <td>제목</td>
                            <td>작성시간</td>
                            <td>조회수</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>작성자1</td>
                            <td>제목1</td>
                            <td>작성시간1</td>
                            <td>조회수1</td>
                        </tr>
                    </tbody>
                        
                </table>

                <button type="button" className="btn btn-primary">작성 하기</button>
                
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
        </div>
        <div className="questions-div">
            <h2 className="questions-left">자주 묻는 질문을 확인하세요!</h2>
            <div className="questions-right">
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
    )
}
export default PostPage;
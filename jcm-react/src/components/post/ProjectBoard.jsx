import '../../css/post/ProjectBoard.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';

const ProjectBoard = () => {
    return (
        <div className="project-container">
            <div className="project-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>프로젝트게시판</h1>
            </div>
            <div className="project-header">
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
            <div className="project-table">
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
        </div>
    );
};

export default ProjectBoard;

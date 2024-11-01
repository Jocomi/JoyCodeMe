import '../../css/post/Notice.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import PostMenu from './PostMenu';
import BoardTable from './BoardTable';


const Notice = () => {
    return (
        <div className="notice-container">
            <div className="notice-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>공지사항</h1>
            </div>
            <div className="notice-header">
                <ul>
                    <li>전체</li>
                    <li>작업</li>
                    <li>업데이트</li>
                </ul>
            </div>
                <PostMenu/>
                <BoardTable className="notice-table"/>
                <button type="button" className="btn btn-primary"><a href="/support/enrollPost">작성 하기</a></button>
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

export default Notice;

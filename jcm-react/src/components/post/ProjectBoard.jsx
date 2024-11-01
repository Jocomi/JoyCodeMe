import '../../css/post/ProjectBoard.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import PostMenu from './PostMenu';
import BoardTable from './BoardTable';



const ProjectBoard = () => {
    return (
        <div className="project-container">
            <div className="project-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>프로젝트 게시판</h1>
            </div>
            <div className="project-header">

            </div>
            <PostMenu/>
            <BoardTable className="project-table"/>
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

export default ProjectBoard;

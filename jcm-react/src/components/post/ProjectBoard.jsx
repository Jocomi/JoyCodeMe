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
               
            <div className="pagination-container">
 
            </div>
        </div>
    );
};

export default ProjectBoard;

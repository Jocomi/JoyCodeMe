import '../../css/post/FreeBoard.css';
import Pagination from 'react-bootstrap/Pagination';
import PostMenu from './PostMenu';
import BoardTable from './BoardTable';

const FreeBoard = () => {
    return (
        <div className="free-container">
            <div className="free-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>자유게시판</h1>
            </div>
            <div className="free-header">

            </div>
                <PostMenu/>
            <BoardTable className="free-table"/>
              
            <div className="pagination-container">
        
            </div>
        </div>
    );
};

export default FreeBoard;
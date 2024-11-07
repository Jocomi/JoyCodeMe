import '../../css/post/Notice.css';
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
              
            <div className="pagination-container">
  
            </div>
        </div>
    );
};

export default Notice;

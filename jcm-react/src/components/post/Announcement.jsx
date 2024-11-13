import '../../css/post/Notice.css';
import PostMenu from './boarditems/PostMenu';
import AnnouncementBoardTable from './AnnouncementBoardTable';


const Announcement = () => {
    return (
        <div className="notice-container">
            <div className="notice-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>공지사항</h1>
            </div>
            <div className="notice-header">
           
            </div>
                <PostMenu/>
                <AnnouncementBoardTable className="notice-table"/>
              
            <div className="pagination-container">
  
            </div>
        </div>
    );
};

export default Announcement;

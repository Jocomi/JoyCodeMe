import '../../css/post/Questions.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import FrequentlyQuestions from './FrequentlyQuestions';
import PostMenu from './PostMenu';
import BoardTable from './BoardTable';

const Questions = () => {
    return (
        <div className="questions-container">
            <div className="questions-banner">
                <img src="/img/banner.png" alt="Banner" />
                <h1>문의사항</h1>
            </div>
            <div className="questions-header">

            </div>
            <PostMenu/>
            <BoardTable className="questions-table"/>
              
 
            <FrequentlyQuestions />
        </div>
    );
};

export default Questions;

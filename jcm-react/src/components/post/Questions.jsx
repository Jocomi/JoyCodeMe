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
            <FrequentlyQuestions />
        </div>
    );
};

export default Questions;

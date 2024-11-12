import '../../css/post/Questions.css';
import FrequentlyQuestions from './FrequentlyQuestions';
import PostMenu from './PostMenu';
import EnquiryBoard from './EnquiryBoard';

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
            <EnquiryBoard className="questions-table"/>
              
 
            <FrequentlyQuestions />
        </div>
    );
};

export default Questions;

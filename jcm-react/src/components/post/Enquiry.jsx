import '../../css/post/Questions.css';
import EnquiryBoard from './EnquiryBoard';
import FrequentlyQuestions from './boarditems/FrequentlyQuestions';
import PostMenu from './boarditems/PostMenu';


const Enquiry = () => {
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

export default Enquiry;

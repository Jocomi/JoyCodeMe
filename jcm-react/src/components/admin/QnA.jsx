import AdminSideBar from "./AdminSideBar";
import AdminTopBar from "./AdminTopBar";
import '../../css/admin/QnA.css';

const QnA = () => {
    return(
        <>
        <div class="QnA-main">
        
        <AdminSideBar/>

      
        <div class="main-content">
        <AdminTopBar/>

            <section class="qna">
                <h1>문의게시판</h1>
                <ul>
                    <li>결제는 무통장 입금만 가능한가요? <button>답변하기</button></li>
                    <li>체험판은 따로 없나요? <button>답변하기</button></li>
                </ul>
            </section>
        </div>
    </div>
        </>
    )
}

export default QnA;
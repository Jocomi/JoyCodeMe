import '../../css/admin/Subscribe.css';
import AdminSideBar from './AdminSideBar';
import AdminTopBar from './AdminTopBar';

const Subscribe = () => {
    return(
        <>
        <div class="subscribe-main">
        
        <AdminSideBar/>

        
        <div class="main-content">
        <AdminTopBar/>

            <section class="subscribe">
                <h1>Subscribe</h1>
                <div class="dashboard-cards">
                    <div class="card">
                        <h3>총 회원</h3>
                        <p>120</p>
                    </div>
                    <div class="card">
                        <h3>일반 회원</h3>
                        <p>70</p>
                    </div>
                    <div class="card">
                        <h3>구독 회원</h3>
                        <p>50</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
        </>
    )
}

export default Subscribe;
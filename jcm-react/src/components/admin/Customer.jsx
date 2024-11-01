import '../../css/admin/Customer.css';
import AdminSideBar from './AdminSideBar';


const Customer = () => {
    return(
        <>
         <div className="Customer-main">
      
         <AdminSideBar/>

 
        <div className="main-content">
      
        <h1>Customer</h1>
        <hr />
            <section className="customer">
                
                
            
                <div className="customer-list">
                    <table>
                        <tr>
                            <th>이름</th>
                            <th>상태</th>
                            <th>이메일</th>
                            <th>더보기</th>
                        </tr>
                        <tr>
                            <td>엄희윤</td>
                            <td>Y</td>
                            <td>rocomi@gmail.com</td>
                            <td><button>View</button></td>
                        </tr>
                        <tr>
                            <td>기다운</td>
                            <td>Y</td>
                            <td>rlekdns@gmail.com</td>
                            <td><button>View</button></td>
                        </tr>
                        <tr>
                            <td>양준혁</td>
                            <td>Y</td>
                            <td>zeus@gmail.com</td>
                            <td><button>View</button></td>
                        </tr>
                        <tr>
                            <td>이주원</td>
                            <td>Y</td>
                            <td>2week@gmail.com</td>
                            <td><button>View</button></td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    </div>
        </>
    )
}

export default Customer;
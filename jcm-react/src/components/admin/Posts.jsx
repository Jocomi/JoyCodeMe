import AdminSideBar from "./AdminSideBar";
import '../../css/admin/Posts.css';


const Posts = () => {
    return(
        <>
        <div className="posts-main">
  
       <AdminSideBar/>

   
        <div className="main-content">
     
        <h1>Posts</h1>
        <hr/>
            <section className="posts">
             
                
                <div className="post-list">
                    <table>
                        <tr>
                            <th>제목</th>
                            <th>상태</th>
                            <th>날짜</th>
                            <th>수정</th>
                        </tr>
                        <tr>
                            <td>Test</td>
                            <td>Y</td>
                            <td>2024-10-16</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>Test2</td>
                            <td>Y</td>
                            <td>2024-10-16</td>
                            <td><button>Edit</button></td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    </div>
        </>
    )
}

export default Posts;
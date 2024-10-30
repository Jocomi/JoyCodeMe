import AdminSideBar from "./AdminSideBar";
import '../../css/admin/Posts.css';
import AdminTopBar from "./AdminTopBar";

const Posts = () => {
    return(
        <>
        <div class="posts-main">
  
       <AdminSideBar/>

   
        <div class="main-content">
        <AdminTopBar/>

            <section class="posts">
                <h1>게시글 관리</h1>
                <div class="post-list">
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
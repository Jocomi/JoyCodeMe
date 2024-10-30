import '../../css/admin/AdminTopBar.css';

const AdminTopBar = () =>{
    return(
        <>
        <header class="topbar">
                    <input type="text" placeholder="Search..."/>
                    <div div class="profile">
                        <span>UserName</span>
                        <img src="source.gif" alt="Profile Image"/>
                    </div>
        </header>
        </>
    )
}
export default AdminTopBar
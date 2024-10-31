import '../../css/admin/AdminTopBar.css';

const AdminTopBar = () =>{
    return(
        <>
        <header className="topbar">
                    <input type="text" placeholder="Search..."/>
                    <div div className="profile">
                        <span>UserName</span>
                        <img src="source.gif" alt="Profile Image"/>
                    </div>
        </header>
        </>
    )
}
export default AdminTopBar
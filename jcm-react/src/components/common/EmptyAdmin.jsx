import '../../css/common/EmptyUser.css'

const EmptyAdmin = () => {
    return (
        <div className="emptyUser-container">
            <div className="emptyUser-main">
                <h1>※ Invalid Access ※</h1>
                <h1>관리자만 사용 가능한 메뉴입니다!</h1>
            </div>
        </div>
    )
}

export default EmptyAdmin;

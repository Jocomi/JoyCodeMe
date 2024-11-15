import '../../css/common/EmptyUser.css'

const EmptyUser = () => {
    return (
        <div className="emptyUser-container">
            <div className="emptyUser-main">
                <h1>※ Invalid Access ※</h1>
                <h1>로그인 후 사용 가능한 메뉴입니다!</h1>
            </div>
        </div>
    )
}

export default EmptyUser;

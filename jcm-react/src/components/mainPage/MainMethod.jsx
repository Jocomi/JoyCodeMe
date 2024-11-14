const MainMethod =() =>{
    return(
        <div className="main-method">

            <div className="text">
            <p className="title">간단한 사용, 결과물 선택</p>
            마음에 드는 결과물이 나올때 까지 반복할 수 있습니다
            </div>
            <div className="box">
                <video className="main-video" src="/resources/method.mp4" muted autoPlay playsInline loop></video>
            </div>
            <video className="bg-video" src="/resources/method-bg.mp4" muted autoPlay playsInline loop></video>
        </div>
    )
}
export default MainMethod;
import '../../css/common/FooterPage.css'

const FooterPage = () => {
    return(
        <footer>
            <div className="link">
            <div className="box title">
                JoyCodeMe
            </div>
            <div className="box">
                Learn
                <br /><br />
                <a href="#">Introduction</a><br />
                <a href="#">Practice</a><br />
                <a href="/Support/Questions">Ask and Questions</a><br />
            </div>
            <div className="box">
                Code
                <br /><br />
                <a href="#">Code Management</a><br/>
                <a href="#">Libraries</a><br/>
                <a href="#">API</a><br/>
            </div>
            <div className="box">
                More
                <br/><br/>
                <a href="/introduce">Logo and Brand</a><br/>
                <a href="#">Code Producer</a><br/>
            </div>
            <div className="box">
                Follow
                <br/><br/>
                <a href="https://instagram.com/romi_coby">Instagram</a><br/>
                <a href="https://github.com/Jocomi/JoyCodeMe">GitHub</a><br/>
                <a href="https://discord.com/channels/1275023698314919997/1275023698314920000">Discord</a><br/>
            </div>
            </div>
            <div className="policy">
            For web site terms of use, trademark policy and general project policies please see https://jocomi.org
            </div>
            <div className="copywrite">
            CopyWrite @ 2024 Jocomi Foundation. All rights reserved
            </div>

        </footer>
    )
}
export default FooterPage;
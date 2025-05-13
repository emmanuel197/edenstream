import { ProfileSupportIcon, SupportEmail, SupportWhatsApp, SupportFacebook } from "../../../utils/assets"
import "../../components/styles/profileTabs/profile-support.scss"
const ProfileSupport = ({ active }) => {
    if (active === 'Support') {
        const supports = [{id: 1, supportImg: <ProfileSupportIcon className="support-detail-img"/>, supportText: "Help Line"},
    {id: 2, supportImg: <SupportEmail className="support-detail-img"/>, supportText: "Email Us"}, {id: 3, supportImg: <SupportWhatsApp className="support-detail-img"/>, supportText: "WhatsApp"}, {id: 3, supportImg: <SupportFacebook className="support-detail-img"/>, supportText: "Facebook"},] 
    return (
        <section className="profile-support-section">
            <div className="profile-support-section-header-wrapper">
                <ProfileSupportIcon className="profile-support-section-header-icon"/>
            <h2 className="profile-support-header"> Support</h2>
            </div>
            <div className="support-main-wrapper">
                <div className="support-main">
                {supports.map((support) => {
                return(
                <div className="support-detail" id={support.id}>
                    {support.supportImg}
                    <p className="support-detail-text">{support.supportText}</p>
                </div>
                )})}
                </div>
            </div>
        </section>
    )
    }
    
    return <></>
}


export default ProfileSupport 
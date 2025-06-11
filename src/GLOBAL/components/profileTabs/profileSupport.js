import React, { useState } from 'react'; // Import useState
import { ProfileSupportIcon, SupportEmail, SupportWhatsApp, SupportFacebook } from "../../../utils/assets"
import "../../components/styles/profileTabs/profile-support.scss"

const ProfileSupport = ({ active }) => {
    const [hoveredSupportId, setHoveredSupportId] = useState(null); // State to track hovered item

    if (active === 'Support') {
        const supports = [
            { id: 1, supportImg: <ProfileSupportIcon className="support-detail-img" />, supportText: "Help Line", detail: null }, // No detail for Help Line yet
            { id: 2, supportImg: <SupportEmail className="support-detail-img" />, supportText: "Email Us", detail: "support@edenstream.tv" }, // Add email detail
            { id: 3, supportImg: <SupportWhatsApp className="support-detail-img" />, supportText: "WhatsApp", detail: null }, // No detail for WhatsApp yet
            { id: 4, supportImg: <SupportFacebook className="support-detail-img" />, supportText: "Facebook", detail: null }, // No detail for Facebook yet
        ];
        // Corrected duplicate id: 3 to 4 for Facebook

        return (
            <section className="profile-support-section">
                <div className="profile-support-section-header-wrapper">
                    <ProfileSupportIcon className="profile-support-section-header-icon" />
                    <h2 className="profile-support-header"> Support</h2>
                </div>
                <div className="support-main-wrapper">
                    <div className="support-main">
                        {supports.map((support) => {
                            const isHovered = hoveredSupportId === support.id;
                            return (
                                <div
                                    className={`support-detail ${isHovered && support.detail ? 'hovered' : ''}`} // Add 'hovered' class
                                    key={support.id} // Use key instead of id for list items
                                    onMouseEnter={() => setHoveredSupportId(support.id)} // Set hovered ID on mouse enter
                                    onMouseLeave={() => setHoveredSupportId(null)} // Reset hovered ID on mouse leave
                                >
                                    <div className="support-detail-content"> {/* Wrapper for icon and text */}
                                        {support.supportImg}
                                        <p className="support-detail-text">{support.supportText} </p>
                                    </div>
                                    {support.detail && ( // Conditionally render detail if it exists
                                        <div className={`support-detail-detail-wrapper ${isHovered && support.detail ? 'hovered' : ''}`} > {/* Wrapper for detail text */}
                                            <p className="support-detail-detail-text">{support.detail}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }

    return <></>;
};

export default ProfileSupport;
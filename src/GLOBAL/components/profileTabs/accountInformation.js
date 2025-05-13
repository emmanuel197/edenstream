import { useEffect, useState } from "react";
import {
  AccountInformationIcon,
  EditProfileImg,
  EmailInputIcon,
  UsernameInputIcon,
  ContactInputIcon,
  PasswordInputIcon,
  anvImg
} from "../../../utils/assets";
import "../../components/styles/profileTabs/account-information.scss";
import TextInput from "../formInputs/textInput";
import PasswordInput from "../formInputs/passwordInput";
import Button from "../buttons/Button";
import "../../components/styles/change-avatar.scss";
import GenericModal from "../genericModal";
const AccountInformation = ({ active }) => {
  // 1. Always call hooks at the top level
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    contact: "",
    password: ""
  });
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [mainPreview, setMainPreview] = useState("/assets/profile-placeholder.jpeg");
  const [avatarOptions] = useState([
    { id: 1, src: "/assets/avatar1.png" },
    { id: 2, src: "/assets/avatar2.png" },
    { id: 3, src: "/assets/avatar3.png" },
    { id: 4, src: "/assets/avatar4.png" },
  
  ]);
  // 2. Simulate fetching user data from an API on mount
  useEffect(() => {
    if (active === "Account Information") {
      // Fake API call
      setTimeout(() => {
        const fakeUserResponse = {
          username: "Veeda123",
          email: "veeda123@example.com",
          contact: "+233 24 522 4993",
          password: "P@ssw0rd"
        };
        setUserData(fakeUserResponse);
      }, 1000);
    }
  }, [active]);

  // 3. Update state as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Handle saving changes
  const handleProfileChange = () => {
    console.log("profile change:", userData);
  };
  

  // Other state and hooks for user data
  // ... your existing code

  // When user clicks on the profile image, toggle the modal
  const handleProfileImgClick = () => {
    setShowAvatarModal(true);
  };

  const handleReset = () => {
    console.log('reset')
    setShowAvatarModal(false);
  }

  const handleSaveChanges = () => {
    console.log('save changes')
  }
  const handleAvatarClick = (src) => {
    setMainPreview(src);
  };

  // 5. If this tab isn’t active, return nothing
  if (active !== "Account Information") {
    return null;
  }

  // 6. Otherwise, render the Account Information UI
  const placeHolderPhoto = "/assets/profile-placeholder.jpeg";

  return (
    <section className="account-information-section">
      <div className="account-information-section-header-wrapper">
        <AccountInformationIcon className="account-information-section-icon"/>
        <h2 className="account-information-section-header">
          Account Information
        </h2>
      </div>

      <div className="form-wrapper">
        <div className="form-main">
          <div className="form">
            <TextInput
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<UsernameInputIcon />}
              iconPosition="left"
              placeholder="Username"
            />

            <TextInput
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<EmailInputIcon />}
              iconPosition="left"
              placeholder="Email"
            />
            <div className="account-not-verified-wrapper">
              <img loading="lazy" className="anv-img" src={anvImg} alt="Verification Icon" />
              <p className="anv-text">
                Your account has not been verified.
                <span className="anv-link"> Click here </span>
                to resend verification email.
              </p>
            </div>

            <TextInput
              name="contact"
              value={userData.contact}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<ContactInputIcon />}
              iconPosition="left"
              placeholder="Contact"
            />
            <div className="account-not-verified-wrapper">
              <img loading="lazy" className="anv-img" src={anvImg} alt="Verification Icon" />
              <p className="anv-text">
                Your account has not been verified.
                <span className="anv-link"> Click here </span>
                to resend verification Code to your phone number
              </p>
            </div>

            <PasswordInput
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<PasswordInputIcon />}
              placeholder="Password"
            />

            <Button
              className="save-profile-btn"
              label="Save Changes"
              action={handleProfileChange}
            />
          </div>
        </div>

        <div className="form-aside">
          <div className="profile-img-wrapper" onClick={handleProfileImgClick}>
            <img
              className="profile-img"
              src={placeHolderPhoto}
              alt="Profile Placeholder"
            />
            <EditProfileImg className="profile-img-edit-vector" />
          </div>
        </div>
        {showAvatarModal && <GenericModal 
        children={<div className="change-avatar-container">
         <img loading="lazy" className="main-preview-img" src={mainPreview} alt="Main Preview" />
         <div className="thumbnail-row">
        {avatarOptions.map((avatar) => (
          <img
            key={avatar.id}
            src={avatar.src}
            alt={`Avatar ${avatar.id}`}
            className="thumbnail-img"
            onClick={() => handleAvatarClick(avatar.src)}
          />
        ))}
      </div>
        </div>
     }ContentWrapper="account-information-modal-content-wrapper" sectionClassName="account-information-section-modal" buttons={[<Button label="Reset" className="reset-btn" action={handleReset}/>, <Button label="Save Changes" className="savechanges-btn" action={handleSaveChanges}/>]}/>}
      </div>
      
    </section>
  );
};

export default AccountInformation;




const ChangeAvatar = () => {
  // Main preview (the big image in the center)
  const [mainPreview, setMainPreview] = useState("/assets/profile-placeholder.jpeg");

  // Suppose we have 5 avatar options
  const [avatarOptions] = useState([
    { id: 1, src: "/assets/avatars/avatar1.png" },
    { id: 2, src: "/assets/avatars/avatar2.png" },
    { id: 3, src: "/assets/avatars/avatar3.png" },
    { id: 4, src: "/assets/avatars/avatar4.png" },
    { id: 5, src: "/assets/avatars/avatar5.png" },
  ]);

  // Keep track of original avatar to allow reset
  const [originalAvatar] = useState(mainPreview);

  const handleAvatarClick = (src) => {
    setMainPreview(src);
  };

  const handleReset = () => {
    setMainPreview(originalAvatar);
  };

  const handleSaveChanges = () => {
    // ... e.g., call API or update state with the new avatar
    console.log("Saved new avatar:", mainPreview);
  };

  return (
    <div className="change-avatar-container">
      {/* Large center preview */}
      <div className="main-preview-wrapper">
        <img loading="lazy" className="main-preview-img" src={mainPreview} alt="Main Preview" />
        <div className="edit-icon-overlay">
          <EditProfileImg className="edit-icon" />
        </div>
      </div>

      

      {/* Buttons */}
      <div className="avatar-buttons">
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
        <button className="save-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};



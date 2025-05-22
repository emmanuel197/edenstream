import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountInformationIcon,
  EditProfileImg,
  EmailInputIcon,
  UsernameInputIcon,
  ContactInputIcon,
  PasswordInputIcon,
  anvImg,
  SignUpDateOfBirthImg
} from "../../../utils/assets";
import "../../components/styles/profileTabs/account-information.scss";
import TextInput from "../formInputs/textInput";
import PasswordInput from "../formInputs/passwordInput";
import Button from "../buttons/Button";
import "../../components/styles/change-avatar.scss";
import GenericModal from "../genericModal";
import { updateProfile, getProfile } from "../../redux/account";
import SelectInput from "../formInputs/selectInput";
import SingleDatePicker from "../singleDatePicker";
import { setProfile } from "../../redux/slice/accountSlice";
import { TOAST } from "../../../utils/constants";
import { format } from "date-fns";

const AccountInformation = ({ active }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  console.log('Redux profile object:', profile);
  console.log('Date of Birth from profile:', profile?.date_of_birth);
  console.log('Full profile data:', JSON.stringify(profile, null, 2));
  // 1. Always call hooks at the top level
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (active === "Account Information" && (!profile || !profile.first_name)) {
      const fetchProfile = async () => {
        try {
      const profileInfo = await getProfile();
      dispatch(setProfile(profileInfo));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  fetchProfile();
    }
  }, [active, profile, dispatch]);

  // Update form state when profile loads
  useEffect(() => {
    if (active === "Account Information" && profile && profile.first_name) {
      console.log('Profile in useEffect:', profile);
      console.log('Date of Birth in useEffect:', profile.date_of_birth);
      setUserData({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        gender: profile.gender || "",
        dob: profile.date_of_birth || "",
        contact: profile.phone_number || "",
        password: "",
      });
    }
  }, [active, profile]);

  // 3. Update state as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setUserData((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleDateSelect = (date) => {
    setUserData((prev) => ({ ...prev, dob: date }));
    setShowDatePicker(false);
  };

  useEffect(() => {
    if (!showDatePicker) return;
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // 4. Handle saving changes
  const handleProfileChange = async () => {
    try {
      console.log('[AccountInformation] Saving:', userData);
      await updateProfile(userData.firstName, userData.lastName, userData.gender, userData.dob);
      // Fetch the latest profile and update Redux
      const updatedProfile = await getProfile();
      dispatch(setProfile(updatedProfile));
      TOAST.success("You have updated your profile successfully");
      console.log("Profile updated successfully");
    } catch (error) {
      TOAST.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
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

  // 5. If this tab isn't active, return nothing
  if (active !== "Account Information") {
    return null;
  }

  // 6. Otherwise, render the Account Information UI
  const placeHolderPhoto = "/assets/profile-placeholder.jpeg";

  return (
    <section className="account-information-section">
       <wc-toast></wc-toast>
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
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="account-info-textinput"
              placeholder="First Name"
            />
            <TextInput
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="account-info-textinput"
              placeholder="Last Name"
            />
            <SelectInput
              name="gender"
              value={userData.gender}
              onChange={handleGenderChange}
              className="account-info-textinput"
              // label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" }
              ]}
              placeholder="Gender"
            />
            {/* Date of Birth field with date picker UX */}
            <div className="form-row date-picker-wrapper" ref={datePickerRef}>
              <TextInput
                icon={<SignUpDateOfBirthImg className="dateofbirth-icon "/>}
                className="account-info-textinput"
                placeholder="Date of Birth"
                value={userData.dob ? format(new Date(userData.dob), 'MM/dd/yyyy') : ''}
                readOnly
                action={handleDatePicker}
              />
              {showDatePicker && (
                <SingleDatePicker
                  className="date-picker-dropdown"
                  onDateSelect={handleDateSelect}
                />
              )}
            </div>
            {/* <TextInput
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<EmailInputIcon />}
              iconPosition="left"
              placeholder="Email"
            /> */}
            {/* <div className="account-not-verified-wrapper">
              <img loading="lazy" className="anv-img" src={anvImg} alt="Verification Icon" />
              <p className="anv-text">
                Your account has not been verified.
                <span className="anv-link"> Click here </span>
                to resend verification email.
              </p>
            </div> */}
            <TextInput
              name="contact"
              value={userData.contact}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<ContactInputIcon />}
              iconPosition="left"
              placeholder="Contact"
            />
            {/* <div className="account-not-verified-wrapper">
              <img loading="lazy" className="anv-img" src={anvImg} alt="Verification Icon" />
              <p className="anv-text">
                Your account has not been verified.
                <span className="anv-link"> Click here </span>
                to resend verification Code to your phone number
              </p>
            </div> */}
            {/* <PasswordInput
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="account-info-textinput"
              icon={<PasswordInputIcon />}
              placeholder="Password"
            /> */}
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



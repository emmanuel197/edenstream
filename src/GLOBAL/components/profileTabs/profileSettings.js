import { useState } from "react"
import { ProfileSettingsIcon, SettingsArrowRight, ContentPreferencesIcon, watchBackArrow, autoplayToggleImg, darkmodeImg, lightmodeImg, languageModalImg } from "../../../utils/assets";
import "../../components/styles/profileTabs/profile-settings.scss";
import Radio from "../formInputs/radioInput";
import Button from "../../components/buttons/Button";
import ToggleSwitch from "../../components/formInputs/toggleSwitch";
import GenericModal from "../genericModal";
const ProfileSetting = ({ active }) => {
  const [selectedSetting, setSelectedSetting] = useState(null);
  if (active === 'Settings') {

    const handleBack = () => {
      setSelectedSetting(null); // Go back to settings list
    };

    const settingsMainWrapperclassName = `setting-main-wrapper ${!selectedSetting && "main-detail-padding"}`
    return (
      <section className="profile-settings-section">
        <div className="profile-settings-section-header-wrapper">
          <ProfileSettingsIcon className="profile-settings-section-header-icon" />
          <h2 className="profile-settings-header"> Settings</h2>
        </div>
        <div className={settingsMainWrapperclassName}>
          <div className="setting-main">
            {selectedSetting ? (
              <>
                <Button
                  className="watch-back-arrow"
                  icon={watchBackArrow}
                  action={handleBack}
                />
                <SettingContent selectedSetting={selectedSetting} />
              </>
            ) : (
              <SettingMainDetail
                onSelectSetting={setSelectedSetting}
                selectedSetting={selectedSetting}
              />
            )}

          </div>

        </div>
      </section>
    )


  }
  return <></>
}

export default ProfileSetting

const SettingMainDetail = ({ onSelectSetting, selectedSetting }) => {
  const settings = [
    { id: 1, settingImg: "🌍", settingText: "Language Selection" },
    { id: 2, settingImg: "🎬", settingText: "Playback Settings" },
    { id: 3, settingImg: "🌙", settingText: "Dark Mode Toggle" },
    { id: 4, settingImg: "🛠️", settingText: "Security & Privacy" },
    { id: 5, settingImg: "🛑", settingText: "Delete Account" },
  ];

  return (
    <>
      {settings.map((setting) => (
        <div
          key={setting.id}
          className="setting-detail"
          onClick={() => onSelectSetting(setting.id)}
        >
          <span className="setting-img">{setting.settingImg}</span>
          <p className="setting-detail-text">{setting.settingText}</p>
          <SettingsArrowRight className="settings-arrow-right" />
        </div>
      ))}
    </>
  );
};


const LanguageMain = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const languages = [
    {
      id: 1,
      name: "English (UK)",
      code: "en-GB", // ISO-like code
      flagEmoji: "🇬🇧"
    },
    {
      id: 2,
      name: "English (US)",
      code: "en-US",
      flagEmoji: "🇺🇸"
    },
    {
      id: 3,
      name: "French",
      code: "fr",
      flagEmoji: "🇫🇷"
    },
    {
      id: 4,
      name: "Spanish",
      code: "es",
      flagEmoji: "🇪🇸"
    },
    {
      id: 5,
      name: "Chinese",
      code: "zh",
      flagEmoji: "🇨🇳"
    }
  ];

  const handleReset = () => {
    console.log("reset")
  }

  const handleSaveChanges = () => {
    console.log("save change")
    setShowConfirmationModal(true); // Show the confirmation modal
  }
  return (
    <>{languages.map((language) => {
      return (
        <>
          <Radio icon={language.flagEmoji} label={language.name} />
         
        </>
      )
    })} 
    {/* <GenericModal 
    headerText={!showConfirmationModal ? "Changing Language Will Update the Interface" : "Changing Language Will Update the Interface"}
    paragraphText={!showConfirmationModal ? "Would you like to apply the changes now? Changing the language will update the system interface to reflect your new language preferences." : "Would you like to apply the changes now? Changing the language will update the system interface to reflect your new language preferences."} 
    img={languageModalImg}
    sectionClassName="language-modal-section"
    ContentWrapper="language-modal-content-wrapper"
    buttons={!showConfirmationModal ? [<Button className="language-reset-btn" label="Reset" action={handleReset}/>, <Button className="language-savechanges-btn" label="Save Changes" action={handleSaveChanges}/>] : [<Button className="got-it-btn" label="Got It" action={handleReset}/>]}
/> */}
</>
  )
}


const DeleteAccount = () => {
  const placeHolderPhoto = "/assets/profile-placeholder.jpeg";

  const handleCanceAccountDelete = () => {
    return (
      console.log("cancel delete")
    )
  }

  const handleConfirmAccountDelete = () => {
    return (
      console.log("confirm delete")
    )
  }
  return (

    <div className="delete-account-main">
      <img loading="lazy" className="delete-account-img" src={placeHolderPhoto} />
      <div className="delete-account-text">
        <h3 className="delete-account-header">Are you sure you want to delete your profile?</h3>
        <p className="delete-account-paragraph">The entire history of your account will be deleted forever</p>
      </div>
      <div className="cancel-delete-btns">
        <Button className="cancel-account-delete-btn" label="Cancel" action={handleCanceAccountDelete} />
        <Button className="confirm-account-delete-btn" label="Delete" action={handleConfirmAccountDelete} />
      </div>
    </div>
  )
}

const PlaybackSettings = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="playback-setting-main">
      <div className="autoplay-toggle-wrapper">
        <div className="autoplay-toggle-img-text-wrapper">
          <img loading="lazy" className="autoplay-toggle-img" src={autoplayToggleImg} />
          <h3 className="autoplay-toggle-text">Autoplay Videos</h3>
        </div>
        <ToggleSwitch
          checked={isOn}
          onChange={(val) => setIsOn(val)}
        />
      </div>
    </div>
  )
}

const DarkModeToggle = () => {
  const toggles = [{ id: 1, name: "Dark Mode", toggleImg: darkmodeImg }, { id: 2, name: "Light Mode", toggleImg: lightmodeImg }];
  const [activeMode, setActiveMode] = useState(1);

  // Update active mode on click
  const handleToggle = (modeId) => {
    setActiveMode(modeId);
  };
  return (
    <div className="dark-mode-setting">
      <div className="dark-mode-main">
        <h3 className="dark-mode-main-header">Switch Modes</h3>
        <div className="toggle-wrapper">
          {toggles.map((toggle) => {
            const isActive = toggle.id === activeMode;
            return (<div className={`toggle-item ${isActive ? "active" : ""}`} onClick={() => handleToggle(toggle.id)}>
              <img loading="lazy" className="toggle-item-img" src={toggle.toggleImg} />
              <span className="toggle-item-text">{toggle.name}</span>
            </div>)
          })}
        </div>

      </div>
    </div>
  )
}
const SecurityPrivacy = () => {
  return (
    <div className="playback-setting">

    </div>
  )
}
const SettingContent = ({ selectedSetting }) => {
  switch (selectedSetting) {
    case 1:
      return <LanguageMain />;
    case 2:
      return <PlaybackSettings />;
    case 3:
      return <DarkModeToggle />;
    case 4:
      return <SecurityPrivacy />;
    case 5:
      return <DeleteAccount />;
    default:
      return null; // If nothing is selected yet, show nothing
  }
}; 
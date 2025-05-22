import Button from "../../components/buttons/Button"
import { useSelector, useDispatch } from "react-redux"
import { ContentPreferencesIcon, NoStream, watchBackArrow } from "../../../utils/assets"
import { Step3 } from "../../pages/signUpPage";
import { nextContentPrefStep } from "../../redux/slice/contentPrefSlice";
import "../../components/styles/profileTabs/content-preferences.scss";
import Cookies from "universal-cookie";

const ContentPreferences = ({ active }) => {
  const dispatch = useDispatch();
  const { contentPrefStep } = useSelector((state) => state.contentPref);
  const cookies = new Cookies();
  let preferences = cookies.get('edenstream_genre_preferences') || [];
  if (!Array.isArray(preferences)) {
    try {
      preferences = JSON.parse(preferences);
    } catch {
      preferences = [];
    }
  }

  if (active !== 'Content Preferences') return null;

  // If user is editing preferences, show the edit step (Step3)
  if (contentPrefStep === 3) {
    return (
      <section className="content-preference-section">
        <div className="content-preference-section-header-wrapper">
          <ContentPreferencesIcon className="content-preference-section-icon" />
          <h2 className="content-preference-section-header">Content Preferences</h2>
        </div>
        <div className="no-content-preferences-wrapper">
          <Button className="watch-back-arrow" icon={watchBackArrow} action={() => dispatch(nextContentPrefStep())} />
          <Step3 className="content-pref-step3" />
        </div>
      </section>
    );
  }

  // If user has preferences, show them
  if (preferences.length) {
    return (
      <section className="content-preference-section">
        <div className="content-preference-section-header-wrapper">
          <ContentPreferencesIcon className="content-preference-section-icon" />
          <h2 className="content-preference-section-header">Content Preferences</h2>
        </div>
        <div className="no-content-preferences-wrapper">
          <div className="content-pref-step2">
            {preferences.map((genre, idx) => (
              <div className="content-pref-detail" key={genre + idx}>
                <p className="content-pref-detail-text">{genre}</p>
              </div>
            ))}
          </div>
           <Button className="edit-preferences-btn" label="Edit Preferences" action={() => dispatch(nextContentPrefStep())} />
        </div>
       
      </section>
    );
  }

  // If no preferences, show the no-content-preferences component
  return (
    <section className="content-preference-section">
      <div className="content-preference-section-header-wrapper">
        <ContentPreferencesIcon className="content-preference-section-icon" />
        <h2 className="content-preference-section-header">Content Preferences</h2>
      </div>
      <div className="ncp-detail-wrapper">
        <NoStream className="no-content-preferences-img" />
        <p className="no-content-preferences-text">You haven't set any content preferences yet. Click 'Edit Preferences' to select your favorite categories and personalize your experience!</p>
      </div>
      <Button className="edit-preferences-btn" label="Edit Preferences" action={() => dispatch(nextContentPrefStep())} />
    </section>
  );
}

export default ContentPreferences 
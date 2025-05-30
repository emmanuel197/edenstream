import { useState } from "react";
import Button from "../../components/buttons/Button"
import { useSelector, useDispatch } from "react-redux"
import { ContentPreferencesIcon, NoStream, watchBackArrow } from "../../../utils/assets"
import { Step3 } from "../../pages/signUpPage";
import { setContentPrefStep } from "../../redux/slice/contentPrefSlice";
import "../../components/styles/profileTabs/content-preferences.scss";
import Cookies from "universal-cookie";
import { TOAST } from '../../../utils/constants';

const ContentPreferences = ({ active }) => {
  const dispatch = useDispatch();
  const { contentPrefStep } = useSelector((state) => state.contentPref);
  const cookies = new Cookies();
  let preferences = cookies.get('edenstream_genre_preferences') || [];
  const [editMode, setEditMode] = useState(false);
  if (!Array.isArray(preferences)) {
    try {
      preferences = JSON.parse(preferences);
    } catch {
      preferences = [];
    }
  }

  if (active !== 'Content Preferences') return null;

  // If user is editing preferences, show the edit step (Step3)
  if (editMode) {
    const handlePrefChange = (newPrefs) => {
      cookies.set('edenstream_genre_preferences', newPrefs, { path: '/' });
      setEditMode(false); // Go back to view mode
      TOAST.success('Preferences updated successfully!');
    };
    return (
      <section className="content-preference-section">
        <div className="content-preference-section-header-wrapper">
          <ContentPreferencesIcon className="content-preference-section-icon" />
          <h2 className="content-preference-section-header">Content Preferences</h2>
        </div>
        <div className="no-content-preferences-wrapper">
          <Button className="watch-back-arrow" icon={watchBackArrow} action={() => setEditMode(false)} />
          <Step3
            className="content-pref-step3"
            initialSelectedCategories={preferences}
            onSave={handlePrefChange}
            button={<Button label="Save Changes" />}
          />
        </div>
      </section>
    );
  }

  // If user has preferences, show them
  if (preferences.length && !editMode) {
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
          <Button className="edit-preferences-btn" label="Edit Preferences" action={() => {setEditMode(true)}} />
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
      <div className="no-content-preferences-wrapper card-style-wrapper">
        <div className="ncp-detail-wrapper compact-ncp-detail-wrapper">
          <NoStream className="no-content-preferences-img compact-ncp-img" />
          <p className="no-content-preferences-text compact-ncp-text">You haven't set any content preferences yet. Click 'Edit Preferences' to select your favorite categories and personalize your experience!</p>
        </div>
        <Button className="edit-preferences-btn compact-edit-preferences-btn" label="Edit Preferences" action={() => dispatch(setContentPrefStep(3))} />
      </div>
    </section>
  );
}

export default ContentPreferences 
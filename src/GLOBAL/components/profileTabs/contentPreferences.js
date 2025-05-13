import Button from "../../components/buttons/Button"
import { useSelector, useDispatch } from "react-redux"
import { ContentPreferencesIcon, NoStream, watchBackArrow } from "../../../utils/assets"
import { Step3 } from "../../pages/signUpPage";
import { nextContentPrefStep } from "../../redux/slice/contentPrefSlice";
import "../../components/styles/profileTabs/content-preferences.scss";
const ContentPreferences = ({ active }) => {
  const dispatch = useDispatch();
    const {contentPrefStep} = useSelector((state) => state.contentPref);
    if (active === 'Content Preferences') {
      
  const handleEditPreferences = () => {
        console.log("edit")
    }
    const contentPrefRender = () => {
      switch (contentPrefStep) {
        case 1:
          return <ContentPrefStep1 />;
        case 2:
          return <ContentPrefStep2 />;
        case 3:
            return <Step3 className="content-pref-step3"/>;
        // case 7:
        //   return <Step7 />;
        // case 8:
        //   return <Step8 />;
        // Add more cases for additional steps
        default:
          return <ContentPrefStep1 />;
      }
    };
    return (
      <>
      <section className="content-preference-section">
      <div className="content-preference-section-header-wrapper">
      <ContentPreferencesIcon className="content-preference-section-icon"/>
      <h2 className="content-preference-section-header">
      Content Preferences
      </h2>
    </div>
    <div className="no-content-preferences-wrapper">
      <Button className="watch-back-arrow" icon={watchBackArrow} action={() => dispatch(nextContentPrefStep())}/>
         {contentPrefRender()}
      <Button className="edit-preferences-btn" label="edit preferences" action={() => dispatch(nextContentPrefStep())}/>   
    </div>
      </section>
      </>
  )}
  return <></>
    }
   
    
    

const ContentPrefStep1 = () => {
  return (<div className="ncp-detail-wrapper">
  {/* <img loading="lazy" className="no-content-preferences-img" src={noStream}/> */}
  <NoStream className="no-content-preferences-img" />
  <p className="no-content-preferences-text">You haven't set any content preferences yet.  Click 'Edit Preferences' to select your favorite categories and personalize your experience!</p>
  </div> )
}

const ContentPrefStep2 = () => {
  const preferences = [
    {id: 1, prefImg: "🎤", prefText: "Talk Show"},
    {id:2, prefImg: "📖", prefText: "Devotionals"},
    {id:3, prefImg: "🎥", prefText: "Movies"},
    {id:4, prefImg: "🎥 ", prefText: "Series"},
    {id:5, prefImg: "⛪", prefText: "Sermons"},
    
  ]
  return (
    <div className="content-pref-step2">
      {preferences.map((pref) =>{return <div className="content-pref-detail" id={pref.id}>
        {/* <img loading="lazy" className="content-pref-detail-img"/> */}
        {pref.prefImg}
        <p className="content-pref-detail-text">
        {pref.prefText}
        </p>
      </div>})}
    </div>
  )
}
export default ContentPreferences 
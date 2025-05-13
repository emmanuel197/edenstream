const Settings = ({ active }) => {
  if (active === "settings")
    return (
      <>
        <section className="tab-wrapper">
          <h1>Settings</h1>
        </section>
      </>
    );
};

export default Settings;

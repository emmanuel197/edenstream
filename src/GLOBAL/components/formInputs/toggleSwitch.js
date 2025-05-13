import "../../components/styles/toggle-switch.scss";

const ToggleSwitch = ({ checked = false, onChange, disabled = false }) => {


    const handleToggle = (e) => {
      if (disabled) return;
      onChange?.(e.target.checked);
    };
  
    return (
      <label className={`toggle-switch ${disabled ? "disabled" : ""}`}>
        <input
          type="checkbox"
          className="toggle-switch-input"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        <span className="toggle-switch-slider"></span>
      </label>
    );
  };
  
  export default ToggleSwitch;
import React from "react";

type InputProps = {
  placeholderText: string;
  activityValue: string;
  handleInputChange: any;
  name: string;
  label: string;
};

const InputComponent: React.FC<InputProps> = ({
  label,
  handleInputChange,
  activityValue,
  placeholderText,
  name,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        name={name}
        placeholder={placeholderText}
        value={activityValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputComponent;

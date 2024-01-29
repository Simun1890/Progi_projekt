import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AccountInput = ({
  name,
  type,
  placeholder,
  icon,
  errorMsg,
  value,
  error,
  onChange,
  autoComplete,
}) => {
  return (
    <div>
      <label>{placeholder}</label>
      <div>
        <div>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={true}
            autoComplete={autoComplete}
          />
          {icon && <FontAwesomeIcon className="account__icon" icon={icon} />}
        </div>
        <span
          className={
            error && value ? "account__showError" : "account__hideError"
          }
        >
          {errorMsg}
        </span>
      </div>
    </div>
  );
};

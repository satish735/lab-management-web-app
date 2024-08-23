'use client'
import { FormGroup, Input } from "reactstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
const InputSelect = ({
  options = [],
  value = "",
  setValue,
  placeholder = "Select",
  feedbackMessage = "",
  feedbackType = "none",
  label = "",
  validateHandler = null,
  reset = null,
  disabled = false,
  className,
  isTouched = false,
  setIsTouched,
  isRequired = false,
  extraProps = {},
  labelClassName = "",
  name = null,
  id = null,
}) => {

  const [uuidName, setUuidName] = useState(null);
  useEffect(() => {
    if (!id || !name) {
      setUuidName(uuid());
    }
  }, []);

  return (
    <FormGroup className="custom-select-input">
      {label !== "" && (
        <label
          className={` ${labelClassName} ml-1  text-truncate w-100 `}
          htmlFor={name ?? uuidName}
          style={{ userSelect: "none", fontSize: "12px", fontWeight: '500', color: '#0F0F0F' }}>
          {label} {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <Input
        id={id ?? uuidName}
        className={`${className} small`}
        type={"select"}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (isTouched && validateHandler !== null) {
            validateHandler(e.target.value);
          }
        }}
        placeholder={placeholder}
        onBlur={() => {
          validateHandler && validateHandler(value);
          setIsTouched(true);
        }}
        valid={feedbackType === "success"}
        invalid={feedbackType === "error"}
        {...extraProps}
      >


        {options.map((optionitem, index) => {
          return (
            <option value={optionitem.value} className="small" key={index}>
              {optionitem.label}
            </option>
          );
        })}
      </Input>
      {feedbackType !== "none" && (
        <div className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-100"}>
          {feedbackMessage}
        </div>
      )}
    </FormGroup>
  );
};
export default InputSelect;

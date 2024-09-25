'use client'

import { MultiSelect } from "react-multi-select-component";
import { FormGroup } from "reactstrap";
// import { useEffect, useState } from "react";

const InputMultipleSelect = ({
  options = [],
  value = "",
  setValue = () => { },
  feedbackMessage = "",
  feedbackType = "none",
  label = "",
  validateHandler = () => { },
  disabled = false,
  isTouched = false,
  setIsTouched = () => { },
  isRequired = false,
  overrideStrings = {},
  ...rest
}) => {


  return (
    <FormGroup
      className={`${rest?.hasExpand ?? false ? "expand-multiple-select-dropdown" : ""
        } ${feedbackType === "error" ? "input-searchable-select-error" : ""
        }  input_select_tab${rest?.heightClass ? "_" + rest?.heightClass : ""} ${disabled ? "input_select_tab_disabled" : ""
        } ${rest?.formGroupClass ?? ""}`}
      style={rest?.formGroupStyle ?? {}}
    >
      {label !== "" && (
        <label
          className={` ${rest?.labelClassName} ml-1  text-truncate w-100 `}
          htmlFor={rest?.name ?? "select-input-1"}
          style={{
            userSelect: "none",
            fontSize: "12px",
            fontWeight: "500",
            color: "#0F0F0F",
          }}
        >
          {label} {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <MultiSelect
        isLoading={rest?.isLoading ?? false}
        options={options}
        value={value}
        disabled={disabled}
        hasSelectAll={rest?.hasSelectAll ?? false}
        onChange={(e) => {
          setValue(e);
          if (isTouched) {
            validateHandler(e);
          }
        }}
        onMenuToggle={() => {
          validateHandler(value);
          setIsTouched(true);
        }}
        labelledBy={rest?.placeholder ?? "Select..."}
        overrideStrings={{
          ...overrideStrings,
          selectSomeItems: rest?.placeholder ?? "Select...",
        }}
        className="small"

        {...rest}
      />

      {feedbackType !== "none" && (
        <div className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-100"}>
          {feedbackMessage}
        </div>
      )}
    </FormGroup>
  );
};

export default InputMultipleSelect;

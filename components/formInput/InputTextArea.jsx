'use client'
import { FormGroup, Input } from "reactstrap";
import { useEffect, useState } from "react";
const InputTextArea = ({
  hasAddOn = null,
  value = "",
  setValue = () => { },
  feedbackMessage = "",
  feedbackType = "none",
  isTouched = false,
  setIsTouched = () => { },
  label = "",
  validateHandler = () => { },
  isRequired = false,
  onBlurAction = () => { },
  ...rest
}) => {
  const DynamicElement = rest?.element ?? FormGroup;

  return (
    <DynamicElement>
      {label !== "" && (
        <label
          htmlFor={rest?.name ?? "demo-text-area-1"}
          style={{
            userSelect: "none",
            fontSize: "12px",
            fontWeight: "500",
            color: "#0F0F0F",
          }}
          className="ml-1  text-truncate w-100 "
        >
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <Input
          rows={rest?.minLength ?? 3}
          autoComplete="off"
          name={rest?.name ?? "demo-text-area-1"}
          className={`${hasAddOn?.left && "has_left_add_on"} ${hasAddOn?.right && "has_right_add_on"
            } ${rest?.className} input-background-color-default`}
          type="textarea"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (isTouched) {
              validateHandler(e.target.value);
            }
          }}
          onBlur={() => {
            setValue((value ?? "").trim());
            validateHandler(value);
            setIsTouched(true);
            onBlurAction(value);
          }}
          valid={feedbackType === "success"}
          invalid={feedbackType === "error"}
          {...rest}
        />
        {hasAddOn?.left}
        {hasAddOn?.right}
      </div>
      {feedbackType !== "none" && (
        <div
          className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-100"}
          style={{ userSelect: "none" }}
        >
          {feedbackMessage}
        </div>
      )}
    </DynamicElement>
  );
};
export default InputTextArea;

import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import "./CheckboxInput.css";

const CheckboxInput = ({
  check = false,
  setChecked,
  label = null,
  ...rest
}) => {
  return (
    <FormGroup check inline className={`check-box ${rest?.formGroupClassName}`}>
      <Input
        type="checkbox"
        role="checkbox"
        onChange={() => {
          setChecked(!check);
        }}
        aria-required="true"
        checked={check}
        tabIndex={0}
        {...rest}
      />
      {label && (
        <Label
          tabIndex={0}
          check
          inline
          htmlFor={rest?.id ?? "2747b743"}
          className="check-box-input-label p-1 "
        >
          {label}
        </Label>
      )}
    </FormGroup>
  );
};

export default CheckboxInput;

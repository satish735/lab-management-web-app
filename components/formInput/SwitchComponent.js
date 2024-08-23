import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SwitchComponent = ({
  check = false,
  setChecked,
  label = null,
  disabled = false,
}) => {
  return (
    <FormGroup switch className="switch-component">
      <Input
        type="switch"
        role="switch"
        onClick={() => {
          setChecked(!check);
        }}
        checked={check}
        disabled={disabled}
      />
      {label && <Label check>{label}</Label>}
    </FormGroup>
  );
};

export default SwitchComponent;

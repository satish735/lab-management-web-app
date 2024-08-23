"use client";
import { useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const PhoneInput = ({
  value,
  setValue,
  isTouch,
  setIsTouch,
  validate,
  showError,
}) => {
  return (
    <FormGroup>
      <Label for="login-phone-input" className="login-input-label">
        Enter your mobile number
      </Label>
      <Input
        id="login-phone-input"
        name="login-phone-input"
        placeholder="Mobile Number"
        maxLength="10"
        className="login-input"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (isTouch) {
            validate(e.target.value);
          }
        }}
        onBlur={(e) => {
          setValue((e.target.value ?? "").trim());
          validate(e.target.value);
          setIsTouch(true);
        }}
        invalid={showError}
      />
      <FormFeedback>Please enter a valid 10-digit phone number</FormFeedback>
    </FormGroup>
  );
};
export default PhoneInput;

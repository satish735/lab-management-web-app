"use client";
import { useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
const EmailInput = ({
  value,
  setValue,
  isTouch,
  setIsTouch,
  validate,
  showError,
}) => {
  return (
    <FormGroup>
      <Label for="login-input-email" className="login-input-label">
        Enter Email
      </Label>
      <Input
        id="login-input-email"
        name="email"
        placeholder="example@gmail.com"
        type="email"
        className="login-input"
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
      <FormFeedback>Please enter a valid email</FormFeedback>
    </FormGroup>
  );
};
export default EmailInput;

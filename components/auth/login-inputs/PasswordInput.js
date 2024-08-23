"use client";
import { useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const PasswordInput = ({
  value,
  setValue,
  isTouch,
  setIsTouch,
  validate,
  showError,
}) => {
  return (
    <FormGroup>
      <Label for="login-input-password" className="login-input-label">
        Password
      </Label>
      <Input
        id="login-input-password"
        name="login-input-password"
        placeholder="Root@123"
        type="password"
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
      <FormFeedback>Please enter a valid password</FormFeedback>
    </FormGroup>
  );
};
export default PasswordInput;

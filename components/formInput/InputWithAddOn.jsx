"use client"
import { FormGroup, Input } from "reactstrap";
import "./InputWithAddOn.css";

const InputWithAddOn = ({
  hasAddOn = null,
  value = "",
  setValue = () => {},
  feedbackMessage = "",
  feedbackType = "none",
  isTouched = false,
  setIsTouched = () => {},
  label = "",
  Placeholder='',
  validateHandler = () => {},
  onBlurAction = () => {},
  isRequired = false,
  ...rest
}) => {
  const DynamicElement = rest?.element ?? FormGroup;
  return (
    <DynamicElement>
      {label && (
        <label
          htmlFor={rest.name}
          className="ml-1 text-truncate w-100"
          aria-labelledby={rest.id}
          style={{
            userSelect: "none",
            fontSize: "12px",
            fontWeight: "500",
            color: "#0F0F0F",
          }}
        >
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <Input
          autoComplete="off"
          className={`InputWithAddOnMultiple_input ${
            hasAddOn?.left && "has_left_add_on"
          } ${hasAddOn?.right && "has_right_add_on"} ${
            rest?.className
          } input-background-color-default input-with-add-on-default`}
          value={value}
          aria-required="true"
          aria-label={label}
          title={value}
          placeholder={Placeholder}
          tabIndex={0}
          onChange={(e) => {
            setValue(e.target.value);
            if (isTouched) {
              validateHandler(e.target.value);
            }
          }}
          onBlur={(e) => {
            if (rest?.type ?? "text" === "text") {
              setValue((value ?? "")?.trim());
            }
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
          className={`${feedbackType}-feedback-class m-0 p-0 ml-1 w-100`}
          style={{ userSelect: "none" }}
        >
          {feedbackMessage}
        </div>
      )}
    </DynamicElement>
  );
};

export default InputWithAddOn;

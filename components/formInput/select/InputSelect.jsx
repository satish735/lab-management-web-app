'use client'

import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import "../main.css"
const InputSelect = ({
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
  ...rest
}) => {
  const DynamicElement = rest?.element ?? FormGroup;

  const [ClearSelectedIconObj, setClearSelectedIconObj] = useState({});
  useEffect(() => {
    if (rest?.removeXIcon ?? true) {
      setClearSelectedIconObj({
        ClearSelectedIcon: rest?.removeXIcon ?? true,
      });
    } else {
      setClearSelectedIconObj({});
    }
  }, []);
  return (
    <DynamicElement
      className={` ${rest?.hasExpand ?? false ? "expand-multiple-select-dropdown" : ""
        } ${feedbackType === "error" ? "input-searchable-select-error" : ""
        }  input_select_tab${rest?.heightClass ?? null ? "_" + rest?.heightClass ?? null : ""
        } ${disabled ? "input_select_tab_disabled" : ""}`}
      key={rest.id ?? "input_select"}
    >
      {label !== "" && (
        <label
          className={` ${rest?.labelClassName ?? ""
            } ml-1  text-truncate w-100 `}
          htmlFor={rest?.name ?? "input_single_select_one"}
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
        {...ClearSelectedIconObj}
        isLoading={rest?.isLoading ?? false}
        overrideStrings={{
          allItemsAreSelected:
            (options ?? []).find((obj) => {
              return obj?.value == value;
            })?.label ?? "Select..",
        }}
        closeOnChangedValue={true}
        options={options}
        value={options.filter((obj) => obj?.value == value)}
        id={rest?.id ?? "input-single-select"}
        disabled={disabled}
        hasSelectAll={false}
        onChange={(e) => {
          var newE = (e ?? []).filter((obj) => obj?.value != value);
          var singleValue = (newE ?? []).length > 0 ? newE[0]?.value : "";

          setValue(singleValue);
          if (isTouched) {
            validateHandler(singleValue);
          }
        }}
        onMenuToggle={() => {
          setIsTouched(true);
        }}
        labelledBy="Select"
        className="small"
        {...rest}
      />

      {feedbackType !== "none" && (
        <div className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-100"}>
          {feedbackMessage}
        </div>
      )}
    </DynamicElement>
  );
};
export default InputSelect;

"use client";
import {
  Button,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
} from "reactstrap";
import "./CustomFilter.css";
import { useRef, useState } from "react";
const CustomFilter = ({
  filterOptions = null,
  viewColumnOptions = null,
  viewColumnOptionsSelected = [],
  changeViewColumnOptions = () => {},
  hasSearch = false,
  changeSearchValue = () => {},
}) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex gap-1 align-items-center">
        {filterOptions && <Button className="filter-button">Filter</Button>}
        {hasSearch && <SearchComponent changeSearchValue={changeSearchValue} />}
      </div>
      {viewColumnOptions && (
        <ViewSettingComponent
          selected={viewColumnOptionsSelected}
          options={viewColumnOptions}
          onChange={changeViewColumnOptions}
        />
      )}
    </div>
  );
};
const SearchComponent = ({ changeSearchValue }) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceTimeoutRef = useRef(null);
  const onChangeHandler = (e) => {
    const newValue = e?.target?.value ?? "";
    setSearchValue(newValue);
    if (debounceTimeoutRef?.current) {
      clearTimeout(debounceTimeoutRef?.current);
    }
    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      if (newValue == "" || newValue.length > 3) {
        changeSearchValue(newValue);
      }
    }, 1000);
  };
  const onKeyPressHandler = (e) => {
    if (e?.key === "Enter" || e?.keyCode === 13 || e?.key === "Tab") {
      changeSearchValue(searchValue);
      if (debounceTimeoutRef?.current) {
        clearTimeout(debounceTimeoutRef?.current);
      }
    }
  };
  return (
    <div className="filter-search-div">
      <img
        src="/assets/icons/custom-tables/SearchIcon.svg"
        alt="Search Icon"
        className="search-icon"
      />
      <Input
        className="filter-search w-100"
        placeholder="Search"
        value={searchValue}
        onChange={onChangeHandler}
        onKeyDownCapture={onKeyPressHandler}
      />
      {typeof searchValue == "string" && searchValue.length > 0 && (
        <img
          src="/assets/icons/custom-tables/ClearIcon.svg"
          alt="Clear Icon"
          className="clear-icon"
          onClick={() => {
            if (debounceTimeoutRef?.current) {
              clearTimeout(debounceTimeoutRef?.current);
            }
            changeSearchValue("");
            setSearchValue("");
          }}
        />
      )}
    </div>
  );
};
const ViewSettingComponent = ({ selected = [], options = [], onChange }) => {
  const checkClickHandler = (key) => {
    if (selected.includes(key)) {
      onChange(selected.filter((item) => item != key));
    } else {
      onChange([...selected, key]);
    }
  };
  const resetHandler = () => {
    onChange(
      options.filter((item) => item?.isDefault == true || item?.isSelectRequired == true).map((item) => item?.key)
    );
  };
  return (
    <div className="view-options">
      <UncontrolledDropdown>
        <DropdownToggle
          className="btn filter-button-setting"
          tag="button"
        ></DropdownToggle>
        <DropdownMenu className="">
          <div className="d-flex justify-content-between px-2 mb-2">
            <span className="displayed-fields">Displayed fields</span>
            <span className="reset" onClick={resetHandler}>
              Reset
            </span>
          </div>
          {options.map((item, index) => {
            return (
              <FormGroup
                className="check-box-option"
                check
                key={index}
                onClick={() => {
                  if (item?.isSelectRequired != true) {
                    checkClickHandler(item?.key);
                  }
                }}
              >
                <Input
                  disabled={item?.isSelectRequired}
                  type="checkbox"
                  name={item?.key}
                  checked={selected.includes(item?.key)}
                />
                <Label check htmlFor={item?.key}>
                  {item?.label}
                </Label>
              </FormGroup>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
const FilterOptionsComponent = ({ selected = [], options = [] }, onChange) => {
  const checkClickHandler = (key) => {};
  const resetHandler = () => {};
  return (
    <div className="view-options">
      <UncontrolledDropdown>
        <DropdownToggle
          className="btn filter-button-setting"
          tag="button"
        ></DropdownToggle>
        <DropdownMenu className="">
          <div className="d-flex justify-content-between px-2 mb-2">
            <span className="displayed-fields">Displayed fields</span>
            <span className="reset" onClick={resetHandler}>
              Reset
            </span>
          </div>
          {options.map((item, index) => {
            return (
              <FormGroup
                className="check-box-option"
                check
                key={index}
                onClick={() => {
                  checkClickHandler(item?.key);
                }}
              >
                <Input
                  type="checkbox"
                  name={item?.key}
                  checked={selected.includes(item?.key)}
                />
                <Label check htmlFor={item?.key}>
                  {item?.label}
                </Label>
              </FormGroup>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
      {/* <Button className="filter-button-setting"></Button> */}
    </div>
  );
};
export default CustomFilter;

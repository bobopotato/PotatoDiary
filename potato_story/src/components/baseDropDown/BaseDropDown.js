import React, { useEffect, useState, useMemo } from "react";
import "./BaseDropDown.css";
import Dropdown from "react-bootstrap/Dropdown";
import { TiTick } from "react-icons/ti";

const BaseDropDown = ({
  title,
  options,
  onChange,
  multiSelect = false,
  defaultValue = [],
  emptyText = "Please Select",
  apiKey,
}) => {
  const customStyles = {
    backgroundColor: "var(--main-color)",
    border: "none",
  };

  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const haveThisItem = (option) => {
    return selectedValue.find((item) => item.value === option.value);
  };

  const handleSelect = (option) => {
    if (multiSelect) {
      setSelectedValue((prev) => {
        let result = prev;
        const haveItem = haveThisItem(option);
        if (haveItem) {
          // remove item
          result = result.filter((item) => item.value !== option.value);
        } else {
          result.push(option);
        }
        handleOnChange([...result]);
        return [...result];
      });
    } else {
      setSelectedValue([option]);
      handleOnChange([option]);
    }
  };

  const handleOnChange = (selectedValue) => {
    if (onChange) {
      onChange(
        apiKey,
        selectedValue.map((item) => item.value)
      );
    }
  };

  // useEffect(() => {
  //   if (onChange) {
  //     onChange(
  //       apiKey,
  //       selectedValue.map((item) => item.value)
  //     );
  //   }
  // }, [selectedValue]);

  return (
    <div className="base-drop-down-wrapper">
      <Dropdown autoClose={multiSelect ? "outside" : null}>
        {`${title} :  `}
        <Dropdown.Toggle
          style={customStyles}
          id={multiSelect ? "dropdown-autoclose-false" : `dropdown-basic`}
        >
          {console.log(selectedValue.map((item) => item.title).join(", "))}
          {selectedValue && selectedValue.length > 0
            ? selectedValue.map((item) => item.title).join(", ")
            : emptyText}
        </Dropdown.Toggle>
        <Dropdown.Menu className="base-drop-down-menu-container">
          {!options || options.length === 0 ? (
            <div className="no-data-found">No Data Found</div>
          ) : (
            options &&
            options.map((option, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    return handleSelect(option);
                  }}
                >
                  <div
                    className={`dropdown-item ${
                      haveThisItem(option) && "selected"
                    }`}
                  >
                    {option.title}
                    {haveThisItem(option) && <TiTick />}
                  </div>
                </Dropdown.Item>
              );
            })
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default BaseDropDown;

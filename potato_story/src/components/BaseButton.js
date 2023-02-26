import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner"; // todo by chong
import "./BaseButton.css";

class BaseButtonType {
  static primary = "primary";
  static primaryOutline = "outline-primary";
  static secondary = "dark";
  static success = "success";
  static warning = "warning";
  static danger = "danger";
}

const BaseButton = ({
  title,
  type = BaseButtonType.primary,
  disabled = false,
  isLoading = false,
  isLoadingText = "Loading...",
  onClick,
  dynamicWidth = true
}) => {
  const getCustomStyles = () => {
    let customStyles = {
      width: dynamicWidth ? "100%" : "auto",
    };

    if (type === BaseButtonType.primary) {
      customStyles.backgroundColor = "var(--main-color)";
      customStyles.border = "none";
    }
    if (type === BaseButtonType.primaryOutline) {
      customStyles.border = "1px solid var(--main-color)";
      customStyles.color = "var(--main-color)";
    }

    return customStyles;
  };

  return (
    <Button
      className={`${type === BaseButtonType.primaryOutline && "custom-button"}`}
      disabled={disabled}
      variant={type}
      style={getCustomStyles()}
      onClick={onClick}
    >
      {isLoading && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {isLoading ? isLoadingText : title}
    </Button>
  );
};

export default BaseButton;
export { BaseButtonType };

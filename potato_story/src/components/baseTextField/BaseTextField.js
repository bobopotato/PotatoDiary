import React, { memo, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import "./BaseTextField.css";

class BaseTextFieldType {
  static text = "text";
  static password = "password";
  static email = "email";
  static number = "number";
  static tel = "tel";
}

const BaseTextField = ({
  type,
  title,
  required = true,
  placeholder,
  validMessage,
  invalidMessage,
  disabled = false,
  value = "",
  onChange,
  apiKey
}) => {
  const [isEmpty, setIsEmpty] = useState(!value || value.length === 0);

  const handleOnChange = (event) => {
    const inputText = event.target.value || "";

    if (onChange) {
      onChange(apiKey, inputText);
    }

    return setIsEmpty(inputText.length === 0);
  };

  return (
    <FormGroup className="base-text-field-form">
      {/* <Form.FloatingLabel controlId="floatingInput" label={title}> */}
      <Form.Label className="base-text-field-label">{title} {required && <div className="required-star">*</div>} </Form.Label>
      <Form.Control
        className={`form-control ${required ? "" : "non-required"}`}
        required={required}
        inputMode={type}
        type={type}
        placeholder={placeholder || title}
        defaultValue={value ? value : ""}
        disabled={disabled}
        onChange={handleOnChange}
      />
      {validMessage && (
        <Form.Control.Feedback>{validMessage}</Form.Control.Feedback>
      )}
      {
        <Form.Control.Feedback type="invalid">
          {invalidMessage ||
            (isEmpty ? `${title} can't be empty.` : `${title} is incorrect`)}
        </Form.Control.Feedback>
      }
    </FormGroup>
  );
};

export default memo(BaseTextField);
export { BaseTextFieldType };

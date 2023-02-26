import React, { useState, lazy, useRef, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { profile } from "../../../images/image";
import { Form } from "react-bootstrap";
import BaseTextField, {
  BaseTextFieldType,
} from "../../../components/baseTextField/BaseTextField";
import BaseButton, { BaseButtonType } from "../../../components/BaseButton";
import "./UserInfo.css";
import { Link, Outlet } from "react-router-dom";
import UserController from "../../../api/controller/UserController";

const UserInfo = () => {
  // call api get userInfo
  const [isEditMode, setIsEditMode] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const formRef = useRef();

  const { data, loading, error, callAPI: fetchUserData } = UserController.GetUserDetails();
  const { error: updateError, callAPI: updateUserDetails } = UserController.UpdateUserDetails();
  const [submitObj, setSubmitObj] = useState(data);

  const toggleIsEditMode = () => {
    return setIsEditMode((prev) => !prev);
  };

  const handleSaveChanges = async (event) => {
    setIsValidating(true);

    const form = formRef.current;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      console.log(submitObj)
      await updateUserDetails({objUser: submitObj});
      await fetchUserData();
      return alert(`update Successful`)
    } 
    catch(err) {
      console.log(err);
      return alert(err)
    }
  };

  const handleOnChangeEmail = (value) => {
    return setSubmitObj((prev) => {
      return { ...prev, email_address: value };
    });
  };

  useEffect(() => {
    setSubmitObj(data);
  }, [data]);

  useEffect(() => {
    console.log(submitObj);
  }, [submitObj]);

  if (loading) return "Fetching user api ...";
  console.log(data);
  if (error) return `${error}`;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-top-container">
          <Image fluid roundedCircle src={profile} className="profile-image" />
        </div>
        <hr />
        <Form ref={formRef} noValidate validated={isValidating}>
          <div className="profile-bottom-container">
            <BaseTextField
              type={BaseTextFieldType.text}
              title="Username"
              value={data && data.username}
              disabled={!isEditMode}
            />
            <BaseTextField
              type={BaseTextFieldType.text}
              title="Full Name"
              value={data && data.fullname}
              disabled={!isEditMode}
            />
            <BaseTextField
              type={BaseTextFieldType.email}
              title="Email Address"
              required={false}
              value={data && data.email_address}
              disabled={!isEditMode}
              onChange={handleOnChangeEmail}
            />
            <BaseTextField
              type={BaseTextFieldType.text}
              title="Status"
              value={data && data.status}
              disabled={true}
            />
            <BaseTextField
              type={BaseTextFieldType.text}
              title="Joined Date"
              value={"16 February 2023"}
              disabled={true}
            />
            <div className="profile-button-container">
              <BaseButton
                title={isEditMode ? "Cancel Edit" : "Edit Info"}
                onClick={toggleIsEditMode}
              />
              {isEditMode && (
                <BaseButton
                  title={"Save Changes"}
                  type={BaseButtonType.success}
                  onClick={handleSaveChanges}
                />
              )}
              <Link to={"/MyProfile/ChangePassword"}>
                <BaseButton
                  title={"Change Password"}
                  type={BaseButtonType.warning}
                />
              </Link>
              <Outlet />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;

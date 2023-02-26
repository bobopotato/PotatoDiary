import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import BaseButton, { BaseButtonType } from "../../../components/BaseButton";
import BaseTextField, {
  BaseTextFieldType,
} from "../../../components/baseTextField/BaseTextField";
import BaseDropDown from "../../../components/baseDropDown/BaseDropDown";
import TaskController from "../../../api/controller/TaskContoller";
import TaskCategoryController from "../../../api/controller/TaskCategoryController";
import "./AddTask.css";

const AddTask = ({ onCreateNewTask }) => {
  const [show, setShow] = useState(false);
  const [submitObj, setSubmitObj] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const formRef = useRef();

  const createTask = TaskController.CreateTask();
  const {
    loading,
    error,
    data: taskCategoryList,
    callAPI: getTaskCategoryList,
  } = TaskCategoryController.GetTaskCategoryList();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      setIsValidating(true);

      const form = formRef.current;
      if (form.checkValidity() === false) {
        //   event.preventDefault();
        //   event.stopPropagation();
        return;
      }

      await createNewTask();
    } catch (err) {
      alert(`Task Failed to insert! ${err}`);
    }
  };

  const createNewTask = async () => {
    try {
      await createTask(submitObj);
      alert("Task Created Successfully");
      handleClose();
      setSubmitObj({});
      setIsValidating(false);

      if (onCreateNewTask) {
        onCreateNewTask();
      }
    } catch (err) {
      throw err;
    }
  };

  const handleOnChange = (apiKey, value) => {
    setSubmitObj((prev) => {
      const result = { ...prev };
      result[apiKey] = value;
      return { ...result };
    });
  };

  useEffect(() => {
    console.log(submitObj);
  }, [submitObj]);

  return (
    <div className="add-task-wrapper">
      <BaseButton
        title="New Task"
        type={BaseButtonType.primaryOutline}
        dynamicWidth={false}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-task-modal-container">
          <Form
            className="add-task-form"
            ref={formRef}
            noValidate
            validated={isValidating}
          >
            <BaseDropDown
              title="Category"
              apiKey="categoriesId"
              multiSelect={true}
              onChange={handleOnChange}
              options={
                taskCategoryList &&
                taskCategoryList.map((taskCategory) => {
                  return { value: taskCategory.id, title: taskCategory.name };
                })
              }
            />
            <BaseTextField
              type={BaseTextFieldType.text}
              apiKey="name"
              title="Task Name"
              value={submitObj && submitObj.name}
              onChange={handleOnChange}
            />
            <BaseTextField
              type={BaseTextFieldType.text}
              apiKey="description"
              title="Description"
              required={false}
              value={submitObj && submitObj.description}
              onChange={handleOnChange}
            />
            <BaseTextField
              type={BaseTextFieldType.text}
              apiKey="remark"
              title="Remark"
              required={false}
              value={submitObj && submitObj.remark}
              onChange={handleOnChange}
            />
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BaseButton
            type={BaseButtonType.secondary}
            title={"Close"}
            dynamicWidth={false}
            onClick={handleClose}
          />
          <BaseButton
            type={BaseButtonType.primary}
            title={"Create Task"}
            dynamicWidth={false}
            onClick={handleSubmit}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTask;

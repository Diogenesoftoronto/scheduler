import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "../Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones"/>)

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const {getByText} = render(<Form interviewers={interviewers} onSave={onSave} />);
    /* 3. Click the save button */
  fireEvent.click(getByText("Save"));
    
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
});


it("calls onSave function when the name is defined", () => {
  /* 1. Create the mock onSave function */
  const onSave = jest.fn();
  
  /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
  const { getByText, queryByText, getByAltText } = render(
    <Form
    interviewers={interviewers}
    onSave={onSave}
    student="Lydia Miller-Jones"
    />
  );
  
// select an interviewer
fireEvent.click(getByAltText("Sylvia Palmer"));

  /* 3. Click the save button */
  fireEvent.click(getByText("Save"));
  
  expect(queryByText(/student name cannot be blank/i)).toBeNull();
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
});
it("submits the name entered by the user", () => {
  const onSave = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <Form interviewers={interviewers} interviewer={1} onSave={onSave} />
  );

  const input = getByPlaceholderText("Enter Student Name");

  fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  fireEvent.click(getByText("Save"));

  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
});
it("calls onCancel and resets the input field", () => {
  const onCancel = jest.fn();
  const { getByText,  getByPlaceholderText, queryByText } = render(
    <Form
    interviewers={interviewers}
    name="Lydia Mill-Jones"
    onSave={jest.fn()}
    onCancel={onCancel}
    />
    );
    fireEvent.click(getByText("Cancel"));
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    
    
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
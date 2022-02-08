import React, { useState } from "react";
import Button from "./../Button.js";
import InterviewerList from "./../InterviewerList.js";

const Form = (props) => {
  const { student, interviewers, interviewer, onSave, onCancel } = props;
  const [studentState, setStudent] = useState(student || "");
  const [interviewerState, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");
  function validate() {
    if (!studentState) {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewerState) {
      setError("Interviewer cannot be blank");
      return;
    }
    setError("");
    onSave(studentState, interviewerState);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
            value={studentState}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewerState}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;

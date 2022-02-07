import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
// import modes from "../../constants/modes.json";

const modes = {
  EMPTY: "EMPTY",
  SHOW: "SHOW",
  CREATE: "CREATE",
  SAVING: "SAVING",
  ERROR: "ERROR",
  CONFIRM_DELETE: "CONFIRM_DELETE",
  CONFIRM_SAVE: "CONFIRM_SAVE",
  CONFIRM_EDIT: "CONFIRM_EDIT",
  DELETE: "DELETE",
};
const {
  SHOW,
  CREATE,
  SAVING,
  ERROR,
  EMPTY,
  CONFIRM_DELETE,
  CONFIRM_SAVE,
  CONFIRM_EDIT,
  DELETE,
} = modes;

// modes of appointment
// may convert to json object later
// destructuring modes
// const { SHOW, CREATE, SAVING, ERROR, EMPTY, CONFIRM_DELETE, CONFIRM_SAVE, CONFIRM_EDIT, DELETE } = JSON.parse(modes);
const Appointment = (props) => {
  const { id, time, interview, interviewers, bookInterview, deleteInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  let errorMessage = "unable to book appointment";
  const { student, interviewer } = interview
    ? interview
    : { student: null, interviewer: null };
  // this function updates the form component with the completed form information when the save button
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR, true);
      });

    return;
  };
  // this function deletes the form and return to the EMPTY state.
  const onDelete = () => {
    transition(DELETE, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR, true);
      });
  };

  // this function closes the error component and returns to the EMPTY state.
  const onClose = () => {
    back();
  };
  const showComponent = (
    <Show
      student={student}
      interviewer={interviewer}
      onEdit={() => transition(CREATE)}
      onDelete={() => transition(CONFIRM_DELETE)}
    />
  );
  // saving pending component
  const savingMessage = "Saving...";
  const savingComponent = <Status message={savingMessage} />;
  // delete pending component
  const deletingMessage = "Deleting...";
  const deletingComponent = <Status message={deletingMessage} />;
  // pending status component
  const pendingMessage = "Pending...";
  const statusComponent = <Status message={pendingMessage} />;
  // confirm delete component
  const confirmDeleteMessage =
    "Are you sure you would like to delete this appointment?";
  const confirmDeleteComponent = (
    <Confirm
      message={confirmDeleteMessage}
      onCancel={back}
      onConfirm={onDelete}
    />
  );
  // confirm save component
  const confirmSaveMessage =
    "Are you sure you would like to book this appointment?";
  const confirmSaveComponent = (
    <Confirm
      message={confirmSaveMessage}
      interview={interview}
      onCancel={back}
      onConfirm={() => save(student, interviewer)}
    />
  );
  // confirm edit component
  const confirmEditMessage =
    "Are you sure you would like to edit this appointment?";
  const confirmEditComponent = (
    <Confirm
      message={confirmEditMessage}
      onCancel={back}
      onConfirm={() => transition(CREATE)}
    />
  );
  const createComponent = (
    <Form
      interviewers={interviewers}
      interviewer={interviewer}
      onCancel={back}
      onSave={save}
      student={student}
    />
  );
  const emptyComponent = <Empty onAdd={() => transition(CREATE)} />;

  const errorComponent = <Error onClose={onClose} message={errorMessage} />;
  let appointStr;
  // "Appointment at "+time
  time ? (appointStr = null) : (appointStr = "No Appointments");

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW
        ? showComponent
        : mode === CREATE
        ? createComponent
        : mode === SAVING
        ? savingComponent
        : mode === EMPTY
        ? emptyComponent
        : mode === ERROR
        ? errorComponent
        : mode === CONFIRM_DELETE
        ? confirmDeleteComponent
        : mode === CONFIRM_SAVE
        ? confirmSaveComponent
        : mode === CONFIRM_EDIT
        ? confirmEditComponent
        : mode === DELETE
        ? deletingComponent
        : statusComponent}
      {appointStr}
    </article>
  );
};

export default Appointment;

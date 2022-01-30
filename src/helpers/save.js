import bookInterview from "./bookInterview";

 // this function updates the form component with the completed form information when the save button
//  pure function version dont know how to get it to work
 const save = async (name, interviewer, id, transition, modes ) => {
const { SAVING, ERROR, SHOW} = modes; 
  const interview = {
    student: name,
    interviewer,
  };
  transition(SAVING);
  bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch((error) => {
      transition(ERROR, true);
    });

  // console.log("save", id, interview, interviewer);
  return;
};
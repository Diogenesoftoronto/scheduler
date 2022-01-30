import deleteInterview from "./deleteInterview";

// this function deletes the form and return to the EMPTY state.

// pure function version dont know how to get it to work
 const onDelete = async (id,  transition, modes) => {
   const {DELETE, ERROR, EMPTY} = modes;
  transition(DELETE);
  deleteInterview(id)
    .then(() => transition(EMPTY))
    .catch((error) => {
      transition(ERROR, true);
    });
};
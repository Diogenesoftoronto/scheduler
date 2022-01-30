import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  const imgClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected,
  });
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img className={imgClass} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

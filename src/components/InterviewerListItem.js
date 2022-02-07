import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const {selected, avatar, name} = props;
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  const imgClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": selected,
  });
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img className={imgClass} src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
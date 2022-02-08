import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props
  const InterviewMap = interviewers.map((interviewer) => {
    const {id, name, avatar} = interviewer;
   return <InterviewerListItem
      key={id}
      name={name}
      avatar={avatar}
      setInterviewer={() => onChange(id)}
      selected={value === id}
    />
});

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewMap}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
export default InterviewerList;


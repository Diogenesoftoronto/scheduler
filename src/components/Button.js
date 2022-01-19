import React from "react";

import "components/Button.scss";
export default function Button(props) {
   let buttonClass = "button";
   buttonClass = props.confirm ? buttonClass+= " button--confirm" 
   : buttonClass;
   return <button className={buttonClass}>{props.children}</button>;
}

 
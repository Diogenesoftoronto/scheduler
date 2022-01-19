import React from "react";
import classNames from "classnames";


import "components/Button.scss";
export default function Button(props) {
   let buttonClass = classNames("button", {"button--danger": props.danger, "button--confirm": props.confirm});
   
   return <button onClick={props.onClick}  className={buttonClass} disabled={props.disabled}>{props.children}</button>;
}

 
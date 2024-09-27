import React from "react";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import clearAction from "../Helpers/clearAction";
import errorIcon from "../images/error.svg";
import "./styles.css";

const Error = () => {
  const navigate = useNavigate();
  const { state, actions } = useStateMachine({ clearAction });

  const { handleSubmit } = useForm({
    defaultValues: state,
  });

  const onSubmit = () => {
    actions.clearAction();
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Error</h1>
        <img src={errorIcon} />
        <div>Uh-oh. Something went wrong. Please try again later.</div>
        <div className="styleButton">
          <button type="submit">Restart</button>
        </div>
      </form>
    </div>
  );
};

export default Error;

import React from "react";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import clearAction from "../Helpers/clearAction";
import successIcon from "../images/success.svg";

const Success = () => {
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
        <h1>SUCCESS!</h1>
        <img src={successIcon} />
        <div>You should receive a confirmation email soon.</div>
        <div className="styleButton">
          <button type="submit">Restart</button>
        </div>
      </form>
    </div>
  );
};

export default Success;

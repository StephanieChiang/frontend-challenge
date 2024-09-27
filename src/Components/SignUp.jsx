import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../Helpers/updateAction";
import "./styles.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { state, actions } = useStateMachine({ updateAction });
  const { handleSubmit, register } = useForm({
    defaultValues: state.yourDetails,
  });

  const onSubmit = (data) => {
    actions.updateAction(data);
    navigate("/more-info");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <input type="text" placeholder="First Name" {...register("name")} />
        <input type="text" placeholder="E-mail" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <div className="styleButton">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

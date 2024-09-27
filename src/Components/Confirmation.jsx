import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import updateAction from "../Helpers/updateAction";
import "./styles.css";

const Confirmation = () => {
  const navigate = useNavigate();
  const { state } = useStateMachine(updateAction);
  const { handleSubmit } = useForm({
    defaultValues: state.yourDetails,
  });
  const {
    yourDetails: { name, email, password, color, terms },
  } = state;
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:3001/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.yourDetails),
      }).then((res) => {
        res.status === 200 ? navigate("/success") : navigate("/error");
        setLoading(false);
      });
    } catch (error) {
      navigate("/error");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div>
          Submitting request...Please wait, you will be redirected shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Confirmation</h1>
          <ul>
            <li>First Name: {name}</li>
            <li>E-mail: {email}</li>
            <li>Password: {"*".repeat(password.length)}</li>
            <li>Favorite Color: {color}</li>
            <li>Terms and Conditions: {terms ? "Agreed" : "Disagree"}</li>
          </ul>
          <div className="styleButton">
            <button onClick={() => navigate("/more-info")}>Back</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Confirmation;

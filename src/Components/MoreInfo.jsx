import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../Helpers/updateAction";

const MoreInfo = () => {
  const [colors, setColors] = useState("");
  const navigate = useNavigate();
  const termsLink = "https://github.com/upgrade/frontend-challenge";
  const { state, actions } = useStateMachine({ updateAction });
  const { handleSubmit, register } = useForm({
    defaultValues: state.yourDetails,
  });

  // Api call to get the list of colors, wrap in try/catch just in case backend side fails
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("http://localhost:3001/api/colors")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setColors(data);
          });
      } catch (error) {
        // Whatever you want to do when error happens, in this case, this scenario is not provided
        //console.log(error)
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    actions.updateAction(data);
    navigate("/confirmation");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Additional Info</h1>
        {colors ? (
          <select {...register("color")}>
            <option value="" hidden>
              Select your favorite color
            </option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        ) : (
          <div>Loading...</div>
        )}
        <div>
          <label>
            <input type="checkbox" {...register("terms")} />I agree to{" "}
            <a href={termsLink} target="_blank">
              Terms and Conditions
            </a>
          </label>
        </div>
        <div className="styleButton">
          <button onClick={() => navigate("/")}>Back</button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default MoreInfo;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = React.useState(false);
  const inputRefs = React.useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; i++) {
      const valid = inputRefs.current[i].current.validate();
      console.log(valid);
      if (!valid) {
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    //Carry on as normal
    console.log("Submitted");
    setOpen(true);
    setTimeout(() => {
        setOpen(false);
    }, 2000);
    console.log(data);
  };

  
  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
      <form onSubmit={onFormSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Username</label>
          <InputField
            ref={inputRefs.current[0]}
            label="Username"
            name="username"
            type="text"
            validation="required|username"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <InputField
            ref={inputRefs.current[1]}
            name="email"
            label="Email*:"
            validation="required|email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <InputField
            ref={inputRefs.current[2]}
            name="password"
            type="password"
            label="Password*:"
            validation="required|min:6"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered{" "}
          <Link className="nav-link" to={"/sign-in"}>
            Login
          </Link>
        </p>
        <Snackbar open={open} autoHideDuration={1000}>
        <Alert  severity="success">
          SIGNUP successfully!
        </Alert>
      </Snackbar>
      </form>
  );
};
export default SignUp;

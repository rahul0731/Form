import React ,{useState}from "react";
import {Link}  from 'react-router-dom'
import InputField from './InputField'
const Login =() => {
    const [data ,setData] = useState({});

    const inputRefs = React.useRef([
        React.createRef(), React.createRef()
      ]);
    
    const onFormSubmit = (e) =>{
        e.preventDefault();
        let isValid = true;

        for (let i = 0; i < inputRefs.current.length; i++) {
          const valid = inputRefs.current[i].current.validate()
          console.log(valid)
          if (!valid) {
            isValid = false
          }
        }
    
        if (!isValid) {
          return
        }
    
        //Carry on as normal
        alert("Logged In");
        console.log('Submitted')
        console.log(data)

    }

    const handleChange = (name, value) => {
        setData(prev => ({ ...prev, [name]: value }))
      }
    return(
        <form onSubmit={onFormSubmit} >
                <h3>Login</h3>
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
                    <label>Password</label>
                    <InputField
                        ref={inputRefs.current[1]}
                        name="password"
                        type="password"
                        label="Password*:"
                        validation="required|min:6"
                        onChange={handleChange}
                        />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                 Not an username ? 
                <Link className=" forgot-password nav-link text-right" to={"/sign-up"}>Sign up</Link>
                </p>
            </form>
    )

    
}
export default Login;
import React, { forwardRef, useImperativeHandle } from "react";

const InputField = forwardRef((props, ref) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setError("");
    props.onChange(event.target.name, event.target.value);
  };

  const validate = () => {
    //return true if is valid
    //else return false

    if (props.validation) {
      const rules = props.validation.split("|");

      for (let i = 0; i < rules.length; i++) {
        const current = rules[i];

        if (current === "required") {
          if (!value) {
            setError(`This ${props.label} is required`);
            return false;
          }
        }

        const pair = current.split(":");
        switch (pair[0]) {
          case "min":
            if (value.length < pair[1]) {
              setError(
                `This field must be at least ${pair[1]} charactesr long`
              );
              return false;
            }
            break;
          case "max":
            if (value.length > pair[1]) {
              setError(
                `This ${value} must be no longer than ${pair[1]} charactesr long`
              );
              return false;
            }
            break;
          case "username":
            if (!/^[0-9a-zA-Z]+$/.test(value)) {
              setError(` Please enter valid ${props.label} `);
              return false;
            }
            break;
          case "email":
            if (!/\S+@\S+\.\S+/.test(value)) {
              setError(`Please enter valid ${props.label} `);
              return false;
            }
            break;

          default:
            break;
        }
      }
    }

    return true;
  };

  useImperativeHandle(ref, () => {
    return {
      validate: () => validate(),
    };
  });

  return (
    <div className="form-group">
      <input
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        type={props.type}
        readOnly={props.readOnly ? true : false}
        value={props.value ? props.value : value}
        autoComplete={props.autoComplete}
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
});

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
  autoComplete: "off",
  validation: "",
  className: "text",
};

export default InputField;

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import logo from "./../../../../assets/logo/fashionist.png";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./../../../../actions/authAction";
import classnames from "classnames";

const Register = (props) => {
  const [error, setError] = useState({});

  useEffect(() => {
    if (props.errors) {
      setError(props.errors);
    }
  }, [error, props.errors]);
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      verifyPassword: data.verifypassword
    };
    props.registerUser(newUser, props.history);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center px-2">
      <div className="lt-bg-primary rounded-md shadow-md w-full md:w-2/3 lg:w-1/3 xl:w-1/4">
        <div className="flex items-center justify-center h-16 w-full">
          <img src={logo} alt="logo" />
        </div>
        <form
          className="flex flex-col px-4 pt-8 pb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="pl-2 py-2 rounded-md focus:outline-none mb-4"
            placeholder="Jon Doe"
            name="name"
            type="text"
            ref={register({ required: "You must specify a name" })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          <input
            className="pl-2 py-2 rounded-md focus:outline-none mb-4"
            placeholder="jondoe@example.abc"
            name="email"
            type="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />{" "}
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          <input
            name="password"
            type="password"
            ref={register({ required: "You must specify a password" })}
            className="pl-2 py-2 rounded-md focus:outline-none mb-4"
            placeholder="******"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          <input
            name="verifypassword"
            type="password"
            ref={register({
              required: "Verify password is required",
              validate: (value) =>
                value === password.current || "Passwords do not match",
            })}
            className="pl-2 py-2 rounded-md focus:outline-none mb-4"
            placeholder="******"
          />
          {errors.verifypassword && <p className="text-red-600">{errors.verifypassword.message}</p>}
          <div className="flex items-center py-2">
            <button
              className="w-full px-4 py-2 lt-bg-accent text-white rounded-md font-semibold"
              type="submit"
            >
              <FormattedMessage id="signup" />
            </button>
          </div>
          {error && <p>{error.email}</p>}
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

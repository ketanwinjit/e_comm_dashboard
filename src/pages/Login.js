/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import AppTheme from "../common/styles";
import { login } from "../backend/auth";
import { authenticate } from "../AuthRoutes";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-tailwind/react/Button";

function Login({ Theme }) {
  const { THEME } = Theme;
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userDetails;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Email and Password Required!");
    }
    let info = {
      emailAddress: email,
      password: password,
    };
    login(info)
      .then((res) => {
        console.log("Login res", res.userDetails);
        if (res.success === true && res.userDetails.isAdmin === 1) {
          authenticate(res.token, res.userDetails, () => {
            setMessage(res.message);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              history.push("/store/dashboard");
              console.log("NAVIGATE");
            }, 2000);
          });
        }
        if (res.success === true && res.userDetails.isAdmin === 0) {
          setMessage("Permission Denied! You are not an Aadmin.");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
        if (res.success === false) {
          setMessage(res.message);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
      })
      .catch((err) => console.log("Login error", err));
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    onChange={(event) =>
                      setUserDetails({
                        ...userDetails,
                        email: event.target.value,
                      })
                    }
                    value={email}
                    placeholder="Please enter email"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    onChange={(event) =>
                      setUserDetails({
                        ...userDetails,
                        password: event.target.value,
                      })
                    }
                    value={password}
                    placeholder="Please enter password"
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={checked}
                      id="form1Example3"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <Link to="/forgetpassword">Forgot password?</Link>
                </div>

                <Button
                  color="orange"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={true}
                  iconOnly={false}
                  ripple="light"
                  onClick={submit}
                >
                  Button
                </Button>
                <div className="h-10"></div>
                {error && (
                  <div className="alert alert-secondary" role="alert">
                    {message}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                {/* <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a
                  className="btn btn-primary btn-lg btn-block"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with
                  Facebook
                </a>
                <a
                  className="btn btn-primary btn-lg btn-block"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </a> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  Theme: state.Theme,
});

export default connect(mapStateToProps, null)(Login);

Login.propTypes = {
  Theme: propTypes.object.isRequired,
};

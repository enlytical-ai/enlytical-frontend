import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate, Link } from "react-router-dom";
import { saveUserData } from "../../redux/user/userActions";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./Login.css";
import { saveAppParamsData } from "../../redux/appParams/appParamsActions";
import { BASE_URL } from "../../appConstants";
import EnlyticalLogo from "../../EnlyticalLogo.png";

const Login = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  const [state, setState] = useState({
    password: "",
    email: "",
  });
  const [formErrors, setFromErrors] = useState({
    email: false,
    password: false,
    invalidEmail: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(state);
  //   }
  // }, [formErrors]);

  const handleSubmit = (e) => {
    const { email, invalidEmail, password } = state;
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === "") {
      setFromErrors((prevState) => ({
        ...prevState,
        email: true,
      }));
      return;
      // } else if (!regex.test(invalidEmail)) {
      //   setFromErrors((prevState) => ({
      //     ...prevState,
      //     invalidEmail: true,
      //   }));
      //   return;
    } else if (password === "") {
      setFromErrors((prevState) => ({
        ...prevState,
        password: true,
      }));
      return;
    }
    setIsSubmit(true);
    axios
      .post(`${BASE_URL}auth/login`, state)
      .then(function (response) {
        console.log(response.data.data);
        const { token, user, brand_array } = response.data.data;
        dispatch(saveUserData(user));
        dispatch(saveAppParamsData({ current_brand: brand_array[0], brand_array }));
        localStorage.setItem("token", token);
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
        NotificationManager.error(
          error.response.data.data.message,
          "Error",
          3000
        );
      });

    e.preventDefault();
    // setFromErrors(validate(state));
    // setIsSubmit(true);
  };

  // const validate = (val) => {
  //   const errors = {};
  //   const regex =
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   if (!val.email) {
  //     errors.email = "Email is required!";
  //   } else if (!regex.test(val.email)) {
  //     errors.email = "Invalid Email!";
  //   }
  //   if (!val.password) {
  //     errors.password = "password is required!";
  //   }
  //   return errors;
  // };

  return (
    <div className="mainLoginPage">
      <div className="headerLogin">
        <div>
          <img src={EnlyticalLogo} alt="logo" height={"60px"} />
        </div>
      </div>
      <div className="mainLoginContainer">
        <div className="leftLoginPage">
          <div className="leftText">
            <h1 style={{ fontSize: "56px" }}>
              <span style={{ color: "#5454c4" }}>E</span>-COMMERCE
            </h1>
            <h1 style={{ fontSize: "56px" }}>SIMPLIFIED</h1>
            <hr />
            <h2>Grow Your Business Online</h2>
          </div>
        </div>
        <div className="rightLoginPage">
          <div className="loginContainer boxShadow">
            <h3 className="mb-3">Login</h3>
            <hr />
            <form>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  onChange={handleInputChange}
                  value={state.email}
                ></input>
              </div>
              {formErrors.email && (
                <p className="errorContainer">Email is required!</p>
              )}
              {formErrors.invalidEmail && (
                <p className="errorContainer">Invalid Email!</p>
              )}
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={state.password}
                ></input>
              </div>
              {formErrors.password && (
                <p className="errorContainer">Password is required!</p>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary btn-m"
                  >
                    Submit
                  </button>
                </div>

                <div>
                  <Link to={"/user/signup"}>signup</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Login;

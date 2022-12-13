import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../appConstants";
import "./Signup.css";
const Signup = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    contact_num: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log(state);
    axios
      .post(`${BASE_URL}user/adminSignUp`, state)
      .then(function (response) {
        console.log(response.data.user);
        const { email } = response.data.user;
        navigate(`/user/setpassword/${email}`);
      })
      .catch(function (error) {
        console.log(error);
      });

    e.preventDefault();
  };

  return (
    <div className="mainSignupPage">
      <div className="leftSignupPage"></div>

      <div className="rightSignupPage">
        <div className="signupContainer boxShadow">
          <h3 className="mb-3">Sign Up</h3>
          <hr />
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="first_name"
                className="form-control"
                id="first_name"
                placeholder="First Name"
                onChange={handleInputChange}
                value={state.first_name}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="last_name"
                className="form-control"
                id="last_name"
                placeholder="Last Name"
                onChange={handleInputChange}
                value={state.last_name}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="contact_num"
                className="form-control"
                id="contact_num"
                placeholder="Contact Number"
                onChange={handleInputChange}
                value={state.contact_num}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={state.email}
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary btn-m"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="mb-3">
              <Link to={"/user/login"}> login </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

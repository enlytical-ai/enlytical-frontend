import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate, Link } from "react-router-dom";
import { saveUserData } from "../../redux/user/userActions";
import axios from "axios";
import "./Login.css"
const Login = () => {
    let navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log(user);
    const [state, setState] = useState({
        password: "",
        email: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(state => ({
            ...state,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        dispatch(saveUserData(state));
        axios.post('http://localhost:5000/auth/login', state)
            .then(function (response) {
                console.log(response.data.data);
                const { token } = response.data.data;
                localStorage.setItem("token", token);
                navigate("/home");
            })
            .catch(function (error) {
                console.log(error);
            });

        e.preventDefault();
    }

    return (

        <div className="loginContainer  col-lg-3 col-md-6 col-sm-4 col-xs-12">
            <form>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div style={{ display: "flex", justifyContent: "center" }} >
                    <button onClick={handleSubmit} type="button" className="btn btn-primary btn-sm">Submit</button>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }} >
                    <Link to={"/user/signup"} >signup</Link>
                </div>

            </form>
        </div>
    )
}

export default Login;
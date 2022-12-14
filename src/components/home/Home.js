import { Link, useNavigate, Outlet, resolvePath } from "react-router-dom";
import "./Home.css"
import Body from "../headerContentFooterComponent/Body";
import Header from "../headerContentFooterComponent/Header";
import Content from "../headerContentFooterComponent/Content";
import RightHeaderElement from "../headerContentFooterComponent/RightHeaderElement";
import LeftHeaderElement from "../headerContentFooterComponent/LeftHeaderElement";
import EnlyticalLogo from "../../EnlyticalLogo.png"
import { useEffect, useState } from "react";
import DashboardsContainer from "../dashboards/DashboardsContainer";
import axios from "axios";
import { BASE_URL } from "../../appConstants";
import { useDispatch, useSelector } from "react-redux";
import { saveAppParamsData } from "../../redux/appParams/appParamsActions";
const Home = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const appParams = useSelector(state => state.appParams);
    const user = useSelector(state => state.user);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}brand/getAllMyBrands`, {
            headers: {
                token
            }
        }).then(function (response) {
            setBrands(response.data.data.brands);
        }).catch(function (error) {
            console.log(error)
        })
    }, [])

    const onBrandChange = (e) => {
        dispatch(saveAppParamsData({ current_brand: e.target.value }));
    }
    return (
        <Body className="noAuthBody" >
            <Header className="authHeader" >
                <LeftHeaderElement className="leftHeaderElement" >
                    {/* <div style={{ cursor: "pointer", marginRight: "10px", color: "#757575" }} onClick={(e) => { navigate("/home/settings"); e.preventDefault() }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                    </div> */}
                    <div style={{ marginLeft: "10px" }} >
                        <img height={"28px"} src={EnlyticalLogo} />
                    </div>
                    <div className="userNameContainer" >
                        Hi, <span>{user.first_name}</span>
                    </div>
                </LeftHeaderElement>
                <RightHeaderElement className="authHeaderRight" >
                    <div className="selectBrandDropDownContainer" >
                        <select onChange={onBrandChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                            {
                                brands.length > 0 && brands.map((brand, i) => {
                                    return (
                                        <option selected={appParams.current_brans === brand._id ? true : false} key={i} value={brand._id}>{brand.brand_name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="logoutButtonContainer" style={{ marginLeft: "20px", marginRight: "20px", display: "flex" }} >
                        <button onClick={() => { localStorage.removeItem("token"); navigate("/user/login") }} type="button" className="btn btn-primary btn-sm">Logout</button>
                    </div>
                    {/* <Link to={"/home"} > Home </Link> */}
                </RightHeaderElement>
            </Header>
            <Content className="authContent" >
                <DashboardsContainer />
            </Content>
        </Body>
    )
}

export default Home;
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./Home.css"
import Body from "../headerContentFooterComponent/Body";
import Header from "../headerContentFooterComponent/Header";
import Content from "../headerContentFooterComponent/Content";
import RightHeaderElement from "../headerContentFooterComponent/RightHeaderElement";
import LeftHeaderElement from "../headerContentFooterComponent/RightHeaderElement";
import EnlyticalLogo from "../../EnlyticalLogo.png"
import { useEffect } from "react";
import DashboardsContainer from "../dashboards/DashboardsContainer";
const Home = () => {
    let navigate = useNavigate();
    return (
        <Body className="noAuthBody" >
            <Header className="authHeader" >
                <RightHeaderElement className="authHeaderRight" >
                    <div style={{ marginLeft: "20px" }} >
                        <img height={"28px"} src={EnlyticalLogo} />
                    </div>
                    {/* <Link to={"/home"} > Home </Link> */}
                </RightHeaderElement>
                <LeftHeaderElement>
                    {/* <div style={{ cursor: "pointer", marginRight: "10px", color: "#757575" }} onClick={(e) => { navigate("/home/settings"); e.preventDefault() }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                    </div> */}
                    <div className="logoutButtonContainer" style={{ display: "flex" }} >
                        <button onClick={() => { localStorage.removeItem("token"); navigate("/user/login") }} type="button" className="btn btn-primary btn-sm">Logout</button>
                    </div>
                </LeftHeaderElement>
            </Header>
            <Content className="authContent" >
                <DashboardsContainer />
            </Content>
        </Body>
    )
}

export default Home;
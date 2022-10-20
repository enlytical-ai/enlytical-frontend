import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashboardsContainer.css";
import DashboardsRight from "./DashboardsRight";
import DashboardsLeft from "./DashboardsLeft";
import LineGraph from "./../graphs/LineGraph";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../appConstants";
import { useState } from "react";
import PowerBiDashboardContainer from "./powerBiDashboard/PowerBiDashboardContainer";
import { useSelector } from "react-redux/es/exports";
import OnBoardingContainer from "./onBoarding/OnBoardingContainer";
import { useDispatch } from "react-redux/es/exports";
import { saveUserData } from "../../redux/user/userActions";
import { NotificationContainer, NotificationManager } from 'react-notifications';
const DashboardsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [dashboardMenuArray, setDashboardMenuArray] = useState([]);
    const [reportsMenuArray, setReportsMenuArray] = useState([]);
    const [onBordingMenu, setOnBoardingMenu] = useState(["Portfolio", "Seller", "Budget"]);
    const [currentOnBoardingEl, setCurrentOnBoardingEl] = useState("Portfolio");
    const [currentDashboard, setCurrentDashboard] = useState("");
    const [currentReport, setCurrentReport] = useState("");
    const [container, setContainer] = useState("powerBiDashboard");
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${BASE_URL}powerBi/getPowerBiDashboardMenuArray/dashboard?brandId=${current_brand}`, {
            headers: {
                token
            }
        }).then(function (response) {
            const { dashboard_menu_array } = response.data.data;

            if (dashboard_menu_array.length > 0) {
                setDashboardMenuArray(dashboard_menu_array);
                setCurrentDashboard(dashboard_menu_array[0]._id)
            } else {
                setDashboardMenuArray([]);
                setCurrentDashboard("")

            }
        }).catch(function (error) {
            console.log(error);
        })
        axios.get(`${BASE_URL}powerBi/getPowerBiDashboardMenuArray/report?brandId=${current_brand}`, {
            headers: {
                token
            }
        }).then(function (response) {
            const { dashboard_menu_array } = response.data.data;

            if (dashboard_menu_array.length > 0) {
                setReportsMenuArray(dashboard_menu_array);
                setCurrentReport(dashboard_menu_array[0]._id)
            } else {
                setReportsMenuArray([]);
                setCurrentReport("")


            }

        }).catch(function (error) {
            console.log(error);
        })
    }, [current_brand]);
    const changeDashboard = (e) => {
        setCurrentDashboard(e);
    }
    const changeOnBoardingEl = (e) => {
        setCurrentOnBoardingEl(e)
    }
    const { access } = user;
    return (

        <div className="dashboardsContainer" >
            <DashboardsLeft>
                {
                    access && (
                        <div className="accordion" id="accordionExample">
                            {
                                access.includes("home_onbording") && (<div className="accordion-item">
                                    <h2 onClick={() => setContainer("onBoarding")} className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Onbording
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {
                                                onBordingMenu.length > 0 && onBordingMenu.map((e) => {
                                                    return (
                                                        <div key={e} onClick={() => changeOnBoardingEl(e)} className={`menuElement ${currentOnBoardingEl === e ? "menuElementClicked" : ""}`} >
                                                            {e}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>)
                            }
                            {
                                access.includes("home_dashboards") && (
                                    <div className="accordion-item">
                                        <h2 onClick={() => setContainer("powerBiDashboard")} className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Dashboards
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {
                                                    dashboardMenuArray.length > 0 && dashboardMenuArray.map((e) => {
                                                        return (
                                                            <div key={e._id} onClick={() => changeDashboard(e._id)} className={`menuElement ${currentDashboard === e._id ? "menuElementClicked" : ""}`} >
                                                                {e.dashboard_name}
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                access.includes("home_reports") && (
                                    <div className="accordion-item">
                                        <h2 onClick={() => setContainer("powerBiReports")} className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Reports
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {
                                                    reportsMenuArray.length > 0 && reportsMenuArray.map((e) => {
                                                        return (
                                                            <div key={e._id} onClick={() => changeDashboard(e._id)} className={`menuElement ${currentDashboard === e._id ? "menuElementClicked" : ""}`} >
                                                                {e.dashboard_name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    )
                }

                {/* <div className="dashboardsLinksContainer" >
                    <Link to={"/dashboards/advertisingReport"} >Advertising Report</Link>
                </div> */}
            </DashboardsLeft>
            <DashboardsRight>
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {container === "powerBiDashboard" && currentDashboard !== "" && < PowerBiDashboardContainer currentDashboard={currentDashboard} />}
                    {container === "powerBiReports" && currentReport !== "" && <PowerBiDashboardContainer currentDashboard={currentReport} />}
                    {container === "onBoarding" && <OnBoardingContainer changeOnBoardingEl={changeOnBoardingEl} currentOnBoardingEl={currentOnBoardingEl} />}
                </div>
            </DashboardsRight>
            <NotificationContainer />
        </div>
    )
}

export default DashboardsContainer;



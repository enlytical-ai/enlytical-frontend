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
import OnBoardingContainer from "./onBoarding/OnBoardingContainer";
const DashboardsContainer = () => {
    const navigate = useNavigate();
    const [dashboardMenuArray, setDashboardMenuArray] = useState([]);
    const [onBordingMenu, setOnBoardingMenu] = useState(["Portfolio", "Seller", "Budget"]);
    const [currentOnBoardingEl, setCurrentOnBoardingEl] = useState("Portfolio");
    const [currentDashboard, setCurrentDashboard] = useState("");
    const [container, setContainer] = useState("powerBiDashboard");
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BASE_URL}powerBi/getPowerBiDashboardMenuArray`, {
                headers: {
                    token
                }
            })
            .then(function (response) {
                console.log(response.data.data);
                const { dashboard_menu_array } = response.data.data;
                console.log(dashboard_menu_array)
                setDashboardMenuArray(dashboard_menu_array);
                setCurrentDashboard(dashboard_menu_array[0]._id)

            }).catch(function (error) {
                console.log(error);
            })

    }, []);
    const changeDashboard = (e) => {
        setCurrentDashboard(e);
    }
    const changeOnBoardingEl = (e) => {
        setCurrentOnBoardingEl(e)
    }
    return (
        <div className="dashboardsContainer" >
            <DashboardsLeft>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 onClick={() => setContainer("onBoarding")} class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Onbording
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
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
                    </div>
                    <div class="accordion-item">
                        <h2 onClick={() => setContainer("powerBiDashboard")} class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Dashboards
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
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
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Reports
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="dashboardsLinksContainer" >
                    <Link to={"/home/dashboards/advertisingReport"} >Advertising Report</Link>
                </div> */}
            </DashboardsLeft>
            <DashboardsRight>
                {container === "powerBiDashboard" && <PowerBiDashboardContainer currentDashboard={currentDashboard} />}
                {container === "onBoarding" && <OnBoardingContainer currentOnBoardingEl={currentOnBoardingEl} />}
            </DashboardsRight>
        </div>
    )
}

export default DashboardsContainer;



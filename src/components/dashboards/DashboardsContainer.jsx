import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashboardsContainer.css";
import DashboardsRight from "./DashboardsRight";
import DashboardsLeft from "./DashboardsLeft";
import LineGraph from "./../graphs/LineGraph";
const DashboardsContainer = () => {
    return (
        <div className="settingContainer" >
            <DashboardsLeft>

            </DashboardsLeft>
            <DashboardsRight>
                <LineGraph />
            </DashboardsRight>
        </div>
    )
}

export default DashboardsContainer;



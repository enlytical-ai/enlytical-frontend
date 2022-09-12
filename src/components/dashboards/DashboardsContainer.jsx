import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashboardsContainer.css";
import DashboardsRight from "./DashboardsRight";
import DashboardsLeft from "./DashboardsLeft";
import LineGraph from "./../graphs/LineGraph";
const DashboardsContainer = () => {
    return (
        <div className="dashboardsContainer" >
            <DashboardsLeft>
                <div className="dashboardsLinksContainer" >
                    <Link to={"/home/dashboards/advertisingReport"} >Advertising Report</Link>
                </div>
            </DashboardsLeft>
            <DashboardsRight>
                <Outlet />
            </DashboardsRight>
        </div>
    )
}

export default DashboardsContainer;



import { useState } from "react";
import "./Sidebar.css";
const Sidebar = () => {
    const [leftSelected, setLeftSelected] = useState("onboarding");
    return (
        <div className="sidebarComponent" >
            <div className="sidebarLeft" >
                <div onClick={()=>setLeftSelected("onboarding")}  className={`sidebarIconsContainer ${leftSelected === "onboarding" ? "clicked" : "unClicked"}`} >
                    <i class="bi bi-plus-square sidebarIcons"></i>
                    <div className="sidebarIconsName" >Onboarding</div>
                </div>
                <div onClick={()=>setLeftSelected("dashboard")} className={`sidebarIconsContainer ${leftSelected === "dashboard" ? "clicked" : "unClicked"}`} >
                    <i class="bi bi-bar-chart-line sidebarIcons "></i>
                    <div className="sidebarIconsName" >Dashboards</div>
                </div>
                <div onClick={()=>setLeftSelected("reports")} className={`sidebarIconsContainer ${leftSelected === "reports" ? "clicked" : "unClicked"}`}>
                    <i class="bi bi-layout-text-sidebar-reverse sidebarIcons"></i>
                    <div className="sidebarIconsName" >Reports</div>
                </div>
            </div>
            <div className="sideberRight" >
                <div className="sideberRightEl" >
                    Portfolio
                </div>
                <div className="sideberRightEl" >
                    Seller
                </div>
                <div className="sideberRightEl" >
                    Budget
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
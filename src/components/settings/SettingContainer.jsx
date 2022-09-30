import { Link, Outlet, useNavigate } from "react-router-dom"
import "./SettingContainer.css"
import SettingRight from "./SettingRight"
import SettingLeft from "./SettingsLeft"
const SettingContainer = () => {
    const navigate = useNavigate()
    return (
        <div className="settingContainer" >
            <SettingLeft>
                <div className="settingLinksContainer" >
                    <Link to={""}>Portfolio</Link>
                    <Link to={""}>Seller</Link>
                    <Link to={""}>budget</Link>
                    <Link to={""}>Daily hygiene reoprt</Link>
                    <Link to={"/home/settings/dailyPerformance"} >Daily Performance</Link>
                    <Link to={"/home/settings/monthlyConfig"} >Create Monthly Config</Link>

                </div>
                <div className="logoutButtonContainer" style={{ display: "flex" }} >
                    <button onClick={() => { localStorage.removeItem("token"); navigate("/user/login") }} type="button" className="btn btn-primary btn-sm">Logout</button>
                </div>
            </SettingLeft>
            <SettingRight>
                <Outlet />
            </SettingRight>
        </div>
    )
}

export default SettingContainer
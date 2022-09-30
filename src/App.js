import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import './App.css';
import Home from './components/home/Home';
import Otp from "./components/auth/Otp";
import User from "./components/auth/User";
import SettingContainer from "./components/settings/SettingContainer";
import DashboardsContainer from "./components/dashboards/DashboardsContainer"
import AdvertisingReportContainer from "./components/dashboards/advertisingReport/AdvertisingReportContainer";
import MonthlyConfig from "./components/settings/monthlyConfig/MonthlyConfig";
import GridComponent from "./components/Grids/GridComponent/GridComponent";
import BrandHealth from "./components/dashboards/powerBiDashboard/powerBiDashboards/BrandHealth";
import PowerBiDashboardContainer from "./components/dashboards/powerBiDashboard/PowerBiDashboardContainer";
function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  useEffect(() => {
    //token 
    token ? navigate("/home") : navigate("/user/login");
  }, [])
  return (
    <div className="App">
      <Provider store={store} >
        <Routes>
          <Route path="user" element={<User />} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="setpassword/:email" element={<Otp />} />
          </Route>
          <Route path="home" element={<Home />} >
            {/* <Route path="settings" element={<SettingContainer />} >
              <Route path="monthlyConfig" element={<MonthlyConfig />} >
              </Route>
              <Route path="dailyPerformance" element={<BrandHealth />} >
              </Route>
            </Route>
            <Route path="dashboards" element={<DashboardsContainer />} >
              {/* <Route path="advertisingReport" element={<AdvertisingReportContainer />} >
              </Route>
              <Route path="powerBiDashboard" element={<PowerBiDashboardContainer />} >
              </Route>
            </Route> */}
          </Route>
        </Routes>
      </Provider>


    </div >
  );
}

export default App;

//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../src/scss/main.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

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
import { useDispatch } from "react-redux";
import axios from "axios";
import { saveUserData } from "./redux/user/userActions";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveAppParamsData } from "./redux/appParams/appParamsActions";
import { BASE_URL } from "./appConstants";
function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`${BASE_URL}user`, {
      headers: {
        token
      }
    }).then(function (response) {
      const { user } = response.data.data;
      dispatch(saveUserData(user));
      dispatch(saveAppParamsData({ current_brand: user.brand_id[0] }))
      navigate("/home")
    }).catch(function (error) {
      console.log(error);
      NotificationManager.error(`${error.response.data.data.message} Please Login.`, 'Error', 2000);
      navigate("/user/login")
    });
    // token ? navigate("/home") : navigate("/user/login");
  }, [])
  return (
    <div className="App">
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
      <NotificationContainer />
    </div >
  );
}

export default App;

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

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

import BrandHealth from "./components/dashboards/powerBiDashboard/powerBiDashboards/BrandHealth";
import PowerBiDashboardContainer from "./components/dashboards/powerBiDashboard/PowerBiDashboardContainer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { saveUserData } from "./redux/user/userActions";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveAppParamsData } from "./redux/appParams/appParamsActions";
import { BASE_URL } from "./appConstants";
import { useSelector } from "react-redux";
import Loader from "./components/commonComponent/Loader/Loader";
function App() {
  const user = useSelector(state => state.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    navigate("loading");
    axios.get(`${BASE_URL}user`, {
      headers: {
        token
      }
    }).then(function (response) {
      const resUser = response.data.data.user;
      dispatch(saveUserData(resUser));
      dispatch(saveAppParamsData({ current_brand: resUser.brand_id[0] }))
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
        <Route path="loading" element={<Loader />}  >

        </Route>
      </Routes>
      <NotificationContainer />
    </div >
  );
}

export default App;

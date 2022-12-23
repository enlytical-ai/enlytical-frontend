import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashboardsContainer.css";
import "./sidebar/Sidebar.css";
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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AdvertisingReportContainer from "./advertisingReport/AdvertisingReportContainer";

const DashboardsContainer = (props) => {
  const { sidebarOpen } = props;
  const user = useSelector((state) => state.user);
  const [dashboardMenuArray, setDashboardMenuArray] = useState([]);
  const [reportsMenuArray, setReportsMenuArray] = useState([]);
  const [onBordingMenu, setOnBoardingMenu] = useState([
    "Portfolio",
    "Seller",
    "Budget",
  ]);
  const [currentOnBoardingEl, setCurrentOnBoardingEl] = useState("Portfolio");
  const [currentDashboard, setCurrentDashboard] = useState("");
  const [currentReport, setCurrentReport] = useState("");
  const [container, setContainer] = useState("onBoarding");
  const appParams = useSelector((state) => state.appParams);
  const { current_brand } = appParams;

  const [toggle, setToggle] = useState(false);

  let handleClickSidebar = () => {
    setToggle((prevState) => !prevState);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${BASE_URL}powerBi/getPowerBiDashboardMenuArray/dashboard?brandId=${current_brand}`,
        {
          headers: {
            token,
          },
        }
      )
      .then(function (response) {
        const { dashboard_menu_array } = response.data.data;

        if (dashboard_menu_array.length > 0) {
          setDashboardMenuArray(dashboard_menu_array);
          setCurrentDashboard(dashboard_menu_array[0]._id);
        } else {
          setDashboardMenuArray([]);
          setCurrentDashboard("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        `${BASE_URL}powerBi/getPowerBiDashboardMenuArray/report?brandId=${current_brand}`,
        {
          headers: {
            token,
          },
        }
      )
      .then(function (response) {
        const { dashboard_menu_array } = response.data.data;

        if (dashboard_menu_array.length > 0) {
          setReportsMenuArray(dashboard_menu_array);
          setCurrentReport(dashboard_menu_array[0]._id);
        } else {
          setReportsMenuArray([]);
          setCurrentReport("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [current_brand]);
  const changeDashboard = (e) => {
    setCurrentDashboard(e);
  };
  const changeOnBoardingEl = (e) => {
    setCurrentOnBoardingEl(e);
  };

  //To get the height for grid
  const [containerHeight, setContainerHeight] = useState();
  useEffect(() => {
    const height = window.innerHeight;
    const netHeight = height - 49;
    setContainerHeight(netHeight);
    //Header48,padding40,24,32,24
    // console.log("====Height===>", el - 168)
  }, []);
  window.addEventListener("resize", () => {
    const height = window.innerHeight;
    const netHeight = height - 49;
    setContainerHeight(netHeight);
  });

  return (
    <div className="dashboardsContainer" style={{ width: "100%" }}>
      <DashboardsLeft>
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <a
                className="nav-link "
                onClick={() => setContainer("powerBiDashboard")}
              >
                <i className="bi bi-grid"></i>
                <div>Dashboards</div>
              </a>
            </li>
            {/* <ul>
              <li>
                {container === "powerBiDashboard" && (
                  <div className="sideberRight">
                    {dashboardMenuArray.length > 0 &&
                      dashboardMenuArray.map((e) => {
                        return (
                          <div
                            key={e._id}
                            onClick={() => changeDashboard(e._id)}
                            className={`sideberRightEl ${
                              currentDashboard === e._id
                                ? "sideberRightElClicked"
                                : ""
                            }`}
                          >
                            {e.dashboard_name}
                          </div>
                        );
                      })}
                  </div>
                )}
              </li>
            </ul> */}

            <li className="nav-item">
              <a
                className={`nav-link ${!toggle && "collapsed"}`}
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                onClick={() => setContainer("onBoarding")}
              >
                <i className="bi bi-menu-button-wide"></i>
                <div>Onboarding</div>
                <i
                  className="bi bi-chevron-down ms-auto"
                  onClick={() => handleClickSidebar()}
                ></i>
              </a>
              <ul
                id="components-nav"
                className={`nav-content collapse ${toggle && "show"}`}
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  {container === "onBoarding" && (
                    <div>
                      {onBordingMenu.length > 0 &&
                        onBordingMenu.map((e) => {
                          return (
                            <div
                              // className={`${
                              //   container === "onBoarding" ? "active" : ""
                              // }`}
                              // className={`${
                              //   onBordingMenu === "Portfolio" ? "active" : ""
                              // }`}
                              key={e}
                              onClick={() => changeOnBoardingEl(e)}
                            >
                              <a>
                                <i className="bi bi-circle"></i>
                                <span>{e}</span>
                              </a>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${!toggle.btn2 && "collapsed"}`}
                data-bs-target="#forms-nav"
                data-bs-toggle="collapse"
                onClick={() => setContainer("powerBiReports")}
              >
                <i className="bi bi-journal-text"></i>
                <div>Reports</div>
                {/* <i onClick={() => handleClickSidebar("btn2")}></i> */}
              </a>
              <ul
                id="forms-nav"
                className={`nav-content collapse ${toggle.btn2 && "show"}`}
                data-bs-parent="#sidebar-nav"
              >
                {/* <li>
                  {container === "powerBiReports" && (
                    <div className="sideberRight">
                      {reportsMenuArray.length > 0 &&
                        reportsMenuArray.map((e) => {
                          return (
                            <div
                              key={e._id}
                              onClick={() => setCurrentReport(e._id)}
                            >
                              {e.dashboard_name}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${!toggle.btn3 && "collapsed"}`}
                data-bs-target="#tables-nav"
                data-bs-toggle="collapse"
                onClick={() => setContainer("advertisingReport")}
              >
                <i className="bi bi-layout-text-window-reverse"></i>
                <div>Web Reports</div>
                {/* <i onClick={() => handleClickSidebar("btn3")}></i> */}
              </a>
              <ul
                id="tables-nav"
                className={`nav-content collapse ${toggle.btn3 && "show"}`}
                data-bs-parent="#sidebar-nav"
              ></ul>
            </li>
          </ul>
        </aside>

        {/* <div className="sidebarComponent">
          <div className="sidebarLeft">
            <div
              onClick={() => setContainer("onBoarding")}
              className={`sidebarIconsContainer ${
                container === "onBoarding" ? "clicked" : "unClicked"
              }`}
            >
              <i className="bi bi-plus-square sidebarIcons"></i>
              <div className="sidebarIconsName">Onboarding</div>
            </div>
            <div
              onClick={() => setContainer("powerBiDashboard")}
              className={`sidebarIconsContainer ${
                container === "powerBiDashboard" ? "clicked" : "unClicked"
              }`}
            >
              <i className="bi bi-bar-chart-line sidebarIcons "></i>
              <div className="sidebarIconsName">Dashboards</div>
            </div>
            <div
              onClick={() => setContainer("powerBiReports")}
              className={`sidebarIconsContainer ${
                container === "powerBiReports" ? "clicked" : "unClicked"
              }`}
            >
              <i className="bi bi-layout-text-sidebar-reverse sidebarIcons"></i>
              <div className="sidebarIconsName">Reports</div>
            </div>
            <div
              onClick={() => setContainer("advertisingReport")}
              className={`sidebarIconsContainer ${
                container === "advertisingReport" ? "clicked" : "unClicked"
              }`}
            >
              <i className="bi bi-layout-text-window-reverse sidebarIcons"></i>
              <div className="sidebarIconsName">Web Reports</div>
            </div>
          </div>
          {container === "onBoarding" && (
            <div className={`sideberRight`}>
              {onBordingMenu.length > 0 &&
                onBordingMenu.map((e) => {
                  return (
                    <div
                      key={e}
                      onClick={() => changeOnBoardingEl(e)}
                      className={`sideberRightEl ${
                        currentOnBoardingEl === e ? "sideberRightElClicked" : ""
                      }`}
                    >
                      {e}
                    </div>
                  );
                })}
            </div>
          )}
          {container === "powerBiDashboard" && (
            <div className="sideberRight">
              {dashboardMenuArray.length > 0 &&
                dashboardMenuArray.map((e) => {
                  return (
                    <div
                      key={e._id}
                      onClick={() => changeDashboard(e._id)}
                      className={`sideberRightEl ${
                        currentDashboard === e._id
                          ? "sideberRightElClicked"
                          : ""
                      }`}
                    >
                      {e.dashboard_name}
                    </div>
                  );
                })}
            </div>
          )}
          {container === "powerBiReports" && (
            <div className="sideberRight">
              {reportsMenuArray.length > 0 &&
                reportsMenuArray.map((e) => {
                  return (
                    <div
                      key={e._id}
                      onClick={() => setCurrentReport(e._id)}
                      className={`sideberRightEl ${
                        currentReport === e._id ? "sideberRightElClicked" : ""
                      }`}
                    >
                      {e.dashboard_name}
                    </div>
                  );
                })}
            </div>
          )}
        </div> */}
      </DashboardsLeft>
      <DashboardsRight>
        <main
          id="main"
          className="main"
          style={{ width: sidebarOpen ? "1299px" : "999px" }}
        >
          <span className="sideBar-toggle-btn">
            <i
              className={`bi bi-chevron-${
                sidebarOpen ? "right" : "left"
              } ms-auto toggle-sidebar-btn`}
              onClick={() => props.click()}
            ></i>
          </span>
          {container === "powerBiDashboard" && currentDashboard !== "" && (
            <PowerBiDashboardContainer currentDashboard={currentDashboard} />
          )}
          {container === "powerBiReports" && currentReport !== "" && (
            <PowerBiDashboardContainer currentDashboard={currentReport} />
          )}
          {container === "onBoarding" && (
            <OnBoardingContainer
              changeOnBoardingEl={changeOnBoardingEl}
              currentOnBoardingEl={currentOnBoardingEl}
            />
          )}
          {container === "advertisingReport" && <AdvertisingReportContainer />}
        </main>
      </DashboardsRight>
      <NotificationContainer />
    </div>
  );
};

export default DashboardsContainer;

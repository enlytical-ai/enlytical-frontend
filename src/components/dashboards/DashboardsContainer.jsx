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
const DashboardsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [dashboardMenuArray, setDashboardMenuArray] = useState([]);
  const [reportsMenuArray, setReportsMenuArray] = useState([]);
  const [onBordingMenu, setOnBoardingMenu] = useState([
    "Portfolio",
    "Seller",
    "Budget",
    "PriorityKW",
  ]);
  const [currentOnBoardingEl, setCurrentOnBoardingEl] = useState("Portfolio");
  const [currentDashboard, setCurrentDashboard] = useState("");
  const [currentReport, setCurrentReport] = useState("");
  const [container, setContainer] = useState("advertisingReport");
  const [sideberRightToggle, setSideberRightToggle] = useState(true);
  const appParams = useSelector((state) => state.appParams);
  const { current_brand } = appParams;
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
  //

  const sideberRightToggleFn = () => {};
  const [toggleOnBoarding, setToggleOnBoarding] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(true);
  // const [active, setActive] = useState(false);

  const { access } = user;
  const clickFn = () => {
    setToggleOnBoarding((prevState) => !prevState);
    setContainer("onBoarding");
  };
  return (
    <div className="dashboardsContainer" style={{ height: containerHeight }}>
      <DashboardsLeft width={sidebarToggle ? 300 : 0}>
        <div className="sbysp-container">
          {/* onboarding */}

          <div
            onClick={() => clickFn()}
            className={!toggleOnBoarding ? "sbysp-el open" : "sbysp-el"}
          >
            <div className="sbysp-el-left">
              <span className="sbysp-el-icon">
                <i class="bi bi-columns-gap"></i>
              </span>
              <span>OnBoarding</span>
            </div>
            <div className="sbysp-el-right">
              <span className="sbysp-el-arrow">
                <i
                  className={`bi bi-chevron-${
                    toggleOnBoarding ? "down" : "up"
                  }`}
                  // className="bi bi-chevron-down"
                ></i>
              </span>
            </div>
          </div>
          <div
            // style={{ display: toggleOnBoarding ? "block" : "none" }}
            // className="on-boarding-sub-container"
            className={`on-boarding-sub-container ${
              toggleOnBoarding && "collapse"
            }`}
          >
            {container === "onBoarding" && (
              <div>
                {onBordingMenu.length > 0 &&
                  onBordingMenu.map((e) => {
                    return (
                      <div key={e} onClick={() => changeOnBoardingEl(e)}>
                        <div className="on-boarding-sub-el">
                          <div className="on-boarding-sub-el-circle">
                            <i className="bi bi-circle"></i>
                          </div>
                          <div className="on-boarding-sub-el-text">{e}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Dashboard */}
          <div
            className="sbysp-el"
            onClick={() => setContainer("powerBiDashboard")}
          >
            <div className="sbysp-el-left">
              <span className="sbysp-el-icon">
                <i class="bi bi-menu-button-wide"></i>
              </span>
              <span> Dashboard</span>
            </div>
          </div>
          {/* {container === "powerBiDashboard" && (
            <div>
              {dashboardMenuArray.length > 0 &&
                dashboardMenuArray.map((e) => {
                  return (
                    <div key={e._id} onClick={() => changeDashboard(e._id)}>
                      <div className="on-boarding-sub-el">
                        <div className="on-boarding-sub-el-circle">
                          <i className="bi bi-circle"></i>
                        </div>
                        <div className="on-boarding-sub-el-text">
                          {e.dashboard_name}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )} */}

          {/* reports */}
          <div
            className="sbysp-el"
            onClick={() => setContainer("powerBiReports")}
          >
            <div className="sbysp-el-left">
              <span className="sbysp-el-icon">
                <i class="bi bi-journal-text"></i>
              </span>
              <span> Reports</span>
            </div>
          </div>
          {/* {container === "powerBiReports" && (
            <div>
              {reportsMenuArray.length > 0 &&
                reportsMenuArray.map((e) => {
                  return (
                    <div key={e._id} onClick={() => setCurrentReport(e._id)}>
                      <div className="on-boarding-sub-el">
                        <div className="on-boarding-sub-el-circle">
                          <i className="bi bi-circle"></i>
                        </div>
                        <div className="on-boarding-sub-el-text">
                          {e.dashboard_name}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )} */}

          {/* webReports */}
          <div
            className="sbysp-el"
            onClick={() => setContainer("advertisingReport")}
          >
            <div className="sbysp-el-left">
              <span className="sbysp-el-icon">
                <i class="bi bi-layout-text-window-reverse"></i>
              </span>
              <span>Web Reports</span>
            </div>
          </div>
        </div>

        {
          // access && (
          //     <div style={{
          //         display: "flex",
          //         flexDirection: "column",
          //         padding:"10px 20px"
          //     }} className="accordion" id="accordionExample">
          //         {
          //             access.includes("home_onbording") && (<div className="accordion-item">
          //                 <h2 onClick={() => setContainer("onBoarding")} className="accordion-header" id="headingTwo">
          //                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          //                         Onbording
          //                     </button>
          //                 </h2>
          //                 <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          //                     <div className="accordion-body">
          //                         {
          //                             onBordingMenu.length > 0 && onBordingMenu.map((e) => {
          //                                 return (
          //                                     <div key={e} onClick={() => changeOnBoardingEl(e)} className={`menuElement ${currentOnBoardingEl === e ? "menuElementClicked" : ""}`} >
          //                                         {e}
          //                                     </div>
          //                                 )
          //                             })
          //                         }
          //                     </div>
          //                 </div>
          //             </div>)
          //         }
          //         {
          //             access.includes("home_dashboards") && (
          //                 <div className="accordion-item">
          //                     <h2 onClick={() => setContainer("powerBiDashboard")} className="accordion-header" id="headingOne">
          //                         <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          //                             Dashboards
          //                         </button>
          //                     </h2>
          //                     <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          //                         <div className="accordion-body">
          //                             {
          //                                 dashboardMenuArray.length > 0 && dashboardMenuArray.map((e) => {
          //                                     return (
          //                                         <div key={e._id} onClick={() => changeDashboard(e._id)} className={`menuElement ${currentDashboard === e._id ? "menuElementClicked" : ""}`} >
          //                                             {e.dashboard_name}
          //                                         </div>
          //                                     )
          //                                 })
          //                             }
          //                         </div>
          //                     </div>
          //                 </div>
          //             )
          //         }
          //         {
          //             access.includes("home_reports") && (
          //                 <div className="accordion-item">
          //                     <h2 onClick={() => setContainer("powerBiReports")} className="accordion-header" id="headingThree">
          //                         <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          //                             Reports
          //                         </button>
          //                     </h2>
          //                     <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          //                         <div className="accordion-body">
          //                             {
          //                                 reportsMenuArray.length > 0 && reportsMenuArray.map((e) => {
          //                                     return (
          //                                         <div key={e._id} onClick={() => changeDashboard(e._id)} className={`menuElement ${currentDashboard === e._id ? "menuElementClicked" : ""}`} >
          //                                             {e.dashboard_name}
          //                                         </div>
          //                                     )
          //                                 })
          //                             }
          //                         </div>
          //                     </div>
          //                 </div>
          //             )
          //         }
          //         <div className="accordion-item">
          //             <h2 onClick={() => setContainer("advertisingReport")} className="accordion-header" id="headingFour">
          //                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          //                     Web Dashboards
          //                 </button>
          //             </h2>
          //             <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
          //                 <div className="accordion-body">
          //                     {/* {
          //                         reportsMenuArray.length > 0 && reportsMenuArray.map((e) => {
          //                             return (
          //                                 <div key={e._id} onClick={() => changeDashboard(e._id)} className={`menuElement ${currentDashboard === e._id ? "menuElementClicked" : ""}`} >
          //                                     {e.dashboard_name}
          //                                 </div>
          //                             )
          //                         })
          //                     } */}
          //                 </div>
          //             </div>
          //         </div>
          //     </div>
          // )
        }

        {/* <div className="dashboardsLinksContainer" >
                    <Link to={"/dashboards/advertisingReport"} >Advertising Report</Link>
                </div> */}
        {/* <div className="sidebarComponent" >
                    <div className="sidebarLeft" >
                        <div onClick={() => setContainer("onBoarding")} className={`sidebarIconsContainer ${container === "onBoarding" ? "clicked" : "unClicked"}`} >
                            <i class="bi bi-plus-square sidebarIcons"></i>
                            <div className="sidebarIconsName" >Onboarding</div>
                        </div>
                        <div onClick={() => setContainer("powerBiDashboard")} className={`sidebarIconsContainer ${container === "powerBiDashboard" ? "clicked" : "unClicked"}`} >
                            <i class="bi bi-bar-chart-line sidebarIcons "></i>
                            <div className="sidebarIconsName" >Dashboards</div>
                        </div>
                        <div onClick={() => setContainer("powerBiReports")} className={`sidebarIconsContainer ${container === "powerBiReports" ? "clicked" : "unClicked"}`}>
                            <i class="bi bi-layout-text-sidebar-reverse sidebarIcons"></i>
                            <div className="sidebarIconsName" >Reports</div>
                        </div>
                        <div onClick={() => setContainer("advertisingReport")} className={`sidebarIconsContainer ${container === "advertisingReport" ? "clicked" : "unClicked"}`}>

                            <i class="bi bi-layout-text-window-reverse sidebarIcons"></i>
                            <div className="sidebarIconsName" >Web Reports</div>
                        </div>
                    </div>
                    {
                        container === "onBoarding" && (
                            <div className={`sideberRight`} >
                                {
                                    onBordingMenu.length > 0 && onBordingMenu.map((e) => {
                                        return (
                                            <div key={e} onClick={() => changeOnBoardingEl(e)} className={`sideberRightEl ${currentOnBoardingEl === e ? "sideberRightElClicked" : ""}`} >
                                                {e}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        container === "powerBiDashboard" && (
                            <div className="sideberRight" >
                                {
                                    dashboardMenuArray.length > 0 && dashboardMenuArray.map((e) => {
                                        return (
                                            <div key={e._id} onClick={() => changeDashboard(e._id)} className={`sideberRightEl ${currentDashboard === e._id ? "sideberRightElClicked" : ""}`} >
                                                {e.dashboard_name}
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    }
                    {
                        container === "powerBiReports" && (
                            <div className="sideberRight" >
                                {
                                    reportsMenuArray.length > 0 && reportsMenuArray.map((e) => {
                                        return (
                                            <div key={e._id} onClick={() => setCurrentReport(e._id)} className={`sideberRightEl ${currentReport === e._id ? "sideberRightElClicked" : ""}`} >
                                                {e.dashboard_name}
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    }

                </div> */}
      </DashboardsLeft>
      <DashboardsRight
        setSidebarToggle={setSidebarToggle}
        sidebarToggle={sidebarToggle}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
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
        </div>
      </DashboardsRight>
      <NotificationContainer />
    </div>
  );
};

export default DashboardsContainer;

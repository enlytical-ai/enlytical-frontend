import { Link, useNavigate, Outlet, resolvePath } from "react-router-dom";
import "./Home.css";
import Body from "../headerContentFooterComponent/Body";
import Header from "../headerContentFooterComponent/Header";
import Content from "../headerContentFooterComponent/Content";
import RightHeaderElement from "../headerContentFooterComponent/RightHeaderElement";
import LeftHeaderElement from "../headerContentFooterComponent/LeftHeaderElement";
import EnlyticalLogo from "../../EnlyticalLogo.png";
import { useEffect, useState } from "react";
import DashboardsContainer from "../dashboards/DashboardsContainer";
import axios from "axios";
import { BASE_URL } from "../../appConstants";
import { useDispatch, useSelector } from "react-redux";
import { saveAppParamsData } from "../../redux/appParams/appParamsActions";
const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const appParams = useSelector((state) => state.appParams);
  const user = useSelector((state) => state.user);
  const [brands, setBrands] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // console.log(sidebarOpen);

  useEffect(() => {
    axios
      .get(`${BASE_URL}brand/getAllMyBrands`, {
        headers: {
          token,
        },
      })
      .then(function (response) {
        setBrands(response.data.data.brands);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onBrandChange = (e) => {
    dispatch(saveAppParamsData({ current_brand: e.target.value }));
  };
  return (
    <Body
    // className={sidebarOpen ? "toggle-sidebar" : null}
    >
      <Header
        id="header"
        className="headerNew fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center">
          <a className="logo d-flex align-items-center">
            <img src={EnlyticalLogo} alt="" height={"45px"} />
          </a>

          {/* <button onClick={handleClick}>toggle</button> */}

          {/* <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={handleClick}
          ></i> */}
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
              >
                {/* <img
                  src="/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                /> */}

                <select
                  onChange={onBrandChange}
                  className="form-select form-select-m d-none d-md-block dropdown-toggle ps-2"
                  aria-label=".form-select-sm example"
                >
                  {brands.length > 0 &&
                    brands.map((brand, i) => {
                      return (
                        <option
                          selected={
                            appParams.current_brans === brand._id ? true : false
                          }
                          key={i}
                          value={brand._id}
                        >
                          {brand.brand_name}
                        </option>
                      );
                    })}
                </select>
              </a>
            </li>
            <div
              className="logoutButtonContainer"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                display: "flex",
              }}
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
                <i>Hi,</i>
                <i style={{ fontWeight: "bolder" }}>{user.first_name}</i>
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/user/login");
                }}
                type="button"
                className="btn btn-primary btn-m"
              >
                Logout
              </button>
            </div>
          </ul>
        </nav>
      </Header>
      {/* <Content className="authContent">
        <DashboardsContainer sidebarOpen={sidebarOpen} />
      </Content> */}
      <div className="mainContainerNew">
        <DashboardsContainer sidebarOpen={sidebarOpen} />
      </div>
    </Body>
  );
};

export default Home;

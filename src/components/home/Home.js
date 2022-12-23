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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Button } from "bootstrap";

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const appParams = useSelector((state) => state.appParams);
  const user = useSelector((state) => state.user);
  const [brands, setBrands] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);
  // const [notification, setNotification] = useState(false);

  // const handleNotification = () => {
  //   setNotification(!notification);
  // };

  const handleClickSide = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl("");
  };

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
    <Body className={sidebarOpen ? "toggle-sidebar" : ""}>
      <Header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center">
          <a className="logo d-flex align-items-center">
            <img src={EnlyticalLogo} alt="" height={"45px"} />
          </a>
          {/* toggle button for sidebar */}
          {/* <i
            className={`bi bi-chevron-${
              sidebarOpen ? "right" : "left"
            } ms-auto toggle-sidebar-btn`}
            onClick={handleClick}
          ></i> */}
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text"></i>
              <span className="badge bg-success badge-number">3</span>
            </a>
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
              >
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
              style={{
                padding: "20px",
                marginRight: "20px",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={handleClick}
              >
                <Avatar alt="" src="/static/images/avatar/1.jpg" />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.first_name}
                </span>
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>My Brands</MenuItem>
                <MenuItem>
                  <span
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/user/login");
                    }}
                  >
                    Logout
                  </span>
                </MenuItem>
              </Menu>
            </div>
            {/* <div
              className="logoutButtonContainer"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                display: "flex",
              }}
            >
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
            </div> */}
          </ul>
        </nav>
      </Header>
      <Content className="authContent">
        <DashboardsContainer
          sidebarOpen={sidebarOpen}
          click={handleClickSide}
        />
      </Content>
    </Body>
  );
};

export default Home;

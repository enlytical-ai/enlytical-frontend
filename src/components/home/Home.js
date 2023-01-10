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
import MessageIcon from "@mui/icons-material/Message";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { HEADER } from "../../appUiConatsnts";

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const appParams = useSelector((state) => state.appParams);
  const user = useSelector((state) => state.user);

  const [brands, setBrands] = useState([]);
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl("");
  };

  useEffect(() => {
    // axios
    //   .get(`${BASE_URL}brand/getAllMyBrands`, {
    //     headers: {
    //       token,
    //     },
    //   })
    //   .then(function (response) {
    //     setBrands(response.data.data.brands);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    const { brand_array } = appParams;
    setBrands(brand_array);
  }, []);

  const onBrandChange = (e) => {
    const [current_brand] = brands.filter(brand => brand._id === e.target.value);
    dispatch(saveAppParamsData({ current_brand }));
  };

  //To get the height for grid
  const [containerHeight, setContainerHeight] = useState();
  useEffect(() => {
    const height = window.innerHeight;
    const netHeight = height - HEADER.height;
    setContainerHeight(netHeight);
  }, []);
  window.addEventListener("resize", () => {
    const height = window.innerHeight;
    const netHeight = height - HEADER.height;
    setContainerHeight(netHeight);
  });
  //

  return (
    <Body className="noAuthBody">
      <Header className="authHeader">
        <LeftHeaderElement className="leftHeaderElement">
          <div style={{ marginLeft: "10px" }}>
            <img height={"45px"} src={EnlyticalLogo} />
          </div>
        </LeftHeaderElement>
        <RightHeaderElement className="authHeaderRight">
          <div className="notification-icon">
            <NotificationsActiveIcon />
          </div>
          <div className="message-icon">
            <MessageIcon />
          </div>

          <select
            onChange={onBrandChange}
            className="form-select form-select-sm"
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

          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
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
              {/* <MenuItem>
                <span
                  style={{
                    fontWeight: "bolder",
                  }}
                >
                  <i>Hi, </i>
                  <i>{user.first_name}</i>
                </span>
              </MenuItem>
              <hr /> */}
              <MenuItem>Profile</MenuItem>
              <MenuItem>
                <span
                  onClick={() => {
                    //localStorage.removeItem("token");
                    navigate("/home/dashboards");
                  }}
                >
                  Dashboards
                </span>
              </MenuItem>
              <MenuItem>
                <span
                  onClick={() => {
                    //localStorage.removeItem("token");
                    navigate("/home/admin");
                  }}
                >
                  Admin
                </span>
              </MenuItem>
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

          {/* <Link to={"/home"} > Home </Link> */}
        </RightHeaderElement>
      </Header>
      <Content style={{ height: containerHeight }} className="authContent">
        <Outlet />
      </Content>
    </Body>
  );
};

export default Home;

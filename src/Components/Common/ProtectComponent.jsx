import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavDropDownDetails } from "../../redux/reducers/NavDropdownReducer";
import footerlogo from "../../../src/assets/settings/footerlogo.png";
import "../../pages/Admin/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useGetUerProfileQuery } from "../../service/apiServices";
import { useEffect } from "react";
import { setUserDetails } from "../../redux/reducers/UserReducer";
import Loader from "../../heplers/Loaders/Loader";

const ProtectComponent = (props) => {

  if (props.userAuthData.isLoading) {
    return <Loader />
  } else if (props.userAuthData.error) {
    return <></>;
  }
  else if (props.userAuthData.data) {
    const userAuthData = props.userAuthData.data.data.user;
    const isAdmin = props.userAuthData.data.data.user.Role==="Admin";
    //console.log("isadmin", isAdmin)
    const dashboradprperty = props.dashboard;
    const isAuth = userAuthData.dashboard[dashboradprperty];
    //console.log("isAuth",userAuthData.dashboard)
    if (isAdmin) {
      return props.children;
    } else if (!isAdmin && isAuth) {
      return props.children;
    }
    else {
      if (props.isDashboard) {
        return (<></>)
      } else {
        return (
          <h1 className="text-danger text-center">You are not authorized to access this page</h1>)
      }
    }
  }
};

export default ProtectComponent;

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

import HeaderWithLogin from './journey/HeaderWithLogin';
import FooterWithLogin from './journey/FooterWithLogin';
import { useDispatch, useSelector } from 'react-redux';

function Layout() {
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const checklogin = customerDetails?.token;

  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    window.clevertap?.event.push("lje_logout", {
      "message": "User logged out"
    });
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    if (checklogin) {
      setLogin(true);
    } else {
      handleLogout();
      navigate('/apply-now');
    }
  }, [checklogin, navigate]);

  return login ? (
    <div className="wrapper">
      <div id="snackbar"></div>
      <header>
        <HeaderWithLogin />
      </header>
      <main>
        <Outlet />
        <FooterWithLogin />
      </main>

    </div>
  ) : null
}

export default Layout;

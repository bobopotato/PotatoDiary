import React, { useState, useEffect, memo } from "react";
import "./SideMenu.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgLogOff } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBarData from "./SideBarData";
import BasePage from "../../components/basePage/BasePage";
import { diaryLogo } from "../../images/image";
import AuthController from "../../api/controller/AuthController";
import useAuth from "../../hooks/useAuth";

const SideMenu = ({ children, selectedItemIndex = 0 }) => {
  const currentPath = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isExpandSideMenu, setIsExpandSideMenu] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(selectedItemIndex);

  const toggleSideMenu = () => {
    return setIsExpandSideMenu((prev) => !prev);
  };

  useEffect(() => {
    const currentRoute = window.location.href;
    if (currentPath.pathname === "/") {
      return setSelectedIndex(0);
    }
    for (let i = 1; i < SideBarData.length; i++) {
      if (currentRoute.includes(SideBarData[i].link)) {
        return setSelectedIndex(i);
      }
    }
  }, [currentPath]);

  useEffect(() => {
    return isExpandSideMenu
      ? document.documentElement.style.setProperty(
          "--side-menu-width",
          "var(--expanded-side-menu-width"
        )
      : document.documentElement.style.setProperty(
          "--side-menu-width",
          "var(--collapsed-side-menu-width"
        );
  }, [isExpandSideMenu]);

  const userLogOut = AuthController.UserLogout();
  const handleLogOut = async () => {
    try {
      await userLogOut();
      setAuth(null);
      navigate("/", { replace: true });
      alert('Log Out Successfully')
    }
    catch(err) {
      alert(err)
    }
  }

  // const userLogOut = AuthController.UserLogout();

  return (
    <>
      <div className="menu-wrapper">
        <div className="nav-wrapper">
          <div className="navbar-wrapper">
            <div className="navbar-container">
              <div
                className={`hamburger-menu ${isExpandSideMenu ? "expand" : ""}`}
                onClick={toggleSideMenu}
              >
                <GiHamburgerMenu className="menu-icon" />
              </div>
              <div className="diary-logo-container">
                <img src={diaryLogo} />
                <h2>Potato Diary</h2>
              </div>
              <CgLogOff
                className="menu-icon"
                onClick={() => {
                  handleLogOut();
                }}
              />
            </div>
          </div>
          <div
            className={`side-menu-wrapper ${isExpandSideMenu ? "expand" : ""}`}
          >
            <div className="side-menu-list">
              {SideBarData.map((data, index) => {
                return (
                  <MenuItem
                    item={data}
                    isExpanded={isExpandSideMenu}
                    index={index}
                    selectedIndex={selectedIndex}
                    key={data.title}
                    setIndex={() => {
                      return setSelectedIndex(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <BasePage>{children}</BasePage>
      </div>
    </>
  );
};

const MenuItem = ({ item, isExpanded, index, selectedIndex, setIndex }) => {
  const selected = index === selectedIndex;

  return (
    <Link to={item.link} onClick={setIndex}>
      <div className={`menu-item-container ${selected ? "selected" : ""}`}>
        <div className="menu-item-icon">{item.icon}</div>
        <div className={`menu-item-title ${isExpanded ? "" : "expand"}`}>
          {item.title}
        </div>
      </div>
    </Link>
  );
};

export default memo(SideMenu);

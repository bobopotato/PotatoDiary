import React, { memo, useEffect, useState } from "react";
import "./BasePage.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SideBarData from "../sideMenu/SideBarData";
import { useLocation, Link } from "react-router-dom";

const BasePage = ({ children }) => {
  const currentPath = useLocation();
  const [breadcrumbs, setBreadCrumbs] = useState([]);

  useEffect(() => {
    try {
      let paths = currentPath?.pathname.split("/");
      paths = paths.slice(1, paths.length);
      let firstLink = "";
      const resultPaths = [];

      for (let path of paths) {
        for (let data of SideBarData) {
          if (data.link.includes(path)) {
            const copyData = Object.assign({}, data);
            firstLink += `/${copyData.link}`;
            copyData.link = firstLink;
            resultPaths.push(copyData);
            break;
          } else {
            const childData =
              data && data.children.find((child) => child.link.includes(path));
            if (childData) {
              const copyData = Object.assign({}, childData);
              firstLink += `/${copyData.link}`;
              copyData.link = firstLink;
              resultPaths.push(copyData);
              break;
            }
          }
        }
      }
      setBreadCrumbs(resultPaths);
    } catch (err) {
      console.log(err);
    }
  }, [currentPath]);

  return (
    <div className="base-page-wrapper">
      <div className="base-page-container">
        <Breadcrumb>
          <Breadcrumb>
            {breadcrumbs.map((breadcrumb, index) => {
              return (
                <Breadcrumb.Item active={index === breadcrumbs.length - 1} href={breadcrumb.link}  key={breadcrumb.title}>
                  {breadcrumb.title}
                </Breadcrumb.Item>
              );
              return (
                <Link to={breadcrumb.link} key={breadcrumb.title}>
                  {/* {breadcrumb.title} */}
                </Link>
              );
            })}
            {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
          </Breadcrumb>
        </Breadcrumb>
        <div className="base-page-children-container">{children}</div>
      </div>
    </div>
  );
};

export default memo(BasePage);

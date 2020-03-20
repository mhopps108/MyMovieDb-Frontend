import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { Drawer } from "antd";
import { List } from "./List";
import "antd/dist/antd.css";

function ListsDrawer({ visible, setVisible }) {
  const handelSelect = () => {
    setVisible(false);
  };

  return (
    <div className="drawer-container">
      <Drawer
        title="Movies"
        placement={"right"}
        closable={true}
        visible={visible}
        onClose={visable => setVisible(!visable)}
        width={"200"}
      >
        <div
          style={{
            listStyleType: "none",
            padding: "0px 5px",
            margin: "0px",
            backgroundColor: "white"
          }}
        >
          <div style={{ paddingBottom: "10px" }}>
            <h3>
              <Link to="/search">Search</Link>
            </h3>
            <h3>
              <Link to="/about">Discover</Link>
            </h3>
            <h3>
              <Link to="/about">Release Dates</Link>
            </h3>
            <h3>
              <Link to="/lists">Lists</Link>
            </h3>
          </div>
          <hr />
          <div style={{ paddingBottom: "10px" }}>
            <h3>{"TMDb"}</h3>
            <div onClick={handelSelect}>
              <Link to={`/lists/tmdb-popular`}>Popular</Link>
            </div>
            <div onClick={handelSelect}>
              <Link to={`/lists/tmdb-top-rated`}>Top Rated</Link>
            </div>
            <div onClick={handelSelect}>
              <Link to={`/lists/tmdb-now-playing`}>Now Playing</Link>
            </div>
            <div onClick={handelSelect}>
              <Link to={`/lists/tmdb-upcoming`}>Upcoming</Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export { ListsDrawer };

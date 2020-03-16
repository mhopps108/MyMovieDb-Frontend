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

function ListsDrawer({ visible, setVisible, match }) {
  // let match = useRouteMatch();

  useEffect(() => {
    console.log(`match - (Lists)`);
    console.log(match);
  }, [match]);

  const handelSelect = () => {
    setVisible(false);
  };

  // <ul
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-around",
  //             alignItems: "center ",
  //             listStyleType: "none",
  //             padding: "0px 5px",
  //             margin: "0px",
  //             backgroundColor: "white"
  //           }}
  //         >

  return (
    <div className="drawer-container">
      <Drawer
        title="Movies"
        placement={"right"}
        closable={true}
        visible={visible}
        onClose={visable => setVisible(!visable)}
        // height={"350"}
        width={"250"}
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
              <Link to="/about">Search</Link>
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
        {/* <ul>
          
          <li>
            <Link to={`${match.url}/tmdb-popular`}>Popular</Link>
          </li>
          <li>
            <Link to={`${match.url}/`}></Link>
          </li>
          <li>
            <Link to={`${match.url}/`}></Link>
          </li>
          <li>
            <Link to={`${match.url}/`}></Link>
          </li>
          <li>
            <Link to={`${match.url}`}>Others (not linked)</Link>
          </li>
        </ul> */}
      </Drawer>

      {/* <Switch>
        <Route path={`${match.path}/:listSlug`}>
          <List />
        </Route>
        <Route path={match.path}>
          <h3>Please select a list.</h3>
        </Route>
      </Switch> */}
    </div>
  );
}

export { ListsDrawer };

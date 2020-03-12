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
  let match = useRouteMatch();

  useEffect(() => {
    console.log(`match - (Lists)`);
    console.log(match);
  }, [match]);

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
        <h4>{"TMDb List"}</h4>
        <ul>
          <li>
            <Link to={`${match.url}/me-my-list`}>My List Test</Link>
          </li>
          <li>
            <Link to={`${match.url}/tmdb-popular`}>Popular</Link>
          </li>
          <li>
            <Link to={`${match.url}/tmdb-top-rated`}>Top Rated</Link>
          </li>
          <li>
            <Link to={`${match.url}/tmdb-now-playing`}>Now Playing</Link>
          </li>
          <li>
            <Link to={`${match.url}/tmdb-upcoming`}>Upcoming</Link>
          </li>
          <li>
            <Link to={`${match.url}`}>Others (not linked)</Link>
          </li>
        </ul>
      </Drawer>

      <Switch>
        <Route path={`${match.path}/:listSlug`}>
          <List />
        </Route>
        <Route path={match.path}>
          <h3>Please select a list.</h3>
        </Route>
      </Switch>
    </div>
  );
}

export { ListsDrawer };

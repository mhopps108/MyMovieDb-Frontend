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

import { Affix } from "antd";
// import { MovieList, MovieSectionList } from "./MovieList";
// import { useDataApi } from "./useDataApi";
// import MovieListItem from "./MovieListItem";
import { List } from "./List";
import "antd/dist/antd.css";

const linkStyle = {
  color: "#3f4c6b"
  // border: "solid black 1px"
  // padding: "2px 5px"
};

function Lists() {
  let match = useRouteMatch();

  useEffect(() => {
    console.log(`match - (Lists)`);
    console.log(match);
  }, [match]);

  return (
    <div style={{ borderBottom: "solid black 1px" }}>
      {/* <hr /> */}
      <ul
        style={{
          // display: "flex",
          // justifyContent: "space-around",
          // alignItems: "center ",
          listStyleType: "none",
          padding: "5px 5px",
          backgroundColor: "white",
          overflow: "auto",
          whiteSpace: "nowrap"
        }}
      >
        <li style={{ display: "inline-block", padding: "0px 10px" }}>
          <Link to={`${match.url}/tmdb-popular`} style={linkStyle}>
            Popular
          </Link>
        </li>
        <li style={{ display: "inline-block", padding: "0px 10px" }}>
          <Link to={`${match.url}/tmdb-top-rated`} style={linkStyle}>
            Top Rated
          </Link>
        </li>
        <li style={{ display: "inline-block", padding: "0px 10px" }}>
          <Link to={`${match.url}/tmdb-now-playing`} style={linkStyle}>
            Now Playing
          </Link>
        </li>
        <li style={{ display: "inline-block", padding: "0px 10px" }}>
          <Link to={`${match.url}/tmdb-upcoming`} style={linkStyle}>
            Upcoming
          </Link>
        </li>
        <li style={{ display: "inline-block", padding: "0px 10px" }}>
          <Link to={`${match.url}`} style={linkStyle}>
            FakeLink (not linked)
          </Link>
        </li>
      </ul>

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

export { Lists };

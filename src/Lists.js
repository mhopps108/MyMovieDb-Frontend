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

function Lists() {
  let match = useRouteMatch();

  useEffect(() => {
    console.log(`match - (Lists)`);
    console.log(match);
  }, [match]);

  return (
    <div>
      <Affix offsetTop={0}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center ",
            padding: "5px 10px",
            backgroundColor: "white"
          }}
        >
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              padding: 0,
              margin: 0
            }}
          >
            My List Name
            {/* {mylist.name} - {data.movie_count} */}
          </p>
        </div>
      </Affix>

      <ul>
        <li>
          <Link to={`${match.url}/me-my-list`}>My List Test</Link>
        </li>
        <li>
          <Link to={`${match.url}/`}>Others (not linked)</Link>
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

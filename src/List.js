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

import { useDataApi } from "./useDataApi";
import MovieListItem from "./MovieListItem";
import "antd/dist/antd.css";

function List() {
  let { listSlug } = useParams();

  // const mylist = {
  //   url: "https://www.matthewhopps.com/api/list/me-my-list/",
  //   // url: "http://localhost:8000/api/list/me-my-list/",
  //   path: "/list/me-my-list",
  //   name: "My List"
  // };
  const listUrl = `https://www.matthewhopps.com/api/list/${listSlug}/`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;

  useEffect(() => {
    setUrl(listUrl);
  }, [listSlug, listUrl, setUrl]);

  useEffect(() => {
    console.log(`List data`);
    console.log(state);
    console.log(`useParams - (List)`);
    console.log(listSlug);
  }, [state, listSlug]);

  return (
    <div>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {data &&
        (data.movielistitems || []).map(movie => (
          <MovieListItem key={movie.movie.imdb_id} movie={movie.movie} />
        ))}
    </div>
  );
}

export { List };

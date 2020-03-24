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

import { Affix, Row } from "antd";
import { useDataApi } from "./useDataApi";
import MovieListItem from "./MovieListItem";
import "antd/dist/antd.css";

// LIST STATE
// isLoading: false
// isError: false
// data: Object
// name: "Top Rated"
// slug: "tmdb-top-rated"
// url: "https://api.themoviedb.org/3/movie/top_rated"
// source: "TMDb"
// created_at: "2020-03-11T09:23:36.899391"
// movie_count: 99
// last_updated: "2020-03-11T16:40:08.304355"
// movielistitems: Array[99]

function List() {
  let { listSlug } = useParams();

  const listUrl = `https://www.matthewhopps.com/api/list/${listSlug}/`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  const { name, source, movie_count, movielistitems } = data;

  useEffect(() => {
    setUrl(listUrl);
  }, [listSlug, listUrl, setUrl]);

  useEffect(() => {
    console.log(`List state data ${listSlug}`);
    console.log(state);
  }, [state, listSlug]);

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(0deg,#333 0%, #111 90%)",
        color: "white"
      }}
    >
      <div className="row sticky-top">
        <div
          className="col-12 d-flex justify-content-between align-items-center py-1 px-2 mb-2"
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            backgroundColor: "#efefef",
            color: "#14181c",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          <div>
            {source} • {name}
          </div>
          <div>#{movie_count}</div>
        </div>
      </div>

      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="row mx-auto">
          {(movielistitems || []).map(movie => (
            <div className="col-xs-12 col-md-6 p-1 mb-2">
              <MovieListItem key={movie.movie.imdb_id} movie={movie.movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { List };

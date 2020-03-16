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
    console.log(`List state data`);
    console.log(state);
    console.log(`useParams - (List)`);
    console.log(listSlug);
  }, [state, listSlug]);

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
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              padding: "0 5px",
              margin: 0
            }}
          >
            {source} {name}
          </span>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              padding: "0 5px",
              margin: 0
            }}
          >
            {movie_count}
          </span>
        </div>
      </Affix>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="movie-list-wrapper mx-auto">
          <div style={{ background: "", padding: "10px 10px 40px 10px" }}>
            <Row gutter={[16, 24]}>
              {(movielistitems || []).map(movie => (
                <MovieListItem key={movie.movie.imdb_id} movie={movie.movie} />
              ))}
            </Row>
          </div>
        </div>
      )}
      {/* {!isLoading &&
        data &&
        (data.movielistitems || []).map(movie => (
          <MovieListItem key={movie.movie.imdb_id} movie={movie.movie} />
        ))} */}
    </div>
  );
}

export { List };

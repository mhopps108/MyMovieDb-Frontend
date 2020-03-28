import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { useDataApi } from "./useDataApi";
import MovieListItem from "./MovieListItem";

function ReleaseDates() {
  // let { listSlug } = useParams();
  const startDate = "2020-03-01";
  const endDate = "2020-04-01";
  const listUrl = `https://matthewhopps.com/api/movie/?orderby=digital_release&digital_release__gte=${startDate}&digital_release__lt=${endDate}`;
  // const listUrl = `https://www.matthewhopps.com/api/list/${listSlug}/`;
  // const [state, setUrl] = useDataApi(listUrl, []);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { name, source, movie_count, movielistitems } = data;
  const { count, results } = data;

  useEffect(() => {
    setUrl(listUrl);
  }, [listUrl, setUrl]);

  useEffect(() => {
    console.log(`Release Date state data`);
    console.log(state);
  }, [state]);

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
          <div>Release Dates</div>
          <div>#{count}</div>
        </div>
      </div>

      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="row mx-auto">
          {(results || []).map(movie => (
            <div className="col-xs-12 col-md-6 p-1 mb-2">
              <MovieListItem key={movie.imdb_id} movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ReleaseDates };

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

import { Row } from "antd";
import { useDataApi } from "./useDataApi";
import "antd/dist/antd.css";

const linkStyle = {
  color: "#3f4c6b"
  // border: "solid black 1px"
  // padding: "2px 5px"
};

// name: "Top Rated"
// slug: "tmdb-top-rated"
// url: "https://api.themoviedb.org/3/movie/top_rated"
// source: "TMDb"
// created_at: "2020-03-11T09:23:36.899391"
// movie_count: 99
// last_updated: "2020-03-11T16:40:08.304355"
// movielistitems: Array[99]

function ListItem({ list }) {
  const { name, slug, source, movie_count, movielistitems } = list;
  console.log(`list`);
  console.log(list);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px"
        }}
      >
        <h2>{name}</h2>
        <h6 style={{ padding: "0px 5px", fontSize: "0.7rem" }}>view all></h6>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {movielistitems.slice(0, 5).map(movie => {
          return (
            <div
              style={{
                display: "inline-block",
                minWidth: "80px",
                height: "120px",
                backgroundImage: `url(${movie.movie.poster_url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: "3px"
              }}
            />
          );
        })}
      </div>
    </>
  );
}

function Lists() {
  const listUrl = `https://www.matthewhopps.com/api/list`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  const { results } = data;

  useEffect(() => {
    console.log(`List state data`);
    console.log(state);
    setUrl(listUrl);
  }, [listUrl, setUrl, state]);

  return (
    <div style={{ borderBottom: "solid black 1px" }}>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div>
          <div style={{ background: "", padding: "10px 10px 40px 10px" }}>
            <Row gutter={[16, 24]}>
              {(results || []).map(list => (
                <ListItem key={list.slug} list={list} />
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export { Lists };

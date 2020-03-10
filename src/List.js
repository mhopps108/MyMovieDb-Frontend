import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";

import { Affix } from "antd";
// import { MovieList, MovieSectionList } from "./MovieList";
import { useDataApi } from "./useDataApi";
import "antd/dist/antd.css";

function List() {
  const mylist = {
    url: "https://www.matthewhopps.com/api/list/me-my-list/",
    // url: "http://localhost:8000/api/list/me-my-list/",
    path: "/list/me-my-list",
    name: "My List"
  };

  const [state, setUrl] = useDataApi(mylist.url, []);
  const { data, isLoading, isError } = state;

  // useEffect(() => {
  //   setUrl(mylist);
  // }, [mylist, setUrl]);

  useEffect(() => {
    // console.log(mylist.url);
    console.log(`List data`);
    console.log(state);
  }, [state]);

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
            {mylist.name}
          </p>
        </div>
      </Affix>
      {isError && <p>Error</p>}
      {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <p>Movies</p>
        // <MovieSectionList movies={movies} />
      )}
    </div>
  );
}

export { List };

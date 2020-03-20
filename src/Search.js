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

import { Input, Affix, Row } from "antd";
import { useDataApi } from "./useDataApi";
import MovieListItem from "./MovieListItem";
import "antd/dist/antd.css";
// import { baseUrl } from "./api";
import baseUrl from "./api";

function Search() {
  const [titleQuery, setTitleQuery] = useState("");
  // const searchUrl = `https://www.matthewhopps.com/api/search/?search=${titleQuery}/`;

  const searchUrl = `${baseUrl}/search/?search=${titleQuery}`;
  // const [state, setUrl] = useDataApi("", []);
  const [state, setUrl] = useDataApi();
  const { data, isLoading, isError } = state;
  // const { count, results } = data;
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    if (titleQuery) {
      setUrl(searchUrl);
    }
  }, [titleQuery, searchUrl, setUrl]);

  useEffect(() => {
    if (data) {
      setFoundMovies(data.results || []);
    }
  }, [data, setFoundMovies]);

  const onChange = e => {
    const currentValue = e.target.value;
    console.log(`onChange: ${currentValue}`);
    if (currentValue) {
      setFoundMovies([]);
    }
  };

  const onSearch = (value, event) => {
    setFoundMovies([]);
    console.log(`value: ${value}`);
    console.log(`event: ${event}`);
    setTitleQuery(value);
  };

  return (
    <div>
      <Affix offsetTop={0}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center ",
            padding: "5px 10px",
            marginBottom: "10px",
            backgroundColor: "white",
            // boxShadow: "0 2px 2px -2px rgba(0,0,0,0.3)"
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <Input.Search
            placeholder="input search loading deault"
            onChange={onChange}
            onSearch={onSearch}
            loading={isLoading}
            allowClear={titleQuery !== ""}
            style={{ width: "100%" }}
          />
        </div>
      </Affix>
      <div>
        {foundMovies && (
          <h3>
            {titleQuery} {data && data.count}
          </h3>
        )}
      </div>

      {isError && titleQuery && <p>Error: {isError}</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="">
          <div style={{ background: "", padding: "10px 10px 40px 10px" }}>
            <Row gutter={[16, 24]}>
              {(foundMovies || []).map(movie => (
                <MovieListItem key={movie.imdb_id} movie={movie} />
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export { Search };

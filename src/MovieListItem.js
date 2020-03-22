import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// imdb_id: "tt2802144"
// title: "Kingsman: The Secret Service"
// year: 2014
// runtime: 129
// genres: Array[4]
// imdb_rating_avg: "7.7"
// imdb_rating_count: 565308
// certification: "R"
// poster_url: "https://image.tmdb.org/t/p/w154/8x7ej0LnHdKUqilNNJXYOeyB6L9.jpg"
// slug: "kingsman-the-secret-service-tt2802144"
// detail_url: "kingsman-the-secret-service-tt2802144"

function MovieListItem({ movie }) {
  const {
    imdb_id,
    title,
    year,
    runtime,
    certification,
    imdb_rating_avg,
    imdb_rating_count,
    genres,
    poster_url
  } = movie;

  return (
    <>
      <div
        className="d-flex p-1"
        style={{
          background: "#efefef",
          height: "150px",
          maxWidth: "350px",
          borderRadius: "4px",
          border: "1px solid rgba(0,0,0,0.2)",
          // boxShadow: "0 2px 2px 0px rgba(0,0,0,0.25)"
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2)"
        }}
      >
        <div
          style={{
            minWidth: "92px",
            // height: "138px",
            height: "100%",
            backgroundImage: `url(${poster_url})`,
            // objectFit: "contain"
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "4px"
          }}
        />
        <div className="w-100 px-3 pt-2">
          <Link to={`/movie/${imdb_id}`}>
            <h5 style={{ color: "text-grey" }}>{title}</h5>
          </Link>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-1">{year}</p>
              <p className="mb-1">{runtime}m</p>
              <p className="mb-1">{certification}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">            
              <p className="mb-1">{imdb_rating_avg}</p>
              <p className="mb-1">{imdb_rating_count} votes</p>
              </div>              
            <p className="mb-1">{genres && genres.join(", ")}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieListItem;

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button } from "antd";

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
  console.log("a movie");
  console.log(movie);

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
    <Col
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      lg={{ span: 8 }}
      style={{ paddingBottom: "0px" }}
    >
      <div
        style={{
          background: "white",
          padding: "6px",
          height: "150px",
          // maxWidth: "300px",
          display: "flex",
          borderRadius: "5px",
          border: "1px solid rgba(0,0,0,0.25)",
          // boxShadow: "3px 3px 3px 0px rgba(0,0,0,0.25)"
          boxShadow: "0 2px 4px 2px rgba(0,0,0,.25)"
        }}
      >
        <div
          style={{
            minWidth: "92px",
            height: "138px",
            // height: "auto",
            backgroundImage: `url(${poster_url})`,
            // objectFit: "contain"
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "5px"
          }}
        >
          {/* <img
            style={{
              width: "100%",
              height: "100%",
              // objectFit: "contain",
              borderRadius: "5px"
            }}
            src={imgUrl}
            alt={"no-poster"}
          /> */}
        </div>
        <div style={{ paddingLeft: "1rem", paddingTop: "0.25rem" }}>
          <h5 style={{ fontSize: "1rem" }}>{title}</h5>
          <div>
            <p style={{ margin: 0 }}>
              {year} • {runtime} • {certification}
            </p>
            <p style={{ margin: 0 }}>
              {imdb_rating_avg} / 10 ({imdb_rating_count} votes)
            </p>
            <p style={{ margin: 0 }}>{genres.join(", ")}</p>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default MovieListItem;

// const {
//     imdb_id, - {runtime} - {certification}
//     title,
//     year,
//     runtime,
//     certification,
//     imdb_rating_avg,
//     imdb_rating_count,
//     genres,
//     poster_url,
//   } = movie;
import React from "react";
import { Link } from "react-router-dom";

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
        className="d-flex p-2"
        style={{
          background: "#efefef",
          height: "150px",
          minWidth: "350px",
          maxWidth: "400px",
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
            // objectFit: "contain",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "3px"
          }}
        />
        <div className="w-100 px-3 pt-1">
          <Link to={`/movie/${imdb_id}`}>
            <h6
              style={{
                fontSize: "1.15rem",
                color: "#555",
                overflow: "hidden",
                lineHeight: "1.2em",
                maxHeight: "2.4em",
                whiteSpace: "normal"
              }}
            >
              {title}
            </h6>
          </Link>
          <div>
            <div className="w-75 d-flex justify-content-between align-items-center">
              <p className="mb-1">{year}</p>
              <p className="mb-1">•</p>
              <p className="mb-1">{runtime}m</p>
              <p className="mb-1">•</p>
              <p className="mb-1">{certification}</p>
            </div>
            <div className="w-75 d-flex justify-content-between align-items-center">
              <p className="m-0">
                {imdb_rating_avg}
                <small>/10</small>
              </p>
              <p className="mb-0">•</p>
              <p className="m-0">{imdb_rating_count} votes</p>
            </div>
            <p className="m-0">{genres && genres.join(" • ")}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieListItem;

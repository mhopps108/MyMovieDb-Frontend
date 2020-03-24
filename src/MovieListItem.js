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
          background: "#fefefe",
          height: "150px",
          minWidth: "350px",
          maxWidth: "400px",
          borderRadius: "4px",
          border: "1px solid rgba(0,0,0,0.2)"
          // boxShadow: "0 2px 2px 0px rgba(0,0,0,0.25)"
          // boxShadow:
          // "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2)"
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
            borderRadius: "4px",
            border: "1px solid rgba(0,0,0,0.2)"
          }}
        />
        <div className="w-100 pl-3 pt-1 d-flex flex-column justify-content-start">
          <Link to={`/movie/${imdb_id}`}>
            <h6
              className="my-2"
              style={{
                fontSize: "1.2rem",
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
          <div style={{ fontSize: "0.8rem", color: "grey" }}>
            <div className="w-100 d-flex">
              <p className="mb-1 pr-3">{year}</p>
              {/* <p className="mb-1">•</p> */}
              <p className="mb-1 pr-3">
                {runtime}
                <small> mins</small>
              </p>
              <p className="mb-1 pr-3">{certification}</p>
              <p className="mb-1">
                {imdb_rating_avg}
                <small> /10</small>
              </p>
            </div>
            <div className="d-flex">
              {genres &&
                genres.map(genre => {
                  return (
                    <div className="pr-3">
                      {/* <span class="badge badge-light">{genre}</span> */}
                      {genre}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieListItem;

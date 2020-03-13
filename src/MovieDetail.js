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
import "antd/dist/antd.css";

function MovieDetail() {
  let { imdbId } = useParams();
  // tt3794354
  const movieUrl = `https://www.matthewhopps.com/api/movie/${imdbId}/`;
  const [state, setUrl] = useDataApi(movieUrl, []);
  const { data, isLoading, isError } = state;

  function mapObject(object, callback) {
    return Object.keys(object).map(function(key) {
      return callback(key, object[key]);
    });
  }

  useEffect(() => {
    setUrl(movieUrl);
  }, [imdbId, movieUrl, setUrl]);

  useEffect(() => {
    console.log(`State - (MovieDetail)`);
    console.log(state);
    console.log(`useParams - (MovieDetail)`);
    console.log(imdbId);
  }, [state, imdbId]);

  return (
    <div>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="movie-list-wrapper mx-auto">
          <div style={{ background: "", padding: "10px 10px 40px 10px" }}>
            <div
              style={{
                background: "white",
                // padding: "6px",
                height: "150px",
                // maxWidth: "300px",
                display: "flex",
                // borderRadius: "5px",
                border: "1px solid rgba(0,0,0,0.25)"
                // boxShadow: "3px 3px 3px 0px rgba(0,0,0,0.25)"
                // boxShadow: "0 2px 4px 2px rgba(0,0,0,.25)"
              }}
            >
              <div
                style={{
                  minWidth: "100%",
                  height: "auto",
                  // height: "auto",
                  backgroundImage: `url(${data.backdrop_url})`,
                  // objectFit: "contain"
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  // borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <h1
                  style={{
                    alignSelf: "flex-end",
                    color: "white",
                    textShadow: "2px 2px 4px #000000"
                  }}
                >
                  {data.title}
                </h1>
              </div>
            </div>

            <p>MovieDetail - {imdbId}</p>
            <p>
              {mapObject(data, function(key, value) {
                return (
                  <div>
                    <b>{key}</b>: {value}
                  </div>
                );
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
// "imdb_id": "tt3794354",
// "tmdb_id": "454626",
// "slug": "sonic-the-hedgehog-tt3794354",
// "title": "Sonic the Hedgehog",
// "year": 2020,
// "runtime": 99,
// "genres": [
//     "Action",
//     "Science Fiction",
//     "Comedy",
//     "Family"
// ],
// "certification": "PG",
// "imdb_rating_avg": "6.8",
// "imdb_rating_count": 23181,
// "tmdb_rating_count": 778,
// "tmdb_rating_avg": "7.2",
// "is_english": true,
// "spoken_languages": [
//     "en-English"
// ],
// "tagline": "A Whole New Speed of Hero",
// "overview": "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
// "budget": 85000000,
// "revenue": 265493652,
// "theatrical_release": "2020-02-14",
// "digital_release": null,
// "physical_release": null,
// "tv_release": null,
// "poster_url": "https://image.tmdb.org/t/p/w154/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
// "backdrop_url": "https://image.tmdb.org/t/p/w780/qonBhlm0UjuKX2sH7e73pnG0454.jpg",
// "trailer_url": "https://www.youtube.com/watch?v=szby7ZHLnkA",
// "homepage_url": "",
// "created_at": "2020-02-22T18:52:47.043211",
// "updated_at": "2020-03-08T20:34:03.632105"

export { MovieDetail };

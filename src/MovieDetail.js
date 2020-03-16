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
import {
  StarOutlined,
  CalendarOutlined,
  YoutubeOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { useDataApi } from "./useDataApi";
import "antd/dist/antd.css";

function ExternalLinks({ data }) {
  const { imdb_id, tmdb_id, homepage_url, trailer_url } = data;

  return (
    <>
      <h3>Links</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {imdb_id && (
          <a href={`https://www.imdb.com/title/${imdb_id}`} target={"_blank"}>
            <img
              src={
                "https://uploads.codesandbox.io/uploads/user/906db8ec-ac6e-47bb-a465-6d94f13116ce/j2yP-imdb-icon.png"
              }
              style={{ height: "50px" }}
              alt="asdf"
            />
          </a>
        )}
        {tmdb_id && (
          <a
            href={`https://www.themoviedb.com/movie/${tmdb_id}`}
            target={"_blank"}
          >
            <img
              src={
                "https://uploads.codesandbox.io/uploads/user/906db8ec-ac6e-47bb-a465-6d94f13116ce/ENPU-tmdb-icon.png"
              }
              style={{ height: "30px" }}
              alt="asdf"
            />
          </a>
        )}
        {homepage_url && (
          <a href={homepage_url} target={"_blank"}>
            <HomeOutlined style={{ fontSize: "30px", color: "#333" }} />
          </a>
        )}
        {trailer_url && (
          <a href={trailer_url} target={"_blank"}>
            <YoutubeOutlined style={{ fontSize: "30px", color: "#333" }} />
          </a>
        )}
      </div>
    </>
  );
}

function Ratings({ data }) {
  const {
    imdb_rating_avg,
    imdb_rating_count,
    tmdb_rating_avg,
    tmdb_rating_count
  } = data;
  return (
    <>
      <h3>
        <StarOutlined style={{ paddingRight: "3px" }} />
        Ratings
      </h3>
      {imdb_rating_avg && (
        <div>
          IMDb: {imdb_rating_avg}{" "}
          {imdb_rating_count && `(${imdb_rating_count} votes)`}
        </div>
      )}
      {tmdb_rating_avg && (
        <div>
          TMDb: {tmdb_rating_avg}{" "}
          {tmdb_rating_count && `(${tmdb_rating_count} votes)`}
        </div>
      )}
    </>
  );
}

function ReleaseDates({ data }) {
  const {
    theatrical_release,
    digital_release,
    physical_release,
    tv_release
  } = data;
  return (
    <>
      <h3>
        <CalendarOutlined style={{ paddingRight: "3px" }} />
        Release Dates
      </h3>
      {theatrical_release && <div>Theatrical: {theatrical_release}</div>}
      {digital_release && <div>Digital: {digital_release}</div>}
      {physical_release && <div>Physical: {physical_release}</div>}
      {tv_release && <div>TV: {tv_release}</div>}
    </>
  );
}

function Overview({ data }) {
  const { overview, tagline } = data;
  return (
    <>
      <h3>Overview</h3>
      {tagline && <div>tagline: {tagline}</div>}
      {overview && <div>overview: {overview}</div>}
    </>
  );
}

function Basics({ data }) {
  const { year, runtime, certification, genres, budget, revenue } = data;
  return (
    <>
      <h3>Stuff</h3>
      {year && <div>year: {year}</div>}
      {runtime && <div>runtime: {runtime}</div>}
      {certification && <div>certification: {certification}</div>}
      {genres && <div>genres: {genres.join(", ")}</div>}
      {budget && <div>budget: {budget}</div>}
      {revenue && <div>revenue: {revenue}</div>}
    </>
  );
}

function Credits({ data }) {
  const { credits } = data;
  return (
    <>
      <h3>Credits</h3>
      <div style={{ height: "120px" }}>
        <ul
          style={{
            listStyleType: "none",
            height: "100%",
            padding: "5px 0px",
            cursor: "pointer",
            overflowX: "auto",
            whiteSpace: "nowrap"
          }}
        >
          {credits &&
            credits.map((item, index) => {
              const { order, character, actor } = item;
              return (
                <li
                  key={order}
                  style={{ display: "inline-block", padding: "0px 15px" }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "67px",
                      backgroundImage: `url(${actor.profile_url})`,
                      // objectFit: "contain"
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "3px",
                      cursor: "pointer"
                    }}
                  />
                  <div
                    style={{
                      width: "55px",
                      fontSize: "0.75rem",
                      overflow: "hidden"
                    }}
                  >
                    {actor.name}
                  </div>
                  <div
                    style={{
                      width: "55px",
                      fontSize: "0.5rem",
                      overflow: "hidden"
                    }}
                  >
                    {character}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

function Similar({ data }) {
  const { similar } = data;
  return (
    <>
      <h3>Similar</h3>
      <div style={{ height: "120px" }}>
        <ul
          style={{
            listStyleType: "none",
            height: "100%",
            padding: "5px 0px",
            cursor: "pointer",
            overflowX: "scroll",
            whiteSpace: "nowrap"
          }}
        >
          {similar &&
            similar.map((item, index) => {
              const { imdb_id, title, year, poster_url } = item;
              return (
                <li
                  key={imdb_id}
                  style={{ display: "inline-block", padding: "0px 5px" }}
                >
                  <Link to={`/movie/${imdb_id}`}>
                    <div
                      style={{
                        minWidth: "67px",
                        height: "100px",
                        backgroundImage: `url(${poster_url})`,
                        // objectFit: "contain"
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

function Recommended({ data }) {
  const { recommended } = data;
  return (
    <>
      <h3>Recommended</h3>
      <div style={{ height: "120px" }}>
        <ul
          style={{
            listStyleType: "none",
            height: "100%",
            padding: "5px 0px",
            cursor: "pointer",
            overflowX: "auto",
            whiteSpace: "nowrap"
          }}
        >
          {recommended &&
            recommended.map((item, index) => {
              const { imdb_id, title, year, poster_url } = item;
              return (
                <li
                  key={imdb_id}
                  style={{ display: "inline-block", padding: "0px 5px" }}
                >
                  <Link to={`/movie/${imdb_id}`}>
                    <div
                      style={{
                        minWidth: "67px",
                        height: "100px",
                        backgroundImage: `url(${poster_url})`,
                        // objectFit: "contain"
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

function MovieDetail() {
  let { imdbId } = useParams();
  // tt3794354
  const movieUrl = `https://www.matthewhopps.com/api/movie/${imdbId}/`;
  const [state, setUrl] = useDataApi(movieUrl, []);
  const { data, isLoading, isError } = state;

  function mapObject(object, callback) {
    return Object.keys(object || {}).map(function(key) {
      console.log(`Key: ${key}`);
      // if (typeof key === "object" && key !== null) {
      // if (typeof object[key] === "object" && key !== null) {
      //   console.log("OBJECT");
      //   let val = object[key];
      //   console.log(val);
      // }
      if (key && ["credits", "similar", "recommended"].includes(key)) {
        // console.log("ISOBJECT");
        // return mapObject(object[key], callback);
        object[key].map(item => {
          return mapObject(item, callback);
        });
      }
      if (key && ["actor"].includes(key)) {
        mapObject(object[key], callback);
      }
      // if (key && ["credits", "similar", "recommended", "actor"].includes(key)) {
      //   return mapObject(object[key], callback);
      // }
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
    // console.log(`MAP-OBJECT`);
    // mapObject(data, (key, val) => console.log(`${key}: ${val}`));
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
                  // backgroundPosition: "center",
                  backgroundPosition: "center 25%",
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
            <div style={{ padding: "10px" }}>
              <Basics data={data} />
            </div>
            <div style={{ padding: "10px" }}>
              <Ratings data={data} />
            </div>
            <div style={{ padding: "10px" }}>
              <ReleaseDates data={data} />
            </div>
            <div style={{ padding: "10px" }}>
              <Overview data={data} />
            </div>

            <div style={{ padding: "10px" }}>
              <Similar data={data} />
            </div>
            <div style={{ padding: "10px" }}>
              <Recommended data={data} />
            </div>

            <div style={{ padding: "10px" }}>
              <Credits data={data} />
            </div>
            <div style={{ padding: "10px" }}>
              <ExternalLinks data={data} />
            </div>

            <hr />
            {/* <p>MovieDetail - {imdbId}</p>
            <p> */}
            {/* {mapObject(data, function(key, value) {
                return (
                  <div>
                    <b>{key}</b> - {value}}
                  </div>
                );
              })} */}
            {/* </p> */}
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

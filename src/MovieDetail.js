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
import { Affix, Row, Typography } from "antd";
import {
  StarOutlined,
  CalendarOutlined,
  YoutubeOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { useDataApi } from "./useDataApi";
import "antd/dist/antd.css";

const { Paragraph } = Typography;

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

function Trailer({ data }) {
  const { trailer_url, title } = data;
  // const youtube_src = `${trailer_url}+ ?controls=1`;
  const youtube_src = `${trailer_url}`;

  return (
    <>
      <h3 className="d-flex align-items-center">
        <YoutubeOutlined className="pr-2" />
        Trailer
      </h3>
      {trailer_url && (
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item"
            title={title}
            src={youtube_src}
          />
        </div>
      )}
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
      <h3 className="d-flex align-items-center">
        <StarOutlined className="pr-2" />
        Ratings
      </h3>
      <div style={{ display: "" }}>
        {imdb_rating_avg && (
          <div>
            <img
              src={
                "https://uploads.codesandbox.io/uploads/user/906db8ec-ac6e-47bb-a465-6d94f13116ce/j2yP-imdb-icon.png"
              }
              style={{ height: "50px" }}
              alt="asdf"
            />{" "}
            {imdb_rating_avg}{" "}
            {imdb_rating_count && `(${imdb_rating_count} votes)`}
          </div>
        )}
        {tmdb_rating_avg && (
          <div>
            <img
              src={
                "https://uploads.codesandbox.io/uploads/user/906db8ec-ac6e-47bb-a465-6d94f13116ce/ENPU-tmdb-icon.png"
              }
              style={{ height: "30px" }}
              alt="asdf"
            />{" "}
            {tmdb_rating_avg}{" "}
            {tmdb_rating_count && `(${tmdb_rating_count} votes)`}
          </div>
        )}
      </div>
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
      <h4>Overview</h4>
      {tagline && <div>tagline: {tagline}</div>}
      {overview && (
        <Paragraph ellipsis={{ rows: 5, expandable: true }} style={{}}>
          {overview}
        </Paragraph>
      )}
    </>
  );
}

function Basics({ data }) {
  const {
    year,
    runtime,
    certification,
    genres,
    budget,
    revenue,
    poster_url
  } = data;
  return (
    <>
      <div
        style={{
          // background: "white",
          // padding: "6px",
          // height: "150px",
          display: "flex"
          // borderRadius: "5px",
          // border: "1px solid rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            minWidth: "92px",
            height: "138px",
            backgroundImage: `url(${poster_url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "5px"
          }}
        />
        <div style={{ paddingLeft: "1rem", paddingTop: "0.25rem" }}>
          {year && <div>year: {year}</div>}
          {runtime && <div>runtime: {runtime}</div>}
          {certification && <div>certification: {certification}</div>}
          {genres && <div>genres: {genres.join(", ")}</div>}
          {budget && <div>budget: {budget}</div>}
          {revenue && <div>revenue: {revenue}</div>}
        </div>
      </div>
    </>
  );
}

function Credits({ data }) {
  const { credits } = data;
  return (
    <>
      <h4>Credits</h4>
      <div style={{ height: "200px" }}>
        <ul
          style={{
            listStyleType: "none",
            height: "100%",
            padding: "0px 10px 16px 0px",
            cursor: "pointer",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            display: "flex"
          }}
        >
          {credits &&
            credits.map((item, index) => {
              const { order, character, actor } = item;
              return (
                <li
                  key={order}
                  style={{
                    // display: "inline-block",
                    padding: "0px 10px 0px 0px",
                    width: "80px"
                  }}
                >
                  <div
                    style={{
                      width: "67px",
                      height: "100px",
                      backgroundImage: `url(${actor.profile_url})`,
                      // objectFit: "contain"
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  />
                  <div
                    style={{
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      height: "4.8em",
                      whiteSpace: "normal"
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.75rem",
                        padding: 0,
                        margin: 0
                      }}
                    >
                      {actor.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        padding: 0,
                        margin: 0
                      }}
                    >
                      {character}
                    </p>
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
      <h4>Similar</h4>
      <div className="d-flex align-content-center flex-nowrap overflow-auto">
        {similar &&
          similar.map(item => {
            const { imdb_id, title, poster_url } = item;
            return (
              <Link to={`/movie/${imdb_id}`}>
                <div className="d-flex flex-column mr-2">
                  <img
                    style={{
                      minWidth: "80px",
                      height: "120px",
                      borderRadius: "4px"
                    }}
                    src={poster_url}
                    class="img-fluid"
                    alt={title}
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      height: "2.4em",
                      color: "#333"
                    }}
                    className="my-1"
                  >
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

function Recommended({ data }) {
  const { recommended } = data;
  return (
    <>
      <h4>Recommended</h4>
      <div className="d-flex align-content-center flex-nowrap overflow-auto">
        {recommended &&
          recommended.map(item => {
            const { imdb_id, title, poster_url } = item;
            return (
              <Link to={`/movie/${imdb_id}`}>
                <div className="d-flex flex-column mr-2">
                  <img
                    style={{
                      minWidth: "80px",
                      height: "120px",
                      borderRadius: "4px"
                    }}
                    src={poster_url}
                    class="img-fluid"
                    alt={title}
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      height: "2.4em",
                      color: "#333"
                    }}
                    className="my-1"
                  >
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

function MovieDetail() {
  let { imdbId } = useParams();
  const movieUrl = `https://www.matthewhopps.com/api/movie/${imdbId}/`;
  const [state, setUrl] = useDataApi(movieUrl, []);
  const { data, isLoading, isError } = state;

  useEffect(() => {
    setUrl(movieUrl);
  }, [imdbId, movieUrl, setUrl]);

  useEffect(() => {
    console.log(`State - (MovieDetail) - useParams= ${imdbId}`);
    console.log(state);
  }, [state, imdbId]);

  return (
    <div>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div style={{ maxWidth: "1000px" }}>
          <div
            style={{
              background: "white",
              height: "200px",
              display: "flex"
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
                justifyContent: "center",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px"
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

          <div style={{ padding: "10px 10px 40px 10px" }}>
            <div style={{ padding: "10px" }}>
              <Basics data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <Ratings data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <ReleaseDates data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <Overview data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <Trailer data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <Similar data={data} />
            </div>
            <div style={{ padding: "10px" }}>
              <Recommended data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <Credits data={data} />
            </div>
            <hr />
            <div style={{ padding: "10px" }}>
              <ExternalLinks data={data} />
            </div>
            <hr />
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

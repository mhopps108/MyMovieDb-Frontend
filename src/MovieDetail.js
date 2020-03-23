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
// import "antd/dist/antd.css";
import "./styles.css";

function ExternalLinks({ data }) {
  const { imdb_id, tmdb_id, homepage_url, trailer_url } = data;

  return (
    <>
      <h3 className="detail-section-headers">Links</h3>
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
  const youtube_src = `${trailer_url}?controls=1`;

  return (
    <>
      <h4 className="detail-section-header">Trailer</h4>
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
      <h4 className="detail-section-header">Ratings</h4>
      <div style={{ display: "" }}>
        {imdb_rating_avg && (
          <div>
            IMDb {imdb_rating_avg}
            <small className="pl-2">{"\\10"}</small>{" "}
            <small className="pl-2">
              {imdb_rating_count && `${imdb_rating_count} votes`}
            </small>{" "}
          </div>
        )}
        {tmdb_rating_avg && (
          <div>
            TMDb {tmdb_rating_avg}
            <small className="pl-2">{"\\10"}</small>{" "}
            <small className="pl-2">
              {tmdb_rating_count && `${tmdb_rating_count} votes`}
            </small>{" "}
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
      <h4 className="detail-section-header">Release Dates</h4>
      <div>
        {theatrical_release && <div>Theatrical: {theatrical_release}</div>}
        {digital_release && <div>Digital: {digital_release}</div>}
        {physical_release && <div>Physical: {physical_release}</div>}
        {tv_release && <div>TV: {tv_release}</div>}
      </div>
    </>
  );
}

function Overview({ data }) {
  const { overview, tagline } = data;
  return (
    <>
      <h4 className="detail-section-header">Overview</h4>
      {/* {tagline && <small style={{ textAlign: "center" }}>{tagline}</small>} */}
      {overview && <p style={{}}>{overview}</p>}
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
      <h4 className="detail-section-header">Similar</h4>

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
                      borderRadius: "4px",
                      border: "1px solid #555"
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
                      color: "#cdcdcd"
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

function Basics({ data }) {
  const {
    title,
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
      <div // poster image
        style={{
          minWidth: "92px",
          height: "138px",
          backgroundImage: `url(${poster_url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "4px",
          border: "1px solid #555"
        }}
      />
      <div className="flex-column pl-3">
        <h1
          className="mb-3"
          style={{
            fontSize: "22px",
            color: "#cdcdcd"
          }}
        >
          {title}
        </h1>
        <div className="w-75">
          <div className="d-flex mb-3">
            {year && (
              <div className="pr-4">
                <span class="badge badge-pill badge-light">{year}</span>
              </div>
            )}
            {runtime && (
              <div className="pr-4">
                <span class="badge badge-pill badge-light">{runtime}m</span>
              </div>
            )}
            {certification && (
              <div className="">
                <span class="badge badge-pill badge-light">
                  {certification}
                </span>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-start">
            {genres &&
              genres.map(genre => {
                return (
                  <div className="pr-3">
                    <span class="badge badge-secondary">{genre}</span>
                  </div>
                );
              })}
          </div>
        </div>
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
        <div
          className="container"
          style={{
            maxWidth: "1000px",
            background: "linear-gradient(0deg,#444 0%, #111 50%)",
            color: "white"
            // overflow: "hidden"
          }}
        >
          <div className="row content-wrap" style={{}}>
            <div // bg image
              style={{
                minWidth: "100%",
                height: "300px",
                backgroundImage: `url(${data.backdrop_url})`,
                // objectFit: "contain"
                backgroundPosition: "center 25%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                boxShadow: "inset 0px -31px 58px 0px rgba(0,0,0,1)"
              }}
            />
            <div
              className="col-12 d-flex pl-4 pb-4"
              style={{ marginTop: "-40px" }}
            >
              <Basics data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <Ratings data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <ReleaseDates data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <Overview data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <Trailer data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <Similar data={data} />
            </div>
          </div>
          {/* end row content-wrap */}

          {/* <div style={{ padding: "10px 10px 40px 10px" }}>
              
              <Recommended data={data} />
              <Credits data={data} />            
              <ExternalLinks data={data} />
          </div> */}
        </div>
      )}
    </div>
  );
}

export { MovieDetail };

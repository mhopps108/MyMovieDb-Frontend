import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
import { Link, useParams } from "react-router-dom";
import { YoutubeOutlined, HomeOutlined } from "@ant-design/icons";
import { useDataApi } from "./useDataApi";
// import "antd/dist/antd.css";
import "./styles.css";

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
            background: "linear-gradient(0deg,#333 0%, #000 100%)",
            // background: "linear-gradient(to bottom, #232526, #414345)",
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
                boxShadow: "inset 0px 0px 24px 46px rgba(0,0,0,0.8)"
              }}
            />
            <div
              className="col-12 d-flex pl-4 pb-5"
              style={{ marginTop: "-40px" }}
            >
              <Basics data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-5 flex-column">
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

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <Recommended data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <Credits data={data} />
            </div>

            <div className="col-12 d-flex pl-4 pb-4 flex-column">
              <ExternalLinks data={data} />
            </div>
          </div>
          {/* end row content-wrap */}
        </div>
      )}
    </div>
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
          // minWidth: "92px",
          // height: "138px",
          minWidth: "120px",
          height: "180px",
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
            fontSize: "24px",
            color: "#eee"
          }}
        >
          {title}
        </h1>
        <div
          className="w-75 d-flex flex-column justify-content-start"
          style={{
            fontSize: "16px"
            // color: "#cdcdcd"
          }}
        >
          <div className="d-flex flex-row pr-4 mb-3">
            {year && (
              <div className="pr-2">
                <span class="badge badge-light">{year}</span>
              </div>
            )}
            {runtime && (
              <div className="pr-2">
                <span class="badge badge-light">{runtime}m</span>
              </div>
            )}
            {certification && (
              <div className="">
                <span class="badge badge-light">{certification}</span>
              </div>
            )}
          </div>
          <div className="d-flex flex-row justify-content-start">
            {genres &&
              genres.map(genre => {
                return (
                  <div className="pr-2">
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

      <div className="d-flex flex-row" style={{ fontSize: "1rem" }}>
        <div className="d-flex w-50 p-0 mb-3 m-0 align-items-center">
          <div
            className="mr-2"
            style={{
              color: "#ccc",
              backgroud: "#222",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "6px 8px"
            }}
          >
            IMDb
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center" style={{}}>
              {imdb_rating_avg}
              <div className="ml-1" style={{ fontSize: "0.7rem" }}>
                /10
              </div>
            </div>

            <div classname="" style={{ color: "#aaa", fontSize: "0.75rem" }}>
              {`${imdb_rating_count} votes`}
            </div>
          </div>
        </div>

        <div className="d-flex w-50 p-0 mb-3 m-0 align-items-center">
          <div
            className="mr-2"
            style={{
              color: "#ccc",
              backgroud: "#222",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "6px 5px"
            }}
          >
            TMDb
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center" style={{}}>
              {tmdb_rating_avg}
              <div className="ml-1" style={{ fontSize: "0.7rem" }}>
                /10
              </div>
            </div>

            <div classname="" style={{ fontSize: "0.75rem" }}>
              {`${tmdb_rating_count} votes`}
            </div>
          </div>
        </div>
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

  // const Release = rd => {
  //   return <div>{rd}</div>;
  // };

  return (
    <>
      <h4 className="detail-section-header">Release Dates</h4>
      <div>
        {theatrical_release && (
          <div className="d-flex align-items-center mb-3">
            <div
              className="mr-2"
              style={{
                color: "#ccc",
                backgroud: "#222",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "2px 5px"
              }}
            >
              Theatrical
            </div>
            {new Date(theatrical_release).toDateString()}
          </div>
        )}
        {digital_release && (
          <div className="d-flex align-items-center mb-3">
            <div
              className="mr-2"
              style={{
                color: "#ccc",
                backgroud: "#222",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "2px 17px"
              }}
            >
              Digital
            </div>
            {new Date(digital_release).toDateString()}
          </div>
        )}
        {physical_release && (
          <div className="d-flex align-items-center mb-3">
            <div
              className="mr-2"
              style={{
                color: "#ccc",
                backgroud: "#222",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "2px 12px"
              }}
            >
              Physical
            </div>
            {new Date(physical_release).toDateString()}
          </div>
        )}
        {tv_release && <div>TV: {tv_release}</div>}
      </div>
    </>
  );
}

// function ReleaseDates({ data }) {
//   const {
//     theatrical_release,
//     digital_release,
//     physical_release,
//     tv_release
//   } = data;

//   return (
//     <>
//       <h4 className="detail-section-header">Release Dates</h4>
//       <div>
//         {theatrical_release && <div>Theatrical: {theatrical_release}</div>}
//         {digital_release && <div>Digital: {digital_release}</div>}
//         {physical_release && <div>Physical: {physical_release}</div>}
//         {tv_release && <div>TV: {tv_release}</div>}
//       </div>
//     </>
//   );
// }

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
              <Link to={`/movie/${imdb_id}`} key={imdb_id}>
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
      <h4 className="detail-section-header">Recommended</h4>

      <div className="d-flex align-content-center flex-nowrap overflow-auto">
        {recommended &&
          recommended.map(item => {
            const { imdb_id, title, poster_url } = item;
            return (
              <Link to={`/movie/${imdb_id}`} key={imdb_id}>
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

function Credits({ data }) {
  const { credits } = data;
  return (
    <>
      <h4 className="detail-section-header">Credits</h4>
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
                  key={index}
                  style={{
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
                    <p className="p-0 m-0" style={{ fontSize: "0.75rem" }}>
                      {actor.name}
                    </p>
                    <p className="p-0 m-0" style={{ fontSize: "0.65rem" }}>
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

function ExternalLinks({ data }) {
  const { imdb_id, tmdb_id, homepage_url, trailer_url } = data;

  return (
    <>
      <h4 className="detail-section-header">Links</h4>
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

export { MovieDetail };

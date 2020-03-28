import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { useDataApi } from "./useDataApi";
import MovieListItem from "./MovieListItem";
import moment from "moment";
import twix from "twix";

const twixDateString = (start, end) => {
  return moment(start)
    .twix(end, { allDay: true })
    .format();
};

const startOfWeek = date => {
  return (moment(date) || moment()).startOf("week");
};

const endOfWeek = date => {
  return (moment(date) || moment()).endOf("week");
};

function ReleaseDates() {
  let { dateParam } = useParams();
  const beginningDate = dateParam === "today" ? startOfWeek() : dateParam;
  dateParam = beginningDate;
  const [startDate, setStartDate] = useState(beginningDate);
  const listUrl = `https://matthewhopps.com/api/movie/?orderby=digital_release&digital_release__gte=${startOfWeek(
    startDate
  ).format("YYYY-MM-DD")}&digital_release__lt=${endOfWeek(startDate).format(
    "YYYY-MM-DD"
  )}`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  const { count, results } = data;

  const twixDateString = (start, end) => {
    return moment(start)
      .twix(end, { allDay: true })
      .format();
  };

  useEffect(() => {
    setUrl(listUrl);
  }, [listUrl, setUrl]);

  useEffect(() => {
    console.log(`Release Date state data`);
    console.log(state);
  }, [state]);

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(0deg,#333 0%, #111 90%)",
        color: "white"
      }}
    >
      <div className="row sticky-top">
        <div
          className="col-12 d-flex justify-content-between align-items-center py-1 px-2 mb-2"
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            backgroundColor: "#efefef",
            color: "#14181c",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          <div>Release Dates</div>
          <div>
            <div
              className="btn"
              style={{ border: "none" }}
              onClick={() => setStartDate(moment(startDate).subtract(7, "d"))}
            >
              {"<"}
            </div>
            <div
              className="btn"
              style={{ border: "none", fontSize: "1.1rem", fontWeight: 500 }}
              onClick={() => setStartDate(startOfWeek())}
            >
              {twixDateString(startOfWeek(startDate), endOfWeek(startDate))}
            </div>
            <div
              className="btn"
              style={{ border: "none" }}
              size=""
              onClick={() => setStartDate(moment(startDate).add(7, "d"))}
            >
              {">"}
            </div>
          </div>
          <div>#{count}</div>
        </div>
      </div>

      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="row mx-auto">
          {(results || []).map(movie => (
            <div className="col-xs-12 col-md-6 p-1 mb-2">
              <MovieListItem key={movie.imdb_id} movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ReleaseDates };

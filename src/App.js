import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { List } from "./List";

// import axios from "axios";
// import { useState, useEffect, useReducer } from "react";

// use relative urls instead of the full url for links

export default function App() {
  const url = "http://matthewhopps.com/api/list/me-my-list/";

  // const getdata = () => {
  //   axios({
  //     method: "get",
  //     url: "list/me-my-list/",
  //     baseURL: "https://www.matthewhopps.com/api/",
  //     headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
  //     withCredentials: false,
  //     maxContentLength: 200000,
  //   }).then(function(response) {
  //     console.log(response.data);
  //   });
  // };

  // const getdata = () => fetch(url)
  //   .then(res => res.json())
  //   .then(json => {
  //       console.log(json)
  //   });

  // useEffect(() => {
  //   const url = "http://matthewhopps.com/api/list/me-my-list/";
  //   let config = {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       crossDomain: true,
  //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
  //     }
  //   }
  //   // axios.get(url, config).then(data => console.log(data))

  //   // const getdata = async () => {
  //   //   try {
  //   //     console.log("url");
  //   //     console.log(url);
  //   //     // headers = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  //   //     const result = await axios.get(url);
  //   //     // const result = await fetch(url);
  //   //     console.log("result");
  //   //     console.log(result);
  //   //   } catch (error) {
  //   //     console.log("error");
  //   //     console.log(error);
  //   //   }
  //   // };
  //   // getdata();
  // }, []);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">List</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            {/* <Home /> */}
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

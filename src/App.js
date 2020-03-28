import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Button, Icon } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Lists } from "./Lists";
import { List } from "./List";
import { ReleaseDates } from "./ReleaseDates";
import { ListsDrawer } from "./ListsDrawer";
import { MovieDetail } from "./MovieDetail";
import { Search } from "./Search";
import "./styles.css";

export default function App() {
  const [listsDrawerVisible, setListsDrawerVisible] = useState(false);

  return (
    // #14181c
    // <div className="App" style={{ maxWidth: "1000px", background: "#222222" }}>
    <div className="App" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div
        className="d-flex justify-content-between align-items-center px-2"
        style={{
          // zIndex: "1",
          height: "50px",
          borderBottom: "1px solid #f5f6f7",
          background: "#222"
        }}
      >
        <h1
          className="p-0 m-0"
          style={{ fontSize: "1.3rem", fontWeight: 600, color: "#f5f6f7" }}
        >
          {"MyMovieDb"}
        </h1>

        <Button
          className="p-0 m-0"
          icon={<MenuOutlined />}
          onClick={() => setListsDrawerVisible(true)}
          style={{
            border: "none",
            background: "none",
            fontSize: "1.2rem",
            color: "#f5f6f7"
          }}
        />
      </div>

      <Router>
        <div>
          <Switch>
            <Route path={"/lists/:listSlug"}>
              <List />
            </Route>
            <Route path="/lists">
              <Lists />
            </Route>
            <Route path="/movie/:imdbId">
              <MovieDetail />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/release-dates">
              <ReleaseDates />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <ListsDrawer
          visible={listsDrawerVisible}
          setVisible={setListsDrawerVisible}
        />
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

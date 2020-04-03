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

const styles = {
  app: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "linear-gradient(0deg,#333 0%, #111 90%)" // #14181c
  }
};

export default function App() {
  const [listsDrawerVisible, setListsDrawerVisible] = useState(false);

  return (
    <div className="App" style={styles.app}>
      <div
        className="d-flex justify-content-between align-items-center px-2"
        style={{
          // zIndex: "1",
          height: "55px",
          // borderBottom: "1px solid #f5f6f7",
          // background: "#222"
          color: "#222",
          background: "transparent"
        }}
      >
        <h1
          className="p-0 m-0"
          style={{ fontSize: "1.4rem", fontWeight: 600, color: "#cdcdcd" }}
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

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Button, Icon } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Lists } from "./Lists";
import { ListsDrawer } from "./ListsDrawer";
import { MovieDetail } from "./MovieDetail";

// use relative urls instead of the full url for links

export default function App() {
  const [listsDrawerVisible, setListsDrawerVisible] = useState(false);
  // let match = useRouteMatch();

  return (
    <div className="App" style={{ maxWidth: "1000px" }}>
      <div
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
          padding: "5px 10px",
          borderBottom: "1px solid #ccc",
          background: "#3f4c6b"
          // color: "#ddd"
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            padding: 0,
            margin: 0,
            color: "rgba(255, 255, 255, 0.7)"
          }}
        >
          {"MyMovieDb"}
        </p>

        <Button
          type="primary"
          icon={
            <MenuOutlined
              style={{
                fontSize: "1.1rem",
                color: "#eee"
              }}
            />
          }
          style={{ border: "none", background: "none" }}
          onClick={() => setListsDrawerVisible(true)}
        />
      </div>

      <Router>
        <div>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center ",
              listStyleType: "none",
              padding: "0px 5px",
              margin: "0px",
              backgroundColor: "white"
            }}
          >
            <li>
              <Link to="/lists">Lists</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/lists">
              <Lists />
            </Route>
            <Route path="/movie/:imdbId">
              <MovieDetail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <ListsDrawer
          // match={match}
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

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
import { List } from "./List";
import { ListsDrawer } from "./ListsDrawer";
import { MovieDetail } from "./MovieDetail";

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
        }}
      >
        <h1
          style={{
            fontSize: "1.3rem",
            fontWeight: 600,
            padding: "0px 0px 0px 5px",
            margin: 0,
            color: "#eee"
          }}
        >
          {"MyMovieDb"}
        </h1>

        <Button
          type="primary"
          icon={
            <MenuOutlined
              style={{
                fontSize: "1.2rem",
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
            <Route path="/about">
              <About />
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

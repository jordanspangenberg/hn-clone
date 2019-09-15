import React from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import Loading from "./components/Loading";
import Post from './components/Post'
import User from './components/User'

class App extends React.Component {
  state = {
    theme: "dark",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light"
      }));
    }
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={Loading}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Posts type="top" />}
                  />
                  <Route
                    exact
                    path="/new"
                    render={() => <Posts type="new" />}
                  />
                  <Route
                    exact
                    path="/best"
                    render={() => <Posts type="best" />}
                  />
                  <Route path="/post" component={Post} />
                  <Route path="/user" component={User} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;

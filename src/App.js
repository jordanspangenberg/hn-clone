import React from "react";
import "./App.css";
import { ThemeProvider } from "./context/theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Feed from "./components/Feed";
import Loading from "./components/Loading";

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
                    render={() => <Feed selectedFeed="top" />}
                  />
                  <Route
                    exact
                    path="/new"
                    render={() => <Feed selectedFeed="new" />}
                  />
                  <Route
                    exact
                    path="/best"
                    render={() => <Feed selectedFeed="best" />}
                  />
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

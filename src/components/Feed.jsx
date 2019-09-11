import React, { Component } from "react";
import { fetchMainPosts } from "../api/api";
import { ThemeConsumer } from "../context/theme";
import Loading from "./Loading";
import Post from "./Post";

function StoryGrid({ stories }) {
  return (
    <ul className="post space-around">
      {stories.map((story, index) => {
        const {
          by,
          descendants,
          id,
          kids,
          score,
          time,
          title,
          type,
          url
        } = story;

        return (
          <li key={index}>
            <Post story={story} />
          </li>
        );
      })}
    </ul>
  );
}

export default class Feed extends Component {
  state = {
    selectedFeed: "top",
    stories: {},
    error: null
  };

  componentDidMount() {
    this.updateFeed(this.state.selectedFeed);
  }

  updateFeed = selectedFeed => {
    this.setState({
      selectedFeed,
      error: null
    });
    if (!this.state.stories[selectedFeed]) {
      fetchMainPosts(selectedFeed).then(data => {
        this.setState(({ stories }) => ({
          stories: {
            ...stories,
            [selectedFeed]: data
          }
        }));
      });
    }
  };
  isLoading = () => {
    const { selectedFeed, stories, error } = this.state;
    return !stories[selectedFeed] && error === null;
  };
  render() {
    const { selectedFeed, stories, error } = this.state;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className={`bg-${theme}`}>
            {this.isLoading() && <Loading />}
            {stories[selectedFeed] && (
              <StoryGrid stories={stories[selectedFeed]} />
            )}
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
